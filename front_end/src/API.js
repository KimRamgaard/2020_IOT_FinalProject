const API_URL = 'http://localhost:3000/api/'

export async function listSensordata(){
    const response = await fetch(`${API_URL}sensordata`)
    return response.json();
}