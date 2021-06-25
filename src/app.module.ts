import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configValidationschema } from './config.schema';
import { ClippingsModule } from './clippings/clippings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'config/.env',
      validationSchema: configValidationschema,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || ''),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClippingsModule,
  ],
})
export class AppModule {}
