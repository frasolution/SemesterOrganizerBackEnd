import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColumnsService } from './columns.service';
import { ColumnsRepository } from './columns.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnsRepository])],
  providers: [ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
