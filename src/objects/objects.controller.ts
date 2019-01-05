import {
  Controller, UseGuards, HttpStatus, Post, Body, Get, Param, Put, ParseIntPipe, HttpCode, NotFoundException, ConflictException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectsService } from './objects.service';
import { AstronomicalObject } from 'src/data/entities/object.entity';
import { ObjectInsertDTO } from 'src/models/object/object-insert.dto';

@Controller('objects')
export class ObjectsController {
  constructor(
    private readonly objectsService: ObjectsService,
  ) { }

  @Get()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<AstronomicalObject[]> {
    try {
      return await this.objectsService.getObjects();
    } catch (error) {
      throw new NotFoundException('No object found.');
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', new ParseIntPipe()) id: number): Promise<AstronomicalObject> {
    try {
      return await this.objectsService.getObjectById(id);
    } catch (error) {
      throw new NotFoundException('No such object type.');
    }
  }

  @Post()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  async insertObject(@Body() object: ObjectInsertDTO): Promise<AstronomicalObject> {
    try {
      return await this.objectsService.insertObject(object);
    } catch (error) {
      throw new ConflictException('The object already exist.');
    }
  }
}