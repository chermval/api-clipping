# API CLIPPINGS
NestJS api rest for kindle clippings file

## Install

### Requisites
- Node
- Postgres

`npm i`

## Run the app

Copy or rename ".env.example" file to ".env" and modify the values in file. 

### Local/Dev
`npm run start`

#### Watch mode
`npm run start:dev`

### Production
`npm run start:prod`

## Run the test
`npm run test`

### e2e tests
`npm run test:e2e`

### test coverage
`npm run test:cov`

## Usage

| ACTION | METHOD  | URI               | EXAMPLE               | 
|--------|---------|-------------------|-----------------------|
| Get all clippings | `GET`   | `/api/v1/clippings` |  http://localhost:3001/api/v1/clippings |
| Get clipping by Id | `GET`   | `/api/v1/clippings/{id}` |  http://localhost:3001/api/v1/clippings/{id} [1] |
| Delete clipping by Id | `DELETE`   | `/api/v1/clippings/{id}` |  http://localhost:3001/api/v1/clippings/{id} [1] |
| Update clipping by Id | `PUT`   | `/api/v1/clippings/{id}` |  http://localhost:3001/api/v1/clippings/{id} [1] |
