import { Injectable } from '@nestjs/common';
import { CreateAddendumDto } from './dto/create-addendum.dto';
import { UpdateAddendumDto } from './dto/update-addendum.dto';

@Injectable()
export class AddendaService {
  create(createAddendumDto: CreateAddendumDto) {
    return 'This action adds a new addendum';
  }

  findAll() {
    return `This action returns all addenda`;
  }

  findOne(id: number) {
    return `This action returns a #${id} addendum`;
  }

  update(id: number, updateAddendumDto: UpdateAddendumDto) {
    return `This action updates a #${id} addendum`;
  }

  remove(id: number) {
    return `This action removes a #${id} addendum`;
  }
}
