import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const articleExampleExists = await prisma.article.count();
  if (articleExampleExists) {
    console.log('Your db was already seeded! 🐣');
    return;
  }

  // Create a user
  const user = await prisma.user.create({
    data: {
      id: uuidv4(), // Generate a valid UUID
      name: 'John Doe',
      email: 'john.doe@example.com',
      userName: 'johndoe',
      password: Buffer.from('123456'),
      active: true,
      type: 'ADMIN', // Assuming UserType is an enum with ADMIN as a value
    },
  });

  // Create an article
  await prisma.article.create({
    data: {
      id: uuidv4(), // Generate a valid UUID
      date: new Date(),
      title: 'First Article',
      content: 'This is the content of the first article.',
      file: null,
      filePath: null,
      active: true,
      creator_id: user.id,
    },
  });

  console.log('Postgres was succesfully seeded! 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
