/**********************************************************************
 * File:     /static/js/data-env.py
 * Project:  xxx-iot-dashboard
 * Author:   STUDENT NAME <STUDENT@EMAIL-ADDRESS>
 * Created:  5/05/2021
 * Purpose:  Provides the home page with the dynamically updated
 *           Environmental results by accessing the most recent data
 *           in the database.
 *********************************************************************/

const refreshTime = 1
const method = "GET"
const typeOfResponse = "json"


let doc = document
let envTemperature = doc.getElementById('Temperature')
let envPressure = doc.getElementById('Pressure')
let envHumidity = doc.getElementById('Humidity')
let envOrientation = doc.getElementById('Compass')

function updateChart() {
    let url = origin() + "/api/sensehat/1/1"

    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.responseType = typeOfResponse
    xhr.send()

    xhr.onload = function () {
        let responseObj = xhr.response
        let totalResponses = responseObj.length

        for (let responseNumber in responseObj) {
            let envData = responseObj[totalResponses - responseNumber - 1]
            // Show selected Environmental details on the home screen
            envTemperature.innerText = envData['temperature'].toFixed(2) + " ºC"
            // TODO: Make the envPressure show the pressure reading to TWO
            //      decimal places
            envPressure.innerText = envData['topic']
            // TODO: Make the envHumidity show the humidity reading in
            //       percent (%) to TWO decimal places
            envHumidity.innerText = envData['topic']
            // TODO: Make the Orientation show the compass reading in
            //       degrees (º) to TWO decimal places
            envOrientation.innerText = envData['topic']
        }
    }
}


updateChart()
setInterval(updateChart, refreshTime * 1000);
