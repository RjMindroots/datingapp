import express from "express";
import cors from "cors"
import { APP_PORT, CONNECTION_URL } from "./src/config";
import mongoose from 'mongoose'
import cors from 'cors';
import routes from './src/routes'
import errorHandler from "./src/middleware/errorHandler";

const app = express();
app.use(cors())

// mongodb connection
mongoose.connect(`${CONNECTION_URL}`, 
	{
    useNewUrlParser: true,
    useUnifiedTopology: true
	}
).then(() => {
	console.log('Mongodb connected!')
}).catch(err => console.log(err));

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//routes
app.use('/api', routes)

app.use(errorHandler)

app.listen(APP_PORT, () => {
    console.log(`app running on ${APP_PORT}`)
})

