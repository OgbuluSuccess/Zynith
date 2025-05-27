# Zenthy Investment Platform

## Overview

Zenthy Investment Platform is a modern web application for managing investments, tracking portfolio performance, and providing users with investment opportunities. This platform is built with React, TypeScript, and Vite, with a serverless backend using Vercel API routes.

## Features

- **User Authentication**: Secure login and registration system
- **Dashboard**: Real-time overview of user's financial status
- **Investment Plans**: Browse and invest in various investment plans
- **Portfolio Tracking**: Monitor investment performance over time
- **Wallet Management**: Deposit, withdraw, and track funds
- **Referral System**: Earn rewards by referring new users

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- Chart.js for data visualization
- Tailwind CSS for styling
- Bootstrap components

### Backend
- Vercel Serverless Functions
- MongoDB with Mongoose
- JWT for authentication

## Project Structure

```
/src
  /api          # API client and service functions
  /assets       # Static assets
  /components   # Reusable UI components
  /context      # React context providers
  /hooks        # Custom React hooks
  /pages        # Page components
  /services     # Business logic services
  /styles       # CSS/SCSS files
  /types        # TypeScript type definitions
  /utils        # Utility functions
/api            # Vercel API routes
  /auth         # Authentication endpoints
  /users        # User-related endpoints
  /investments  # Investment-related endpoints
  /lib          # Shared server utilities
  /models       # Database models
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=http://localhost:3000/api
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and deploy.
