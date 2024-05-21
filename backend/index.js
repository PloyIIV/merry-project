import bodyParser from "body-parser";
import express from "express";
import cors from 'cors'

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("API is working")
})

app.get('*', (req, res) => {
    res.status(404).send("ERROR: 404 NOT FOUND")
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
})

module.exports = app;