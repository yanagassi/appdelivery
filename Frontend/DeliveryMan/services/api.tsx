import Strings from "@/constants/Strings";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://172.20.10.12",
});

api.interceptors.request.use(async (config) => {
  const toe = await AsyncStorage.getItem(Strings.token_jwt);
  if (toe) {
    config.headers.Authorization = toe;
  }
  return config;
});

export default api;
