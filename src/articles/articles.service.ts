import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Article } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async article(
    articleWhereUniqueInput: Prisma.ArticleWhereUniqueInput,
  ): Promise<Article | null> {
    return this.prisma.article.findUnique({
      where: articleWhereUniqueInput,
    });
  }

  async articles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ArticleWhereUniqueInput;
    where?: Prisma.ArticleWhereInput;
    orderBy?: Prisma.ArticleOrderByWithRelationInput;
  }): Promise<Article[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.article.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createArticle(data: Prisma.ArticleCreateInput): Promise<Article> {
    return this.prisma.article.create({
      data,
    });
  }

  async updateArticle(params: {
    where: Prisma.ArticleWhereUniqueInput;
    data: Prisma.ArticleUpdateInput;
  }): Promise<Article> {
    const { where, data } = params;
    return this.prisma.article.update({
      data,
      where,
    });
  }

  async deleteArticle(where: Prisma.ArticleWhereUniqueInput): Promise<Article> {
    return this.prisma.article.delete({
      where,
    });
  }
}
