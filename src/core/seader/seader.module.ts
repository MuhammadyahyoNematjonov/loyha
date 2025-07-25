import { Module } from '@nestjs/common';
import { SeaderService } from './seader.service';

@Module({
  providers: [SeaderService]
})
export class SeaderModule {}
