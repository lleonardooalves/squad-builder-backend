import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlayersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPlayerDto: CreatePlayerDto) {
    return this.prisma.player.create({
      data: createPlayerDto,
    });
  }

  findAll() {
    return this.prisma.player.findMany();
  }

  async findOne(id: string) {
    const player = await this.prisma.player.findUnique({
      where: { id },
    });

    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    return player;
  }

  update(id: string, updatePlayerDto: UpdatePlayerDto) {
    return this.prisma.player.update({
      where: { id },
      data: updatePlayerDto,
    });
  }

  remove(id: string) {
    return this.prisma.player.delete({
      where: { id },
    });
  }
}
