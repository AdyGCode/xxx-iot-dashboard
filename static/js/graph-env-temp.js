/**********************************************************************
    File:     /static/js/graph-env-temp.py
    Project:  xxx-iot-dashboard
    Author:   STUDENT NAME <STUDENT@EMAIL-ADDRESS>
    Created:  5/05/2021
    Purpose:  Provides the Environmental Temperature page with the
              dynamically updating chart by accessing the most recent
              data in the database.
***********************************************************************/

const envChartCanvas = document.getElementById("chartDemoCanvas")
let displayPoints = 0
const refreshTime = 1
const method = "GET"
const typeOfResponse = "json"

let envLineData = {
    datasets: [
        {
            label: 'Environment',
            data: [],
            borderWidth: 2,
            lineTension: .25,
            fill: false,
            borderColor: [
                TAIL_BLUE_500,
            ],
        },
    ],
}

let envLineOptions = {
    responsive: true,
    legend: {
        display: false
    },
    title: {
        display: true,
        text: 'Temperature'
    },
    scales: {
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Date / Time',
            },
        }],
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'ºC',
            },
            ticks: {
                beginAtZero: false,
                // suggestedMin: MIN_TEMP_VALUE,
                // suggestedMax: MAX_TEMP_VALUE,
            },
        }],
    },
}

let envChart = new Chart(envChartCanvas, {
    type: 'line',
    data: envLineData,
    options: envLineOptions,
})

let DateTime = luxon.DateTime;
let previous_date = DateTime.now()
let recorded_at = DateTime.now()

function updateChart() {
    // let url = origin() + "/api/sensehat/" + (MAX_TEMP_POINTS > displayPoints ? MAX_TEMP_POINTS : 1)
    let url = origin() + "/api/sensehat/1/1"

    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.responseType = typeOfResponse
    xhr.send()

    xhr.onload = function () {
        let responseObj = xhr.response
        let totalResponses = responseObj.length

        for (let responseNumber in responseObj) {
        console.log(displayPoints, recorded_at)
            let envData = responseObj[totalResponses - responseNumber - 1]
            let env = envData.temperature
            recorded_at = envData.recorded_at

            if (previous_date != recorded_at) {
                envChart.data.datasets[0].data.unshift(env)
                if (isFirstDateInPast(new Date(previous_date), new Date(recorded_at))) {
                    envChart.data.labels.unshift(DateTime.fromHTTP(recorded_at)
                        .toLocaleString(DateTime.DATE_SHORT))
                } else {
                    envChart.data.labels.unshift(DateTime.fromHTTP(recorded_at)
                        .toLocaleString(DateTime.TIME_24_WITH_SECONDS))
                }

                if (displayPoints > MAX_TEMP_POINTS) {
                    envChart.data.labels.pop()
                    envChart.data.datasets[0].data.pop()
                }
                envChart.update()

                displayPoints++
                previous_date = recorded_at
            }
        }
        // end for responsenumber in responseobj
    }
}


updateChart()
setInterval(updateChart, refreshTime * 1000);
