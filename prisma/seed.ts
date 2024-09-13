import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const userExampleExists = await prisma.user.count();
  if (userExampleExists) {
    console.log('Your db was already seeded! 🐣');
    return;
  }

  // Create a admin user
  await prisma.user.create({
    data: {
      id: uuidv4(),
      name: 'John Doe',
      email: 'john.doe@example.com',
      userName: 'johndoe',
      password: Buffer.from('123456'),
      active: true,
      type: 'ADMIN',
    },
  });

  // Create a teacher user
  const teacher = await prisma.user.create({
    data: {
      id: uuidv4(),
      name: 'Vanderson Maroni',
      email: 'v.maroni@example.com',
      userName: 'vmaroni',
      password: Buffer.from('123456'),
      active: true,
      type: 'TEACHER',
    },
  });

  // Create a student user
  await prisma.user.create({
    data: {
      id: uuidv4(),
      name: 'David Blanco',
      email: 'd.blanco@example.com',
      userName: 'dBlanco',
      password: Buffer.from('123456'),
      active: true,
      type: 'STUDENT',
    },
  });

  // Create an article
  await prisma.article.create({
    data: {
      id: uuidv4(),
      date: new Date(),
      title: 'First Article',
      content: 'This is the content of the first article.',
      file: null,
      filePath: null,
      active: true,
      creator_id: teacher.id,
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
