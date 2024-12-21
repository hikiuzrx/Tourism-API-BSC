import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AgenceService } from './agence.service';
import { CreateAgenceDto } from './dto/create-agence.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Agence') // Group endpoints under the 'Agence' tag
@Controller('agence')
export class AgenceController {
  constructor(private readonly agenceService: AgenceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Agence' })
  @ApiResponse({ status: 201, description: 'Agence created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createAgenceDto: CreateAgenceDto) {
    return await this.agenceService.create(createAgenceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Agences' })
  @ApiResponse({ status: 200, description: 'Returns a list of all Agences.' })
  async findAll() {
    return this.agenceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Agence by ID' })
  @ApiResponse({ status: 200, description: 'Returns the Agence details.' })
  @ApiResponse({ status: 404, description: 'Agence not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the Agence', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.agenceService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Agence by ID' })
  @ApiResponse({ status: 200, description: 'Agence updated successfully.' })
  @ApiResponse({ status: 404, description: 'Agence not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the Agence', type: Number })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAgenceDto: [string, string]) {
    return this.agenceService.update(updateAgenceDto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Agence by ID' })
  @ApiResponse({ status: 200, description: 'Agence deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Agence not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the Agence', type: Number })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.agenceService.remove(id);
  }
}
