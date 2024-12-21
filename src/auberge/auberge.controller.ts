import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  NotFoundException, 
  Param, 
  ParseIntPipe, 
  Patch, 
  Post 
} from '@nestjs/common';
import { AubergeService } from './auberge.service';
import { Auberge, Prisma } from '@prisma/client';
import { CreateAubergeDto } from './auberge-dto.dto/auberge-creation.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Auberge') // Groups endpoints under the 'Auberge' tag
@Controller('auberge')
export class AubergeController {
  constructor(private readonly aubergeService: AubergeService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get Auberge by ID' })
  @ApiResponse({ status: 200, description: 'Returns the Auberge details.' })
  @ApiResponse({ status: 404, description: 'Auberge not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the Auberge', type: Number })
  async getAuberge(@Param('id', ParseIntPipe) id: number) {
    const auberge: Auberge = await this.aubergeService.getAubergeById(id);
    if (!auberge) {
      throw new NotFoundException('Auberge not found');
    }
    return auberge;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Auberge data' })
  @ApiResponse({ status: 200, description: 'Auberge updated successfully.' })
  @ApiResponse({ status: 404, description: 'Auberge not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the Auberge', type: Number })
  async modifyUserData(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: [string, string],
  ): Promise<Auberge> {
    return this.aubergeService.modifyauberge(id, updateData);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Auberge' })
  @ApiResponse({ status: 201, description: 'Auberge created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createAuberge(@Body() aubergeData: CreateAubergeDto) {
    const auberge: Auberge = await this.aubergeService.create(aubergeData);
    return auberge;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Auberge by ID' })
  @ApiResponse({ status: 200, description: 'Auberge deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Auberge not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the Auberge', type: Number })
  async deleteAuberge(
    @Param('id', ParseIntPipe) id: number,
    @Body() password: string,
  ) {
    const result = await this.aubergeService.deleteAuberge(id, password);
    return result;
  }
}
