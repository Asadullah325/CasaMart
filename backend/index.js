import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import ConnectDb from './config/db.config.js';
import userRoutes from './routes/user.routes.js';


configDotenv();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(morgan('dev'));
app.use(helmet({
    crossOriginResourcePolicy: false,
}));


app.use('/api/user', userRoutes)


const PORT = process.env.PORT || 5000;

ConnectDb().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})
