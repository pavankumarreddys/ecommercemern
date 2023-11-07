import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './config/db.js';
import authRoutes from './routes/authRoute.js'
import cors from 'cors'
import path from 'path'
import {fileURLToPath} from 'url'
//configure env
dotenv.config();

//database config
connectDb();


//esmodulefix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object 
const app = express();

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use('/api/v1/auth', authRoutes);

// rest api 
app.use('*',function(req,resp){
    resp.sendFile(path.join(__dirname,'./client/build/index.html'))

})

//PORT 
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT,()=>{
    console.log(`this is running on ${process.env.DEV_mode} mode ${PORT} PORT`)
})