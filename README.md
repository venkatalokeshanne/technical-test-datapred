## HOW TO RUN TO THIS REACT APPLICATION WITHOUT CORS ERROR:

I had a CORS error which need to be resolved in backend,
Usually its not possible to test the api in browser without adding some parameters in backend related to cors,
It will work on api testing tools like 'postman' but when it comes to browser it will fail.

However since i dont have time to contact the backend to resolve this.
I disable the cors in my chrome browser windows.
I added the instructions below to disable also on your browser for the app to work.

##  For Windows:

Open the start menu
Type windows+R or open “Run”
Execute the following command: chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security

##  For Mac:

Go to Terminal
Execute the following command: open /Applications/Google\ Chrome.app --args --user-data-dir="/var/tmp/Chrome dev session" --disable-web-security

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Deployment

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
