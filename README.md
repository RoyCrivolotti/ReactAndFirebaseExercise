# ReactAndFirebaseExercise

This is a demo application I'm using to check out React among some other things like Firebase and authentication. Originally, it was part of an interview process.

This application consists of a REST-API consumed by a React app, with the backend written in Node.

## Initial decisions

I wanted to check out Firebase a bit because it was a simple solution regarding storage, authentication, role-based access to data and hosting.

Right now, I'm using Firebase as a storage solution alone.

## Implemented and planned functionalities

* REST API to answer to
	* /api
	* /api/search?coor_x=NUMBER&coor_y=NUMBER&max_results=NUMBER
	* /api/search?coor_x=NUMBER&coor_y=NUMBER&max_results=NUMBER&sort_by=filter
* React app to display:
	* Main page with list of restaurants
	* Page to consume the /api/search endpoint
	* Pages with sign in and sign up layouts (not functional/finished yet)
	* Restaurant details page with reviews and the functionality to make reservations (not finished yet)
* Organized React components and backend code
* Authentication:
	* Authentication with Firebase (not finished yet)
	* Proper cookie management to deal with sessions and permissions (not implemented yet)
* A favorites tab for users to save their favorite restaurants (not implemented yet)
* Submit a request to add a new restaurant and for an admin to approve it (not implemented yet)
	* Maybe differentiated admin accounts, user accounts and restaurant accounts
* Hosting (not implemented yet)
* Have the Webpack development server proxy our API requests to our API server (not implemented yet)

## Testing locally

*First of all*, I'm not committing the API key for the time being, so anyone wanting to use this would have to create a Firebase project, use the data.json file I'm commiting to populate a Real Time DB, and then create the proper `.env` and `.env.development` files. This also implies setting up the rules for your Firebase project and whatnot.

Run `npm i` from the project's root folder to install the dependencies.

#### Testing the backend as a standalone
To test the REST API, run `npm run server`, which fires the backend entry file, `server.js`, with `nodemon`'s help.

Either with `curl` or straight up in the browser, the endpoints supported right now are:
* http://localhost:5000/api/
* http://localhost:5000/api/search?coor_x=NUMBER&coor_y=NUMBER&max_results=NUMBER

#### Testing the integration
Simply running `npm start` would bring the Node server up, and the React app would be served statically. Here, the applciation would be available on port `5000`.

To test the integration as dev one can run `npm run dev`, which sets the environment to `development`. Here the React app runs on port `3000` and the backend on port `5000`. However, for this one would have to go to the NearMe component and modify the fetch there to include `http://localhost:5000/` -or one would have to configure Webpack to inject it.
