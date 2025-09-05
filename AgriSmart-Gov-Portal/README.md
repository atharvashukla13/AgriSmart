# AgriSmart - Agricultural Management System

A comprehensive agricultural management system with real-time data visualization and farmer management capabilities.

## Features

- **Real-time Crop Health Heatmap**: Visualize crop health data across Tamil Nadu using Firebase data
- **Farmer Management**: View and manage farmer profiles with real data from Firebase
- **Dashboard Analytics**: Real-time statistics and insights
- **Responsive Design**: Modern UI with Tailwind CSS

## Tech Stack

### Frontend

- React 18
- Vite
- Tailwind CSS
- MapLibre GL JS (for maps)
- Deck.gl (for heatmap visualization)

### Backend

- Node.js
- Express.js
- Firebase Admin SDK
- CORS enabled

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Firebase project with Realtime Database

### Backend Setup

1. Navigate to the backend directory:

```bash
cd AgriSmart/backend
```

2. Install dependencies:

```bash
npm install
```

3. Make sure your `config.env` file is properly configured with Firebase credentials

4. Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd AgriSmart/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

- `GET /api/farmers` - Get all farmers
- `GET /api/farmers/:id` - Get specific farmer
- `GET /api/reports` - Get crop health reports for heatmap
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/health` - Health check

## Firebase Database Structure

### Users Collection

```json
{
  "users": {
    "user_id": {
      "name": "Farmer Name",
      "phone": "Phone Number",
      "village": "Village Name",
      "size": "Field Size in acres"
    }
  }
}
```

### Reports Collection

```json
{
  "reports": {
    "chennai": 5,
    "coimbatore": 2,
    "madurai": 4,
    "salem": 7
  }
}
```

## Features Implemented

✅ **Backend API**: Complete REST API with Firebase integration
✅ **Real-time Data**: Live data fetching from Firebase Realtime Database
✅ **Crop Health Map**: Interactive heatmap with real data
✅ **Farmer Management**: Dynamic farmer listing with real data
✅ **Loading States**: Proper loading indicators and error handling
✅ **Responsive Design**: Mobile-friendly interface

## Development

- Backend uses nodemon for auto-restart during development
- Frontend uses Vite for fast development builds
- CORS is configured for local development
- Error handling and logging implemented

## Production Deployment

1. Set `NODE_ENV=production` in backend config
2. Update CORS origins for production domains
3. Build frontend: `npm run build`
4. Deploy backend to your preferred hosting service
5. Deploy frontend to static hosting (Vercel, Netlify, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
