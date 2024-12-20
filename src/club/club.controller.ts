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
   import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClubService } from './club.service';
import { Club } from '@prisma/client';
@Controller('club')
export class ClubController {
  constructor(private readonly clubService:ClubService){}
  @Get(':id')
  async getClub(@Param('id', ParseIntPipe) id: number){
    const club:Club = await this.clubService.getClubById(id)
    
  }
  @Patch('id')
  async updateClub(@Param('id',ParseIntPipe)id:number,@Body() updateData:[string,string]){
    const updatedClub:Club = await this.clubService.modifyClub(id,updateData)
  }
  @Delete('id')
  async DeleteClub(@Param('id',ParseIntPipe)id:number,@Body()password:string){
    const result =await  this.clubService.deleteClub(id,password)
  }
}
