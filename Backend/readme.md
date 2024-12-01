Here's a `README.md` file for documenting the `users/register` endpoint. This file should be placed in the `Backend` folder.

```markdown:Backend/README.md
# User Registration Endpoint Documentation

## Endpoint: `/register`

### Method: `POST`

### Description:
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password. Upon successful registration, it returns a JSON object containing an authentication token and the user details.

### Request Body:
The request body should be in JSON format and include the following fields:

- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters.
  - `lastname`: A string (optional).
- `email`: A valid email address.
- `password`: A string with a minimum length of 6 characters.

#### Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Response:

#### Success (201 Created):
- **Status Code**: `201`
- **Response Body**:
  - `token`: A JWT token for authentication.
  - `user`: An object containing the user's details.

#### Example:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### Error (400 Bad Request):
- **Status Code**: `400`
- **Response Body**: An array of error messages indicating validation failures.

#### Example:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Full Name is too short less than 3",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### Notes:
- Ensure that the `Content-Type` header is set to `application/json` when making requests to this endpoint.
- The `token` returned should be stored securely on the client-side for authenticating subsequent requests.
```

This documentation provides a clear overview of the `users/register` endpoint, including the required request format, possible responses, and example data.