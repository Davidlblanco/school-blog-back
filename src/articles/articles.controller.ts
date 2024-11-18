import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Article } from '@prisma/client';

import { AuthGuard } from '../auth/auth.guard';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './CreateArticlesDto';
import { Roles } from '../lib/roles';

@Controller('/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticlesService) {}

  private throwExeption(e: any) {
    throw new HttpException(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: e.meta ? e.meta : e,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  async getArticle(@Param('id') id: string): Promise<Article | HttpException> {
    try {
      const article = await this.articleService.article({
        id,
      });

      return article;
    } catch (e) {
      this.throwExeption(e);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  async getArticles(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,

    @Query('rows') rows?: boolean,
  ): Promise<Partial<Article>[] | HttpException> {
    try {
      const params = {
        skip: skip ? parseInt(skip) : undefined,
        take: take ? parseInt(take) : undefined,
        cursor: cursor ? JSON.parse(cursor) : undefined,
        where: where ? JSON.parse(where) : undefined,
        orderBy: orderBy ? JSON.parse(orderBy) : undefined,
        rows,
      };
      const articles = await this.articleService.articles(params);

      return articles;
    } catch (e) {
      this.throwExeption(e);
    }
  }
  @Get('Rows')
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  async getArticleRows(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
  ): Promise<Partial<Article>[] | HttpException> {
    try {
      const params = {
        skip: skip ? parseInt(skip) : undefined,
        take: take ? parseInt(take) : undefined,
        cursor: cursor ? JSON.parse(cursor) : undefined,
        where: where ? JSON.parse(where) : undefined,
        orderBy: orderBy ? JSON.parse(orderBy) : undefined,
      };
      const articles = await this.articleService.articles(params);

      return articles;
    } catch (e) {
      this.throwExeption(e);
    }
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'TEACHER')
  async deleteArticle(
    @Param('id') id: string,
  ): Promise<string | HttpException> {
    try {
      await this.articleService.deleteArticle({ id });
      return 'Article succesfully deleted!';
    } catch (e) {
      this.throwExeption(e);
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'TEACHER')
  async createArticle(
    @Body()
    body: CreateArticleDto,
    @Request() req: any,
  ): Promise<Article | HttpException> {
    try {
      const user = req.user;
      body.creator_id = user.id;

      const create = await this.articleService.createArticle(body);

      return create;
    } catch (e) {
      this.throwExeption(e);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'TEACHER')
  async updateArticle(
    @Param('id') id: string,
    @Body()
    body: Partial<CreateArticleDto>,
    @Request() req: any,
  ): Promise<Article | HttpException> {
    try {
      const user = req.user;
      body.creator_id = user.id;
      const updatedArticle = await this.articleService.updateArticle({
        where: { id },
        data: body,
      });
      return updatedArticle;
    } catch (e) {
      this.throwExeption(e);
    }
  }
}
