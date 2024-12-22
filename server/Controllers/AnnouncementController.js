const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.AllAnnouncements = async (req, res) => {
    try {
        const { search, page = 1, pageSize = 3 } = req.query;

        const pageNumber = parseInt(page);
        const size = parseInt(pageSize);

        const skip = (pageNumber - 1) * size;

        const searchFilter = search
            ? {
                  OR: [
                      {
                          title: { contains: search },
                      },
                      {
                          content: { contains: search },
                      },
                      {
                          timestamp: { contains: search },
                      },
                  ],
              }
            : {};

        const [announcements, totalRecords] = await Promise.all([
            prisma.announcement.findMany({
                where: searchFilter,
                include: {
                    schedules: {
                        include: {
                            schedule: true,
                        },
                    },
                    links: {
                        include: {
                            link: true,
                        },
                    },
                    iframes: {
                        include: {
                            iframe: true,
                        },
                    },
                    images: {
                        include: {
                            image: true,
                        },
                    },
                },
                orderBy: {
                    order: "desc",
                },
                skip: skip,
                take: size,
            }),
            prisma.announcement.count({
                where: searchFilter,
            }),
        ]);
        const totalPages = Math.ceil(totalRecords / size);

        const highlightAnnouncement =
            await prisma.highlightedAnnouncement.findFirst({
                orderBy: {
                    id: "desc",
                },
                take: 1,
            });

        res.status(200).json({
            announcements: announcements,
            highlight: highlightAnnouncement,
            pagination: {
                totalRecords,
                totalPages,
                currentPage: pageNumber,
                pageSize: size,
            },
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};
