# MongoDB Setup Guide

## Prerequisites
- MongoDB installed and running locally, or a MongoDB Atlas account

## Local MongoDB Setup

1. **Install MongoDB Community Edition**
   - macOS: `brew install mongodb-community`
   - Windows: Download from [MongoDB website](https://www.mongodb.com/try/download/community)
   - Linux: Follow [MongoDB installation guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB Service**
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   
   # Linux
   sudo systemctl start mongod
   ```

3. **Create Environment File**
   Create a `.env.local` file in your project root:
   ```
   MONGODB_URI=mongodb://localhost:27017/huby-launch
   ```

## MongoDB Atlas Setup (Cloud)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account

2. **Create Cluster**
   - Choose "Free" tier
   - Select your preferred cloud provider and region
   - Click "Create"

3. **Set Up Database Access**
   - Go to "Database Access"
   - Create a new database user with read/write permissions
   - Remember username and password

4. **Set Up Network Access**
   - Go to "Network Access"
   - Add your IP address or `0.0.0.0/0` for all IPs

5. **Get Connection String**
   - Go to "Clusters" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string

6. **Update Environment File**
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/huby-launch?retryWrites=true&w=majority
   ```

## Seed the Database

After setting up MongoDB, run the seeding script:

```bash
# Install ts-node if you haven't already
npm install -g ts-node

# Run the seed script
npx ts-node scripts/seed-database.ts
```

This will populate your database with:
- 6 weird example bots
- 8 meta prompts

## Verify Setup

1. **Start your Next.js app**: `npm run dev`
2. **Check the create page**: Navigate to `/create`
3. **Verify data loads**: The weird examples and meta prompts should load from the database

## Troubleshooting

- **Connection refused**: Make sure MongoDB is running
- **Authentication failed**: Check username/password in connection string
- **Network timeout**: Verify network access settings in Atlas
- **Database not found**: The database will be created automatically on first use

## Next Steps

- Add user authentication
- Implement bot rating system
- Add tournament functionality
- Create admin panel for managing examples
