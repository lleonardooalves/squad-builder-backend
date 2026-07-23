import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  findAllByUser(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { player: true },
    });
  }

  add(userId: string, playerId: string) {
    return this.prisma.favorite.create({ data: { userId, playerId } });
  }

  remove(userId: string, playerId: string) {
    return this.prisma.favorite.delete({
      where: { userId_playerId: { userId, playerId } },
    });
  }
}
