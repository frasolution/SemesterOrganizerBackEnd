import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user/user.repository';
import { TeamRepository } from './team/team.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, TeamRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
