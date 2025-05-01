import { Photo } from '@/shared/generated/prisma/client'
import { PrismaService } from '@/config'

import { CreatePhotoDto } from '@/shared/dto/photos'

export class PhotosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPhotos(data: CreatePhotoDto[]) {
    await this.prisma.photo.createMany({
      data: data.map(photo => ({
        fileId: photo.fileId,
        groupId: photo.groupId,
      }))
    })
  }

  async getPhotos(): Promise<Photo[]> {
    const photos = await this.prisma.photo.findMany()

    return photos
  }

  async getPhoto(id: number): Promise<Photo | null> {
    const photo = await this.prisma.photo.findUnique({
      where: {
        id: id
      }
    })

    return photo
  }

  async getUnusedPhotos(): Promise<Photo[]> {
    const photos = await this.prisma.photo.findMany({
      where: {
        isUsed: false
      },
      orderBy: {
        id: 'asc'
      }
    })

    return photos
  }

  async getNextUnusedPhoto(): Promise<Photo | null> {
    const photo = await this.prisma.photo.findFirst({
      where: {
        isUsed: false
      }
    })

    return photo
  }


  async countUnusedPhotos(): Promise<number> {
    const count = await this.prisma.photo.count({
      where: {
        isUsed: false
      }
    })

    return count
  }

  async updatePhoto(id: number, data: Partial<Photo>): Promise<Photo | null> {
    const photo = await this.prisma.photo.update({
      where: {
        id: id
      },
      data: data,
    })

    return photo
  }

  async deleteAllPhotos(): Promise<void> {
    await this.prisma.photo.deleteMany()
  }
}
