document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos HTML necesarios
    const startRecognitionBtn = document.getElementById('startRecognition');
    const orderResultDiv = document.getElementById('orderResult');
    const controlTexto = document.getElementById("controlTexto");

    // Agregar un evento de clic al botón de activación del reconocimiento de voz
    startRecognitionBtn.addEventListener('click', function () {
        // Verificar si el navegador es compatible con el reconocimiento de voz
        if ('webkitSpeechRecognition' in window) {
            // Crear una nueva instancia de reconocimiento de voz
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'es-ES'; // Establecer el idioma del reconocimiento

            // Definir el comportamiento cuando se detecta un resultado de reconocimiento de voz
            recognition.onresult = function (event) {
                // Obtener el texto reconocido y convertirlo a minúsculas para simplificar las comparaciones
                const result = event.results[0][0].transcript.toLowerCase();
                console.log('Orden identificada:', result);

                // Realizar acciones según el texto reconocido
                switch (true) {
                    // Caso: "letra italic"
                    case result.includes("letra itali"):
                    orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                    controlTexto.classList.add('fst-italic');
                    insertarJson("Cambiar texto a italic");
                    break;
                
                    // Caso: "abre youtube"
                    case result.includes("abre youtube"):
                        // Actualiza el contenido del elemento orderResultDiv con un mensaje indicando que se ha identificado la orden
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        // Abre una nueva pestaña del navegador que carga la página de YouTube
                        window.open('https://www.youtube.com/', '_blank');
                        // Llama a la función insertarJson con el argumento "Abrir YouTube"
                        insertarJson("Abrir YouTube");
                        break;
                
                    // Caso: "abre nueva pestaña"
                    case result.includes("abre nueva pestaña"):
                    // Actualizar el contenido del elemento orderResultDiv con un mensaje indicando que se ha identificado la orden
                    orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                    // Abrir una nueva pestaña del navegador con una página en blanco
                      window.open('about:blank', '_blank');
                    // Llamar a la función insertarJson con el argumento "Abrir nueva pestaña"
                     insertarJson("Abrir nueva pestaña");
                   break;

                    
                
                  // Caso: "cerrar pestaña actual"
                  case result.includes("cerrar pestaña actual"):
                 // Llamar a la función insertarJson con el argumento "Cerrar pestaña actual"
                 insertarJson("Cerrar pestaña actual").then(() => window.close());
                 break;

                // Caso: "cerrar navegador"
                case result.includes("cerrar navegador"):
               // Cerrar la ventana actual del navegador
               window.top.close();
               break;

                            
                            
                }
                
            };

            // Iniciar el reconocimiento de voz
            recognition.start();
        } else {
            alert('El reconocimiento de voz no es soportado por este navegador.');
        }
    });

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
                throw new Error('Error al subir el recurso');
            }
            return response.json();
        })
        .then(data => console.log('Recurso subido exitosamente:', data))
        .catch(error => console.error('Error:', error));
    }
});
