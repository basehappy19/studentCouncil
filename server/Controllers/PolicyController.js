const Policy = require("../Models/PolicyModel");

exports.AllPolicy = async (req, res) => {
  try {
    const All = await Policy.aggregate([
      {
        $lookup: {
          from: "policycategories",
          localField: "categories",
          foreignField: "id",
          as: "categoryData",
        },
      },
      {
        $lookup: {
          from: "policystatuses",
          localField: "statusId",
          foreignField: "id",
          as: "statusData",
        },
      },
    ])
      .sort({ id: 1 })
      .exec();
    res.send(All).status(200);
  } catch (err) {
    console.log("AllPolicy Error : " + err);
    res.status(500).send("AllPolicy Error");
  }
};

exports.Policy = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Policy.aggregate([
      {
        $match: {
          id: id,
        },
      },
      {
        $lookup: {
          from: "policycategories",
          localField: "categories",
          foreignField: "id",
          as: "categoryData",
        },
      },
      {
        $lookup: {
          from: "policystatuses",
          localField: "statusId",
          foreignField: "id",
          as: "statusData",
        },
      },
    ]).exec();
    res.status(200).send(data);
  } catch (err) {
    console.log("Policy Error : " + err);
    res.status(500).send("Policy Error");
  }
};

exports.PolicyFilter = async (req, res) => {
  try {
    const category = parseInt(req.params.category);
    const subcategory = parseInt(req.params.subcategory);

    let matchCriteria = {};

    if (category) {
      matchCriteria.categories = category;
    }

    if (subcategory) {
      matchCriteria['subCategories.id'] = subcategory;;
    }

    const data = await Policy.aggregate([
      { $match: matchCriteria },
      { $sort: { id: 1 } },
      {
        $lookup: {
          from: "policycategories",
          localField: "categories",
          foreignField: "id",
          as: "categoryData",
        },
      },
      {
        $lookup: {
          from: "policystatuses",
          localField: "statusId",
          foreignField: "id",
          as: "statusData",
        },
      }
    ]).exec();

    res.status(200).send(data);
  } catch (err) {
    console.log("PolicyFilter Error : " + err);
    res.status(500).send("PolicyFilter Error");
  }
};


exports.AddPolicy = async (req, res) => {
  try {
    let data = req.body;
    const Add = await Policy(data).save();
    res.send(Add).status(200);
  } catch (err) {
    console.log("AddPolicy Error : " + err);
    res.status(500).send("AddPolicy Error");
  }
};
