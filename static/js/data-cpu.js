/**********************************************************************
 * File:     /static/js/data-cpu.py
 * Project:  xxx-iot-dashboard
 * Author:   STUDENT NAME <STUDENT@EMAIL-ADDRESS>
 * Created:  5/05/2021
 * Purpose:  Provides the home page with the dynamically updated CPU
 *           results by accessing the most recent data in the database.
 *********************************************************************/
const cpuRefreshTime = 1
const cpuMethod = "GET"
const cpuTypeOfResponse = "json"

let cpuDoc = document
let cpuTemperature = cpuDoc.getElementById('CPU-Temperature')
let cpuMaxLoad = cpuDoc.getElementById('CPU-Load')
let gpuTemperature = cpuDoc.getElementById('GPU-Temperature')
let freeRAM = cpuDoc.getElementById('RAM-Free')
let freeStorage = cpuDoc.getElementById('Storage-Free')

function updateChart() {
    let url = origin() + "/api/CPU/1/1"

    let xhr = new XMLHttpRequest()
    xhr.open(cpuMethod, url)
    xhr.responseType = cpuTypeOfResponse
    xhr.send()

    xhr.onload = function () {
        let responseObj = xhr.response
        let totalResponses = responseObj.length

        for (let responseNumber in responseObj) {
            let CPUData = responseObj[totalResponses - responseNumber - 1]
            // Update the Sensor's details on the home screen
            cpuTemperature.innerText = CPUData['cpu_temperature'].toFixed(2) + " ºC"
            // TODO: Make the cpuMaxLoad show the CPU's Load to TWO decimal places
            cpuMaxLoad.innerText = CPUData['topic']
            // TODO: Make the gpuTemperature show the GPU Temperature reading in
            //       degrees Celsius to 2 decimal places
            gpuTemperature.innerText = CPUData['topic']
            // TODO: Make the freeRAM show the amount of RAM free
            freeRAM.innerText = CPUData['ram_free']
            // TODO: Make the freeStorage show the amount of Storage space free
            freeStorage.innerText = CPUData['topic']
        }
    }
}


updateChart()
setInterval(updateChart, cpuRefreshTime * 1000);
