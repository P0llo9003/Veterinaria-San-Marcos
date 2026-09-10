function inicializarUsuarios() {
    let usuarios = localStorage.getItem("usuarios");

    if (usuarios == null) {
        let usuariosPorDefecto = [
            {
                usuario: "admin",
                password: "admin123",
                rol: "admin"
            }
        ];

        localStorage.setItem("usuarios", JSON.stringify(usuariosPorDefecto));
    }
}

function obtenerUsuarios() {
    let usuarios = localStorage.getItem("usuarios");

    if (usuarios == null) {
        return [];
    }

    return JSON.parse(usuarios);
}

function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function existeUsuario(nombreUsuario) {
    let usuarios = obtenerUsuarios();

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].usuario == nombreUsuario) {
            return true;
        }
    }

    return false;
}

document.addEventListener("DOMContentLoaded", function () {
    inicializarUsuarios();

    // ----- LOGIN -----
    let formLogin = document.getElementById("form-login");

    if (formLogin != null) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();

            let usuarioIngresado = document.getElementById("usuario").value.trim();
            let passwordIngresado = document.getElementById("password").value.trim();

            let usuarios = obtenerUsuarios();
            let encontrado = null;

            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i].usuario == usuarioIngresado && usuarios[i].password == passwordIngresado) {
                    encontrado = usuarios[i];
                }
            }

            if (encontrado == null) {
                alert("Usuario o contraseña incorrectos");
                return;
            }

            localStorage.setItem("usuarioActual", JSON.stringify(encontrado));
            alert("Bienvenido, " + encontrado.usuario);

            if (encontrado.rol == "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "home.html";
            }
        });
    }

    // ----- REGISTRO -----
    let formRegistro = document.getElementById("form-registro");

    if (formRegistro != null) {
        formRegistro.addEventListener("submit", function (e) {
            e.preventDefault();

            let nuevoUsuario = document.getElementById("nuevo-usuario").value.trim();
            let nuevaPassword = document.getElementById("nueva-password").value.trim();
            let confirmarPassword = document.getElementById("confirmar-password").value.trim();

            if (nuevoUsuario == "" || nuevaPassword == "") {
                alert("Por favor completa todos los campos");
                return;
            }

            if (nuevaPassword != confirmarPassword) {
                alert("Las contraseñas no coinciden");
                return;
            }

            if (existeUsuario(nuevoUsuario)) {
                alert("Ese nombre de usuario ya existe, elige otro");
                return;
            }

            let usuarios = obtenerUsuarios();

            usuarios.push({
                usuario: nuevoUsuario,
                password: nuevaPassword,
                rol: "cliente"
            });

            guardarUsuarios(usuarios);
            alert("Cuenta creada con éxito, ahora puedes iniciar sesión");
            window.location.href = "login.html";
        });
    }
});