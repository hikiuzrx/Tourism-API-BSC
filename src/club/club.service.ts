import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma,Club } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import bcrypt from 'bcrypt'

@Injectable()
export class ClubService {
      constructor(private readonly dbService:DbService ){}
          async create(data: Prisma.ClubCreateInput):Promise<Club> {
               const club:Club|null = await this.dbService.club.findUnique({
                    where:{
                         clubName:data.clubName
                    }
               })
               if(!club){
                    return await this.dbService.club.create({
                         data,
                    });
               }else{
                    throw new ConflictException("club with this name already exists ")
               }
     
          }
          async modifyClub(id:number,updateData:[string,string]){
               switch(updateData[0]){
                    case 'clubName':
                         const exisitingClub = await this.dbService.club.findUnique({
                              where: {clubName:updateData[1]}
                         })
                         if(exisitingClub){
                            throw new ConflictException('this Club name is already in use')  
                         }else{
                              return await this.dbService.club.update({data:{clubName:updateData[1]},where:{clubId:id}})
                         }
                         break;
                    case 'clubAdress':
                         return await this.dbService.club.update({data:{clubAdress:updateData[1]},where:{clubId:id}}) 
                         break;
                    case 'password':
                         const salt = await bcrypt.genSalt(10)
                         const hashedPassword = await bcrypt.hash(updateData[1],salt)
                         return await this.dbService.club.update({data:{password:hashedPassword},where:{clubId:id}})          
               }
          }
          async deleteClub(id:number,password:string){
               const club:Club = await this.dbService.club.findUnique({where:{clubId:id}})
               const confirmation = await bcrypt.compare(password,club.password)
               if(confirmation){
                    await this.dbService.club.delete({where:{clubId:id}})
                    return {sucess:true,message:'club account deleted sucessfully'}
               }else{
                    throw new UnauthorizedException("wrong password you aren't authorized to delete this account")
               }
          }
          async getClubById(id:number):Promise<Club>{
               const club:Club = await this.dbService.club.findUnique({where:{clubId:id}})
               if(!club){
                    throw new NotFoundException('there is no club Account with the provided id')
               }
               return club
          }
          async getClubByName(name:string):Promise<Club>{
               const club:Club = await this.dbService.club.findUnique({where:{clubName:name}})
               if(!club){
                    throw new NotFoundException('there is no Club Account with the provided name')
               }
               return club
          }
          async getMany(){
               return await this.dbService.club.findMany()
          }
          async validateReservation(){}
}
