import { Module } from '@nestjs/common';
import { PersistanceModule } from './persistance/persistance.module';

@Module({
  imports: [PersistanceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
