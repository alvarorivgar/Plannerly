# Plannerly

## Description

A website to organise events for people by people.
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **events create** - As an organiser I want to create an event so that I can invite others to attend
- **events detail** - As a user I want to see the event details to see if I want to join and as an organiser I want to see a list of atendees to see who is going
- **event attend** - As a user I want to be able to attend to event so that the organizers can count me in
- **event fav** - As a user I want to be able to save an event in my favourites list so I can go back to it later and decide if I want to attend
- **event delete** - As an organiser I want to delete an event if I need to
- **event edit** - As an organiser I want to be able to modify an event
- **event kick user** - As an organiser I want to be able to kick a user from my event if I need to
- **profile** - As a user I want to be able to see my attended/favourited events and as an organiser I want to be able to see a list of events I have organised
- **profile comments** - As a user/organiser I want to see what others think about users and to be able to leave my review
- **profile edit** - As a user I want to be able to add my personal details to my profile for others to see
- 

## Backlog

List of other features outside of the MVPs scope

User profile:
- change my username, password and email
- upload my profile picture

Geo Location:
- add geolocation to events when creating
- show event in a map in event detail page

Search bar:
- add a search option with filters


## ROUTES:

- GET / 
  - renders the homepage
- GET /auth/signup
  - user does not see the option if user logged in
  - renders the signup form
- POST /auth/signup
  - body:
    - username
    - email
    - password
    - repeat password
    - redirects to login page if sing up is successful

- GET /auth/login
  - user does not see it if user logged in
  - renders the login form

- POST /auth/login
  - redirects to /my-profile after log in
  - creates a session
  - body:
    - username
    - password
- POST /auth/logout
  - destroys session
  - redirects to / page

- GET /events/all
  - renders the event list

- GET /events/create
    - renders event creation form

- POST /events/create 
  - redirects to /auth/login if user is anonymous
  - redirects to /events/all if event creation is successful
  - body: 
    - name
    - price
    - date
    - location
    - slots
    - description
    - event image

- GET /events/:id/details
  - renders the event detail page
  - includes the list of attendees if event is created by user
  - attend button 
  - fav button

- GET /events/:id/edit
    - renders event edit form
    - not available if user is not the creator of the event
    - body: 
        - name
        - price
        - date
        - location
        - slots
        - description
        - event image

- POST /events/:id/edit
    - redirects to events/:id/details page if successful

- POST /events/:id/delete
    - not available if user is not the creator of the event
    - redirects to events/all page

- POST /events/:id/attend 
  - redirects to /auth/login if user is anonymous
  - adds user to list of attendees and updates number of available slots
  - button not available if event is full

- POST /events/:id/fav
    - redirects to /auth/login if user is anonymous
    - add event to user's favourites list

- POST /events/:id/kick-user
    - redirects to /auth/login if user is anonymous
    - removes user from attendees list
    - not available if user is not the creator of the event

- GET /profile/my-profile
    - renders user's private profile
    - shows attended/favourite/organised events
    - shows other users' comments

- GET /profile/my-profile/edit
    - renders profile edit form
    - body:
        - age
        - city
        - bio
        - profile picture

- POST /profile/my-profile/edit
    - redirects to /profile/my-profile if successful

- GET /profile/user/:id/details
    - renders user's public profile
    - shows attended/favourite/organised events
    - shows other users' comments

- POST /profile/user/:id/comment
    - adds a comment in the user's profile
    - redirects to /profile/user/:id/details



## Models

User model
 
```
username: String
email: String
password: String
attendedEvents: [ObjectId<Event>]
favouriteEvents: [ObjectId<Event>]
role: enum: ["organiser", "user"]
age: Number
city: String
bio: String
image: String
comment: [ObjectId<Comment>]
```

Event model

```
name: String
price: Number
date: Date
location: String
slots: Number
description: String
creator: ObjectId<User>
image: String
``` 

Comment model
```
comment: String
poster: ObjectId<User>
date: Date
```


## Links

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/alvarorivgar/Plannerly)

[Deploy Link](https://plannerly.cyclic.app/)

### Slides

The url to your presentation slides

[Slides Link]()
