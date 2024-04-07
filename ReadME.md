Cricbuzz API

This project provides an API for managing cricket matches, teams, and players, inspired by Cricbuzz.

Installation

Clone the repository:
git clone <repository_url>

Install dependencies:

npm install

Dependencies
bcryptjs: ^2.4.3
body-parser: ^1.20.2
dotenv: ^16.4.5
express: ^4.19.2
jsonwebtoken: ^9.0.2
mongoose: ^8.3.0
uuid: ^9.0.1

Dev Dependencies
nodemon: ^3.1.0

Usage
Start the server:

npm start

Import the provided Postman collection for testing the APIs.

Set up environment variables in Postman:

Create a new environment.
Add variables for BASE_URL and TOKEN (if required).
Set the values according to your setup.
Test the APIs using the provided collection.

API Endpoints

[POST] /api/admin/signup: Register an admin user.

[POST] /api/admin/login: Login as an admin user.

[POST] /api/matches: Create a new match.

[GET] /api/matches: Get all match schedules.

[GET] /api/matches/{match_id}: Get details of a specific match.

[POST] /api/teams/{team_id}/squad: Add a player to a team's squad.

[GET] /api/players/{player_id}/stats: Get statistics of a player.

`soon fixing errors many more can be done created in 5 hours`
