const cpuChartCanvas = document.getElementById("chartDemoCanvas")
let counterCPUPoints = 0
const refreshTime = 5
const method = "GET"
const typeOfResponse = "json"

let cpuLineData = {
    datasets: [
        {
            label: 'CPU',
            data: [],
            borderWidth: 2,
            lineTension: 0.2,
            fill: false,
            borderColor: [
                TAIL_YELLOW_600,
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
        text: 'CPU Load'
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
                labelString: '%',
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

function cpuUpdate() {
    let url = origin() + "/api/CPU/" + (MAX_TEMP_POINTS > counterCPUPoints ? MAX_TEMP_POINTS : 1) + "/1"

    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.responseType = typeOfResponse
    xhr.send()

    xhr.onload = function () {
        let responseObj = xhr.response
        totalResponses = responseObj.length

        for (let responseNumber in responseObj) {
            let CPUData = responseObj[totalResponses - responseNumber - 1]
            let CPU = CPUData.cpu_max_load
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

                if (counterCPUPoints > MAX_TEMP_POINTS) {
                    cpuChart.data.labels.pop()
                    cpuChart.data.datasets[0].data.pop()
                }
                cpuChart.update()

                counterCPUPoints++
                previous_date = recorded_at
            }
        }
        // end for responsenumber in responseobj
    }
}


cpuUpdate()
setInterval(cpuUpdate, refreshTime * 1000);
