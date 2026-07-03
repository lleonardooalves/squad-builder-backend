import { Position, Form, Prisma } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  team: string;

  @IsEnum(Position)
  position: Position;

  @IsInt()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  @Max(99)
  rating: number;

  @IsUrl()
  image: string;

  @IsEnum(Form)
  form: Form;

  @IsObject()
  attributes: Prisma.InputJsonValue;
}
