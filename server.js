import express from "express";
import { APP_PORT, CONNECTION_URL } from "./src/config";
import mongoose from 'mongoose'
import routes from './src/routes'

const app = express();

// mongodb connection
mongoose.connect(`${CONNECTION_URL}`, 
	{
        useNewUrlParser: true,
        useUnifiedTopology: true
	}
).then(() => {
	console.log('Mongodb connected!')
}).catch(err => console.log(err));

//routes
app.use('/api/admin', routes)

//middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.listen(APP_PORT, () => {
    console.log(`app running on ${APP_PORT}`)
})

