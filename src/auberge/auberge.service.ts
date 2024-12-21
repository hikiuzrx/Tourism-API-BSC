import { ConflictException, Injectable, NotFoundException, UnauthorizedException, Logger, BadRequestException } from '@nestjs/common';
import { Auberge, Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import * as bcrypt from 'bcrypt';

const logger = new Logger('AubergeService');

@Injectable()
export class AubergeService {
  constructor(private readonly dbService: DbService) {}

  // Create Auberge with unique name and aubergeId check
  async create(data: Prisma.AubergeCreateInput): Promise<Auberge> {
     const existingAuberge: Auberge = await this.dbService.auberge.findUnique({
       where: {
         name: data.name,
       },
     });
   
     if (existingAuberge) {
       throw new ConflictException('Auberge with this name already exists');
     }
   
     // Log the creation attempt
     logger.log(`Creating Auberge with name: ${data.name}`);
   
     return this.dbService.auberge.create({
       data: {
         name: data.name,
         password: data.password,
         limit: data.limit,
         adress: data.adress,
         email: data.email,
         // Do not provide `aubergeId` here; it will be auto-generated
       },
     });
   }
   
   
   
  // Modify Auberge details
  async modifyauberge(id: number, updateData: [string, string | number]): Promise<Auberge> {
    switch (updateData[0]) {
      case 'name':
        const existingAuberge = await this.dbService.auberge.findUnique({
          where: { name: updateData[1] as string },
        });
        if (existingAuberge) {
          throw new ConflictException('This Auberge name is already in use');
        }

        // Log the update attempt
        logger.log(`Updating Auberge ID ${id} name to: ${updateData[1]}`);

        return await this.dbService.auberge.update({
          data: { name: updateData[1] as string },
          where: { aubergeId: id },
        });

      case 'limit':
        if (isNaN(Number(updateData[1])) || Number(updateData[1]) <= 0) {
          throw new ConflictException('Limit must be a positive number');
        }

        // Log the update attempt
        logger.log(`Updating Auberge ID ${id} limit to: ${updateData[1]}`);

        return await this.dbService.auberge.update({
          data: { limit: Number(updateData[1]) },
          where: { aubergeId: id },
        });

      case 'adress':
        // Log the update attempt
        logger.log(`Updating Auberge ID ${id} address to: ${updateData[1]}`);

        return await this.dbService.auberge.update({
          data: { adress: updateData[1] as string },
          where: { aubergeId: id },
        });

      case 'password':
        if (typeof updateData[1] === 'string' && updateData[1].length < 6) {
          throw new ConflictException('Password must be at least 6 characters long');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(updateData[1] as string, salt);

        // Log the update attempt
        logger.log(`Updating Auberge ID ${id} password`);

        return await this.dbService.auberge.update({
          data: { password: hashedPassword },
          where: { aubergeId: id },
        });

      default:
        throw new ConflictException('Invalid update field');
    }
  }

  // Delete Auberge with password confirmation
  async deleteAuberge(id: number,password:string): Promise<void> {
     const auberge = await this.dbService.auberge.findUnique({
       where: { aubergeId: id },
     });
   
     if (!auberge) {
       throw new NotFoundException(`Auberge with ID ${id} not found`);
     }
   
     console.log('Password:', password); // Log input password
     console.log('Hash:', auberge.password); // Log stored hash
   
     if (!auberge.password) {
       throw new ConflictException('Auberge does not have a password set');
     }
   
     if (!password) {
       throw new BadRequestException('Password is required');
     } 
   
      const isMatch = await bcrypt.compare(password, auberge.password);
     if (!isMatch) {
       throw new UnauthorizedException('Invalid password');
     }
    
     await this.dbService.auberge.delete({
       where: { aubergeId:id },
     });
   }
   
  // Get Auberge by ID
  async getAubergeById(id: number): Promise<Auberge> {
    const auberge = await this.dbService.auberge.findUnique({
      where: { aubergeId: id },
    });

    if (!auberge) {
      throw new NotFoundException('There is no Auberge account with the provided ID');
    }

    return auberge;
  }

  // Get Auberge by name
  async getAubergeByName(name: string): Promise<Auberge> {
    const auberge = await this.dbService.auberge.findUnique({
      where: { name },
    });

    if (!auberge) {
      throw new NotFoundException('There is no Auberge account with the provided name');
    }

    return auberge;
  }

  // Retrieve multiple Auberges
  async getMany(): Promise<Auberge[]> {
    return await this.dbService.auberge.findMany();
  }

  // Retrieve Auberge by email
  retrieveUserByEmail(email: string): Promise<Auberge> {
    return this.dbService.auberge.findFirst({
      where: {
        email,
      },
    });
  }

  // Compare password for authentication
  async comparePassword(auberge:Auberge, hashedPassword: string): Promise<boolean> {
     if (!auberge || !hashedPassword) {
       throw new Error('Password or hash not provided');
     }
   
     return bcrypt.compare(auberge.password, hashedPassword); // bcrypt.compare should work
   }
}
