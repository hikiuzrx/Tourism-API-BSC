import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by a provided ID' })
  @ApiResponse({ status: 200, description: 'Return user by ID' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the user' })
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user: User = await this.userService.retrieveUserById(id);
    if (!user) {
      throw new NotFoundException('There is no user with this ID');
    }
    return user;
  }

  @Patch(':id')
  @ApiOperation({ summary: "Modify a given user's data (identifiable by their ID)" })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the user' })
  @ApiBody({
    description: 'An array of [field, value] pairs to update the user',
    schema: {
      type: 'array',
      items: { type: 'string' },
      example: ['email', 'newemail@example.com'],
    },
  })
  async modifyUserData(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: [string, string],
  ): Promise<User> {
    const updatedUser = await this.userService.UpdateUser(id, updateData);
    if (!updatedUser) {
      throw new NotFoundException('User not found or update failed');
    }
    return updatedUser;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user (identifiable by their ID)' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the user' })
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; id: number }> {
    const result = await this.userService.deleteUser(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully', id };
  }
}
