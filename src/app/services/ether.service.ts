import axiosClient from './axios-client'
import {
  GET_SIGN,
  SIGN_IN
} from './endpoint'

export const etherService = {
  getSign: () => {
    return axiosClient.get(GET_SIGN) 
  },
  signIn: (bodyParams: { signature: string, nonce: string, public_address: string, chain_id: number }) => {
    return axiosClient.post(SIGN_IN, bodyParams)
  }
}
