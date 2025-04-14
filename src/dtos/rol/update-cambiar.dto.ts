import { PartialType } from '@nestjs/mapped-types';
import { CreateCambiarDto } from './create-cambiar.dto';

export class UpdateCambiarDto extends PartialType(CreateCambiarDto) {}
