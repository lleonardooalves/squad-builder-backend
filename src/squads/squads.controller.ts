import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SquadsService } from './squads.service';
import { type AuthUser, CurrentUser } from 'src/auth/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('squads')
export class SquadsController {
  constructor(private readonly squadsService: SquadsService) {}

  @Get()
  findMySquad(@CurrentUser() user: AuthUser) {
    return this.squadsService.findByUser(user.id);
  }

  @Post(':playerId')
  add(@CurrentUser() user: AuthUser, @Param('playerId') playerId: string) {
    return this.squadsService.add(user.id, playerId);
  }

  @Delete(':playerId')
  remove(@CurrentUser() user: AuthUser, @Param('playerId') playerId: string) {
    return this.squadsService.remove(user.id, playerId);
  }

  @Delete()
  clear(@CurrentUser() user: AuthUser) {
    return this.squadsService.clear(user.id);
  }
}
