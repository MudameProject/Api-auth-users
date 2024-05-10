import { Global, Module } from '@nestjs/common';
import dbConfig from './db.config';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dbConfig>) => {
        const { db, env } = configService;
        const urlDb =
          env === 'local'
            ? `${db.connection}${db.host}/${db.name}`
            : `mongodb+srv://danielestebanjimenezlopez:c6nZDMfbdQFEQ3gM@test.laxdtla.mongodb.net/`;
        return {
          uri: urlDb,
        };
      },
      inject: [dbConfig.KEY],
    }),
  ],
})
export class PersistanceModule {}
