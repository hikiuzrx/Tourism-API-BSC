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
     NotFoundException,
   } from '@nestjs/common';
   import { Response } from 'express';
   import { TourismPlanService } from './plan-touristique.service';
   import { CreateTourismPlanDto } from './plan-touristique.dto';
   
   @Controller('tourism-plans')
   export class TourismPlanController {
     constructor(private readonly tourismPlanService: TourismPlanService) {}
   
     // Get all tourism plans
     @Get()
     async findAll(@Res() res: Response) {
       try {
         const plans = await this.tourismPlanService.findAll();
         res.status(HttpStatus.OK).json({
           success: true,
           message: 'Tourism plans retrieved successfully',
           data: plans,
         });
       } catch (error) {
         res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
           success: false,
           message: 'Failed to retrieve tourism plans',
         });
       }
     }
   
     // Get a specific tourism plan by ID
     @Get(':id')
     async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
       try {
         const plan = await this.tourismPlanService.findOne(id);
         res.status(HttpStatus.OK).json({
           success: true,
           message: 'Tourism plan retrieved successfully',
           data: plan,
         });
       } catch (error) {
         res.status(HttpStatus.NOT_FOUND).json({
           success: false,
           message: error.message || 'Tourism plan not found',
         });
       }
     }
   
     // Create a new tourism plan
     @Post()
     async create(@Body() createDto: CreateTourismPlanDto, @Res() res: Response) {
       try {
         const plan = await this.tourismPlanService.create(createDto);
         res.status(HttpStatus.CREATED).json({
           success: true,
           message: 'Tourism plan created successfully',
           data: plan,
         });
       } catch (error) {
         res.status(HttpStatus.BAD_REQUEST).json({
           success: false,
           message: error.message || 'Failed to create tourism plan',
         });
       }
     }
   
     // Update an existing tourism plan by ID
     @Patch(':id')
     async update(
       @Param('id', ParseIntPipe) id: number,
       @Body('updateData') updateData: [string, string],
       @Res() res: Response,
     ) {
       try {
         if (!Array.isArray(updateData) || updateData.length !== 2) {
           throw new BadRequestException(
             'Invalid update data format. Must be a tuple of [field, value].',
           );
         }
   
         const updatedPlan = await this.tourismPlanService.updateTourismPlan(
           id,
           updateData,
         );
         res.status(HttpStatus.OK).json({
           success: true,
           message: 'Tourism plan updated successfully',
           data: updatedPlan,
         });
       } catch (error) {
         res.status(
           error instanceof NotFoundException
             ? HttpStatus.NOT_FOUND
             : HttpStatus.BAD_REQUEST,
         ).json({
           success: false,
           message: error.message || 'Failed to update tourism plan',
         });
       }
     }
   
     // Delete a tourism plan by ID
     @Delete(':id')
     async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
       try {
         await this.tourismPlanService.remove(id);
         res.status(HttpStatus.OK).json({
           success: true,
           message: 'Tourism plan deleted successfully',
         });
       } catch (error) {
         res.status(HttpStatus.NOT_FOUND).json({
           success: false,
           message: error.message || 'Tourism plan not found',
         });
       }
     }
   }
   