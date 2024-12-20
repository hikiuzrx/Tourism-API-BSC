import { PartialType } from '@nestjs/swagger';
import { CreateAgenceDto } from './create-agence.dto';

export class UpdateAgenceDto extends PartialType(CreateAgenceDto) {}
