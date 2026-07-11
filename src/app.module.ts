import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PlayersModule } from './players/players.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PlayersModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
