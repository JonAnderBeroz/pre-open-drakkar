const {PrismaClient} = require("@prisma/client");

const {randomUUID} = require("crypto");

const prisma = new PrismaClient();

const team1Id = randomUUID();
const team2Id = randomUUID();

const wod1Id = randomUUID();
const wod2Id = randomUUID();

data = {
  wods: [
    {id: wod1Id, name: "23.1"},
    {id: wod2Id, name: "23.2"},
  ],
  teams: [
    {id: team1Id, name: "Team1"},
    {id: team2Id, name: "Team2"},
  ],
  participants: [
    {
      team_id: team1Id,
      full_name: "participant1",
    },
    {
      team_id: team1Id,
      full_name: "participant2",
    },
    {
      team_id: team2Id,
      full_name: "participant3",
    },
    {
      team_id: team2Id,
      full_name: "participant4",
    },
  ],
  scores: [
    {wod_id: wod1Id, team_id: team1Id, score: 10},
    {wod_id: wod1Id, team_id: team2Id, score: 8},
    {wod_id: wod2Id, team_id: team1Id, score: 8},
    {wod_id: wod2Id, team_id: team2Id, score: 12},
  ],
};

async function seed() {
  await prisma.wod.deleteMany();
  await prisma.score.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.team.deleteMany();

  await prisma.wod.createMany({
    data: data.wods,
  });
  console.log("Wods created");

  await prisma.team.createMany({
    data: data.teams,
  });
  console.log("Teams created");

  await prisma.participant.createMany({
    data: data.participants,
  });
  console.log("Participants created");

  await prisma.score.createMany({
    data: data.scores,
  });
  console.log("Scores created");
}

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
