import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "./../interfaces/Activity";
import { toast } from "react-toastify";

import { history } from "./../index";
import { store } from "../stores/store";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const sleep = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

axios.interceptors.response.use(
  async (response) => {
    await sleep(500);
    return response;
  },
  (error: AxiosError) => {
    const { data: errorData, status, config } = error.response!;

    const data: any = errorData;

    switch (status) {
      case 400:
        if (typeof data === "string") {
          toast.error(data);
        }

        if (config.method === "get" && data?.errors?.hasOwnProperty("id")) {
          history.push("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];

          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }

          throw modalStateErrors.flat();
        }

        break;
      case 401:
        toast.error("Unauthorised");
        break;
      case 404:
        history.push("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data as string);
        history.push("/server-error");
        break;
    }
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>(`/activities`),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post(`/activities`, activity),
  update: (activity: Activity) => {
    // fix datepicker 2 hour bug
    activity?.date?.setHours(activity?.date?.getHours() + 2);
    return requests.put(`/activities/${activity.id}`, activity);
  },
  delete: (id: string) => requests.delete(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
