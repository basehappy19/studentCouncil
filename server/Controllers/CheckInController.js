const CheckIn = require("../Models/CheckInModel");
const User = require("../Models/UserModel");

exports.AllCheckIn = async (req, res) => {
  try {
    const { startDate, endDate, userId } = req.body;

    const matchFilter = {};

    if (startDate) {
      matchFilter.attendTime = { $gte: new Date(startDate) };
    }
    if (endDate) {
      if (!matchFilter.attendTime) {
        matchFilter.attendTime = {};
      }
      matchFilter.attendTime.$lte = new Date(new Date(endDate).setHours(23, 59, 59, 999));
    }
    if (userId) {
      matchFilter.userId = userId;
    }

    const data = await CheckIn.aggregate([
      { $match: matchFilter },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "id",
          as: "userData",
          pipeline: [
            {
              $lookup: {
                from: "roles",
                localField: "roleId",
                foreignField: "id",
                as: "rolesData"
              }
            }
          ],
        }
      },
      { $unwind: "$userData" },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$attendTime" } },
            userId: "$userId"
          },
          checkIns: {
            $push: {
              attendTime: "$attendTime",
              type: "$type",
              motive: "$motive"
            }
          },
          userData: { $first: "$userData" }
        }
      },
      {
        $group: {
          _id: "$_id.date",
          attendees: {
            $push: {
              userId: "$_id.userId",
              checkIns: "$checkIns",
              userData: {
                displayName: "$userData.displayName",
                profilePicture: "$userData.profilePicture",
                rolesData: "$userData.rolesData"
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          attendees: 1
        }
      },
      { $sort: { date: -1 } }
    ]).exec();

    res.status(200).send(data);
  } catch (err) {
    console.error("AllCheckIn Error:", err);
    res.status(500).send("AllCheckIn Error");
  }
};

exports.CheckIn = async (req, res) => {
    try {
        const userId = parseInt(req.body.userId);
        const checkUser = await User.findOne({ id: userId });
        if (!checkUser) {
            res.json({ message: "ไม่เจอผู้ใช้นี้", type: "error" });
        } else {
            const dateNow = new Date();
            const dayOfWeek = dateNow.getDay(); 
            const hours = dateNow.getHours();
            const { type, motive } = req.body

            const startOfDay = new Date(dateNow.setHours(0, 0, 0, 0));
            const endOfDay = new Date(dateNow.setHours(23, 59, 59, 999));
            const checked = await CheckIn.findOne({
                userId: userId,
                attendTime: {
                    $gte: startOfDay,
                    $lte: endOfDay,
                },
            });
            if (checked) {
                res.json({ message: "คุณได้เช็คอินแล้ววันนี้", type: "error" });
            } else {
                if (dayOfWeek >= 1 && dayOfWeek <= 5 && hours >= 7 && hours < 9) {
                  const checkInData = {
                    userId: userId,
                    type: type,
                    motive: motive,
                  };
                  await new CheckIn(checkInData).save();
                  res.json({ message: "เช็คอินเรียบร้อยแล้ว", type: "success" }).status(200);
              } else {
                  res.json({ message: "ปิดให้เช็คอินแล้ว", type: "error" });
              }
            }
        }
    } catch (err) {
        console.log("Check In Error :", err);
        res.status(500).send("Check In Error");
    }
};

exports.CheckInStatus = async (req, res) => {
  try {
      const userId = parseInt(req.body.userId);
      
      const checkUser = await User.findOne({ id: userId });

      if (!checkUser) {
          return res.json({ message: "ไม่เจอผู้ใช้นี้", type: "error" });
      }

      const dateNow = new Date();
      const dayOfWeek = dateNow.getDay(); 
      const hours = dateNow.getHours();

      const startOfDay = new Date(dateNow.setHours(0, 0, 0, 0));
      const endOfDay = new Date(dateNow.setHours(23, 59, 59, 999));

      const checked = await CheckIn.findOne({
          userId: userId,
          attendTime: {
              $gte: startOfDay,
              $lte: endOfDay,
          },
      });
      
      if (checked) {
          return res.json({ message: "คุณได้เช็คอินแล้ววันนี้", type: "CheckedIn", data: checked });
      } else if (dayOfWeek <= 1 || dayOfWeek > 5 || hours <= 7 || hours >= 9) {
          res.json({ message: "ปิดให้เช็คอินแล้ว", type: "CheckInClosed" });
      } else {
          return res.json({ message: "ยังไม่เช็คอินวันนี้", type: "NotChecked" });
      }
      
  } catch (err) {
      console.log("Check In Status Error :", err);
      res.status(500).send("Check In Status Error");
  }
};


