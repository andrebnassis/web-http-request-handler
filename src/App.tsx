import React, { useState } from 'react';
import { HttpRequestForm } from './component/HttpRequestForm';

const App:React.FC = () => {

  const [httpResponse, setHttpResponse] = useState<any>(undefined);

  return (
    <div>
     <h1>Basic HTTP Request Handler</h1>
     <HttpRequestForm handleHttpResponse={setHttpResponse}/>
     
    <br/>
     <div>
     HttpResponse: {JSON.stringify(httpResponse)}
     </div>
    </div>
    
  );
}

export default App;
