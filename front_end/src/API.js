const API_URL = 'http://localhost:3000/'

export async function listSensordata(){
    const response = await fetch(`${API_URL}sensordata`)
    var jsonResponse = response.json()

    for (var entry in jsonResponse.body){
        console.log(entry)
    }
    return response
}