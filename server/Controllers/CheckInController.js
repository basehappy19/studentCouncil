const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.AllCheckIns = async (req, res) => {
  try {
    const { startDate, endDate, userId } = req.query;

    const checkIns = await prisma.checkIn.findMany({
      select: {
        attendTime: true,
        type: true,
        reason: true,
        user: {
          select: {
            id: true,
            partylist: true,
          },
        },
      },
      where: {
        attendTime: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        ...(userId && { userId }), 
      },
    });

    const groupedCheckIns = checkIns.reduce((acc, checkIn) => {
      const date = checkIn.attendTime.toISOString().split('T')[0]; 

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push({
        type: checkIn.type,
        reason: checkIn.reason,
        user: checkIn.user,
      });

      return acc;
    }, {});

    const result = Object.entries(groupedCheckIns).map(([date, checkIns]) => ({
      date,
      checkIns,
    }));

    res.status(200).send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send('Server Error');
  }
};

exports.CheckIn = async (req, res) => {
    try {
        const { type, reason } = req.body
        const id = req.user.id;

        const user = await prisma.user.findOne({
          id: id,
        })
        
        if (!user) {
          return res.json({ message: "ไม่พบข้อมูลผู้ใช้", type: "error" });
        }

        const dateNow = new Date();
        const dayOfWeek = dateNow.getDay(); 
        const hours = dateNow.getHours();

        const startOfDay = new Date(dateNow.setHours(0, 0, 0, 0));
        const endOfDay = new Date(dateNow.setHours(23, 59, 59, 999));

        const checked = await prisma.checkIn.findFirst({
            userId: user,
            attendTime: {
                gte: startOfDay,
                lte: endOfDay,
            },
        });

        if (checked) {
            return res.json({ message: "คุณได้เช็คอินแล้ววันนี้", type: "error" });
        }
        if (dayOfWeek < 1 || dayOfWeek > 5 || hours < 7 || hours >= 9) {
            return res.json({ message: "ปิดให้เช็คอินแล้ว", type: "error" });
        }

        attendTime = new Date();
        const formattedDate = new Intl.DateTimeFormat('th-TH', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(attendTime);
        await prisma.checkIn.create({
          data: {
            userId: userId,
            type: type,
            reason: reason,
            attendTime: attendTime,
          },
        });
        res.status(201).json({ message: `เช็คอินเรียบร้อยแล้ว "${formattedDate}"`, type: "success" });
        
    } catch (e) {
        console.log(e);
        res.status(500).send("Server Error");
    }
};

exports.CheckInStatus = async (req, res) => {
  try {
      const id = req.user.id;
      
      const user = await prisma.user.findFirst({
        id: id,
      });

      if (!user) {
          return res.status(404).json({ message: "ไม่พบข้อมูลผู้ใช้นี้", type: "error" });
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
          return res.status(200).json({ message: "คุณได้เช็คอินแล้ววันนี้", type: "CheckedIn"});
      } 

      if (dayOfWeek < 1 || dayOfWeek > 5 || hours < 7 || hours >= 9) {
          return res.status(200).json({ message: "ปิดให้เช็คอินแล้ว", type: "CheckInClosed" });
      } 

      res.status(200).json({ message: "ยังไม่เช็คอินวันนี้", type: "NotChecked" });
  } catch (e) {
      console.log(e);
      res.status(500).send("Server Error");
  }
};


