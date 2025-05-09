# Apni Zameen Frontend

This is the frontend for the Apni Zameen real estate platform, built with React, TypeScript, and Tailwind CSS.

## Features

- User registration and authentication with JWT
- Property listings with search and filtering
- Property details with images and features
- Save favorite properties
- User dashboard and profile management
- Responsive design for all devices
- Dark/light mode support

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
1. Clone the repository
2. Navigate to the frontend directory: `cd urban-nest-frontend`
3. Install dependencies: `npm install` or `yarn install`
4. Start the development server: `npm run dev` or `yarn dev`
5. The application will be available at `http://localhost:5173`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_BASE_URL=http://localhost/api
```

## Folder Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Application pages
- `/src/context` - React context for state management
- `/src/services` - API services
- `/src/hooks` - Custom React hooks
- `/src/types` - TypeScript type definitions
- `/src/utils` - Utility functions

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code with ESLint
- `npm run test` - Run tests
