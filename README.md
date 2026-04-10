# MicroFlip Shop - Deployment Guide

This project is a MERN stack application (MongoDB, Express, React, Node.js) designed to be served as a single consolidated application in production.

## 1. Local Production Test

To test the production build locally:
1. Build the frontend: `npm run build`
2. Start the server in production mode:
   ```bash
   NODE_ENV=production PORT=5001 npm start
   ```
3. Visit `http://localhost:5001`

## 2. Environment Variables

Ensure these variables are set in your deployment environment (e.g., Render Dashboard, Heroku Settings):

- `MONGODB_URI`: Your MongoDB Atlas connection string.
- `JWT_SECRET`: A long, random string for token signing.
- `NODE_ENV`: Set to `production`.
- `PORT`: Set to `5001` (or whatever your host requires).

## 3. Deployment Platforms

### Render (Recommended)
1. Connect your GitHub repository to [Render.com](https://render.com).
2. Create a **Web Service**.
3. **Build Command**: `npm install && npm run build`
4. **Start Command**: `npm start`
5. Add the Environment Variables listed above.

### Heroku
1. Install the Heroku CLI and login.
2. Create an app: `heroku create`
3. Add MongoDB (e.g., via Atlas or add-on).
4. Deploy: `git push heroku main`

### Docker
1. Build the image: `docker build -t microflip-shop .`
2. Run the container:
   ```bash
   docker run -p 5001:5001 -e MONGODB_URI=your_uri -e JWT_SECRET=your_secret microflip-shop
   ```

## 4. Database Setup
> [!IMPORTANT]
> If using MongoDB Atlas, remember to **White-list the static IP** of your deployment server or allow access from anywhere (`0.0.0.0/0`) in the Network Access settings of the Atlas dashboard.
