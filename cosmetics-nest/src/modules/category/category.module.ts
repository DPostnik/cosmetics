import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.contoller';
import { CategoryService } from './category.service';
import { Category } from './category';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [CategoryService],
})
export class CategoryModule {}
