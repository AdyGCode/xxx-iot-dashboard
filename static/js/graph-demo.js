const cpuChartCanvas = document.getElementById("chartDemoCanvas")
let counterCPUPoints = 0

let cpuLineData = {
    datasets: [
        {
            label: 'CPU',
            data: [],
            borderWidth: 2,
            lineTension: 0.2,
            fill: false,
            borderColor: [
                CELADON_BLUE,
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
                labelString: 'Date/Time',
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

function cpuUpdate() {
    let url = "http://localhost:5050/api/CPU-Temperature/" + (counterCPUPoints == 0 ? MAX_TEMP_POINTS : 1)
    let method = "GET"
    let typeOfResponse = "json"

    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.responseType = typeOfResponse
    xhr.send()

    xhr.onload = function () {
        let responseObj = xhr.response
        for (let responseNumber in responseObj) {
            let CPUData = responseObj[responseNumber]
            let CPU = CPUData.cpu
            let a = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];
            cpuChart.data.labels.unshift(joinDate(Date.parse(CPUData.date_recorded), a, ' '))
            cpuChart.data.datasets[0].data.unshift(CPU)
            if (counterCPUPoints > MAX_TEMP_POINTS) {
                cpuChart.data.labels.pop()
                cpuChart.data.datasets[0].data.pop()
            }
            cpuChart.update()
            counterCPUPoints++
        }
    }
}


cpuUpdate()
setInterval(cpuUpdate, 5000);
