# Boumerdas Smart City Hackathon Project - Backend API

This project is the backend API for the Boumerdas Smart City Hackathon project. The app helps tourists explore and travel in Boumerdas with ease by allowing them to book hosts, hotels, and activities. It also enables users to explore the city's tourism spots such as restaurants, beaches, gardens, and more. Tourists can either explore on their own or trust a tourism agency by booking a tourism plan that takes care of everything.

The admin dashboard allows the administration to manage hosts, tourism places, reservations, and clubs. It also provides various statistics, charts, and analyses on the frontend.

## Features

- **Tourist Booking System**: 
  - Tourists can browse and book various accommodations, activities, and events in Boumerdas.
  - Users can view and reserve hosts, hotels, and various tourism places (e.g., restaurants, beaches, gardens).
  
- **Tourism Plans**: 
  - Tourists can book a full tourism plan that includes activities and events throughout their stay.
  - The plan is managed by a tourism agency that ensures all bookings are taken care of.

- **Admin Dashboard**: 
  - Admin users can manage tourism-related services, including hosts, tourism places, reservations, and clubs.
  - Admins can view statistics and charts that provide insights into the platform's usage and performance.

- **JWT Authentication**: 
  - The system uses JSON Web Tokens (JWT) for secure user authentication.

- **Cloudinary Integration**: 
  - Cloudinary is used for image and video hosting, providing a seamless experience for managing media related to tourism places and bookings.
## Technology stack: 
#### 1. Nest js
#### 2 Typescript
#### 3. Prisma ORM
#### 4. PostgreSQL
#### 5. JWT


## Project Setup

To set up and run this project locally, follow the steps below:

### 1. Clone the repository

```bash
$ git clone https://github.com/your-username/boumerdas-smart-city-backend.git
$ cd boumerdas-smart-city-backend
```
### 2. Install dependencies:
```bash
$ npm install
```
###3. schema migration to the database:
```bash
npx run prisma migrate 
```
### 4. configure the env variables: 
```.env
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

```

### 5. run the server 
```bash
npm run start
```

### Check documentation :
check the api-docs end point to find documentation of the API
