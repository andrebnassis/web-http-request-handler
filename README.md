# Steps

1. Create React App with Typescript

2. Mocking a Fake API
(reference: https://blog.harveydelaney.com/setting-up-a-mock-api-for-your-front-end-react-project/)

library: connect-api-mocker

2.1 Installing connect-api-mocker + express + cors

npm i --save-dev express connect-api-mocker cors

2.2 Create a folder on root folder of the project. We will use the name mock-api

2.3 Inside the folder, create a file called app.js

```javascript
const express = require('express');
const apiMocker = require('connect-api-mocker');
const cors = require('cors');

const port = 9000;
const app = express();
app.use(cors());

// '/' is the base path that will match the root of our mocked-api address.
app.use('/', apiMocker('mock-api'));
 
console.log(`Mock API Server is up and running at: http://localhost:${port}`);
app.listen(port);
```

2.4 Create the following folders with GET.js and POST.js files, for test purpores
```
/mock-api
    GET.js
    /hello
        /world
            GET.js
            /__customId__
                GET.js
```

```
const mockedData = {
    "hello-world":"Mock-API is up and Running"
}

module.exports = (req, res) => {
    return res.status(200).send(mockedData);
}
```

On each file, put the following code.
```
const mockedData = {
    "id": 0,
    "dummy":"hello world"
}

module.exports = (req, res) => {
    mockedData.id = req.params.customId;
    return res.status(200).send(mockedData);
}
```
PS: You can change this code to whatever you want. This content is just for teaching purposes.

2.5 Running our mocked api

```bash
node mock-api/app.js
```



Then, open 'http://localhost:9000' to see our mocked response.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
