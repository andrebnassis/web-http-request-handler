import { AxiosRequestConfig, Method } from "axios";
import React, { useState } from "react";
import { handleRequest } from "../service/HttpRequestHandler";
import { getBasePath, getRelativePath } from "../service/UrlHandler";

export const HttpRequestForm:React.FC<{handleHttpResponse:(data:any) => void}> = ({handleHttpResponse}) => {

    const [httpRequestVerb, setHttpRequestVerb] = useState<string>("GET");
    const [httpRequestUrl, setHttpRequestUrl] = useState<string>("http://localhost:9000");
    
    const handleOnSubmit = (event:any):void => {
    
      event.preventDefault();

      try{

      const url = new URL(httpRequestUrl);
      const relativePath = getRelativePath(url);
      const basePath = getBasePath(url);
      
      const config:AxiosRequestConfig = {
        baseURL:basePath,
        url:relativePath,
        method:httpRequestVerb as Method
      };
     
      const response =  handleRequest(config);
      response.then(data => {handleHttpResponse(data)})
      .catch(error => handleHttpResponse(error));

    
  }
  catch(e){
    handleHttpResponse(undefined);
  }
    
    };
  
    return (
      <div>
       <form onSubmit={handleOnSubmit}>
       <label>HttpRequest:
       </label>
         <select onChange={e => setHttpRequestVerb(e.target.value)} value={httpRequestVerb}>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="PACTH">PACTH</option>
        <option value="DELETE">DELETE</option>
      </select>
      <input value={httpRequestUrl} onChange={e => setHttpRequestUrl(e.target.value)}>
      </input>
      <input type="submit" value="send"/>
      </form>
      <br/>
      </div>
      
    );
  
  }