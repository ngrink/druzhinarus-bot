import { Photo } from "@prisma/client"
import { CreatePhotoDto, UpdatePhotoDto } from "./dto"

type IPhotosRepository = {
  createPhotos: (data: CreatePhotoDto[]) => void
  getPhotos: () => Promise<Photo[]>
  getPhoto: (id: number) => Promise<Photo | null>
  getUnusedPhotos: () => Promise<Photo[]>
  getNextUnusedPhoto: () => Promise<Photo | null>
  countUnusedPhotos: () => Promise<number>
  updatePhoto: (id: number, data: UpdatePhotoDto) => Promise<Photo | null>
  deleteAllPhotos: () => Promise<void>
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