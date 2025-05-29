import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { CategoryModule } from './category/category.module';
import { UnitModule } from './unit/unit.module';
import { ProjectModule } from './project/project.module';
import { SearchHistoryModule } from './search-history/search-history.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

console.log('DB HOST:', process.env.DB_HOST);
console.log('DB PORT:', process.env.DB_PORT);
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 50,
    } as any),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')], // dynamic entity loading
      synchronize: true, // for dev only, auto sync schema
    }),
    CategoryModule,
    UnitModule,
    ProjectModule,
    SearchHistoryModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
