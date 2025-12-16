import { PartialType } from '@nestjs/mapped-types';
import { CreateAddendumDto } from './create-addendum.dto';

export class UpdateAddendumDto extends PartialType(CreateAddendumDto) {}
