const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.Messages = async (req, res, next) => {
    try {
        const messages = await prisma.fakbok.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json(messages);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.AddMessage = async (req, res, next) => {
    try {
        const { content } = req.body;

        const colors = [
            "from-blue-400 to-blue-500",
            "from-pink-400 to-pink-500",
            "from-purple-400 to-purple-500",
            "from-yellow-400 to-yellow-500",
            "from-green-400 to-green-500",
            "from-rose-400 to-rose-500",
            "from-indigo-400 to-indigo-500",
            "from-cyan-400 to-cyan-500",
        ];

        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newMessage = await prisma.fakbok.create({
            data: {
                content,
                color: randomColor,
            },
        });

        res.status(201).json(newMessage);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.LikeMessage = async (req, res, next) => {
    try {
        const { publicId } = req.params;
        const updatedMessage = await prisma.fakbok.update({
            where: { publicId },

            data: {
                likes: {
                    increment: 1,
                },
            },
        });
        res.status(200).json(updatedMessage);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};
