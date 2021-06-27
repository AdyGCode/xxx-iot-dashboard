const cpuChartCanvas = document.getElementById("chartDemoCanvas")
let displayPoints = 0
const refreshTime = 1

let cpuLineData = {
    datasets: [
        {
            label: 'CPU',
            data: [],
            borderWidth: 2,
            lineTension: 0.2,
            fill: false,
            borderColor: [
                TAIL_PINK_600,
            ],
        },
    ],
}

let cpuLineOptions = {
    responsive: true,
    legend: {
        display: false
    },
    title: {
        display: true,
        text: 'CPU Temperature'
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

let cpuChart = new Chart(cpuChartCanvas, {
    type: 'line',
    data: cpuLineData,
    options: cpuLineOptions,
})

let DateTime = luxon.DateTime;
let previous_date = DateTime.now()
let recorded_at = DateTime.now()

function updateChart() {
    let url = origin() + "/api/CPU/" + (MAX_TEMP_POINTS > displayPoints ? MAX_TEMP_POINTS : 1)
    let method = "GET"
    let typeOfResponse = "json"

    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.responseType = typeOfResponse
    xhr.send()

    xhr.onload = function () {
        let responseObj = xhr.response
        let totalResponses = responseObj.length

        for (let responseNumber in responseObj) {
            let CPUData = responseObj[totalResponses - responseNumber - 1]
            let CPU = CPUData.cpu_temperature
            recorded_at = CPUData.recorded_at

            if (previous_date != recorded_at) {
                cpuChart.data.datasets[0].data.unshift(CPU)
                if (isFirstDateInPast(new Date(previous_date), new Date(recorded_at))) {
                    cpuChart.data.labels.unshift(DateTime.fromHTTP(recorded_at)
                        .toLocaleString(DateTime.DATE_SHORT))
                } else {
                    cpuChart.data.labels.unshift(DateTime.fromHTTP(recorded_at)
                        .toLocaleString(DateTime.TIME_24_WITH_SECONDS))
                }

                if (displayPoints > MAX_TEMP_POINTS) {
                    cpuChart.data.labels.pop()
                    cpuChart.data.datasets[0].data.pop()
                }
                cpuChart.update()

                displayPoints++
                previous_date = recorded_at
            }
        }
        // end for responsenumber in responseobj
    }
}


updateChart()
setInterval(updateChart, refreshTime * 1000);
