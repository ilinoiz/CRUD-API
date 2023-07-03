# CRUD-API

## How-to use:

1. Clone repository to your PC
2. Open project `cd CRUD-API`
3. Install dependencies `npm install`

## How-to run:

1. For **dev** mode: `npm run start:dev`
2. For **prod** mode: `npm run start:prod`
3. For running **tests**: `npm run test`

### Implemented endpoint: _/api/users_

- **GET** - `/api/users` - get full list of users
- **POST** - `/api/users` - to create new user
- **GET** - `/api/users/{userId}` - to get user with particular id (id format is uuid)
- **PUT** - `/api/users/{userId}` - to update existing user with particular id (id format is uuid)
- **DELETE** - `/api/users/{userId}` - to delete existing user with particular id (id format is uuid)

#### JSON body for request:

```
{
    "username": string,
    "age": number,
    "hobbies": string[]
}
```

#### Link to postman collection: [postman collection](UsersAPI.postman_collection.json)
