import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person } from './schemas/person.schema';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonsService {
  constructor(@InjectModel(Person.name) private personModel: Model<Person>) { }


  async create(dto: CreatePersonDto) {
    const existing = await this.personModel.findOne({ email: dto.email });
    if (existing) {
      throw new BadRequestException('El correo ya está registrado.');
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


  async findOne(id: string) {
    const person = await this.personModel.findById(id);
    if (!person) throw new NotFoundException('Person not found');
    return person;
  }

  async update(id: string, dto: UpdatePersonDto) {
    const person = await this.personModel.findByIdAndUpdate(id, dto, { new: true });
    if (!person) throw new NotFoundException('Person not found');
    return person;
  }

  async remove(id: string) {
    const person = await this.personModel.findByIdAndDelete(id);
    if (!person) throw new NotFoundException('Person not found');
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
}
