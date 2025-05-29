"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const persons_service_1 = require("./src/persons/persons.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const personsService = app.get(persons_service_1.PersonsService);
    const sampleData = [];
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
//# sourceMappingURL=seed.js.map