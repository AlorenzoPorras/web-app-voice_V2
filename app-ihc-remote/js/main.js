let ultimaIdEjecutada = 0; // Variable para almacenar la ID de la última orden ejecutada

const mostrarOrden = async () => {
    const tagOrden = document.getElementById("lastOrderText");
    const orden = await ultimaOrden();
    
    // Verificar si la ID de la orden recibida es diferente a la ID de la última orden ejecutada
    if (orden.id !== ultimaIdEjecutada) {
        // Actualizar la ID de la última orden ejecutada
        ultimaIdEjecutada = orden.id;
        // Ejecutar la orden
        processCommand(orden.ingresos);
    }
    
    tagOrden.innerText = orden.ingresos;
}

const ultimaOrden = async () => {
    const json = await obtenerData();

    // Encontrar la ID más alta
    let ultimaId = 0;
    json.forEach(item => {
        if (parseInt(item.id) > ultimaId) {
            ultimaId = parseInt(item.id);
        }
    });

    // Encontrar el registro con la ID más alta
    const ultimaOrden = json.find(item => parseInt(item.id) === ultimaId);

    // Retornar el registro completo
    return ultimaOrden;
}


mostrarOrden();

setInterval(mostrarOrden, 4000); // Reinicia cada 4 segundos

async function obtenerData() {
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
            reject(error);
        });
    });
}

const processCommand = (result) => {
    let lowerCaseResult = result.toLowerCase();
    const controlTexto = document.getElementById("lastOrderText"); 

    switch (true) {
         case lowerCaseResult.includes("cambiar texto a italic"):
            controlTexto.classList.add('fst-italic');
            break;
        case result.includes("Abrir YouTube"):
            window.open('https://www.youtube.com/', '_blank');
            break;
        case result.includes("Abrir nueva pestaña"):
            window.open('https://www.google.com', '_blank');
            break;
        case result.includes("Cerrar pestaña actual"):
            window.close(); // Intenta cerrar la pestaña
            break;
        case result.includes("Cerrar navegador"):
            window.top.close(); // Intenta cerrar el navegador
            break;
    }
};
