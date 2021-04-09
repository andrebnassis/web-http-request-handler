# Project Overview

This project is a simple web page to deal with http handler. 
The goal was to handle with axios and jest. Some things that you can find here:

Axios:
 - Make Request using AxiosConfig 

Jest:
 - Mocking request through:
    - service wrapper
    - axios itself
    - axios itself by using axios-mock-adapter

Fake Server API
  - connect-api-mocker library: Running the project using a Fake API Server drived by file structure  

## Published version

This project is published at: [https://andrebnassis.github.io/web-http-request-handler/](https://andrebnassis.github.io/web-http-request-handler/)

reference: [https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f](https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f)

If you want to see this application in action but you don't have a Server set up to receive the API calls, I suggest you to create a public bin on RequestBin and send requests to the generated endpoint.

 1. Just enter on: [https://requestbin.com/](https://requestbin.com/)
 2. Click on "Create a public bin instead."
 3. Make a request using the 'web http request handler' application and see the results on your public bin at RequestBin.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run dev`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Runs the the Fake Api Server.\
It will be served on [http://localhost:9000](http://localhost:9000)

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
