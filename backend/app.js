const express = require('express')
const http = require('http');
const querystring = require('querystring');
const cors = require('cors');
const app = express();



const port = 3001

// Cached Data
let weatherOneCall = {
    current: {
        dt: 1626425797
    }
};

function isAuthorized(req, res, next){
    const auth = req.headers.authorization;
    if (auth === 'backendAPI123') {
        next();
    } else {
        res.status(401);
        res.send('Not permitted');
    }
}

function loadOneCallAPI (callback) {
    const now = Date.now();
    const tenMinutes = 600000;
    console.clear();
    console.log("\n-------------------------------------------------------------------------");
    console.log('Aktuelle Zeit: ' + new Date(now).toString())
    console.log('Warten bis: ' + new Date(weatherOneCall.current.dt * 1000 + tenMinutes).toString())
    console.log('Datenzeit: ' + new Date(weatherOneCall.current.dt * 1000).toString())
    console.log("-------------------------------------------------------------------------\n");

    if (now  > weatherOneCall.current.dt * 1000 + tenMinutes) // refresh data
    {
        const API = {
            lat: 48.4811,
            lon: 8.88272,
            appid: 'b926706d02eadd227213874e65d7fc60',
            units: 'metric',
            lang: 'de',
        };

        // URL: 'http://api.openweathermap.org/data/2.5/onecall?'

        const options = {
            hostname: 'api.openweathermap.org',
            port: 80,
            method: 'GET',
            path: '/data/2.5/onecall?' + querystring.stringify(API),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        http.request(options, (res) => {

            let output = '';

            res.on('data', (chunk) => {
                output += chunk;
            });

            res.on('end', ()=>{
                weatherOneCall = JSON.parse(output);

                console.log('Neue daten wurden geladen!');
                console.log('Warten bis: ' + new Date(weatherOneCall.current.dt * 1000 + tenMinutes).toString())
                callback(weatherOneCall);
            })
        })
            .on('error', (err) => {
                console.log(err.message);

                callback({cod: 400, message: err.message});
            })
            .end(() => {});
    }
    //load old data
    else {
        console.log('Es wurden keine neuen Daten geladen -> noch zu aktuel!');
        callback(weatherOneCall);
    }

}


app.use(cors());

app.get('/', (req, res) =>
    res.send('Please select a route!'));

app.get('/weather', (req, res) => {
    loadOneCallAPI((data) => {res.json(data)});
})


app.listen(port, () => console.log(`App listening on port ${port}!`))