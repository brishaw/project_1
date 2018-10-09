# Project 1 - Night Out
Project 1 was a team project that focused on building a web application that served as an MVP, or Most Viable Product.

The following requirements were part of the assignment:

At least two APIs
Uses AJAX to pull data
Utilizes at least one new library or technology that we haven’t discussed
Has a polished frontend / UI 
Meets good quality coding standards (indentation, scoping, naming)
No use of alerts, confirms, or prompts
Has some sort of repeating element (table, columns, etc)
Uses Bootstrap or Alternative CSS Framework
Must be Deployed (Github Pages)
Includes User Input Validation 
Utilize Firebase for Persistent Data Storage
Mobile Responsive


## What will it do?
The Night Out app answers the question of "What should I do tonight?". When an internet search is just too overwhelming, the Night Out app will allow a user to find local events in the area of their choosing. When the user has chosen an event, a list of rated, nearby restaurants will then be displayed on a map. The location pins of the restaurants can be clicked and the corresponding data will be saved for the user to share via email or text.

The application also contains an about page which introduces the developers, a services page which will showcase each feature of the app, a contact page where a user can ask a question or comment on the app and a privacy policy page. 

 ## How does it work?
 The Night Out application uses two APIs; Yelp and SeatGeek to not only find you entertainment at your location, but also a place to get something to eat, either before or after your event. It can also show you what other people in your area that are using the app are planning for that evening.

 Firebase is used for storing the user's name (optional).

 The application also incorporates HTML5 geolocation and the javascrpt library, Leaflet.js, which allows interactivity with the map.

1. The application will initially ask for the user's name. This function is part of the future build which would allow the user to interact with other Night    Out users or friends. This function would be optional, meaning the user is not required to submit their name.
2. The user will enter their zipcode, or city and state.
3. A results page will be displayed which will include the map and up to 5 events in that users general area. 
4. If the user selects one of the listed events, the map will populate with up to 5 of the nearest eating choices. The restaurant choices can be clicked    
   which will take the user to Yelp.com, where the ratings, menus and more detailed directions would be available.
5. The user can enter a new search from this page or return to the homepage to start over.
   

 ## Who will use this repo or project?
The Night Out application is designed for people who are on the go and need some quick options for planning their evening activity.

 ## What is the goal of this project?
The goal of this project is to build an application that incorporates all of the programming tools learned so far and to do so in a team setting. Learning how to function as a remote team involved breaking the project up into assigned sections, having daily stand-up meetings to check in on progress and using Github's repository.
