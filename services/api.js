import axios from "axios";
import { baseUrl, TOKEN } from '../util/constants';
import { getCookie } from '../util/sessions';


const instance = axios.create({
  baseURL: baseUrl,
});


// export const setTokenInAxios = (token) => {
//   if (token) {
//     instance.defaults.headers.common["access_token"] = token;
//   }
// };

instance.interceptors.request.use(
  (config) => {
    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      const token = getCookie(TOKEN);
      if (token && config.params) {
        config.params['access_token'] = token;
      }else{
        config.params = {
          access_token: token
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const ApiService = {
  async get(url, data) {
    try {
      const res = await instance.get(url, data);
      return res;
    } catch (reason) {
      return await Promise.reject(reason);
    }
  },

  async post(url, data) {
    try {
      const res = await instance.post(url, data);
      return res;
    } catch (reason) {
      return await Promise.reject(reason);
    }
  },

  async put(url, data) {
    try {
      const res = await instance.put(url, data);
      return res;
    } catch (reason) {
      return await Promise.reject(reason);
    }
  },

  async delete(url) {
    try {
      const res = await instance.delete(url);
      return res;
    } catch (reason) {
      return await Promise.reject(reason);
    }
  },

  awaitAll() {
    return axios
      .all(Array.from(arguments))
      .then(axios.spread((...responses) => responses))
      .catch((reasons) => Promise.reject(reasons));
  },
};

export default ApiService;
