Shared Shopping List API (REST’ish)
Overview

This document describes the REST’ish API for the Shared Shopping List application.
The API allows users to manage shared shopping lists, list items, and list members (sharing).

Note:

User creation, login, and authentication are out of scope for this assignment and are not implemented.

All endpoints assume a “current user” exists.

The API is scaffolded, meaning responses are mock/placeholder data and not persisted in a database yet.

Base URL
/api

Common Response Codes
Status Meaning
200 Request successful
201 Resource created
400 Bad request (missing or invalid input)
401 Unauthorized (reserved for future auth)
403 Forbidden (not a list member / insufficient rights)
404 Resource not found
Health Check
GET /health

Check that the API is running.

Response

{
"ok": true,
"message": "API is running"
}

Lists
GET /lists

Get all shopping lists the current user has access to.

Response

{
"data": [
{ "id": "list_1", "title": "Weekly groceries", "role": "owner" },
{ "id": "list_2", "title": "Party shopping", "role": "member" }
],
"note": "Scaffold response"
}

POST /lists

Create a new shopping list.

Request Body

{
"title": "Weekly groceries"
}

Response (201)

{
"data": {
"id": "list_new",
"title": "Weekly groceries"
},
"note": "Scaffold response"
}

GET /lists/:listId

Get a specific shopping list.
This endpoint is protected by middleware that checks list membership.

Response

{
"ok": true,
"listId": "123",
"access": {
"listId": "123",
"role": "member"
},
"note": "Scaffold response"
}

Items (Nested Resource)

Items always belong to a specific list.

GET /lists/:listId/items

Get all items in a shopping list.

Response

{
"listId": "123",
"data": [
{ "id": "item_1", "name": "Milk", "quantity": 2, "unit": "pcs", "done": false },
{ "id": "item_2", "name": "Eggs", "quantity": 12, "unit": "pcs", "done": true }
],
"note": "Scaffold response"
}

POST /lists/:listId/items

Add a new item to a shopping list.

Request Body

{
"name": "Milk",
"quantity": 2,
"unit": "pcs"
}

Response (201)

{
"listId": "123",
"data": {
"id": "item_new",
"name": "Milk",
"quantity": 2,
"unit": "pcs",
"done": false
},
"note": "Scaffold response"
}

Members (Sharing)

Members represent users who have access to a shopping list.

POST /lists/:listId/members

Invite a new member to a shopping list by email.

Request Body

{
"email": "friend@example.com",
"role": "member"
}

Response (201)

{
"listId": "123",
"data": {
"id": "member_new",
"email": "friend@example.com",
"role": "member"
},
"note": "Scaffold response (invite not implemented)"
}

Authorization Notes

Access control is handled by Express middleware.

Middleware validates list access before route handlers run.

Role-based authorization (owner vs member) is planned but not fully implemented yet.

Testing the API

A Bruno API test collection is included in the repository:

tests/bruno/SharedShoppingListAPI

To test:

Start the server with npm run dev

Open Bruno

Open the collection folder

Use the local environment

Implementation Status

This API is intentionally scaffolded:

No database persistence yet

Responses are mock data

Structure and routes are designed for future expansion
