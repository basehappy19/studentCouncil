const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const validateRequiredFields = require('../Functions/ValidateRequiredFields');
const _ = require('lodash'); 

exports.RecommendPolicies = async (req, res) => { 
  try {
    const allPolicies = await prisma.policy.findMany({
      include: {
        category: true,              
        description: true,           
        subCategories: {             
          include: {
            subCategory: true,
          }
        },
        progresses: {              
          include: {
            status: true,
          }
        },
      }
    });
    
    const policies = _.sampleSize(allPolicies, 10);

    res.send(policies);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
}



exports.AllPolicies = async (req, res) => {
  try {
    const { category, subcategory } = req.query;
    const policies = await prisma.policy.findMany({
      where: {
        category: {
          id: isNaN(parseInt(category))? undefined : parseInt(category),
        },
        subCategories: {
          some: {
            subCategoryId: isNaN(parseInt(subcategory)) ? undefined : parseInt(subcategory),
          },
        },
      },
      include: {
        category: true,              
        description: true,           
        subCategories: {             
          include: {
            subCategory: true,
          }
        },
        progresses: {              
          include: {
            status: true,
          }
        },
      }
    })
    res.send(policies).status(200);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
};
exports.Policy = async (req, res) => {
  try {
    const policy = await prisma.policy.findFirst({
      where: {
        id: parseInt(req.query.id),
      },
      include: {
        category: true,              
        description: true,           
        subCategories: {             
          select: {
            id: true,
            subCategory: true,
          }
        },
        progresses: {              
          select: {
            id: true,
            description: true,
            startedAt: true,
            status: true,
          }
        },
      }
    });

    let currentProgress = null;
    if (policy && policy.progresses.length > 0) {
      currentProgress = policy.progresses.reduce((latest, progress) => {
        return !latest || new Date(progress.startedAt) > new Date(latest.startedAt) 
          ? progress 
          : latest;
      }, null);
    }

    const result = {
      ...policy,
      currentProgress
    }

    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
};


exports.AddPolicy = async(req,res)=>{
  try {
      const { rank, title, thumbnailImage, categoryId, subCategoryId, problem, offer, budget } = req.body
      const requiredFields = {
          rank:"Rank",
          title:"Title",
          thumbnailImage:"Thumbnail Image",
          categoryId:"Category ID",
          problem:"Problem",
          offer:"Offer",
      };

      const errorMessage = validateRequiredFields(req.body, requiredFields);

      if (errorMessage) {
          return res.status(400).json({ message: errorMessage, type: "error" });
      }

      const category = await prisma.category.findFirst({
          where:{
              id:categoryId
          }
      })

      await prisma.policy.create({
        data: {
            rank,
            title,
            thumbnailImage,
            categoryId,
            subcategoryId,
            problem,
            offer,
            budget,
            category : {
              connect: {
                  id: categoryId
              }
            },
            subcategories: {
                connect: {
                    id: subcategoryId
                }
            },
            description:{
              create: {
                  problem,
                  offer,
                  budget,
              }
            }
        },
        include: {
            category: true,
            description: true,
            subcategories: true,
            progresses: true,
        }
      })
      res.json({message:`เพื่มนโยบาย ${title} ใน ${category.title} เรียบร้อยแล้ว`, type: "success"}).status(201)
  } catch (e) {
      console.log(e);
      res.status(500).send('Server Error')
  }
}
