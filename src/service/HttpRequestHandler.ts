import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const handleRequest = (requestConfig:AxiosRequestConfig, client?:AxiosInstance):Promise<any> =>{

    client = client ?? axios.create();
  
    return client(requestConfig).then(res => {
      return res.data;
    })
    .catch(error => {throw error});
  }