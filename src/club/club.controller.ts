import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClubService } from './club.service';
import { Club } from '@prisma/client';

@Controller('club')
@ApiTags('Club') // Swagger Tag for API grouping
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  // Retrieve a club by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a club by its ID' })
  @ApiResponse({ status: 200, description: 'Club retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Club not found.' })
  async getClub(@Param('id', ParseIntPipe) id: number) {
    try {
      const club: Club = await this.clubService.getClubById(id);
      if (!club) {
        throw new NotFoundException(`Club with ID ${id} not found.`);
      }
      return { success: true, data: club };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve club',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Update club information
  @Patch(':id')
  @ApiOperation({ summary: 'Update a club by its ID' })
  @ApiResponse({ status: 200, description: 'Club updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid update data format.' })
  @ApiResponse({ status: 404, description: 'Club not found.' })
  async updateClub(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: [string, string],
  ) {
    try {
      if (!Array.isArray(updateData) || updateData.length !== 2) {
        throw new HttpException(
          'Invalid update data format. Must be a tuple of [field, value].',
          HttpStatus.BAD_REQUEST,
        );
      }
      const updatedClub: Club = await this.clubService.modifyClub(id, updateData);
      return { success: true, data: updatedClub };
    } catch (error) {
      const status =
        error instanceof NotFoundException
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST;
      throw new HttpException(
        error.message || 'Failed to update club',
        status,
      );
    }
  }

  // Delete a club by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a club by its ID' })
  @ApiResponse({ status: 200, description: 'Club deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid password.' })
  @ApiResponse({ status: 404, description: 'Club not found.' })
  async deleteClub(
    @Param('id', ParseIntPipe) id: number,
    @Body('password') password: string,
  ) {
    try {
      const result = await this.clubService.deleteClub(id, password);
      if (!result) {
        throw new HttpException('Invalid password or club not found.', HttpStatus.BAD_REQUEST);
      }
      return { success: true, message: 'Club deleted successfully' };
    } catch (error) {
      const status =
        error instanceof NotFoundException
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST;
      throw new HttpException(
        error.message || 'Failed to delete club',
        status,
      );
    }
  }
}
