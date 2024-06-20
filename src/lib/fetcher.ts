// const fetcher = (...args: [input: RequestInfo, init?: RequestInit | undefined]) =>
//   fetch(...args).then((res) => res.json())

import axios, { AxiosRequestConfig } from "axios"

export const fetcher = async (...args: [url: string, config?: AxiosRequestConfig]) =>
  axios.get(...args).then((res) => res.data)
