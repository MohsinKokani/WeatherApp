const express = require('express');
const hbs = require('hbs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const apiKey = process.env.WEATHER_API_KEY;
const app = express();

const staticPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.get('/', (req, res) => {
    res.render('index.hbs');
});

app.use(express.static(staticPath));

app.get('/about', (req, res) => {
    res.render('about.hbs');
});

app.get('/weather', (req, res) => {
    res.render('weather.hbs');
});

app.get('/env' , (req, res)=>{
    res.send({name:'mohsin',Key:apiKey});
})

app.get('*', (req, res) => {
    res.render('NotFound.hbs');
});

app.listen(3000, () => {
    console.log("Listening from port 3000");
});
