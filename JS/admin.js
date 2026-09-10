function mostrarUsuariosAdmin() {
    let cuerpo = document.getElementById("cuerpoUsuarios");

    if (cuerpo == null) {
        return;
    }

    let usuarios = obtenerUsuarios();
    cuerpo.innerHTML = "";

    for (let i = 0; i < usuarios.length; i++) {
        let fila = document.createElement("tr");
        fila.innerHTML = "<td>" + usuarios[i].usuario + "</td><td>" + usuarios[i].rol + "</td>";
        cuerpo.appendChild(fila);
    }
}

function mostrarProductosAdmin() {
    let cuerpo = document.getElementById("cuerpoProductosAdmin");

    if (cuerpo == null) {
        return;
    }

    cuerpo.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        let fila = document.createElement("tr");
        fila.innerHTML = "<td>" + productos[i].nombre + "</td><td>$" + productos[i].precio.toLocaleString("es-CL") + "</td>";
        cuerpo.appendChild(fila);
    }
}