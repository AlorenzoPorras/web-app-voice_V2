// Función para obtener datos de la API Mock
export function obtenerData() {
    return new Promise((resolve, reject) => {
        fetch('https://6614da0e2fc47b4cf27d3ce0.mockapi.io/ingresos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la respuesta de la API');
            }
            return response.json();
        })
    
        .then(data => {
            resolve(data);
        })
    
        .catch(error => {
            console.error('Error al obtener datos:', error);
            reject(error)
        });
    })
}