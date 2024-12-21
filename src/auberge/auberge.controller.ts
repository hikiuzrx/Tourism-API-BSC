import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AubergeService } from './auberge.service';
import { Auberge, Prisma } from '@prisma/client';
import { ReservationActivity,reservationForClub,ReservationAuberge } from '@prisma/client';
import { CreateAubergeDto } from './auberge-dto.dto/auberge-creation.dto';

@Controller('auberge')
export class AubergeController {
     constructor(private readonly aubergeService:AubergeService){}
     @Get(':id')
      async getAuberge(@Param('id', ParseIntPipe) id: number) {
            const auberge:Auberge = await this.aubergeService.getAubergeById(id)
            return auberge;
          }
      @Patch('id')    
      async ModifyUserData(
               @Param('id', ParseIntPipe) id: number,
               @Body() updateData: [string, string],
             ): Promise<Auberge> {
               return this.aubergeService.modifyauberge(id,updateData)
              }
      @Post()
      async CreateAuberge(@Body() aubergeData:CreateAubergeDto){
        const auberge:Auberge = await this.aubergeService.create(aubergeData)
      }
      @Delete(':id')
      async deleteAuberge(
        @Param('id',ParseIntPipe) id:number,
         @Body() password:string ){
          const result = await this.aubergeService.deleteAuberge(id,password)
          return result
        }
              
}
