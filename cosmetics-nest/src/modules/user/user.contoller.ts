import { Injectable, Body, Controller, Get, Post, Param } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/user';

@Injectable()
@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async getCategories() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async getCategory(@Param('id') id: string) {
    return await this.userService.findById(+id);
  }

  @Post('/')
  async createCategory(@Body() category: Partial<User>) {
    return await this.userService.create(category);
  }
}
