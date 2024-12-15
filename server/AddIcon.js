const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function importIcons() {
    const iconsDir = path.join(__dirname, "/Uploads/Works/Icons");
    const files = fs.readdirSync(iconsDir);

    for (const file of files) {
        if (path.extname(file) === ".json") {
            console.log(`Processing file: ${file}`); // Log the file being processed

            const jsonFilePath = path.join(iconsDir, file);
            const data = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

            const iconName = file.replace(".json", ".svg");

            // Log icon creation
            console.log(`Creating/Checking icon: ${iconName}`);

            // Create Icon if it doesn't exist
            const icon = await prisma.icon.upsert({
                where: { name: iconName },
                update: {},
                create: {
                    name: iconName,
                },
            });

            // Handle Contributors
            for (const contributorName of data.contributors) {
                console.log(`Handling contributor: ${contributorName}`);

                const contributor = await prisma.contributor.upsert({
                    where: { name: contributorName },
                    update: {},
                    create: { name: contributorName },
                });

                // Avoid duplicate IconContributors
                const existingContributor =
                    await prisma.iconContributors.findFirst({
                        where: {
                            iconId: icon.id,
                            contributorId: contributor.id,
                        },
                    });

                if (!existingContributor) {
                    console.log(
                        `Linking contributor '${contributorName}' to icon '${iconName}'`
                    );
                    await prisma.iconContributors.create({
                        data: {
                            iconId: icon.id,
                            contributorId: contributor.id,
                        },
                    });
                }
            }

            // Handle Tags
            for (const tagName of data.tags) {
                console.log(`Handling tag: ${tagName}`);

                const tag = await prisma.tag.upsert({
                    where: { name: tagName },
                    update: {},
                    create: { name: tagName },
                });

                // Avoid duplicate IconTags
                const existingTag = await prisma.iconTags.findFirst({
                    where: {
                        iconId: icon.id,
                        tagId: tag.id,
                    },
                });

                if (!existingTag) {
                    console.log(
                        `Linking tag '${tagName}' to icon '${iconName}'`
                    );
                    await prisma.iconTags.create({
                        data: {
                            iconId: icon.id,
                            tagId: tag.id,
                        },
                    });
                }
            }

            // Handle Categories
            for (const categoryName of data.categories) {
                console.log(`Handling category: ${categoryName}`);

                const category = await prisma.iconCategory.upsert({
                    where: { name: categoryName },
                    update: {},
                    create: { name: categoryName },
                });

                // Avoid duplicate IconCategories
                const existingCategory = await prisma.iconCategories.findFirst({
                    where: {
                        iconId: icon.id,
                        categoryId: category.id,
                    },
                });

                if (!existingCategory) {
                    console.log(
                        `Linking category '${categoryName}' to icon '${iconName}'`
                    );
                    await prisma.iconCategories.create({
                        data: {
                            iconId: icon.id,
                            categoryId: category.id,
                        },
                    });
                }
            }
        }
    }

    console.log("Import completed!");
}

importIcons()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
