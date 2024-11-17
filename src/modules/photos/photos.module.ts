import { PhotosRepository } from "./photos.repository";
import { PhotosService } from "./photos.service";

const photosRepository = new PhotosRepository()
const photosService = new PhotosService(photosRepository)

export { 
  photosService 
}