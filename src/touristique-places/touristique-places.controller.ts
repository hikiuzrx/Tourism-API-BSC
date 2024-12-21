import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  BadRequestException,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { CreateTouristiquePlaceDto } from './dto/create-touristique-place.dto';
import { TouristiquePlaceService } from './touristique-places.service';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Touristique Places')
@Controller('touristique-places')
export class TouristiquePlaceController {
  constructor(private readonly touristiquePlaceService: TouristiquePlaceService) {}

  // Create a new TouristiquePlace
  @Post()
  @ApiOperation({ summary: 'Create a new Touristique Place' })
  @ApiResponse({ status: 201, description: 'Touristique Place successfully created.' })
  @ApiResponse({ status: 400, description: 'Failed to create Touristique Place.' })
  @ApiBody({
    description: 'Data to create a Touristique Place',
    type: CreateTouristiquePlaceDto,
  })
  async create(
    @Res() res: Response,
    @Body() createTouristiquePlaceDto: Prisma.TouristiquePlacesCreateInput,
  ) {
    try {
      const newPlace = await this.touristiquePlaceService.create(createTouristiquePlaceDto);
      res.status(201).json({ newPlace });
    } catch (error) {
      throw new BadRequestException('Failed to create Touristique Place');
    }
  }

  // Get a specific TouristiquePlace by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a Touristique Place by ID' })
  @ApiResponse({ status: 200, description: 'Touristique Place retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Touristique Place not found.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the Touristique Place' })
  async findOne(@Res() res: Response, @Param('id') id: number) {
    try {
      const place = await this.touristiquePlaceService.findOne(id);
      res.json({ place });
    } catch (error) {
      throw new NotFoundException('Touristique Place not found');
    }
  }

  // Update an existing TouristiquePlace by ID
  @Patch(':id')
  @ApiOperation({ summary: 'Update a Touristique Place by ID' })
  @ApiResponse({ status: 200, description: 'Touristique Place updated successfully.' })
  @ApiResponse({ status: 400, description: 'Failed to update Touristique Place.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the Touristique Place' })
  @ApiBody({
    description: 'An array of [field, value] pairs to update the Touristique Place',
    schema: {
      type: 'array',
      items: { type: 'string' },
      example: ['name', 'Updated Place Name'],
    },
  })
  async update(
    @Param('id') id: number,
    @Body() updateData: [string, string],
  ) {
    try {
      return await this.touristiquePlaceService.update(id, updateData);
    } catch (error) {
      throw new BadRequestException('Unable to update Touristique Place');
    }
  }

  // Delete a TouristiquePlace by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Touristique Place by ID' })
  @ApiResponse({ status: 200, description: 'Touristique Place deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Touristique Place not found.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the Touristique Place' })
  async remove(@Param('id') id: number): Promise<{ message: string; id: number }> {
    try {
      await this.touristiquePlaceService.remove(id);
      return { message: 'Touristique Place deleted successfully', id };
    } catch (error) {
      throw new NotFoundException('Unable to delete Touristique Place');
    }
  }

  // Get all Touristique Places
  @Get()
  @ApiOperation({ summary: 'Get all Touristique Places' })
  @ApiResponse({ status: 200, description: 'Touristique Places retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Failed to fetch Touristique Places.' })
  async findAll(@Res() res: Response) {
    try {
      const allPlaces = await this.touristiquePlaceService.findAll();
      res.json({ allPlaces });
    } catch (error) {
      throw new NotFoundException('Failed to fetch Touristique Places');
    }
  }
}
