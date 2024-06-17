[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/AVMm0VzU)
# Exam #N: "Exam Title"
## Student: s123456 LASTNAME FIRSTNAME 

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...


## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)


## API Server
- GET `/users`: Get a ranking about all users! Show username and total point.
- GET `/users/:username`: Get Info about the user. Show username and total point. User must be logged in -> Is same user through also the email
  - request parameters
  - response body content
  - response status codes and possible errors

- GET `/games`: Show history of all games by the logged user

- GET `/games/:game_id`: Show info, from history, about a single game of a user

- GET `/rounds/:round_id`: Show info about a specific round  

- POST `/rounds`: Add a round. Automatically showned if not logged user, otherwise stored temporally and go to next round

- POST `/games`: Add a games. 
## Database Tables

- Table `users` - (id, username, email, password, salt, total_point)
- Table `memes` - (id, path_img)
- Table `captions` - (id, description)
- Table `best_captions` - (meme_ID, caption_ID)
- Table `rounds` - (id, meme_ID, first_best_caption_ID, second_best_caption_ID, selected_caption_ID, point, game_ID)
- Table `games` - (id, user_id, date)

## Screenshots

![Screenshot1](./img/screenshot.jpg)

![Screenshot2](./img/screenshot.jpg)


## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)
