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
@Controller('club')
export class ClubController {}
