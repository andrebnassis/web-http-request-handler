import React, { useState } from 'react';
import { HttpRequestForm } from './component/HttpRequestForm';

const App:React.FC = () => {

  const [httpResponse, setHttpResponse] = useState<any>(undefined);

  return (
    <div>
      <h1>Basic HTTP Request Handler</h1>
      Repository link: <a href="https://github.com/andrebnassis/web-http-request-handler">https://github.com/andrebnassis/web-http-request-handler</a>
    <br/>
    <br/>
    <HttpRequestForm handleHttpResponse={setHttpResponse}/>
     <div>
     HttpResponse: {JSON.stringify(httpResponse)}
     </div>
    </div>
    
  );
}

export default App;
