import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddendaService } from './addenda.service';
import { CreateAddendumDto } from './dto/create-addendum.dto';
import { UpdateAddendumDto } from './dto/update-addendum.dto';

@Controller('addenda')
export class AddendaController {
  constructor(private readonly addendaService: AddendaService) {}

  @Post()
  create(@Body() createAddendumDto: CreateAddendumDto) {
    return this.addendaService.create(createAddendumDto);
  }

  @Get()
  findAll() {
    return this.addendaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addendaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddendumDto: UpdateAddendumDto) {
    return this.addendaService.update(+id, updateAddendumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addendaService.remove(+id);
  }
}
