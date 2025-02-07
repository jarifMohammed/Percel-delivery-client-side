# QuickDrop - Full Stack Parcel Delivery System

## Overview
[QuickDrop](https://quickdrop-c8278.web.app/) is a full-stack parcel delivery system that provides role-based functionalities for **Admin**, **User**, and **Deliveryman**. This system streamlines parcel deliveries, allowing users to place orders, track deliveries, and manage accounts. The platform is built using modern web technologies, ensuring a smooth and responsive user experience.

## Features
### Admin Role:
- Manage all users and deliverymen
- View and track all parcel deliveries
- Assign deliveries to deliverymen
- Generate reports and analytics

### User Role:
- Register and log in to an account
- Create new parcel delivery requests
- Track parcel status in real-time
- View order history

### Deliveryman Role:
- Accept or reject delivery assignments
- Update parcel delivery status
- View assigned deliveries

### Additional Features:
- Secure authentication & role-based access
- Real-time parcel tracking
- Email notifications for updates
- Responsive design for all devices
- User-friendly dashboard

## Tech Stack
### Frontend:
- **React.js** - For building dynamic user interfaces
- **Tailwind CSS** - For modern styling and responsiveness
- **SDACN Acertinity UI** - For pre-built UI components
- **React Hook Form** - For form validation and handling

### Backend:
- **Node.js** - For server-side logic
- **Express.js** - For creating RESTful APIs
- **MongoDB** - For storing user and parcel data
- **JWT Authentication** - For secure access management

### Other Tools & Libraries:
- **Axios** - For API requests
- **Firebase Hosting** - For deployment
- **ImageBB** - For image uploads
- **Mongoose** - For MongoDB interactions

## Installation & Setup
Follow these steps to set up QuickDrop locally:

### Backend Setup:
1. Clone the repository:
   ```sh
   git clone https://github.com/mohammedJarif/quickdrop.git
   cd quickdrop/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure environment variables:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup:
1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```

## Deployment
- **Frontend:** Deployed on Firebase
- **Backend:** Deployed on a cloud-based server vercel

## Contributing
If you'd like to contribute:
1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit.
4. Submit a pull request.



---
**Developed by Mohammed Jarif**

