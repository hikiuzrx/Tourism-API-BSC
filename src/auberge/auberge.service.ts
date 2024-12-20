import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Auberge, Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import bcrypt from 'bcrypt'

@Injectable()
export class AubergeService {
     constructor(private readonly dbService:DbService ){}
     async create(data: Prisma.AubergeCreateInput):Promise<Auberge> {
          const auberge:Auberge|null = await this.dbService.auberge.findUnique({
               where:{
                    name:data.name
               }
          })
          if(!auberge){
               return this.dbService.auberge.create({
                    data,
               });
          }else{
               throw new ConflictException("auberge with this name already exists ")
          }

     }
     async modifyauberge(id:number,updateData:[string,string]){
          switch(updateData[0]){
               case 'name':
                    const exisitingAuberge = await this.dbService.auberge.findUnique({
                         where: {name:updateData[1]}
                    })
                    if(exisitingAuberge){
                       throw new ConflictException('this Auberge name is already in use')  
                    }else{
                         return await this.dbService.auberge.update({data:{name:updateData[1]},where:{aubergeId:id}})
                    }
                    break;

               case 'limit':
                    return await this.dbService.auberge.update({data:updateData[1],where:{aubergeId:id}})
                    break;
               case 'adress':
                    return await this.dbService.auberge.update({data:{adress:updateData[1]},where:{aubergeId:id}}) 
                    break;
               case 'password':
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(updateData[1],salt)
                    return await this.dbService.auberge.update({data:{password:hashedPassword},where:{aubergeId:id}})          
          }
     }
     async deleteAuberge(id:number,password:string){
          const auberge:Auberge = await this.dbService.auberge.findUnique({where:{aubergeId:id}})
          const confirmation = await bcrypt.compare(password,auberge.password)
          if(confirmation){
               await this.dbService.auberge.delete({where:{aubergeId:id}})
               return {sucess:true,message:'auberge account deleted sucessfully'}
          }else{
               throw new UnauthorizedException("wrong password you aren't authorized to delete this account")
          }
     }
     async getAubergeById(id:number):Promise<Auberge>{
          const auberge:Auberge = await this.dbService.auberge.findUnique({where:{aubergeId:id}})
          if(!auberge){
               throw new NotFoundException('there is no Auberge Account with the provided id')
          }
          return auberge
     }
     async getAubergeByName(name:string):Promise<Auberge>{
          const auberge:Auberge = await this.dbService.auberge.findUnique({where:{name}})
          if(!auberge){
               throw new NotFoundException('there is no Auberge Account with the provided name')
          }
          return auberge
     }
     async getMany(){
          return await this.dbService.auberge.findMany()
     }
     async validateReservation(){}
}
