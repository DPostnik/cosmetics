import { Injectable, Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ImageService } from 'src/modules/image/image.service';
import { CreateImageDTO, Image } from 'src/modules/image/image';

@Injectable()
@Controller('/image')
export class ImageController {
  constructor(private imageService: ImageService) {}
  @Get('/')
  async getImages() {
    return await this.imageService.findAll();
  }

  @Get('/:id')
  async getImage(@Param('id') id: string) {
    return await this.imageService.findById(+id);
  }

  @Post('/')
  async createImage(@Body() image: CreateImageDTO) {
    return await this.imageService.create(image);
  }
}
