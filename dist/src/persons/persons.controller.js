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
exports.PersonsController = void 0;
const common_1 = require("@nestjs/common");
const persons_service_1 = require("./persons.service");
const create_person_dto_1 = require("./dto/create-person.dto");
const update_person_dto_1 = require("./dto/update-person.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PersonsController = class PersonsController {
    personsService;
    constructor(personsService) {
        this.personsService = personsService;
    }
    create(dto) {
        return this.personsService.create(dto);
    }
    findAll(page = 1, limit = 1000) {
        return this.personsService.findAll(+page, +limit);
    }
    findOne(id) {
        return this.personsService.findOne(id);
    }
    update(id, dto) {
        return this.personsService.update(id, dto);
    }
    remove(id) {
        return this.personsService.remove(id);
    }
    getStatsByDepartment() {
        return this.personsService.getStatsByDepartment();
    }
    getStatsByMonth() {
        return this.personsService.getStatsByMonth();
    }
};
exports.PersonsController = PersonsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_person_dto_1.CreatePersonDto]),
    __metadata("design:returntype", void 0)
], PersonsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PersonsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PersonsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_person_dto_1.UpdatePersonDto]),
    __metadata("design:returntype", void 0)
], PersonsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PersonsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('stats/by-department'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PersonsController.prototype, "getStatsByDepartment", null);
__decorate([
    (0, common_1.Get)('stats/by-month'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PersonsController.prototype, "getStatsByMonth", null);
exports.PersonsController = PersonsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/v1/persons'),
    __metadata("design:paramtypes", [persons_service_1.PersonsService])
], PersonsController);
//# sourceMappingURL=persons.controller.js.map