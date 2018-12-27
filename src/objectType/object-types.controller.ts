import { Controller, UseGuards, HttpStatus, Post, Body, Res, Get, Query, Param, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectTypesService } from './object-types.service';
import { ObjectTypeInsertDTO } from '../models/objectType/object-type-insert.dto';
import { ObjectTypeAlterDTO } from '../models/objectType/object-type-alter.dto';

@Controller('object_types')
export class ObjectTypesController {

  constructor(
    private readonly objectTypesService: ObjectTypesService,

  ) { }

  @Get()
  @UseGuards(AuthGuard())
  async getAll(@Res() response): Promise<string> {

    try {
      const foundObjectTypes = await this.objectTypesService.getObjectTypes();
      return response.status(HttpStatus.OK).json({ message: 'Successfully find all object types.', data: foundObjectTypes });

    } catch (error) {
      error.message = 'Unsuccessfully try to find the object types.';
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }

  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getById(@Param('id') id: string, @Res() response): Promise<string> {

    try {
      const foundObjectType = await this.objectTypesService.getObjectTypeById(+id);
      return response.status(HttpStatus.OK).json({ message: 'Successfully find object type.', data: foundObjectType });

    } catch (error) {
      error.message = 'Unsuccessfully try to find object type.';
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }

  }

  @Post()
  @UseGuards(AuthGuard())
  async insertObjectType(@Body() objectType: ObjectTypeInsertDTO, @Res() response): Promise<string> {

    try {
      const insertedObjectType = await this.objectTypesService.insertObjectType(objectType);
      return response.status(HttpStatus.CREATED).json({ message: 'Successfully inserted.', data: insertedObjectType});

    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }

  }

  @Put()
  @UseGuards(AuthGuard())
  async alterObjectType(@Body() objectType: ObjectTypeAlterDTO, @Res() response): Promise<string> {

    try {
      const alteredObjectType = await this.objectTypesService.alterObjectType(objectType);
      return response.status(HttpStatus.OK).json({ message: 'Successfully changed.', data: alteredObjectType });

    } catch (error) {
      error.message = 'Incorrect data input.';
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }

  }
}
