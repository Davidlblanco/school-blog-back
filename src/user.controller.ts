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
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './CreateUserDto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private passwordBuffer(password: string) {
    const encoder = new TextEncoder();
    const passwordUint8Array = encoder.encode(password);
    const passwordBuffer = Buffer.from(passwordUint8Array);
    return passwordBuffer;
  }

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
  async deleteUser(@Param('id') id: string): Promise<string | HttpException> {
    try {
      await this.userService.deleteUser({ id });
      return 'User succesfully deleted!';
    } catch (e) {
      this.throwExeption(e);
    }
  }

  @Post()
  async createUser(
    @Body()
    body: CreateUserDto,
  ): Promise<Partial<User> | HttpException> {
    try {
      const passwordBuffer = this.passwordBuffer(body.password);
      const create = await this.userService.createUser({
        ...body,
        password: passwordBuffer,
      });
      return { id: create.id, name: create.name };
    } catch (e) {
      this.throwExeption(e);
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    body: Partial<CreateUserDto>,
  ): Promise<Partial<User> | HttpException> {
    try {
      const passwordBuffer = this.passwordBuffer(body.password);
      const updatedUser = await this.userService.updateUser({
        where: { id },
        data: { ...body, password: passwordBuffer },
      });
      return { id: updatedUser.id, name: updatedUser.name };
    } catch (e) {
      this.throwExeption(e);
    }
  }
}
