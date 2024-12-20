import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, Club } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import bcrypt from 'bcrypt';

@Injectable()
export class ClubService {
  constructor(private readonly dbService: DbService) {}

  async create(data: Prisma.ClubCreateInput): Promise<Club> {
    // Check if a club with the same clubName already exists
    if (!data.clubName) {
     throw new Error("Club name is required");
   }
    const existingClub = await this.dbService.club.findUnique({
      where: {
        clubName: data.clubName,
      },
    });

    if (existingClub) {
      throw new ConflictException('Club with this name already exists');
    }

    // If no existing club, create a new one
    return await this.dbService.club.create({
      data,
    });
  }

  async modifyClub(id: number, updateData: [string, string]) {
    const [field, value] = updateData;

    switch (field) {
      case 'clubName':
        const existingClubByName = await this.dbService.club.findUnique({
          where: { clubName: value },
        });
        if (existingClubByName) {
          throw new ConflictException('This club name is already in use');
        } else {
          return await this.dbService.club.update({
            data: { clubName: value },
            where: { clubId: id },
          });
        }

      case 'clubAdress':
        return await this.dbService.club.update({
          data: { clubAdress: value },
          where: { clubId: id },
        });

      case 'password':
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(value, salt);
        return await this.dbService.club.update({
          data: { password: hashedPassword },
          where: { clubId: id },
        });

      default:
        throw new ConflictException('Invalid field for update');
    }
  }

  async deleteClub(id: number, password: string) {
    // Find club by ID
    const club = await this.dbService.club.findUnique({
      where: { clubId: id },
    });

    if (!club) {
      throw new NotFoundException('Club not found');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, club.password);

    if (isPasswordValid) {
      await this.dbService.club.delete({ where: { clubId: id } });
      return { success: true, message: 'Club account deleted successfully' };
    } else {
      throw new UnauthorizedException('Incorrect password. You are not authorized to delete this account');
    }
  }

  async getClubById(id: number): Promise<Club> {
    const club = await this.dbService.club.findUnique({
      where: { clubId: id },
    });

    if (!club) {
      throw new NotFoundException('No club found with the provided ID');
    }

    return club;
  }

  async getClubByName(name: string): Promise<Club> {
    const club = await this.dbService.club.findUnique({
      where: { clubName: name },
    });

    if (!club) {
      throw new NotFoundException('No club found with the provided name');
    }

    return club;
  }

  async getMany(): Promise<Club[]> {
    return await this.dbService.club.findMany();
  }

  async validateReservation() {
    // Placeholder method - you can implement reservation validation here if needed
  }

  async retrieveUserByEmail(email: string): Promise<Club | null> {
    return this.dbService.club.findFirst({
      where: { email },
    });
  }

  async comparePassword(club: Club, password: string): Promise<boolean> {
    return bcrypt.compare(password, club.password);
  }
}
