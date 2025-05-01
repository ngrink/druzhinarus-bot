import axios from "axios"
import config from "@/config"

export const axiosConfig = {
  baseURL: config.apiOrigin + config.apiBasePath,
  headers: {
    "Content-Type": "application/json",
  }
}

export const axiosClient = axios.create(axiosConfig)
