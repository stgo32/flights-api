# Flights API

This is a CRUD API for managing flights and their passengers. It is built using Koa.js and MongoDB.

## Prerequisites
- Docker and Docker Compose installed on your system.

## Installation

### Using Docker Compose
1. Clone this repository:
   ```bash
   git clone https://github.com/stgo32/flights-api.git
   cd flights-api
   ```

2. Start the services using Docker Compose:
   ```bash
   docker-compose up -d
   ```

   This will start:
   - A MongoDB container with the database.
   - The Flights API running on port `3000`.

3. Verify the services are running:
   ```bash
   docker ps
   ```

## Running the API
The API will be available at `http://localhost:3000` after starting the Docker containers.

## Endpoints

### Flights

- Get all flights: **GET** `/flights`

- Get a flight by ID: **GET** `/flights/:id`

- Create a new flight: **POST** `/flights`
    - Body:
  ```json
  {
    "flightCode": "string",
    "passengers": [
      {
        "name": "string",
        "hasConnections": true,
        "age": 30,
        "flightCategory": "Black",
        "reservationId": "string",
        "hasCheckedBaggage": true
      }
    ]
  }
  ```

- Update a flight: PUT** `/flights/:id`
    - Body: Partial flight data to update.

- Delete a flight: **DELETE** `/flights/:id`

### Passengers

- Add a passenger to a flight: **POST** `/flights/:flightId/passengers`
    - Body:
  ```json
  {
    "name": "string",
    "hasConnections": true,
    "age": 30,
    "flightCategory": "Black",
    "reservationId": "string",
    "hasCheckedBaggage": true
  }
  ```

- Get all passengers of a flight: **GET** `/flights/:flightId/passengers`

- Get a passenger by ID: **GET** `/flights/:flightId/passengers/:passengerId`

- Update a passenger: **PUT** `/flights/:flightId/passengers/:passengerId`
    - Body: Partial passenger data to update.

- Delete a passenger: **DELETE** `/flights/:flightId/passengers/:passengerId`

## Project Structure

The project is organized as follows:

```
flights-api/
├── docker-compose.yml         # Docker Compose configuration for MongoDB 
├── Dockerfile                 # Dockerfile for building the API container
├── package.json               # Node.js dependencies and scripts
├── README.md                  # Project documentation
├── tsconfig.json              # TypeScript configuration
├── src/                       # Source code directory
│   ├── index.ts               # Entry point of the application
│   ├── db/                    # Database configuration
│   │   └── config.ts          # MongoDB connection setup
│   ├── models/                # Mongoose models
│   │   └── flights.ts         # Flight model definition
│   ├── routes/                # API route handlers
│       ├── flightRoutes.ts    # Routes for flight operations
│       └── passengerRoutes.ts # Routes for passenger operations
```