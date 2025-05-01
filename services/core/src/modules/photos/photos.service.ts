import { Injectable } from '@nestjs/common';

import { Photo } from '@/shared/generated/prisma/client';
import { CreatePhotoDto, UpdatePhotoDto } from '@/shared/dto/photos';

import { PhotosRepository } from './photos.repository';

@Injectable()
export class PhotosService {

  constructor(private readonly photosRepository: PhotosRepository) {}

  async createPhotos(data: CreatePhotoDto[]) {
    const photos = await this.photosRepository.createPhotos(data)

    return photos
  }

  async getPhotos() {
    const photos = await this.photosRepository.getPhotos()

    return photos
  }

  async getPhoto(id: number) {
    const photo = await this.photosRepository.getPhoto(id)

    return photo
  }

  async getUnusedPhotos(): Promise<Photo[]> {
    const photos = await this.photosRepository.getUnusedPhotos()

    return photos
  }

  async getNextUnusedPhoto() {
    const photo = await this.photosRepository.getNextUnusedPhoto()

    return photo
  }

  async countUnusedPhotos() {
    const count = await this.photosRepository.countUnusedPhotos()

    return count
  }

  async updatePhoto(id: number, data: UpdatePhotoDto) {
    const photo = await this.photosRepository.updatePhoto(id, data)

    return photo
  }

  async deleteAllPhotos() {
    await this.photosRepository.deleteAllPhotos()
  }
}
