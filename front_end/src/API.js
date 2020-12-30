const API_URL = 'api.kimramgaard.dk/'

export async function listSensordata(){
    const response = await fetch(`${API_URL}sensordata`)
    return response.json();
}