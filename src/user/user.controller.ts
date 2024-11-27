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
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './CreateUserDto';
import { passwordBuffer } from '../lib/paswordBuffer';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../lib/roles';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  @Roles('ADMIN')
  async getUser(
    @Param('id') id: string,
  ): Promise<Partial<User> | HttpException> {
    try {
      const user = await this.userService.user({
        id,
      });
      delete user.password;
      return user;
    } catch (e) {
      this.throwExeption(e);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  async getUsers(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
  ): Promise<User[] | HttpException> {
    try {
      const params = {
        skip: skip ? parseInt(skip) : undefined,
        take: take ? parseInt(take) : undefined,
        cursor: cursor ? JSON.parse(cursor) : undefined,
        where: where ? JSON.parse(where) : undefined,
        orderBy: orderBy ? JSON.parse(orderBy) : undefined,
      };
      const users = await this.userService.users(params);
      users.forEach((user) => delete user.password);
      return users;
    } catch (e) {
      this.throwExeption(e);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  async deleteUser(@Param('id') id: string): Promise<string | HttpException> {
    try {
      await this.userService.deleteUser({ id });
      return 'User succesfully deleted!';
    } catch (e) {
      this.throwExeption(e);
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  async createUser(
    @Body()
    body: CreateUserDto,
  ): Promise<Partial<User> | HttpException> {
    try {
      const passWordBuffer = passwordBuffer(body.password);
      const create = await this.userService.createUser({
        ...body,
        password: passWordBuffer,
      });
      return { id: create.id, name: create.name };
    } catch (e) {
      this.throwExeption(e);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  async updateUser(
    @Param('id') id: string,
    @Body()
    body: Partial<CreateUserDto>,
    @Request() req: any,
  ): Promise<Partial<User> | HttpException> {
    const user = req.user;
    if (user.role !== 'ADMIN' && user.id !== id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    try {
      if (user.role !== 'ADMIN' && user.id === id) {
        delete body.type;
        delete body.active;
      }
      const passWordBuffer = passwordBuffer(body.password);
      const updatedUser = await this.userService.updateUser({
        where: { id },
        data: { ...body, password: passWordBuffer },
      });
      return { id: updatedUser.id, name: updatedUser.name };
    } catch (e) {
      this.throwExeption(e);
    }
  }
}
