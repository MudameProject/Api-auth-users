import { Module } from '@nestjs/common';
import { PersistanceModule } from './commons/infrastructure/persistance/persistance.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './commons/infrastructure/persistance/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
