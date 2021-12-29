import express from "express";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
const env = dotenv.config()
const app = express();

// mongodb connection
mongoose.connect(`mongodb+srv://admin:mrtech@cluster0.svdho.mongodb.net/datingapp?retryWrites=true&w=majority`, 
	{
        useNewUrlParser: true,
        useUnifiedTopology: true
	}
).then(() => {
	console.log('Mongodb connected!')
}).catch(err => console.log(err));


//middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`app running on ${PORT}`)
})

