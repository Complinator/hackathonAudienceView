# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

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

# Initializing and Deploying firebase
## Download and init firebase
First of all, install the firebase tools by running
```console
$ npm install -g firebase-tools
```

That should download firebase as a global script, allowing you to run firebase commands. If you are encountering the error `cannot be loaded because running scripts is disabled on this system`, then, reopen the window as an administrator and run
```console
$ Set-ExecutionPolicy RemoteSigned
```

With that, you are changing the powershell security policy value in order to let you perform such scripts. Else you can run 
```console
$ Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

to change the current value of the policy just for the actual user.
With that, the command `firebase --version` should throw the actual version installed.
Then you have to login into firebase by doing (It should open you a window where you have to login to your firebase account)
```console
$ firebase login
...
? Allow Firebase to collect CLI and Emulator Suite usage and error reporting information? Yes
+  Success! Logged in as <MailAcc>
```

## Set up firebase an venv for deployment
Firstly, is important to init the firebase functions running
```console
$ firebase init functions
...
? Are you ready to proceed? Yes
? Would you like to initialize a new codebase, or overwrite an existing one? Overwrite
? What language would you like to use to write Cloud Functions? Python
? File functions/requirements.txt already exists. Overwrite? No
? File functions/.gitignore already exists. Overwrite? No
? File functions/main.py already exists. Overwrite? No
? Do you want to install dependencies now? Yes
```
That would probably throw `ERROR: To modify pip, please run the following command...`
So we have to set up the venv for this `functions` instance. For that, firstly we move to the functions folder inside frontend by doing `cd .\frontend\functions\`, and we init the venv by doing:
```console
$ .\venv\Scripts\Activate.ps1
(venv) $ pip install -r requirements.txt
...
$ pip show firebase-functions
```
If there was no error, then you can proceed by deploying the app using 
```console
$ firebase deploy --only functions
...
? Would you like to proceed with deletion? Selecting no will continue the rest of the deployments. No
+  Deploy complete!
```

Then you can freely use the app and check every change on the firebase webapp