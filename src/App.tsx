import axios, {AxiosInstance, AxiosRequestConfig, Method} from 'axios';
import React, { useState } from 'react';

const handleRequest = (requestConfig:AxiosRequestConfig, client?:AxiosInstance):Promise<any> =>{

  client = client ?? axios.create();

  return client(requestConfig).then(res => {
    console.log(res.data);
    return res.data;
  })
  .catch(error => {throw error});
}

const App:React.FC = () => {

  const [httpRequestVerb, setHttpRequestVerb] = useState<string>("GET");
  const [httpRequestUrl, setHttpRequestUrl] = useState<string>("http://localhost:9000/");
  
  const [httpResponse, setHttpResponse] = useState<any>(undefined);

  const handleOnSubmit = (event:any):void => {
    event.preventDefault();
    const config:AxiosRequestConfig = {
      url:httpRequestUrl,
      method:httpRequestVerb as Method
    };
   
    const response =  handleRequest(config);
    response.then(data => {setHttpResponse(data)})
    .catch(error => setHttpResponse(error));
    
  };

  return (
    <div>
     <h1>Basic HTTP Request Handler</h1>
     
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
     <div>
     HttpResponse: {httpResponse ? JSON.stringify(httpResponse) : ""}
     </div>
    </div>
    
  );
}

export default App;
