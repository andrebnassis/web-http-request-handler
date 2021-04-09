import { AxiosRequestConfig, Method } from "axios";
import React, { useState } from "react";
import { handleRequest } from "../service/HttpRequestHandler";
import { getBasePath, getRelativePath } from "../service/UrlHandler";

//https://stackoverflow.com/questions/34698905/how-can-i-clone-a-javascript-object-except-for-one-key

enum HeaderElementType {
  key = "key",
  value = "value"
}

export const HttpRequestForm:React.FC<{handleHttpResponse:(data:any) => void}> = ({handleHttpResponse}) => {

    const [httpRequestVerb, setHttpRequestVerb] = useState<string>("GET");
    const [httpRequestUrl, setHttpRequestUrl] = useState<string>("http://localhost:9000");
    const [httpRequestBody, setHttpRequestBody] = useState<string>("");
    const [httpRequestHeader, setHttpRequestHeader] = useState<Array<{id:string, key:string, value:string }>>([{id:"1", key:"", value:""}]);

    const setHeaderElementById = (event:any, elementType:HeaderElementType) => {
      const id = ((event.target.parentNode) as Element).getAttribute("data-id");
      const httpRequestHeaderArr = httpRequestHeader.map(e => {
        if(e.id === id){
          switch(elementType){
            case HeaderElementType.key:
              e.key = event.target.value;
              break;
            case HeaderElementType.value:
              e.value = event.target.value;
              break;
            default:
              break;
          }
        }
      return e;
      });
      
      setHttpRequestHeader(httpRequestHeaderArr);

    }

    const handleOnSubmit = (event:any):void => {
    
      event.preventDefault();

      try{

      const url = new URL(httpRequestUrl);
      const relativePath = getRelativePath(url);
      const basePath = getBasePath(url);
      
      const config:AxiosRequestConfig = {
        baseURL:basePath,
        url:relativePath,
        method:httpRequestVerb as Method,
        headers:{'content-type':'text/plain'},
        data: httpRequestBody
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
      {
        httpRequestHeader.map(e => {
          console.log({e})
          return (
            <div data-id={e.id}>
            <input value={e.key} onChange={e => {setHeaderElementById(e, HeaderElementType.key)} }/>
            <input value={e.value} onChange={e => {setHeaderElementById(e, HeaderElementType.value)}} />
            </div>
          );
        })
      }
      <br/>
      <label>
        body:
      </label>
      <br/>
      <textarea value={httpRequestBody} onChange={e => setHttpRequestBody(e.target.value)}>
      </textarea>
      <input type="submit" value="send"/>
      </form>
      <br/>
      </div>
      
    );
  
  }