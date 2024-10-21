For running the app u can use: 'npm install' and thereafter 'npm run start:dev'
To imitate requests to the server, you can use tools like curl from the command line or Postman(for example)
curl request examples for using:
##
Get All Users:
curl -X GET http://localhost:8080/api/users
##
Get User by ID.
Replace {userId} with the actual user ID:
curl -X GET http://localhost:8080/api/users/{userId}
##
Create a new User:
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"age": 25, "hobbies": ["reading", "gaming"]}'
##
Update an Existing User.
Replace {userId} with the actual user ID:
 curl -X PUT http://localhost:3000/api/users/{userId} \
  -H "Content-Type: application/json" \
##
Delete a User.
Replace {userId} with the actual user ID:
curl -X DELETE http://localhost:3000/api/users/{userId}