import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Position } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

const MAX_SQUAD_SIZE = 11;

const POSITION_LIMITS: Record<Position, number> = {
  GK: 1,
  DEF: 4,
  MID: 3,
  ATT: 3,
};

@Injectable()
export class SquadsService {
  constructor(private readonly prisma: PrismaService) {}

  findByUser(userId: string) {
    return this.prisma.squadPlayer.findMany({
      where: { userId },
      include: { player: true },
    });
  }

  async add(userId: string, playerId: string) {
    const player = await this.prisma.player.findUnique({
      where: { id: playerId },
    });
    if (!player) {
      throw new NotFoundException('Jogador não encontrado');
    }

    const squad = await this.prisma.squadPlayer.findMany({
      where: { userId },
      include: { player: true },
    });

    const alreadyInSquad = squad.some((sp) => sp.playerId === playerId);
    if (alreadyInSquad) {
      throw new BadRequestException('Jogador já está no time');
    }

    if (squad.length >= MAX_SQUAD_SIZE) {
      throw new BadRequestException('Time cheio máx 11 jogadores');
    }

    const positionCount = squad.filter(
      (sp) => sp.player.position === player.position,
    ).length;
    if (positionCount >= POSITION_LIMITS[player.position]) {
      throw new BadRequestException(
        `Limite de jogadores na posição ${player.position} atingido`,
      );
    }

    return this.prisma.squadPlayer.create({
      data: { userId, playerId },
    });
  }

  remove(userId: string, playerId: string) {
    return this.prisma.squadPlayer.delete({
      where: { userId_playerId: { userId, playerId } },
    });
  }

  clear(userId: string) {
    return this.prisma.squadPlayer.deleteMany({
      where: { userId },
    });
  }
}
