import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { CreateUserDto } from './CreateUserDto';

describe('UserController', () => {
  let userController: UserController;
  let createdUserId: string;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          signOptions: { expiresIn: '24h' },
        }),
      ],
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  const mockedUserObj: CreateUserDto = {
    name: 'Test User',
    email: 'u.test@example.com',
    userName: 'rtest',
    password: '12345a$6',
    active: true,
    type: 'STUDENT',
  };
  const mockedResponse = mockedUserObj;
  delete mockedResponse.password;

  describe('create', () => {
    it('should create "new user" and return partial user {id,name}', async () => {
      const response = await userController.createUser(mockedUserObj);
      if (!(response instanceof HttpException)) {
        createdUserId = response.id;
      }
      expect(response).toStrictEqual({
        id: expect.any(String),
        name: 'Test User',
      });
    });
  });

  describe('get:id', () => {
    it('should return "user"', async () => {
      const response = await userController.getUser(createdUserId);
      expect(response).toStrictEqual({ ...mockedResponse, id: createdUserId });
    });
  });

  describe('getUsers', () => {
    it('should return "[user]"', async () => {
      const response = await userController.getUsers(
        undefined, //skip
        undefined, //take
        undefined, //cursor
        `{"id":"${createdUserId}"}`, //where
        undefined, //orderby
      );
      expect(response).toStrictEqual([
        { ...mockedResponse, id: createdUserId },
      ]);
    });
  });

  describe('update', () => {
    it('should update "new user" and return partial user {id,name:"new name"}', async () => {
      const changeName = mockedUserObj;
      changeName.name = 'Test User New Name';
      const response = await userController.updateUser(
        createdUserId,
        mockedUserObj,
      );
      expect(response).toStrictEqual({
        id: expect.any(String),
        name: changeName.name,
      });
    });
  });

  describe('delete', () => {
    it('should delete "created user"', async () => {
      const response = await userController.deleteUser(createdUserId);
      expect(response).toBe('User succesfully deleted!');
    });
  });
});
