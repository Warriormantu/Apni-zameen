# Apni Zameen Frontend - Installation Guide

## Prerequisites
- Node.js 16.x or higher
- npm 8.x or higher

## Installation Steps

1. **Navigate to the frontend directory**
   ```
   cd /path/to/xampp/htdocs/trail/apni-zameen-frontend
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Start the development server**
   ```
   npm run dev
   ```

4. **Access the application**
   Open your browser and visit:
   ```
   http://localhost:5173
   ```

## Building for Production

To build the frontend for production:

```
npm run build
```

The built files will be in the `dist` directory, which you can then deploy to your web server.

## Connecting to the Backend

The frontend is configured to connect to the backend at:
```
http://localhost/trail/apni-zameen-backend/api
```

If your backend is hosted at a different URL, update the `API_BASE_URL` in `src/services/api.js`. 