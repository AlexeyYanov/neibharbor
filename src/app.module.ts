import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { ERROR_MESSAGE } from './enum/enum';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get('MONGO_LINK');
        console.log(uri);
        
        return {
          uri,
          dbName: 'jfit'
        };
      },
    }),
 
    // MulterModule.register({
    //   limits: {
    //     fileSize: 100000000000,
    //   },
    //   // fileFilter: (req, file, cb) => {
    //   //   if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|mp4)$/)) {
    //   //     return cb(new Error(ERROR_MESSAGE.ERROR_FILE_EXTENSION), false);
    //   //   }
    //   //   cb(null, true);
    //   // },
    // }),
    AuthModule,
    FilesModule,
    UserModule,
    CategoryModule,
  ],
})
export class AppModule {}
