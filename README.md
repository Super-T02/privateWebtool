# Instalation on a RaspberryPi

Make shure you have installed node.js, npm and serve on the raspberrypi!

## 1. Get the actual build files
Got to the actual releases and move them on your RaspberryPi in a own diractory
(opt.) For devs:
clonde git Repository
Open Terminal in the cloned folder
Run `npm install`
Run `npm run build`
In the folder **./build** the finished build will be generated
Additionaly you should copy the folder **./backend**.
Move/ Paste poth dirs to your pi

## 2. Install all needed package for the backend
Go into the dir of the backend and run in Terminal: `sudo npm install`

## 2. Activate services for starting the app on boot
In the following steps the backend and the front-end are in to different dirs. Their paths are **[PATHTOBACKEND]** and **[PATHTOFRONTEND]** please work here with absolute paths.

We will generate the services over systemd, code from [learn.sparkfun.com](https://learn.sparkfun.com/tutorials/how-to-run-a-raspberry-pi-program-on-startup#method-3-systemd):

  1. generate the service for the Backend, so open terminal and run:  `sudo nano /lib/systemd/system/backend.service`
  2. Type: 
``` 
  [Unit]
  Description=Starts the backend for my webApp at Port 3001
  After=multi-user.target

  [Service]
  ExecStart=/usr/bin/node [PATHTOBACKEND]

  [Install]
  WantedBy=multi-user.target 
```
Save and close the file

  3. Run in Terminal: `sudo systemctl daemon-reload` && `sudo systemctl enable backend.service`
  4. generate the Service for the Frontent, type in terminal: `sudo nano /lib/systemd/system/webApp.service`
  5. Type:
``` 
  [Unit]
  Description=Starts my webApp at Port 80
  After=multi-user.target

  [Service]
  ExecStart=/usr/local/bin/serve -s [PATHTOFRONTEND] -l 80

  [Install]
  WantedBy=multi-user.target 
```
6. Run in Terminal: `sudo systemctl daemon-reload` && `sudo systemctl enable webApp.service`
7. Type `sudo reboot` for starting the services

## Finished
The App itself runs on port 80. So `http://[nameOfPi]` in the Browser and the backend runs on port 3001: `http://[nameOfPi]:3001`














# Autogenarated from React

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

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
