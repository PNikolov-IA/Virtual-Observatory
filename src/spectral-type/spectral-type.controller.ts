import {
  Controller, UseGuards, HttpStatus, Post, Body, Get, Param, Put, ParseIntPipe, HttpCode, NotFoundException, ConflictException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SpectralTypesService } from './spectral-type.service';
import { SpectralTypeAlterDTO } from '../models/spectralType/spectral-type-alter.dto';
import { SpectralTypeInsertDTO } from '../models/spectralType/spectral-type-insert.dto';
import { SpectralType } from 'src/data/entities/spectral-type.entity';

@Controller('spectral-types')
export class SpectralTypesController {
  constructor(
    private readonly spectralTypesService: SpectralTypesService,
  ) { }

  @Get()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<SpectralType[]> {
    return await this.spectralTypesService.getSpectralTypes();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', new ParseIntPipe()) id: number): Promise<SpectralType> {
    try {
      return await this.spectralTypesService.getSpectralTypeById(id);
    } catch (error) {
      throw new NotFoundException('No such spectral type.');
    }
  }

  @Post()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  async insertSpectralType(@Body() spectralType: SpectralTypeInsertDTO): Promise<SpectralType> {
    try {
      return await this.spectralTypesService.insertSpectralType(spectralType);
    } catch (error) {
      throw new ConflictException('The spectral type already exist.');
    }
  }

  @Put()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async alterSpectralType(@Body() spectralType: SpectralTypeAlterDTO): Promise<SpectralType> {
    try {
      return await this.spectralTypesService.alterSpectralType(spectralType);
    } catch (error) {
      throw new NotFoundException('No such spectral type.');
    }
  }
}
