import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BlogController } from './blog/blog.controller';
import { CatsModule } from './cats/cats.module';
import { BlogService } from './blog/blog.service';
import { BlogModule } from './blog/blog.module';
import { TypeOrmConfig } from './configs/typeorm.config.module';
import { DemoMiddleware } from './middleware/demo.middleware';
import { AuthModule } from './auth/auth.module';
import { Configs } from './configs/configs.module';

@Module({
  imports: [
    Configs,
    TypeOrmConfig,
    CatsModule, BlogModule, AuthModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DemoMiddleware).forRoutes('*')
  }
}
