import { Controller, UseGuards, HttpStatus, Post, Body, Res, Get, Query, Param, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SpectralTypesService } from './spectral-type.service';
import { SpectralTypeAlterDTO } from '../models/spectralType/spectral-type-alter.dto';
import { SpectralTypeInsertDTO } from '../models/spectralType/spectral-type-insert.dto';

@Controller('spectral_types')
export class SpectralTypesController {

  constructor(
    private readonly spectralTypesService: SpectralTypesService,

  ) { }

  @Get()
  @UseGuards(AuthGuard())
  async getAll(@Res() response): Promise<string> {

    try {
      const foundSpectralTypes = await this.spectralTypesService.getSpectralTypes();
      return response.status(HttpStatus.OK)
        .json({ message: 'Successfully find all spectral types.', data: foundSpectralTypes });

    } catch (error) {
      error.message = 'Unsuccessfully try to find the spectral types.';
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }

  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getById(@Param('id') id: string, @Res() response): Promise<string> {

    try {
      const foundSpectralType = await this.spectralTypesService.getSpectralTypeById(+id);
      return response.status(HttpStatus.OK)
        .json({ message: 'Successfully find spectral type.', data: foundSpectralType });

    } catch (error) {
      error.message = 'Unsuccessfully try to find spectral type.';
      return response.status(HttpStatus.NOT_FOUND).json(error.message);

    }

  }

  @Post()
  @UseGuards(AuthGuard())
  async insertSpectralType(@Body() spectralType: SpectralTypeInsertDTO, @Res() response): Promise<string> {

    try {
      const insertedSpectralType = await this.spectralTypesService.insertSpectralType(spectralType);
      return response.status(HttpStatus.CREATED)
        .json({ message: 'Successfully inserted.', data: insertedSpectralType });

    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }

  }

  @Put()
  @UseGuards(AuthGuard())
  async alterSpectralType(@Body() spectralType: SpectralTypeAlterDTO, @Res() response): Promise<string> {

    try {
      const alteredSpectralType = await this.spectralTypesService.alterSpectralType(spectralType);
      return response.status(HttpStatus.OK)
        .json({ message: 'Successfully changed.', data: alteredSpectralType });

    } catch (error) {
      error.message = 'Incorrect data input.';
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }

  }
}
