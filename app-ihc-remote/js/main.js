import { obtenerData } from "./obtenerData.js";

const mostrarOrden = async() => {
    const tagOrden = document.getElementById("lastOrderText")
    const orden = await ultimaOrden();

    tagOrden.innerText = orden.ingresos;
}

// Función para actualizar el HTML con el texto de la última orden
const ultimaOrden = async () => {
    const json = await obtenerData();
    const arrJson = Object.keys(json).map(key => ({ key, value: json[key] }));

    let ultimaOrden;

    for (const orden of arrJson) {
        ultimaOrden = orden;
    }

    return ultimaOrden.value;
}

mostrarOrden();

setInterval(mostrarOrden, 2000);
