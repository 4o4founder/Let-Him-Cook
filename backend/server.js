import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import recipeRoutes from './routes/recipes.js';

dotenv.config();
const app = express();

// --- MIDDLEWARE ---
app.use(express.json());

// Deployment-friendly CORS: Allows your frontend to talk to the backend
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

// Test Route (Useful for Health Checks during deployment)
app.get('/', (req, res) => res.status(200).send('Let Him Cook API is active.'));

// --- DATABASE CONNECTION ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('❌ FATAL ERROR: MONGO_URI is not defined in .env');
    process.exit(1);
}

console.log("Connecting to Database...");

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connection Established');
        app.listen(PORT, () => {
            console.log(`🚀 Server live on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ Database connection error:');
        console.error(error.message);
    });

// Handle unhandled promise rejections (Optional but professional)
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
});