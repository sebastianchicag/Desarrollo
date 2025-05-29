import {Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) { }

  @Post()
  create(@Body() dto: CreatePersonDto) {
    return this.personsService.create(dto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 1000) {
    return this.personsService.findAll(+page, +limit);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePersonDto) {
    return this.personsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personsService.remove(id);
  }

  @Get('stats/by-department')
  @UseGuards(JwtAuthGuard)
  getStatsByDepartment() {
    return this.personsService.getStatsByDepartment(); 
  }


  @Get('stats/by-month')
  getStatsByMonth() {
    return this.personsService.getStatsByMonth();
  }

}
