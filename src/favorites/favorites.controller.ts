import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FavoritesService } from './favorites.service';
import { type AuthUser, CurrentUser } from 'src/auth/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.favoritesService.findAllByUser(user.id);
  }

  @Post(':playerId')
  add(@CurrentUser() user: AuthUser, @Param('playerId') playerId: string) {
    return this.favoritesService.add(user.id, playerId);
  }

  @Delete(':playerId')
  remove(@CurrentUser() user: AuthUser, @Param('playerId') playerId: string) {
    return this.favoritesService.remove(user.id, playerId);
  }
}
