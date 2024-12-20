import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Agence, Prisma } from '@prisma/client';


@Injectable()
export class AgenceService {
  constructor(private readonly dbService:DbService){}
  async create(createAgenceDto: Prisma.AgenceCreateInput):Promise<Agence> {
    const existingAgenceName :Agence = await this.dbService.agence.findUnique({where:{agenceName:createAgenceDto.agenceName}})
    if(!existingAgenceName){
      const existingAgenceAdress = await this.dbService.agence.findFirst({where:{agenceAdress:createAgenceDto.agenceAdress}})
      if(!existingAgenceAdress){
        return await this.dbService.agence.create({data:createAgenceDto})
      }else{
        throw new ConflictException('an Agency with this adress')
      }
    }else {
      throw new ConflictException('an agency with this name already exists')
    }
  }

  findAll() {
    return this.dbService.agence.findMany();
  }

  async findByName(name: string) {
    const agence:Agence= await this.dbService.agence.findUnique({where:{agenceName:name}});
    if(!agence){
      throw new NotFoundException('there is no agency with this name')
    }
    return agence
  }
  async findById(id:number){
    const agence:Agence = await this.dbService.agence.findUnique({where:{agenceId:id}})
    if(!agence){
      throw new NotFoundException('there is no agency with the provided id')
    }
    return agence
  }

  async update(updateData:[string,string],id?: number,name?:string,) {
    const agence:Agence =await   this.dbService.agence.findFirst({
      where:{
        OR:[
          {agenceId:id},
          {agenceName:name}
        ]
      }
    })
    if(!agence){
      throw new NotFoundException('there is no agence with the search params provided')
    }
    switch(updateData[0]){
      case 'AgenceName':
          const exisitingAgence:Agence = await this.findByName(updateData[1])
          if(exisitingAgence){
            throw new ConflictException('this agency name already exisits for a user')
          }
          return await this.dbService.agence.update({
            data: { agenceName: updateData[1] },
            where: {
               agenceId: agence.agenceId ,
            },
          });
          
        break;
        case 'agenceAdress':
          return await this.dbService.agence.update({data:{agenceAdress:updateData[1],},where:{agenceId:exisitingAgence.agenceId}})
          break;
        default :
          throw new BadRequestException()
    }
  
  
    }
    

  async remove(id: number) {
    const agence:Agence = await this.dbService.agence.findUnique({where:{agenceId:id}});
    if(!agence){
      throw new NotFoundException('there is no agency with this id ')
    }
    return await this.dbService.agence.delete({where:{agenceId:id}})
  }
}
