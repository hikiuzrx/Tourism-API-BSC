import { Controller, Post, Body, Get, Param, Put, Delete, BadRequestException, ConflictException, Patch, NotFoundException, Res } from '@nestjs/common';
import { CreateTouristiquePlaceDto } from './dto/create-touristique-place.dto';
import { TouristiquePlaceService } from './touristique-places.service';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Controller('touristique-places')
export class TouristiquePlaceController {
  constructor(private readonly touristiquePlaceService: TouristiquePlaceService) {}

  // Create a new TouristiquePlace
  @Post()
  async create( @Res() res:Response,@Body() createTouristiquePlaceDto: Prisma.TouristiquePlacesCreateInput) {
    try {
      // Call the create method from the service to create a new place
      const newPlace = await this.touristiquePlaceService.create(createTouristiquePlaceDto);

      // Return the created TouristiquePlace response
      res.json({newPlace});
    } catch (error) {
      // Handle any error that occurs during the creation
      throw new BadRequestException('Failed to create TouristiquePlace');
    }
  }

  // Get a specific TouristiquePlace by ID
  @Get(':id')
  async findOne(
    @Res() res:Response,
    @Param('id') id: number) {
    try {
      // Call the findOne service method to get the place by ID
      const place = await this.touristiquePlaceService.findOne(id);
      res.json({place});
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // If the error is a NotFoundException, re-throw it
      }
      throw new NotFoundException('TouristiquePlace not found'); // Generic error message
    }
  }
  // Update an existing TouristiquePlace by ID
  @Patch(':id')
  async update(
    @Param('id') id: number, // Get the ID of the TouristiquePlace from the route
    @Body() updateData: [string, string], // Expect the updateData as an array (field name and value)
  ) {
    try {
      // Call the update service
      const updatedTouristiquePlace = await this.touristiquePlaceService.update(id, updateData);
      return updatedTouristiquePlace;
    } catch (error) {
      if (error instanceof ConflictException || error instanceof BadRequestException) {
        throw error; // If the error is already a ConflictException or BadRequestException, re-throw it
      }
      throw new BadRequestException('Unable to update TouristiquePlace'); // Generic error message
    }
  }

  // Delete a TouristiquePlace by ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      // Call the remove service
      await this.touristiquePlaceService.remove(id);
      return;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // If the error is a NotFoundException, re-throw it
      }
      throw new NotFoundException('Unable to delete TouristiquePlace'); // Generic error message
    }
  }
  @Get()
  async findAll(@Res() res:Response) {
    try {
      // Call the findAll method from the service to retrieve all places
      const allPlaces = await this.touristiquePlaceService.findAll();
      
      // Return the list of TouristiquePlaces
      res.json({allPlaces});
    } catch (error) {
      // Handle any error that occurs while fetching the places
      throw new NotFoundException('Failed to fetch TouristiquePlaces');
    }
  }
}
