# API Documentation

## User API Endpoints

### 1. Register User

**Endpoint:** `POST /app/vr1/register`

**Description:** Register a new user.

**Request Body:**
- `name` (string, required): User's name.
- `email` (string, required): User's email address.
- `password` (string, required): User's password (min. 8 characters, at least one alphabet, one numeric character, and one special character).

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `token` (string): JWT token for the registered user.

### 2. Login User

**Endpoint:** `POST /app/vr1/login`

**Description:** User login.

**Request Body:**
- `email` (string, required): User's email address.
- `password` (string, required): User's password.

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `token` (string): JWT token for the authenticated user.

### 3. Logout User

**Endpoint:** `GET /app/vr1/logout`

**Description:** Logout the authenticated user.

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `message` (string): Logout success message.

### 4. Forgot Password

**Endpoint:** `POST /app/vr1/password/reset`

**Description:** Request to reset user's password. An email with reset instructions will be sent to the user.

**Request Body:**
- `email` (string, required): User's email address.

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `message` (string): Email sent success message.

### 5. Reset Password

**Endpoint:** `PUT /app/vr1/password/change/:token`

**Description:** Reset user's password using the provided reset token.

**Path Parameter:**
- `token` (string, required): Reset token received via email.

**Request Body:**
- `password` (string, required): New password.
- `confirmPassword` (string, required): Confirm new password.

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `token` (string): JWT token for the user with updated password.

### 6. Get User Profile

**Endpoint:** `GET /app/vr1/me`

**Description:** Get the profile details of the authenticated user.

**Required Authentication:** Yes

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `user` (object): User's profile details.

### 7. Update User Password

**Endpoint:** `PUT /app/vr1/me/updatepassword`

**Description:** Update authenticated user's password.

**Required Authentication:** Yes

**Request Body:**
- `OldPassword` (string, required): User's current password.
- `newPassword` (string, required): User's new password.
- `confirmPassword` (string, required): Confirm new password.

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `token` (string): JWT token for the user with updated password.

### 8. Update User Profile

**Endpoint:** `PUT /app/vr1/me/updateprofile`

**Description:** Update authenticated user's profile details.

**Required Authentication:** Yes

**Request Body:**
- `name` (string): Updated name.
- `email` (string): Updated email address.

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `token` (string): JWT token for the user with updated profile details.

### 9. Get All Users (Admin)

**Endpoint:** `GET /app/vr1/admin/getusers`

**Description:** Get details of all users. (Admin access required)

**Required Authentication:** Yes (Admin)

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `users` (array): List of user objects.

### 10. Get Single User (Admin)

**Endpoint:** `GET /app/vr1/admin/getuser/:id`

**Description:** Get details of a single user by ID. (Admin access required)

**Required Authentication:** Yes (Admin)

**Path Parameter:**
- `id` (string, required): ID of the user to fetch.

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `user` (object): User object.

### 11. Update User Role (Admin)

**Endpoint:** `PUT /app/vr1/admin/updaterole/:id`

**Description:** Update user's role by ID. (Admin access required)

**Required Authentication:** Yes (Admin)

**Path Parameter:**
- `id` (string, required): ID of the user to update.

**Request Body:**
- `name` (string): Updated name.
- `email` (string): Updated email address.
- `role` (string): Updated role ("admin", "user", etc.).

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `token` (string): JWT token for the user with updated role.

### 12. Delete User (Admin)

**Endpoint:** `DELETE /app/vr1/admin/deleteuser/:id`

**Description:** Delete a user by ID. (Admin access required)

**Required Authentication:** Yes (Admin)

**Path Parameter:**
- `id` (string, required): ID of the user to delete.

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `message` (string): Deletion success message.

---

## Place API Endpoints

### 1. Add Place

**Endpoint:** `POST /app/vr1/place/addplace`

**Description:** Add a new place to the database. (Admin access required)

**Required Authentication:** Yes (Admin)

**Request Body:**
- `name` (string, required): Name of the place.
- `placeCategory` (string, required): Category of the place.
- `placeAddress` (object, required):
  - `textAddress` (string, required): Textual address of the place.
  - `pinCode` (number, required): Pin code of the place.
  - `coordinates` (array, optional):
    - `latitude` (number): Latitude coordinate of the place.
    - `longitude` (number): Longitude coordinate of the place.
- `contactNo` (number, optional): Contact number of the place.
- `images` (string,optional):image of the place.
- `timings` (object, optional):
  - `opening` (date): Opening time of the place.
  - `closing` (date): Closing time of the place.

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `place` (object): Details of the added place.

### 2. Update Place

**Endpoint:** `PUT /app/vr1/place/updateplace/:id`

**Description:** Update details of an existing place. (Admin access required)

**Required Authentication:** Yes (Admin)

**Path Parameter:**
- `id` (string, required): ID of the place to be updated.

**Request Body:** Same as the request body for adding a place.

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `place` (object): Updated details of the place.

### 3. Delete Place

**Endpoint:** `DELETE /app/vr1/place/deleteplace/:id`

**Description:** Delete a place from the database. (Admin access required)

**Required Authentication:** Yes (Admin)

**Path Parameter:**
- `id` (string, required): ID of the place to be deleted.

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `message` (string): Deletion success message.

### 4. Get Place by Pincode

**Endpoint:** `GET /app/vr1/place/getplace`

**Description:** Retrieve places from the database based on pincode.

**Required Authentication:** Yes

**Query Parameter:**
- `pinCode` (number, optional): Pin code to filter places.

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `places` (array): List of places matching the query parameters.

### 5. Get Location by Text Address

**Endpoint:** `GET /app/vr1/place/getlocation`

**Description:** Retrieve places from the database based on text address query.

**Required Authentication:** Yes

**Query Parameter:**
- `textAddress` (string, required): Textual address to search for places.

**Response:**
- `success` (boolean): Indicates whether the request was successful.
- `places` (array): List of places matching the text address query.

---

Feel free to modify the API documentation according to your specific needs or add additional details if required.
