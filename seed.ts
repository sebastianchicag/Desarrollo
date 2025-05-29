import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { PersonsService } from './src/persons/persons.service';
import { CreatePersonDto } from './src/persons/dto/create-person.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const personsService = app.get(PersonsService);

  const sampleData: CreatePersonDto[] = [];

  for (let i = 1; i <= 20; i++) {
    sampleData.push({
      firstName: `Empleado${i}`,
      lastName: `Apellido${i}`,
      email: `empleado${i}@example.com`,
      position: 'Desarrollador',
      department: 'TI',
      hireDate: `2023-01-${(i % 28 + 1).toString().padStart(2, '0')}`,
      salary: 45000 + i * 500,
    });
  }

  for (const person of sampleData) {
    await personsService.create(person);
  }

  console.log('🌱 Se insertaron 20 empleados en el departamento TI.');
  await app.close();
}

bootstrap();
