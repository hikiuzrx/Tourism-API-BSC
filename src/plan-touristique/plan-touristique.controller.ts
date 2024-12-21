import {
     Controller,
     Get,
     Post,
     Patch,
     Delete,
     Param,
     Body,
     ParseIntPipe,
     Res,
     HttpStatus,
     BadRequestException,
     ConflictException,
     NotFoundException,
   } from '@nestjs/common';
   import { Response } from 'express';
   import { TourismPlanService } from './plan-touristique.service';
   import { CreateTourismPlanDto } from './plan-touristique.dto';
   
   @Controller('tourism-plans')
   export class TourismPlanController {
     constructor(private readonly tourismPlanService: TourismPlanService) {}
   
     @Get()
     async findAll(@Res() res: Response) {
       try {
         const plans = await this.tourismPlanService.findAll();
         return res
           .status(HttpStatus.OK)
           .json({ success: true, message: 'Tourism plans retrieved successfully', data: plans });
       } catch (error) {
         return res
           .status(HttpStatus.INTERNAL_SERVER_ERROR)
           .json({ success: false, message: error.message });
       }
     }
   
     @Get(':id')
     async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
       try {
         const plan = await this.tourismPlanService.findOne(id);
         return res
           .status(HttpStatus.OK)
           .json({ success: true, message: 'Tourism plan retrieved successfully', data: plan });
       } catch (error) {
         return res
           .status(HttpStatus.NOT_FOUND)
           .json({ success: false, message: error.message });
       }
     }
   
     @Post()
     async create(@Body() createDto: CreateTourismPlanDto, @Res() res: Response) {
       try {
         const plan = await this.tourismPlanService.create(createDto);
         return res
           .status(HttpStatus.CREATED)
           .json({ success: true, message: 'Tourism plan created successfully', data: plan });
       } catch (error) {
         return res
           .status(HttpStatus.BAD_REQUEST)
           .json({ success: false, message: error.message });
       }
     }
   
     @Patch(':id')
     async update(
       @Param('id', ParseIntPipe) id: number,
       @Body('updateData') updateData: [string, string],
       @Res() res: Response,
     ) {
       try {
         if (!Array.isArray(updateData) || updateData.length !== 2) {
           throw new Error('Invalid update data format. Must be a tuple of [field, value].');
         }
   
         const updatedPlan = await this.tourismPlanService.updateTourismPlan(id, updateData);
         return res
           .status(HttpStatus.OK)
           .json({ success: true, message: 'Tourism plan updated successfully', data: updatedPlan });
       } catch (error) {
         const status =
           error instanceof NotFoundException
             ? HttpStatus.NOT_FOUND
             : error instanceof ConflictException || error instanceof BadRequestException
             ? HttpStatus.BAD_REQUEST
             : HttpStatus.INTERNAL_SERVER_ERROR;
   
         return res.status(status).json({ success: false, message: error.message });
       }
     }
   
     @Delete(':id')
     async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
       try {
         const deletedPlan = await this.tourismPlanService.remove(id);
         return res
           .status(HttpStatus.OK)
           .json({ success: true, message: 'Tourism plan deleted successfully', data: deletedPlan });
       } catch (error) {
         return res
           .status(HttpStatus.NOT_FOUND)
           .json({ success: false, message: error.message });
       }
     }
   }
   