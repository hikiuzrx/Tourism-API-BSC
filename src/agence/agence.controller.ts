import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AgenceService } from './agence.service';
import { CreateAgenceDto } from './dto/create-agence.dto';

@Controller('agence')
export class AgenceController {
  constructor(private readonly agenceService: AgenceService) {}

  @Post()
  async create(@Body() createAgenceDto: CreateAgenceDto) {
    return await this.agenceService.create(createAgenceDto);
  }

  @Get()
  findAll() {
    return this.agenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.agenceService.findById(id);
  }

  @Patch(':id')
  update(@Param('id' ,ParseIntPipe ) id: number, @Body() updateAgenceDto: [string,string]) {
    return this.agenceService.update( updateAgenceDto,id);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.agenceService.remove(id);
  }
}
