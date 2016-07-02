# image-comparison-tools
This is an example of tools that can be used to compare an overlay image

# Explanation
The purpose of this app if to demonstrate the use of web based image comparison tools while connecting to backend server and database.  The tools are built with javascript and jQuery, the backend with node and the database with Mongo.

On the initial running of the app, the app will attempt to add image paths to a mongo database to be used at run time.  When the index path is accessed the route grabs all image path objects from the db and displays their id with a link.  In this example there will only be one.

The link routes to the individual images image overlay tool.  The data base is accessed for that images paths specific ID and is then rendered with pug (previously Jade).

# The tools
The image overlay tools include and swipe that reveals or hides the overlay, a zoom, a grab tool to move the image around once zoomed, and a slider that adjusts the opacity of the overlay.

#Launching the app
The app is on display at [https://imageoverlay.herokuapp.com](https://imageoverlay.herokuapp.com).  The app is deployed using heroku and the deployment DB is on MongoLabs.

The app is built to run locally with no adjustments with the following steps:

1. Ensure node and npm are installed and up to date.
2. Ensure you have a mongoDB installed and running properly
3. In terminal run:
  1. git clone https://github.com/andrewsheffield/image-comparison-tools.git
  2. cd image-comparison-tools
  3. npm install
  4. npm start
4. The app will run locally on [http://localhost:3000](http://localhost:3000)
