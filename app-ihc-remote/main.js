document.addEventListener("DOMContentLoaded", function() {
    // Función para obtener datos de la API Mock
    function obtenerUltimaOrden() {
        return fetch('https://6614da0e2fc47b4cf27d3ce0.mockapi.io/ingresos', {
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
            console.log('Datos recibidos de la API:', data);
            let ultimoRegistro;

            // Verificar si los datos son un array y tienen al menos un elemento
            if (Array.isArray(data) && data.length > 0) {
                ultimoRegistro = data[data.length - 1];
            }

            if (ultimoRegistro && ultimoRegistro.texto) {
                console.log('Última orden encontrada:', ultimoRegistro);
                return ultimoRegistro.texto;
            } else {
                return 'No se encontró texto para la última orden';
            }
        })
        .then(texto => {
            // Actualizar el HTML con el texto de la última orden
            actualizarUltimaOrdenHTML(texto);
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
            return 'Error al obtener datos';
        });
    }

    // Función para actualizar el HTML con el texto de la última orden
    function actualizarUltimaOrdenHTML(texto) {
        const elemento = document.getElementById("lastOrderText");
        if (elemento) {
            elemento.innerText = texto || 'No se pudo obtener el texto de la última orden';
        } else {
            console.error("No se encontró el elemento HTML 'lastOrderText' para mostrar la última orden");
        }
    }

    // Llamar a la función para obtener el último registro y mostrarlo en el HTML
    obtenerUltimaOrden();

    // Configurar un intervalo para obtener y mostrar la última orden cada 2 segundos
    setInterval(obtenerUltimaOrden, 2000);
});
