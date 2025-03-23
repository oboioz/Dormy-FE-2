import axios, { InternalAxiosRequestConfig } from "axios";

import { getNextExpiresTime, isTokenStillValid } from "../utils/expiresTime";
// import { AuthEndPoints } from '@const/auth';
import { toast } from "react-toastify";
import { DormyLocalStorage } from "../consts/DormyConstants";
import { API_URL } from "../consts/APIConstants";

// const getRefreshToken = async (refreshToken: string, deviceId: string) => {
//   try {
//     const res = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}${AuthEndPoints.REFRESH_TOKEN_ENDPOINT}`,
//       null,
//       {
//         headers: {
//           Authorization: `Bearer ${refreshToken}`,
//           'device-id': deviceId || '',
//           lang: localStorage.getItem('locale') || 'vi',
//         },
//       }
//     );
//     return res.data;
//   } catch (error) {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     localStorage.setItem('unauthorized', 'true');
//     window.location.href = '/login';
//   }
// };
const privateAxios = axios.create({
  baseURL: API_URL.BASE_URL,//import.meta.env.BASE_URL_API,
});
privateAxios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    let token = localStorage.getItem(DormyLocalStorage.dormyToken);
    // let device = localStorage.getItem("device");
    // let lang = localStorage.getItem("locale") || "vi";
    // config.headers["lang"] = lang;

    if (token/* && device*/) {
        // let { accessToken, refreshToken, expiresTime } = JSON.parse(token);
        // let { deviceId } = JSON.parse(device);
        // if (!isTokenStillValid(expiresTime)) {
        //     const newToken = await getRefreshToken(refreshToken, deviceId);
        //     accessToken = newToken.accessToken;
        //     localStorage.setItem(
        //         "token",
        //         JSON.stringify({
        //             accessToken,
        //             refreshToken: newToken.refreshToken,
        //             expiresTime: getNextExpiresTime(newToken.expiresIn),
        //         })
        //     );
        // }

        // localStorage.setItem(DormyLocalStorage.dormyToken, accessToken);

        config.headers.Authorization = `Bearer ${token}`;
    } else {
      return config;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

privateAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        localStorage.removeItem(DormyLocalStorage.userProfile);
        localStorage.removeItem(DormyLocalStorage.dormyToken);
        localStorage.setItem("unauthorized", "true");
        window.location.href = "/login";
        // return;
      }
    } else {
    //   const lang = localStorage.getItem("locale") || "vi";
      const noti = "Server lost connection, retry later!";
        // lang === "vi"
        //   ? "Server đang tạm mất kết nối, vui lòng thử lại sau!"
        //   : "Server lost connection, retry later!";
      toast.error(noti, {
        toastId: "Server offline",
      });
      // return null;
    }
    return Promise.reject(err);
  }
);

const publicAxios = axios.create({
  baseURL: API_URL.BASE_URL,//import.meta.env.BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     // lang: localStorage.getItem("locale") || "vi",
//   },
});

export { privateAxios, publicAxios };
