import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { ProjectController } from './project/project.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController, ProjectController],
  providers: [AppService],
})
export class AppModule {}
