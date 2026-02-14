Shared Shopping List App
Overview

Shared Shopping List is a full-stack application where users can create shopping lists, add items, and share lists with other users. The backend exposes a REST-style API, and the frontend is a modular JavaScript client.

The application includes Terms of Service and a Privacy Policy. Users must actively consent to the Terms of Service when creating an account and can delete their account at any time.

Features
User & Consent

Create user account (requires explicit Terms of Service consent)
Login (session token based authentication)
Edit profile (update display name)
Delete account (withdraw consent)

Lists & Sharing

Create and view shopping lists

Add items to a list

Share lists with members (role-based access where applicable)

Tech Stack

Node.js + Express (API)

Vanilla JavaScript (client)

Bruno (API testing)

Client Architecture

The client follows a modular ES module structure:

- views/ – UI (custom web components)
- controllers/ – application logic
- data/ – models and state (including token handling)
- modules/ – utilities (the single fetch call lives in modules/fetchManager.mjs)

All API calls use relative URLs and authentication tokens are attached automatically.

Project Structure
Client/
index.html
app.mjs
app.css
controllers/
data/
modules/
views/
...client modules...

Server/
src/
main.js
routes/
middleware/
services/
stores/

docs/
api_documentation.md
privacy-policy.md
terms-of-service.md

tests/
...Bruno collection...

How to Run

Install dependencies:

npm install

Start the server (development):

npm run dev

The API will run on:
http://localhost:3000

The client is served statically by the server and can be accessed at:
http://localhost:3000/index.html

Documentation

API documentation: docs/api_documentation.md

Terms of Service: docs/terms-of-service.md

Privacy Policy: docs/privacy-policy.md

Middleware: requireListMember
Why it’s needed

Shopping lists are shared between users. The server must prevent a user from reading or updating a list they are not a member of. Without this, a user could guess a listId and access another user’s list.

What it does

requireListMember is an Express middleware that runs before protected route handlers. It checks whether the current user is a member of the requested list:

If the user is a member → next()

If not → returns 403 Forbidden

This ensures list access is enforced server-side.

Authentication middleware (requireAuth) is also used for user-specific endpoints such as PUT /users/me and DELETE /users/me.

Testing (Bruno)

A Bruno test collection is included in the repository.

To run tests:

Start the server using npm run dev

Open Bruno

Open the collection under tests/

Run the collection against http://localhost:3000

Notes

This project is developed for academic purposes.
