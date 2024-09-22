import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { CreateArticleDto } from './CreateArticlesDto';

describe('ArticleController', () => {
  let articleController: ArticleController;
  let createdArticleId: string;
  let userController: UserController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          signOptions: { expiresIn: '24h' },
        }),
      ],
      controllers: [ArticleController, UserController],
      providers: [ArticlesService, UserService, PrismaService],
    }).compile();

    userController = app.get<UserController>(UserController);

    articleController = app.get<ArticleController>(ArticleController);
  });

  const mockedArticleObj: CreateArticleDto = {
    title: 'Test Article by jest ',
    content: 'This is the content of the first article.',
    file: null,
    filePath: null,
    active: true,
  };

  const mockedArticleResponse = {
    id: expect.any(String),
    date: expect.any(Date),
    title: expect.any(String),
    content: expect.any(String),
    file: null,
    filePath: null,
    active: true,
    creator_id: expect.any(String),
  };

  describe('create', () => {
    it('should create "new article" and return  article', async () => {
      const user = await userController.getUsers(
        undefined, //skip
        '1', //take
        undefined, //cursor
        `{"type":"ADMIN"}`, //where
        undefined, //orderby
      );
      const response = await articleController.createArticle(mockedArticleObj, {
        user: user[0],
      });
      if (!(response instanceof HttpException)) {
        createdArticleId = response.id;
      }
      expect(response).toStrictEqual({
        ...mockedArticleObj,
        id: expect.any(String),
        date: expect.any(Date),
      });
    });
  });

  describe('get:id', () => {
    it('should return "article"', async () => {
      const response = await articleController.getArticle(createdArticleId);
      expect(response).toStrictEqual(mockedArticleResponse);
    });
  });

  describe('getArticles', () => {
    it('should return "[article]"', async () => {
      const response = await articleController.getArticles(
        undefined, //skip
        '1', //take
        undefined, //cursor
        `{"id":"${createdArticleId}"}`, //where
        undefined, //orderby
      );
      expect(response).toStrictEqual([mockedArticleResponse]);
    });
  });

  describe('update', () => {
    it('should update "new article" and return  article', async () => {
      const user = await userController.getUsers(
        undefined, //skip
        '1', //take
        undefined, //cursor
        `{"type":"ADMIN"}`, //where
        undefined, //orderby
      );
      const updateTitle = mockedArticleObj;
      updateTitle.title = 'this is the new title';
      const response = await articleController.createArticle(updateTitle, {
        user: user[0],
      });
      if (!(response instanceof HttpException)) {
        createdArticleId = response.id;
      }
      expect(response).toStrictEqual({
        ...updateTitle,
        id: expect.any(String),
        date: expect.any(Date),
      });
    });
  });

  describe('delete', () => {
    it('should delete "created article"', async () => {
      const response = await articleController.deleteArticle(createdArticleId);
      expect(response).toBe('Article succesfully deleted!');
    });
  });
});
