const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const validateRequiredFields = require('../Functions/ValidateRequiredFields');

exports.AllWorks = async(req, res, next)=>{
    try {        
        const works = await prisma.work.findMany({
            include:{
                postBy: {
                    select:{
                        id: true,
                        fullName: true,
                        displayName: true,
                        profileImg: true,
                        sid: true,
                        partyList: {
                            select:{
                                id: true,
                                firstName: true,
                                middleName: true,
                                lastName: true,
                                nickName: true,
                                profileImg: true,
                                roles:{
                                    select:{
                                        role: true
                                    }
                                }
                            },
                        },
                    }
                },
                operators: {
                    select:{
                        id: true,
                        user: {
                            select:{
                                id: true,
                                fullName: true,
                                displayName: true,
                                profileImg: true,
                                sid: true,
                                partyList: {
                                    select:{
                                        id: true,
                                        firstName: true,
                                        middleName: true,
                                        lastName: true,
                                        nickName: true,
                                        profileImg: true,
                                        roles:{
                                            select:{
                                                role: true
                                            }
                                        }
                                    },
                                }
                            }
                        }
                    }
                },
                images: {
                    select:{
                        id: true,
                        path: true,
                    }
                },
                tags: {
                    select:{
                        id: true,
                        tag: true,
                    }
                },
            }
        })
        res.status(200).send(works);
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}

exports.UserWorks = async (req, res) => {
    try {
        const id = req.user.id

        const works = await prisma.work.findMany({
            where: {
                postBy: {
                    id: id
                }
            },
            select:{
                id: true,
                title: true,
                description: true,
                postBy: true,
                images: true,
                operators: true,
                tags:true,
                date:true,
                createdAt: true,
                updatedAt: true,
            }
        })

        res.status(200).json(works);
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}

exports.AddWork = async (req, res, next) => {
    try {
        const id = req.user.id;
        const { title, description, operators, tags } = req.body;
        
        const requiredFields = {
            title: "Title",
            description: "Description",
            workOperator: "Work Operator",
        }

        const errorMessage = validateRequiredFields(req.body, requiredFields);

        if (errorMessage) {
            return res.status(400).json({ message: errorMessage, type: 'error' });
        }


        const images = req.files.map(file => file.path);

        await prisma.work.create({
            data: {
                title,
                description,
                postBy: {
                    connect: {
                        id
                    }
                },
                images:{
                    createMany: {
                        data: images.map(image => ({
                            name: image.filename,
                            path: image.filename
                        }))
                    }
                },
                operators,
                tags
            }
        })
        res.status(201).json({message: `เพิ่มโพสต์ ${title} เรียบร้อยแล้ว`, type: 'success'});
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}




