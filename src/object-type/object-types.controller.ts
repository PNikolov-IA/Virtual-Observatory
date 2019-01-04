import {
  Controller, UseGuards, HttpStatus, Post, Body, Get, Param, Put, ParseIntPipe, HttpCode, NotFoundException, ConflictException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectTypesService } from './object-types.service';
import { ObjectTypeInsertDTO } from '../models/objectType/object-type-insert.dto';
import { ObjectTypeAlterDTO } from '../models/objectType/object-type-alter.dto';
import { ObjectType } from 'src/data/entities/object-type.entity';

@Controller('object-types')
export class ObjectTypesController {
  constructor(
    private readonly objectTypesService: ObjectTypesService,
  ) { }

  @Get()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<ObjectType[]> {
    return await this.objectTypesService.getObjectTypes();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', new ParseIntPipe()) id: number): Promise<ObjectType> {
    try {
      return await this.objectTypesService.getObjectTypeById(id);
    } catch (error) {
      throw new NotFoundException('No such object type.');
    }
  }

  @Post()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  async insertObjectType(@Body() objectType: ObjectTypeInsertDTO): Promise<ObjectType> {
    try {
      return await this.objectTypesService.insertObjectType(objectType);
    } catch (error) {
      throw new ConflictException('The object type already exist.');
    }
  }

  @Put()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async alterObjectType(@Body() objectType: ObjectTypeAlterDTO): Promise<ObjectType> {
    try {
      return await this.objectTypesService.alterObjectType(objectType);
    } catch (error) {
      throw new NotFoundException('No such object type.');
    }
  }
}
