
const searchBtn = document.getElementById('button-addon2');

function updateLeftBox(response) {
    const arr_of_week = ["sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const date = new Date(response.location.localtime);
    const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    document.getElementsByClassName('left-weather-box')[0].innerHTML = `
    <div>
        <h2 class="h2_left">${arr_of_week[date.getDay()]}</h2>
        <p class="p_left">${formattedDate}</p>
        <p class="p_left">${response.location.name + ', ' + response.location.region + ', ' + response.location.country}</p>
    </div>
    <img src=${response.current.condition.icon} alt="Status">
    <div>
        <h1 class="h1_left">${response.current.temp_c}°C</h1>
        <h3 class="h3_left">${response.current.condition.text}</h3>
    </div>
    `
}
function updateRightBox(response) {
    document.getElementsByClassName('right-weather-box')[0].innerHTML = `
    
    <table>
        <tbody>
            <tr>
                <th>HUMIDITY</th>
                <td>${response.current.humidity}%</td>
            </tr>
            <tr>
                <th>WIND</th>
                <td>${response.current.wind_kph}km/h</td>
            </tr>
            <tr>
                <th>Wind Direction</th>
                <td>${response.current.wind_dir}</td>
            </tr>
        </tbody>
    </table>
    `
}

function handleError() {
    document.getElementsByClassName('weatherbox')[0].innerHTML = `
        <div class="left-weather-box w3-quarter">
            <div>
                <h2 class="h2_left">Week</h2>
                <p class="p_left">Date</p>
                <p class="p_left">City Name</p>
            </div>
            <img src="https://cdn.weatherapi.com/weather/64x64/day/176.png" alt="Status">
            <div>
                <h1 class="h1_left">Deg°C</h1>
                <h3 class="h3_left">Bhai Kya Kar Raha Hai Tu...</h3>
            </div>
        </div>
        <div class="right-weather-box center w3-quarter">
            <table>
                <tbody>
                    <tr>
                        <th>HUMIDITY</th>
                        <td>0%</td>
                    </tr>
                    <tr>
                        <th>WIND</th>
                        <td>0km/h</td>
                    </tr>
                    <tr>
                        <th>Wind Direction</th>
                        <td>0</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
}
const getInfo = async (e) => {
    e.preventDefault();
    const inputField = document.getElementById('inputField').value;
    if (inputField.trim() == "") {
        document.getElementsByClassName('h3_left')[0].innerHTML = "How could a city's name be blank";
        return;
    }
    let apiKey;
    await fetch('/env')
        .then(response => response.json())
        .then(data => {
            apiKey = data.Key;
        })
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${inputField}`, options)
        .then(response => {
            if (!response.ok) {
                handleError();
                return;
            }
            return response.json();
        })
        .then(response => {
            if(response == undefined) {
                handleError();
                return;
            }
            updateLeftBox(response);
            updateRightBox(response);
        })
        .catch((err) => {
            handleError();
        });
}
searchBtn.addEventListener('click', getInfo);