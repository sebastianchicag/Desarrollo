import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
export declare class PersonsController {
    private readonly personsService;
    constructor(personsService: PersonsService);
    create(dto: CreatePersonDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/person.schema").Person, {}> & import("./schemas/person.schema").Person & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/person.schema").Person, {}> & import("./schemas/person.schema").Person & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/person.schema").Person, {}> & import("./schemas/person.schema").Person & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdatePersonDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/person.schema").Person, {}> & import("./schemas/person.schema").Person & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/person.schema").Person, {}> & import("./schemas/person.schema").Person & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getStatsByDepartment(): Promise<any[]>;
    getStatsByMonth(): Promise<any[]>;
}
