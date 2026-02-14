Shared Shopping List API
Overview

This document describes the REST-style API for the Shared Shopping List application.

The API allows users to:

Create and authenticate accounts

Accept Terms of Service

Create and manage shopping lists

Add and manage list items

Share lists with other users

Delete their account

Base URL:

/api

Common Response Codes
Status Meaning
200 Request successful
201 Resource created
400 Bad request (missing or invalid input)
401 Unauthorized
403 Forbidden (not a list member / insufficient rights)
404 Resource not found
Health
GET /health

Check that the API is running.

Response
{
"ok": true,
"message": "API is running"
}

Users
POST /users

Create a new user account.

Request Body
{
"email": "user@example.com",
"password": "password123",
"acceptTos": true
}

Rules

acceptTos must be true

If missing or false → 400 Bad Request

Response (201)
{
"id": "user_123",
"email": "user@example.com",
"tosAccepted": true
}

POST /login

Authenticate a user.

Request Body
{
"email": "user@example.com",
"password": "password123"
}

Response (200)
{
"token": "jwt-or-session-token"
}

DELETE /users/:id

Delete user account and associated data.

Response (200)
{
"message": "Account deleted"
}

Lists
GET /lists

Get all shopping lists the current user has access to.

Response
{
"data": [
{ "id": "list_1", "title": "Weekly groceries", "role": "owner" },
{ "id": "list_2", "title": "Party shopping", "role": "member" }
]
}

POST /lists

Create a new shopping list.

Request Body
{
"title": "Weekly groceries"
}

Response (201)
{
"id": "list_new",
"title": "Weekly groceries"
}

GET /lists/:listId

Get a specific shopping list.

Protected by requireListMember middleware.

Response
{
"id": "list_1",
"title": "Weekly groceries"
}

Items
GET /lists/:listId/items

Get all items in a shopping list.

POST /lists/:listId/items

Add an item to a shopping list.

Request Body
{
"name": "Milk",
"quantity": 2,
"unit": "pcs"
}

Members (Sharing)
POST /lists/:listId/members

Invite a new member to a shopping list.

Request Body
{
"email": "friend@example.com",
"role": "member"
}

Authorization

List access is protected by custom Express middleware:

requireListMember

Validates that the current user is a member of the list

Returns 403 Forbidden if not authorized

Calls next() if access is allowed

Owner-only operations may use requireListOwner.

Terms of Service & Privacy

The API requires users to actively accept the Terms of Service during account creation.

Consent is stored on the server.

Users may delete their account at any time.

Relevant documents:

docs/terms-of-service.md

docs/privacy-policy.md

Testing

Bruno test collection is included in:

tests/bruno/SharedShoppingListAPI

To test:

Run npm run dev

Open Bruno

Use the local environment

Run the collection
