import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserDto } from '@/shared/generated/prisma/types/user.dto';
import { UpdateUserDto } from '@/shared/dto/users';

import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
  * Get all users
  */
  @Get()
  @ApiOkResponse({type: [UserDto], description: 'List of users'})
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  /**
  * Get a user
  */
  @Get(':id')
  @ApiOkResponse({type: UserDto, description: 'Single user'})
  getUser(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }

  /**
  * Update a user
  */
  @Patch(':id')
  @ApiOkResponse({type: UserDto, description: 'Updated user'})
  updateUser(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return this.usersService.updateUser(id, data);
  }

  /**
  * Delete a user
  */
  @Delete(':id')
  @ApiOkResponse({type: UserDto, description: 'Deleted user'})
  removeUser(@Param('id') id: number) {
    return this.usersService.removeUser(id);
  }
}
