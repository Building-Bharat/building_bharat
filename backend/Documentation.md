# Guide for Backend (IMPORTANT: Read this before starting)

## Signup via Email

This endpoint allows users to create a new account by signing up with their email address. It requires the user's name, email, and password, along with a confirmation of the password.

### Request

**Method:** POST  
**Endpoint:** `{{url}}/api/v1/auth/signup/email`

#### Request Body

The request body must be in JSON format and include the following parameters:

- **name** (string): The name of the user. This is a required field.
    
- **email** (string): The email address of the user. This must be a valid email format and is a required field.
    
- **password** (string): The password for the user's account. This is a required field and should meet security requirements (e.g., minimum length, complexity).
    
- **passwordConfirm** (string): A confirmation of the password to ensure it matches the original password. This is a required field.
    

Example of a request body:

``` json
{
  "name": "exampleName",
  "email": "example@example.com",
  "password": "examplePassword123",
  "passwordConfirm": "examplePassword123"
}

 ```

### Response

On a successful signup, the server will respond with a JSON object containing the following structure:

- **status** (string): The status of the request (e.g., success or error).
    
- **token** (string): An authentication token that can be used for subsequent requests.
    
- **data** (object): Contains user details.
    
    - **user** (object): Information about the newly created user.
        
        - **name** (string): The name of the user.
            
        - **email** (string): The email address of the user.
            
        - **active** (boolean): Indicates if the user account is active.
            
        - **role** (string): The role assigned to the user (e.g., admin, user).
            
        - **isVerified** (boolean): Indicates if the user's email has been verified.
            
        - **_id** (string): The unique identifier for the user.
            
        - **createdAt** (string): The timestamp when the user was created.
            
        - **appliedInternship** (array): An array of internships the user has applied for.
            
        - **passwordChangeAt** (string): Timestamp of the last password change.
            
        - **__v** (number): Version key for the document.
            
        - **otp** (string): One-time password for verification.
            
        - **otpExpiresAt** (string): Timestamp when the OTP expires.
            

Example of a successful response:

``` json
{
  "status": "success",
  "token": "your_auth_token_here",
  "data": {
    "user": {
      "name": "exampleName",
      "email": "example@example.com",
      "active": true,
      "role": "user",
      "isVerified": true,
      "_id": "user_id_here",
      "createdAt": "2023-01-01T00:00:00Z",
      "appliedInternship": [],
      "passwordChangeAt": null,
      "__v": 0,
      "otp": "",
      "otpExpiresAt": ""
    }
  }
}

 ```

### Notes

- Ensure that the email provided is unique and not already associated with an existing account.
    
- The password must be confirmed correctly to complete the signup process.




## Verify OTP Endpoint

This endpoint is used to verify a One-Time Password (OTP) sent to a user's email address during the authentication process. It is typically used in scenarios where two-factor authentication is implemented to enhance security.

### Request

- **Method**: POST
    
- **URL**: `{{url}}/api/v1/auth/verify-otp`
    

#### Request Body

The request body must be in JSON format and should contain the following parameters:

- `email` (string): The email address of the user who is attempting to verify the OTP.
    
- `otp` (string): The One-Time Password that was sent to the user's email address.
    

**Example Request Body**:

``` json
{
  "email": "user@example.com",
  "otp": "123456"
}

 ```

### Response

Upon a successful request, the server will respond with a JSON object indicating the result of the OTP verification. The structure of the response may include:

- `status` (string): Indicates whether the verification was successful or failed.
    
- `message` (string): A descriptive message providing additional context about the verification result.
    

**Example Response**:

``` json
{
  "status": "success",
  "message": "OTP verified successfully."
}

 ```

In case of an error, the response may include an error message detailing the reason for failure.

### Notes

- Ensure that the email and OTP provided in the request body are valid and match the ones sent to the user.
    
- This endpoint is crucial for maintaining the security of user accounts by confirming the identity of the user attempting to log in or perform sensitive actions.


### Update My Password

This endpoint allows users to update their password associated with their email account. It requires the user to provide their email and the new password they wish to set.

#### Request

- **Method**: PATCH
    
- **URL**: `http://localhost:5000/api/v1/auth/updateMyPassword`
    
- **Content-Type**: application/json
    

#### Request Body Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| email | string | The email address of the user. |
| password | string | The new password to be set. |

#### Expected Response

Upon a successful request, the server will respond with a status code indicating the success of the operation. The response body may contain a message confirming that the password has been updated successfully.

#### Notes

- Ensure that the email provided is associated with an existing account.
    
- The new password should meet any security requirements set by the application (e.g., minimum length, complexity).
    
- If the request fails, appropriate error messages will be returned to help diagnose the issue.
    

This endpoint allows users to update their password associated with their account. It is a PATCH request that modifies the user's password based on the provided email.

#### Request Method

`PATCH`

#### Endpoint

`http://localhost:5000/api/v1/auth/updateMyPassword`

#### Request Parameters

The request body must be sent in JSON format and should include the following parameters:

- **email** (string): The email address associated with the user's account. This is required to identify the account for which the password is being updated.
    
- **password** (string): The new password that the user wishes to set for their account. This should meet any security requirements set by the application (e.g., minimum length, complexity).
    

#### Expected Response Format

Upon a successful request, the API will return a response indicating the status of the password update. The response will typically include:

- A success message confirming that the password has been updated.
    
- An HTTP status code indicating the result of the operation (e.g., 200 OK for success).
    

#### Additional Notes

- Ensure that the email provided corresponds to an existing account; otherwise, the request may fail.
    
- The password should adhere to any specified security policies to avoid validation errors.
    
- This endpoint is intended for authenticated users; ensure that proper authentication mechanisms are in place before making the request.

### Request Password Reset

This endpoint allows users to request a password reset by providing their registered email address. Upon successful submission, a password reset email will be sent to the user.

#### Request

- **Method**: POST
    
- **URL**: `{{url}}/api/v1/auth/forget-password`
    
- **Content-Type**: application/json
    

#### Request Body Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| email | string | The email address of the user requesting a password reset. This is required to process the request. |

#### Expected Response

Upon a successful request, the server will respond with a status code of 200 and a message confirming that the password reset email has been sent.

- **Success (200)**:
    
    - **Message**: string - Confirmation message indicating that the password reset email has been sent.
        
- **Error (400)**:
    
    - **Message**: string - Error message indicating that the email is invalid or not found.
        

#### Additional Notes

- Ensure that the email provided is associated with an existing account to avoid errors.
    
- This endpoint is intended for users who have forgotten their password and need assistance in resetting it.
    

This endpoint allows users to request a password reset by providing their registered email address. Upon successful submission, a password reset email will be sent to the user.

#### Request

- **Method**: POST
    
- **URL**: `{{url}}/api/v1/auth/forget-password`
    
- **Content-Type**: application/json
    

#### Request Body Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| email | string | The email address of the user requesting a password reset. This is required to identify the account. |

#### Expected Response

Upon a successful request, the server will respond with a status code of 200 and a message confirming that the password reset email has been sent.

- **Success (200)**:
    
    - **Message**: Confirmation message indicating that the password reset email has been sent.
        
- **Error (400)**:
    
    - **Message**: Error message indicating that the email is invalid or not found.
        

#### Additional Notes

- Ensure that the email provided is associated with an existing account to receive the password reset instructions.
    
- This endpoint is intended for users who have forgotten their password and need assistance in resetting it.
    

This endpoint allows users to update their password associated with their email account. It requires the user to provide their email and the new password they wish to set.

## Reset Password API

This endpoint allows users to reset their password. It is intended for use when a user has requested to change their password, typically after a password reset request has been initiated.

### Request

- **Method:** POST
    
- **URL:** `http://localhost:5000/api/v1/auth/reset-password/{token}`
    

#### Request Body

The request body must be in JSON format and should include the following parameters:

- **password** (string): The new password that the user wishes to set. It should meet the application's password requirements.
    
- **passwordConfirm** (string): A confirmation of the new password. This should match the `password` field to ensure that the user has entered their desired password correctly.
    

**Example Request Body:**

``` json
{
  "password": "your_new_password",
  "passwordConfirm": "your_new_password"
}

 ```

### Response

Upon a successful password reset, the API will respond with a status indicating the success of the operation. The structure of the response may include:

- **status** (string): A message indicating whether the password reset was successful.
    
- **message** (string): Additional information or confirmation regarding the password reset.
    

**Example Response:**

``` json
{
  "status": "success",
  "message": "Password has been reset successfully."
}

 ```

### Notes

- Ensure that the `token` in the URL is valid and corresponds to the user's password reset request.
    
- The passwords must comply with the security policies defined by the application.

## Login with Email

This endpoint allows users to log in using their email and password. Upon successful authentication, it returns a JSON Web Token (JWT) along with user details.

### Request

- **Method:** POST
    
- **URL:** `http://localhost:5000/api/v1/auth/login/email`
    
- **Content-Type:** application/json
    

#### Request Body

The request body must be a JSON object containing the following parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| email | string | The email address of the user. |
| password | string | The password associated with the user account. |

### Response

On a successful login, the response will include the following fields:

- **Status:** A string indicating the status of the response.
    
- **Token:** A string representing the JWT token for authenticated sessions.
    
- **Data:** An object containing user information:
    
    - **User:** An object with the following fields:
        
        - **_id:** (string) The unique identifier for the user.
            
        - **name:** (string) The name of the user.
            
        - **email:** (string) The email address of the user.
            
        - **active:** (boolean) Indicates if the user's account is active.
            
        - **role:** (string) The role assigned to the user (e.g., admin, user).
            
        - **isVerified:** (boolean) Indicates if the user's email is verified.
            
        - **createdAt:** (string) The date and time when the user account was created.
            
        - **appliedInternship:** (array) A list of internships the user has applied for.
            
        - **passwordChangeAt:** (string) Timestamp of the last password change.
            
        - **__v:** (number) Version key for the user document.
            
        - **coursePurchased:** (array) List of courses purchased by the user.
            
        - **isSubscribed:** (boolean) Indicates if the user is subscribed to any services.
            
        - **lastEmailSent:** (string) Timestamp of the last email sent to the user.
            
        - **passwordResetExpires:** (string) Timestamp indicating when the password reset token expires.
            
        - **passwordResetToken:** (string) The token used for password reset.
            

### Example Response

``` json
{
    "status": "",
    "token": "",
    "data": {
        "user": {
            "_id": "",
            "name": "",
            "email": "",
            "active": true,
            "role": "",
            "isVerified": true,
            "createdAt": "",
            "appliedInternship": [],
            "passwordChangeAt": "",
            "__v": 0,
            "coursePurchased": [""],
            "isSubscribed": true,
            "lastEmailSent": "",
            "passwordResetExpires": "",
            "passwordResetToken": ""
        }
    }
}

 ```

Ensure that all fields are properly populated in the response based on the user's account status and details.

This endpoint allows users to authenticate themselves using their email and password. Upon successful authentication, the server will return a token that can be used for subsequent requests requiring authorization.

### Request

**Method:** POST  
**Endpoint:** `/api/v1/auth/login/email`

#### Request Body

The request body must be in JSON format and include the following parameters:

- **email** (string): The email address of the user attempting to log in. This should be a valid email format.
    
- **password** (string): The password associated with the user's account. It should meet the application's security requirements.
    

**Example Request Body:**

``` json
{
  "email": "user@example.com",
  "password": "your_password"
}

 ```

### Response

The response will be in JSON format and will include the following structure:

- **token** (string): A unique token generated for the authenticated session. This token should be included in the header of subsequent requests to access protected resources.
    
- **message** (string): A message indicating the result of the login attempt, such as success or failure.
    

**Example Response:**

``` json
{
  "token": "your_generated_token",
  "message": "Login successful"
}

 ```

### Notes

- Ensure that the email and password are correct to avoid authentication errors.
    
- The token returned upon successful login should be kept secure, as it grants access to protected endpoints.


## Admin Registration API

This endpoint allows for the registration of a new admin user. It accepts a JSON payload containing the necessary details for creating an admin account.

### Request Parameters

The following parameters should be included in the request body:

- **name** (string): The name of the admin user. This is a required field.
    
- **email** (string): The email address for the admin user. This must be a valid email format and is also required.
    
- **password** (string): The password for the admin account. It should meet the security requirements set by the application.
    
- **passwordConfirm** (string): A confirmation of the password. This must match the password field to ensure accuracy.
    
- **adminKey** (string): A unique key that may be required for admin verification during the registration process.
    

### Expected Response

Upon successful registration, the API will return a response indicating the success of the operation. The response will typically include a success message and may contain additional details about the newly created admin user.

### Notes

- Ensure that all fields are filled out correctly before submitting the request.
    
- The password must adhere to the application's security policies.
    
- If the registration fails, the API will return an error message detailing the reason for the failure.
    

This endpoint allows the registration of a new admin user. It is accessed via an HTTP POST request to `{{url}}/api/v1/admin/register`.

#### Request Body

The request requires a JSON payload with the following parameters:

- **name** (string): The name of the admin user.
    
- **email** (string): The email address of the admin user.
    
- **password** (string): The password for the admin account.
    
- **passwordConfirm** (string): A confirmation of the password to ensure it matches.
    
- **adminKey** (string): A unique key required for admin registration.
    

#### Response

Upon a successful registration, the API returns a status code of **201** indicating that the resource has been created. The response body contains a message, which may be used for confirmation or further processing.

#### Expected Outcome

The expected outcome of this request is the successful registration of an admin user, allowing them to access admin functionalities within the application.

This endpoint allows an administrator to register a new admin user.

### Request

**Method:** POST  
**URL:** `{{url}}/api/v1/admin/register`

**Request Body:**

- `name` (string): The name of the admin user.
    
- `email` (string): The email address of the admin user.
    
- `password` (string): The password for the admin account.
    
- `passwordConfirm` (string): Confirmation of the password.
    
- `adminKey` (string): A unique key to authorize the admin registration.
    

### Response

**Status Code:** 201  
**Content-Type:** application/json

**Response Body:**

- `message` (string): A confirmation message indicating successful registration.
    

This endpoint allows for the registration of a new admin user in the system. It requires specific details about the admin user to successfully create an account.

## Request

**HTTP Method:** POST  
**Endpoint:** `{{url}}/api/v1/admin/register`

### Request Body

The request body must be in JSON format and include the following parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | string | The name of the admin user. |
| `email` | string | The email address of the admin user. This must be unique. |
| `password` | string | The password for the admin user. It must meet security requirements. |
| `passwordConfirm` | string | A confirmation of the password to ensure accuracy. |
| `adminKey` | string | A unique key that identifies the admin user. |

### Example Request Body

``` json
{
  "name": "AgnivaAdmin102",
  "email": "agnivamukherjee2006@gmail.com",
  "password": "Admin@1000",
  "passwordConfirm": "Admin@1000",
  "adminKey": "jkSf56Gty80PrtsW67"
}

 ```

## Response

Upon a successful registration, the API will return a response with the following characteristics:

**Status Code:** 201 Created  
**Content-Type:** application/json

### Response Body

The response will contain a message indicating the result of the registration process.

``` json
{
  "message": "admin registered successfully"
}

 ```

## Notes

- Ensure that the email provided is unique to avoid conflicts during registration.
    
- The `password` and `passwordConfirm` fields must match for the registration to be successful.
    
- The `adminKey` is essential for identifying the admin user and should be kept confidential.
    

This endpoint is crucial for managing admin users within the application, and proper validation of the input parameters is necessary to maintain system integrity.


## Admin Login API

This endpoint allows an admin to log in to the system by providing their credentials.

### Request

- **Method**: POST
    
- **URL**: `{{url}}/api/v1/admin/login`
    
- **Request Body** (JSON):
    
    - `email` (string): The email address of the admin.
        
    - `password` (string): The password associated with the admin account.
        

### Response

- **Status Code**: 200
    
- **Content-Type**: application/json
    
- **Response Body** (JSON):
    
    - `token` (string): A token that is generated upon successful login, which can be used for subsequent authenticated requests.
        
    - `admin` (object): An object containing details about the logged-in admin:
        
        - `id` (string): The unique identifier of the admin.
            
        - `name` (string): The name of the admin.
            
        - `email` (string): The email address of the admin.
            

### Example Response

``` json
{
    "token": "",
    "admin": {
        "id": "",
        "name": "",
        "email": ""
    }
}

 ```

This response structure indicates that upon successful authentication, the admin's details and a session token will be returned.

This endpoint allows an administrator to log into the system. It requires the administrator's email and password to authenticate the user. Upon successful authentication, the API responds with a JSON object containing a token for session management, along with the admin's details such as ID, name, and email.

## Request

- **Method:** POST
    
- **URL:** `{{url}}/api/v1/admin/login`
    
- **Request Body:**
    
    - `email` (string): The email address of the administrator.
        
    - `password` (string): The password associated with the administrator's account.
        

## Response

- **Status Code:** 200
    
- **Content-Type:** application/json
    
- **Response Body:**
    
    - `token` (string): A token used for authenticating subsequent requests.
        
    - `admin` (object): Contains details of the logged-in administrator.
        
        - `id` (string): The unique identifier of the administrator.
            
        - `name` (string): The name of the administrator.
            
        - `email` (string): The email address of the administrator.
            

### Expected Outcome

Upon successful login, the administrator will receive a token that can be used for authenticated requests, along with their profile information.

This endpoint allows administrators to log in to the system by providing their credentials. Successful authentication will return a token that can be used for subsequent requests requiring authorization.

### Request

- **Method**: POST
    
- **URL**: `{{url}}/api/v1/admin/login`
    

#### Request Body

The request body must be in JSON format and include the following parameters:

- **email** (string): The email address of the administrator.
    
- **password** (string): The password associated with the administrator's account.
    

**Example Request Body:**

``` json
{
  "email": "admin@example.com",
  "password": "your_password"
}

 ```

 ## Forget Password API

This endpoint allows an administrator to initiate a password reset process by providing their registered email address and an admin key.

### Request

- **Method**: POST
    
- **Endpoint**: `{{url}}/api/v1/admin/forgetPassword`
    
- **Content-Type**: application/json
    

#### Request Body Parameters

| Key | Type | Description |
| --- | --- | --- |
| email | string | The registered email address of the administrator. |
| adminKey | string | A unique key associated with the admin account. |

### Response

- **Status Code**: 200
    
- **Content-Type**: application/json
    

#### Response Body

| Key | Type | Description |
| --- | --- | --- |
| message | string | A confirmation message of 'otp sent to email' will be displayed. |

### Notes

- Ensure that the email provided is registered in the system to receive the password reset instructions.
    
- The admin key is required for authentication and should be kept confidential.

# Change Password API

This endpoint allows an admin to change a user's password. It requires the user's email, a one-time password (OTP) for verification, and the new password along with a confirmation of the new password.

## Request

### Method

`POST`

### URL

`{{url}}/api/v1/admin/changePassword`

### Request Body

The request body must be in JSON format and contain the following parameters:

- **email** (string): The email address of the user whose password is being changed.
    
- **otp** (string): A one-time password sent to the user's email for verification purposes.
    
- **newPassword** (string): The new password that the user wants to set.
    
- **confirmPassword** (string): A confirmation of the new password to ensure it matches the new password.
    

### Example Request Body

``` json
{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "newSecurePassword123",
  "confirmPassword": "newSecurePassword123"
}

 ```

## Response

On a successful password change, the API will return a response indicating the success of the operation. The response structure may include:

- **status** (string): Indicates whether the password change was successful or if there was an error.
    
- **message** (string): A descriptive message providing additional information about the result of the request.
    

### Example Response

``` json
{
  "status": "success",
  "message": "Password changed successfully."
}

 ```

### Error Handling

If the request fails (e.g., due to an invalid OTP or mismatched passwords), the response will contain an appropriate error message and status.

This API is crucial for maintaining user account security by allowing password updates in a secure manner.

## Logout Endpoint

This endpoint is used to log out an authenticated user from the application. When this request is successfully processed, the user's session will be terminated, and they will no longer have access to protected resources until they log in again.

### Request

- **Method**: POST
    
- **URL**: `{{url}}/api/v1/admin/logout`
    

#### Input Parameters

The request body should be structured as follows:

- **Parameter**: `userId` (string)
    
    - **Description**: The unique identifier of the user who is logging out.
        
- **Parameter**: `sessionToken` (string)
    
    - **Description**: The token associated with the user's session that needs to be invalidated.
        

### Response

Upon successful logout, the response will contain the following structure:

- **Status Code**: 200 OK
    
- **Response Body**:
    
    - **Parameter**: `message` (string)
        
        - **Description**: A confirmation message indicating that the logout was successful.
            

In case of an error, the response will include an appropriate error message along with a relevant HTTP status code.

### Example

**Request Body**:

``` json
{
  "userId": "string",
  "sessionToken": "string"
}

 ```

**Response Body**:

``` json
{
  "message": "Logged out successfully"
}

 ```

This endpoint is essential for maintaining security by ensuring that users can end their sessions when needed.

