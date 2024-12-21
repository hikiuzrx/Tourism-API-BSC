import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service'; // Assuming dbService is located here
import { Prisma ,TouristiquePlaces} from '@prisma/client';
import { CreateTouristiquePlaceDto } from './dto/create-touristique-place.dto';

@Injectable()
export class TouristiquePlaceService {
  constructor(private dbService:DbService) {}

  // Create a new TouristiquePlace
  async create(createTouristiquePlaceDto: Prisma.TouristiquePlacesCreateInput) {
    const { title, description, adress, type} = createTouristiquePlaceDto;

    // Create the new TouristiquePlace
    const touristiquePlace = await this.dbService.touristiquePlaces.create({
      data: {
        title,
        description,
        adress,
        type,
      },
    });

    // Return the created TouristiquePlace response
    return {
      id: touristiquePlace.id,
      title: touristiquePlace.title,
      description: touristiquePlace.description,
      adress: touristiquePlace.adress,
      type: touristiquePlace.type,
    };
  }
  async findAll() {
    // Retrieve all TouristiquePlaces from the database
    const allTouristiquePlaces = await this.dbService.touristiquePlaces.findMany();

    // If no places are found, throw a NotFoundException
    if (!allTouristiquePlaces || allTouristiquePlaces.length === 0) {
      throw new NotFoundException('No touristique places found');
    }

    // Return the list of TouristiquePlaces
    return allTouristiquePlaces.map(place => ({
      id: place.id,
      title: place.title,
      description: place.description,
      adress: place.adress,
      type: place.type,
    }));
  }


  // Find a TouristiquePlace by ID
  async findOne(id: number) {
    const touristiquePlace = await this.dbService.touristiquePlaces.findUnique({
      where: { id },
      include: {
        plans: true, // Includes the plans related to this place
      },
    });

    if (!touristiquePlace) {
      throw new NotFoundException(`TouristiquePlace with ID ${id} not found`);
    }

    // Return the found TouristiquePlace
    return {
      id: touristiquePlace.id,
      title: touristiquePlace.title,
      description: touristiquePlace.description,
      adress: touristiquePlace.adress,
      type: touristiquePlace.type,
    };
  }

  // Update a TouristiquePlace by ID
  async update(id: number, updateData: [string, string]): Promise<TouristiquePlaces> {
    let touristiquePlace: TouristiquePlaces;
  
    // Check which field needs to be updated based on updateData
    switch (updateData[0]) {
      case 'title':
        // Check if title is already in use
        touristiquePlace = await this.dbService.touristiquePlaces.findFirst({
          where: {
            title: updateData[1],
          },
        });
        if (touristiquePlace) {
          throw new ConflictException('This title is already in use');
        } else {
          // Proceed to update title
          return this.dbService.touristiquePlaces.update({
            where: {
              id,
            },
            data: {
              title: updateData[1],
            },
          });
        }
  
      case 'description':
        // Update description
        return this.dbService.touristiquePlaces.update({
          where: {
            id,
          },
          data: {
            description: updateData[1],
          },
        });
  
      case 'adress':
        // Update adress
        return this.dbService.touristiquePlaces.update({
          where: {
            id,
          },
          data: {
            adress: updateData[1],
          },
        });
  
      case 'type':
        // Update type
        return this.dbService.touristiquePlaces.update({
          where: {
            id,
          },
          data: {
            type: updateData[1],
          },
        });
  
      default:
        throw new BadRequestException('Invalid field to update');
    }
  }
  

  // Delete a TouristiquePlace by ID
  async remove(id: number): Promise<void> {
    const tourismePlace = await this.dbService.touristiquePlaces.findUnique({
      where: { id },
    });

    if (!tourismePlace) {
      throw new NotFoundException(`TouristiquePlace with ID ${id} not found`);
    }

    // Delete the TouristiquePlace
    await this.dbService.touristiquePlaces.delete({
      where: { id },
    });
  }
}
