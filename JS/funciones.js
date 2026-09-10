function agendar() {
    window.location.href="registroHora.html";
}

function verHorasAgendadas() {
    window.location.href = "verHoras.html";
}

function login() {
    window.location.href = "login.html"
}


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-agendar");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // evita que la página se recargue

        const nuevaAgenda = {
            id: Date.now(),
            nombreDuenio: document.getElementById("nombre-duenio").value.trim(),
            apellidoDuenio: document.getElementById("apellido-duenio").value.trim(),
            correo: document.getElementById("correo-duenio").value.trim(),
            telefono: document.getElementById("telefono-duenio").value.trim(),
            nombreMascota: document.getElementById("nombre-mascota").value.trim(),
            edadMascota: document.getElementById("edad-mascota").value,
            fecha: document.getElementById("fecha-hora").value,
            hora: document.getElementById("hora-hora").value
        };

        if (!nuevaAgenda.nombreDuenio || !nuevaAgenda.correo || !nuevaAgenda.fecha || !nuevaAgenda.hora) {
            alert("Por favor completa todos los campos obligatorios.");
            return;
        }

        // Obtener lo que ya había guardado, agregar la nueva agenda, y volver a guardar
        const agendas = JSON.parse(localStorage.getItem("agendas")) || [];
        agendas.push(nuevaAgenda);
        localStorage.setItem("agendas", JSON.stringify(agendas));

        alert("¡Hora agendada con éxito!");
        form.reset();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cuerpoAgendas = document.getElementById("cuerpoAgendas");

    // Si esta página no tiene esa tabla, no hace nada (así funciones.js sirve para ambas páginas sin dar error)
    if (!cuerpoAgendas) return;

    const agendas = JSON.parse(localStorage.getItem("agendas")) || [];

    agendas.forEach(agenda => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${agenda.nombreDuenio} ${agenda.apellidoDuenio}</td>
            <td>${agenda.nombreMascota}</td>
            <td>${agenda.fecha}</td>
            <td>${agenda.hora}</td>
        `;
        cuerpoAgendas.appendChild(fila);
    });
});