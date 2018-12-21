import { ObservationsModule } from './observation/observations.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from './common/core/core.module';
import { DatabaseModule } from './database/database.module';
import { Module, HttpModule } from '@nestjs/common';
import { HomeModule } from './home/home.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AuthModule,
    DatabaseModule,
    UsersModule,
    CoreModule,
    HomeModule,
    ObservationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
