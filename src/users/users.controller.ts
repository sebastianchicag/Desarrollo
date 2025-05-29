import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: any) {
    return this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
  
  @Get('crear-prueba')
  async crearUsuarioDePrueba() {
    return this.usersService.create({
      name: 'Pedro desde Backend',
      email: 'pedro@backend.com',
    });
  }
}
