"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const person_schema_1 = require("./schemas/person.schema");
let PersonsService = class PersonsService {
    personModel;
    constructor(personModel) {
        this.personModel = personModel;
    }
    async create(dto) {
        const existing = await this.personModel.findOne({ email: dto.email });
        if (existing) {
            throw new common_1.BadRequestException('El correo ya está registrado.');
        }
        return this.personModel.create(dto);
    }
    async findAll(page = 1, limit = 1000) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.personModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
            this.personModel.countDocuments(),
        ]);
        return { data, total, page, limit };
    }
    async findOne(id) {
        const person = await this.personModel.findById(id);
        if (!person)
            throw new common_1.NotFoundException('Person not found');
        return person;
    }
    async update(id, dto) {
        const person = await this.personModel.findByIdAndUpdate(id, dto, { new: true });
        if (!person)
            throw new common_1.NotFoundException('Person not found');
        return person;
    }
    async remove(id) {
        const person = await this.personModel.findByIdAndDelete(id);
        if (!person)
            throw new common_1.NotFoundException('Person not found');
        return person;
    }
    async getStatsByDepartment() {
        return this.personModel.aggregate([
            {
                $group: {
                    _id: '$department',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);
    }
    async getStatsByMonth() {
        return this.personModel.aggregate([
            {
                $group: {
                    _id: { $substr: ['$hireDate', 0, 7] },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
    }
};
exports.PersonsService = PersonsService;
exports.PersonsService = PersonsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(person_schema_1.Person.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PersonsService);
//# sourceMappingURL=persons.service.js.map