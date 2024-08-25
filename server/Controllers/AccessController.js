const Access = require("../Models/AccessModel");

exports.AllAccess = async (req, res) => {
  try {
    const All = await Access.find({})
    .sort({ id: 1 })
    .exec();
    res.status(200).send(All);
  } catch (err) {
    console.error("AllAccess Error:", err);
    res.status(500).send("AllAccess Error");
  }
};

exports.AddAccess = async (req, res) => {
  try {
    let data = req.body;
    const Add = await Access(data).save();
    res.send(Add).status(200);
  } catch (err) {
    console.log("AddAccess Error :", err);
    res.status(500).send("AddAccess Error");
  }
};
