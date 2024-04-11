document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos HTML necesarios
    const orderResultDiv = document.getElementById('orderResult');
    const controlTexto = document.getElementById("controlTexto");
    let recognition; // Variable para mantener la instancia del reconocimiento de voz

    const startRecognition = () => {
        // Verificar si el navegador es compatible con el reconocimiento de voz
        if ('webkitSpeechRecognition' in window) {
            // Crear una nueva instancia de reconocimiento de voz
            recognition = new webkitSpeechRecognition();
            recognition.lang = 'es-ES'; // Establecer el idioma del reconocimiento
            recognition.continuous = false; // No continua automáticamente
            recognition.interimResults = false; // No devuelve resultados intermedios

            recognition.onresult = function (event) {
                const result = event.results[0][0].transcript.toLowerCase();
                console.log('Orden identificada:', result);

                // Realizar acciones según el texto reconocido
                processCommand(result);
            };

            recognition.onend = function () {
                // Reiniciar automáticamente el reconocimiento de voz después de 2 segundos o inmediatamente después de procesar un comando
                setTimeout(() => {
                    console.log("Reiniciando el reconocimiento...");
                    recognition.start();
                }, 2000);
            };

            // Iniciar el reconocimiento de voz
            recognition.start();
        } else {
            alert('El reconocimiento de voz no es soportado por este navegador.');
        }
    };

    const processCommand = (result) => {
        switch (true) {
            // Caso: "letra italic"
            case result.includes("letra itali"):
                orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                controlTexto.classList.add('fst-italic');
                insertarJson("Cambiar texto a italic");
                break;

            // Caso: "abre youtube"
            case result.includes("abre youtube"):
                orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                window.open('https://www.youtube.com/', '_blank');
                insertarJson("Abrir YouTube");
                break;

            // Caso: "abre nueva pestaña"
            case result.includes("abre nueva pestaña"):
                // Actualizar el contenido del elemento orderResultDiv con un mensaje indicando que se ha identificado la orden
                orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                // Abrir una nueva pestaña del navegador con la URL deseada
                window.open('https://www.google.com', '_blank');
               // Llamar a la función insertarJson con el argumento "Abrir nueva pestaña"
               insertarJson("Abrir nueva pestaña");
                break;


            /*
                 //No manda a la api por la interrupcion al cerrar la ventana 

            // Caso: "cerrar pestaña actual"
            case result.includes("cerrar pestaña actual"):
                insertarJson("Cerrar pestaña actual").then(() => window.close());
                break;

            // Caso: "cerrar navegador"
            case result.includes("cerrar navegador"):
                window.top.close();
                break;*/

                // deberia de mandar :/
            // Caso: "cerrar pestaña actual"
            case result.includes("cerrar pestaña actual"):
                insertarJson("Cerrar pestaña actual").then(() => {
                console.log("Intentando cerrar la pestaña...");
                window.close(); // Intenta cerrar la pestaña
                }).catch(error => console.error("Error al insertar JSON antes de cerrar la pestaña:", error));
            break;

           // Caso: "cerrar navegador"
            case result.includes("cerrar navegador"):
                insertarJson("Cerrar navegador").then(() => {
                console.log("Intentando cerrar el navegador...");
                window.top.close(); // Intenta cerrar el navegador
                }).catch(error => console.error("Error al insertar JSON antes de cerrar el navegador:", error));
            break;
 
        }
    };

    // Función para enviar los datos a la API
    function insertarJson(ingresos) {
        return fetch('https://6614da0e2fc47b4cf27d3ce0.mockapi.io/ingresos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingresos })
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('Error al subir');
            }
            return response.json();
        })
        .then(data => console.log('Subido exitosamente:', data))
        .catch(error => console.error('Error:', error));
    }

    // Iniciar el ciclo de reconocimiento de voz automáticamente
    startRecognition();
});
