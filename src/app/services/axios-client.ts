import axios, { AxiosResponse } from 'axios'

// const defaultHeader = {
//   "Access-Control-Allow-Origin": "*",
//   "Content-Type": "application/json",
//   Accept: "application/json",
// };

// const baseURL: string = 'https://api.inz-dev.esollabs.com/v1/dapp/'

const baseURL: string = String(process.env.NEXT_PUBLIC_APP_HOST)
console.log(baseURL)

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

//Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return handleResponse(response)
  },
  (error) => {
    return handleError(error)
  }
)

const handleResponse = (res: AxiosResponse<any>) => {
  if (res) {
    return res.data
  }
  return res
}

const handleError = (error: { response: { data: any } }) => {
  const { data } = error.response
  return data
}

export default axiosClient
