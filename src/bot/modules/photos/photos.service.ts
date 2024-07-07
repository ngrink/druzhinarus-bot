import { Photo } from "@prisma/client"
import { CreatePhotoDto, UpdatePhotoDto } from "./dto"

type IPhotosRepository = {
  createPhotos: (data: CreatePhotoDto[]) => void
  getPhotos: () => Promise<Photo[]>
  getPhoto: (id: number) => Promise<Photo | null>
  getNextUnusedPhoto: () => Promise<Photo | null>
  updatePhoto: (id: number, data: UpdatePhotoDto) => Promise<Photo | null>
}

export class PhotosService {
  photosRepository: IPhotosRepository

  constructor(photosRepository: IPhotosRepository) {
    this.photosRepository = photosRepository
  }

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

  async getNextUnusedPhoto() {
    const photo = await this.photosRepository.getNextUnusedPhoto()

    return photo
  }

  async updatePhoto(id: number, data: UpdatePhotoDto) {
    const photo = await this.photosRepository.updatePhoto(id, data)

    return photo
  }
}