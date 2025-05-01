import { axiosClient } from "./axios";
import { EventsApi, UsersApi, PhotosApi, SettingsApi, AccountsApi, CategoriesApi, CategoriesApiAxiosParamCreator } from "@/shared/generated/api/client/typescript-axios"

type apiClient = {
  accounts: AccountsApi;
  users: UsersApi;
  events: EventsApi;
  categories: CategoriesApi;
  photos: PhotosApi;
  settings: SettingsApi;
}

export const api: apiClient = {
  accounts: new AccountsApi(
    undefined,
    undefined,
    axiosClient
  ),
  users: new UsersApi(
    undefined,
    undefined,
    axiosClient
  ),
  events: new EventsApi(
    undefined,
    undefined,
    axiosClient
  ),
  categories: new CategoriesApi(
    undefined,
    undefined,
    axiosClient
  ),
  photos: new PhotosApi(
    undefined,
    undefined,
    axiosClient
  ),
  settings: new SettingsApi(
    undefined,
    undefined,
    axiosClient
  ),
}
