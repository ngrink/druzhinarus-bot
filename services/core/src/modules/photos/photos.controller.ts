import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { PhotoDto } from '@/shared/generated/prisma/types/photo.dto';
import { CreatePhotoDto, UpdatePhotoDto } from '@/shared/dto/photos';

import { PhotosService } from './photos.service';

@ApiTags('photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  /**
  * Create a new photos
  */
  @Post()
  @ApiBody({type: [CreatePhotoDto], required: true})
  @ApiOkResponse()
  async createPhotos(@Body() data: CreatePhotoDto[]) {
    await this.photosService.createPhotos(data)

    return "OK"
  }

  /**
  * Get photos
  */
  @Get()
  @ApiOkResponse({type: [PhotoDto]})
  async getPhotos() {
    const photos = await this.photosService.getPhotos()

    return photos
  }

  /**
  * Get unused photos
  */
  @Get('unused')
  @ApiOkResponse({type: [PhotoDto]})
  async getUnusedPhotos() {
    const photos = await this.photosService.getUnusedPhotos()

    return photos
  }

  /**
  * Get next unused photo
  */
  @Get('unused/next')
  @ApiOkResponse({type: PhotoDto})
  async getNextUnusedPhoto() {
    const photo = await this.photosService.getNextUnusedPhoto()

    return photo
  }

  /**
  * Count unused photos
  */
  @Get('unused/count')
  @ApiOkResponse({type: Number})
  async countUnusedPhotos() {
    const count = await this.photosService.countUnusedPhotos()

    return count
  }


  /**
  * Get photo
  */
  @Get(':id')
  @ApiParam({name: 'id', required: true})
  @ApiOkResponse({type: PhotoDto})
  async getPhoto(@Param('id') id: number) {
    const photo = await this.photosService.getPhoto(id)

    return photo
  }


  /**
  * Update photo
  */
  @Patch(':id')
  @ApiParam({name: 'id', type: Number, required: true})
  @ApiBody({type: UpdatePhotoDto, required: true})
  @ApiOkResponse({type: PhotoDto})
  async updatePhoto(
    @Param('id') id: number,
    @Body() data: UpdatePhotoDto
  ) {
    const photo = await this.photosService.updatePhoto(id, data)

    return photo
  }


  /**
  * Delete all photos
  */
  @Delete()
  @ApiOkResponse()
  async deleteAllPhotos() {
    await this.photosService.deleteAllPhotos()

    return "OK"
  }
}
