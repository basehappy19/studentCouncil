const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const faker = require("faker");

async function createFakeVoteData() {
    const partyLists = await prisma.partyList.findMany({
        where: {
            id: {
                gte: 1,
                lte: 70,
            },
        },
    });

    // ฟังก์ชันสุ่ม PartyList ที่ยังไม่ได้ถูกเลือก
    function getRandomPartyList(excludedIds = []) {
        const availablePartyLists = partyLists.filter(
            (party) => !excludedIds.includes(party.id)
        );
        const randomIndex = Math.floor(
            Math.random() * availablePartyLists.length
        );
        return availablePartyLists[randomIndex];
    }

    // สร้างข้อมูล Vote
    const vote = await prisma.vote.create({
        data: {
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            content: faker.lorem.text().slice(0, 500),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
            refers: {
                create: [
                    {
                        refer: {
                            create: {
                                name: faker.company.companyName(),
                            },
                        },
                    },
                ],
            },
            documents: {
                create: [
                    {
                        document: {
                            create: {
                                name: faker.system.fileName(),
                                path: faker.system.filePath(),
                            },
                        },
                    },
                ],
            },
        },
    });

    // สร้างข้อมูล VoteMaxAttendees ก่อน
    const maxAttendees = await prisma.voteMaxAttendees.create({
        data: {
            number: faker.datatype.number({ min: 10, max: 70 }),
        },
    });

    // สร้างข้อมูล VoteResult และเชื่อมโยงกับ maxAttendeesId
    const voteResult = await prisma.voteResult.create({
        data: {
            voteId: vote.id,
            maxAttendeesId: maxAttendees.id, // ใช้ maxAttendeesId แทน
        },
    });

    // สร้างข้อมูลการลงคะแนน (Agrees, Disagrees, Abstains, NoVotes)
    let excludedIds = []; // เก็บ PartyList ที่ได้ถูกเลือกแล้ว

    // เลือก PartyList สำหรับ Agree
    const agreePartyList = getRandomPartyList(excludedIds);
    excludedIds.push(agreePartyList.id);

    // เลือก PartyList สำหรับ Disagree
    const disagreePartyList = getRandomPartyList(excludedIds);
    excludedIds.push(disagreePartyList.id);

    // เลือก PartyList สำหรับ Abstain
    const abstainPartyList = getRandomPartyList(excludedIds);
    excludedIds.push(abstainPartyList.id);

    // เลือก PartyList สำหรับ NoVote
    const noVotePartyList = getRandomPartyList(excludedIds);
    excludedIds.push(noVotePartyList.id);

    // เพิ่มการลงคะแนนที่เห็นด้วย
    await prisma.voteAgree.create({
        data: {
            partyListId: agreePartyList.id,
            resultId: voteResult.id,
        },
    });

    // เพิ่มการลงคะแนนที่ไม่เห็นด้วย
    await prisma.voteDisagree.create({
        data: {
            partyListId: disagreePartyList.id,
            resultId: voteResult.id,
        },
    });

    // เพิ่มการงดออกเสียง
    await prisma.voteAbstain.create({
        data: {
            partyListId: abstainPartyList.id,
            resultId: voteResult.id,
        },
    });

    // เพิ่มการไม่ลงคะแนน
    await prisma.noVote.create({
        data: {
            partyListId: noVotePartyList.id,
            reason: faker.lorem.word(),
            resultId: voteResult.id,
        },
    });

    console.log(
        `Created vote with ID: ${vote.id} and result with ID: ${voteResult.id}`
    );
}

async function createMultipleVotes(num) {
    for (let i = 0; i < num; i++) {
        await createFakeVoteData();
        console.log(`Created vote data ${i + 1}`);
    }
}

// สร้างข้อมูล 20 ชุด
createMultipleVotes(20).catch((e) => {
    console.error(e);
    process.exit(1);
});
