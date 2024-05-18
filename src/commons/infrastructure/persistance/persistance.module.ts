import { Global, Module } from '@nestjs/common';
import dbConfig from './db.config';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongooseRepository } from 'src/commons/domain/repository/user.mg.repository';
import { UserSchema } from 'src/commons/domain/entities/user.entity';

@Global()
@Module({
  providers: [UserMongooseRepository],
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dbConfig>) => {
        const { db, env } = configService;
        const urlDb =
          env === 'local'
            ? `${db.connection}${db.host}/${db.name}`
            : `mongodb+srv://angelriverarf:6tNvR5cNR0vfisnQ@pruebita.xbcxzti.mongodb.net/`;
        return {
          uri: urlDb,
        };
      },
      inject: [dbConfig.KEY],
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Add this line
  ],
  exports: [
    UserMongooseRepository,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ], // Add MongooseModule.forFeature to exports
})
export class PersistanceModule {}
