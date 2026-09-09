// Ejemplo para los botones de productos:
// onclick="agregarAlCarrito('Alimento para perro', 18990)"

function obtenerCarrito() {
    let carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado == null) {
        return [];
    }

    return JSON.parse(carritoGuardado);
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio) {
    let carrito = obtenerCarrito();
    let encontrado = false;

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre == nombre) {
            carrito[i].cantidad = carrito[i].cantidad + 1;
            encontrado = true;
        }
    }

    if (encontrado == false) {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    actualizarCarrito();
    abrirCarrito();
}

function quitarProducto(posicion) {
    let carrito = obtenerCarrito();
    carrito.splice(posicion, 1);
    guardarCarrito(carrito);
    actualizarCarrito();
}

function cambiarCantidad(posicion, cambio) {
    let carrito = obtenerCarrito();
    carrito[posicion].cantidad = carrito[posicion].cantidad + cambio;

    if (carrito[posicion].cantidad <= 0) {
        carrito.splice(posicion, 1);
    }

    guardarCarrito(carrito);
    actualizarCarrito();
}

function calcularTotal() {
    let carrito = obtenerCarrito();
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        total = total + carrito[i].precio * carrito[i].cantidad;
    }

    return total;
}

function contarProductos() {
    let carrito = obtenerCarrito();
    let cantidad = 0;

    for (let i = 0; i < carrito.length; i++) {
        cantidad = cantidad + carrito[i].cantidad;
    }

    return cantidad;
}

function formatoPrecio(precio) {
    return "$" + precio.toLocaleString("es-CL");
}

function abrirCarrito() {
    let carrito = document.getElementById("carritoLateral");
    let fondo = document.getElementById("fondoCarrito");

    if (carrito != null) {
        carrito.classList.add("abierto");
    }

    if (fondo != null) {
        fondo.classList.add("mostrar");
    }
}

function cerrarCarrito() {
    let carrito = document.getElementById("carritoLateral");
    let fondo = document.getElementById("fondoCarrito");

    if (carrito != null) {
        carrito.classList.remove("abierto");
    }

    if (fondo != null) {
        fondo.classList.remove("mostrar");
    }
}

function mostrarCarritoLateral() {
    let lista = document.getElementById("listaCarrito");

    if (lista == null) {
        return;
    }

    let carrito = obtenerCarrito();
    lista.innerHTML = "";

    if (carrito.length == 0) {
        lista.innerHTML = '<p class="carritoVacio">No hay productos en el carrito.</p>';
        return;
    }

    for (let i = 0; i < carrito.length; i++) {
        let subtotal = carrito[i].precio * carrito[i].cantidad;

        lista.innerHTML = lista.innerHTML +
            '<div class="productoCarrito">' +
                '<div class="datosProducto">' +
                    '<strong>' + carrito[i].nombre + '</strong>' +
                    '<span>' + formatoPrecio(carrito[i].precio) + '</span>' +
                    '<div class="cantidadProducto">' +
                        '<button onclick="cambiarCantidad(' + i + ', -1)">-</button>' +
                        '<span>' + carrito[i].cantidad + '</span>' +
                        '<button onclick="cambiarCantidad(' + i + ', 1)">+</button>' +
                    '</div>' +
                '</div>' +
                '<div class="precioProducto">' +
                    '<strong>' + formatoPrecio(subtotal) + '</strong>' +
                    '<button onclick="quitarProducto(' + i + ')">Eliminar</button>' +
                '</div>' +
            '</div>';
    }
}

function mostrarCarritoPagina() {
    let lista = document.getElementById("productosCarritoPagina");

    if (lista == null) {
        return;
    }

    let carrito = obtenerCarrito();
    lista.innerHTML = "";

    if (carrito.length == 0) {
        lista.innerHTML = '<div class="carritoVacioPagina">El carrito está vacío.</div>';
        return;
    }

    for (let i = 0; i < carrito.length; i++) {
        let subtotal = carrito[i].precio * carrito[i].cantidad;

        lista.innerHTML = lista.innerHTML +
            '<div class="productoPagina">' +
                '<div>' +
                    '<h3>' + carrito[i].nombre + '</h3>' +
                    '<p>Precio: ' + formatoPrecio(carrito[i].precio) + '</p>' +
                    '<div class="cantidadProducto">' +
                        '<button onclick="cambiarCantidad(' + i + ', -1)">-</button>' +
                        '<span>' + carrito[i].cantidad + '</span>' +
                        '<button onclick="cambiarCantidad(' + i + ', 1)">+</button>' +
                    '</div>' +
                    '<button class="eliminarPagina" onclick="quitarProducto(' + i + ')">Eliminar</button>' +
                '</div>' +
                '<strong>' + formatoPrecio(subtotal) + '</strong>' +
            '</div>';
    }
}

function actualizarTotales() {
    let total = formatoPrecio(calcularTotal());
    let cantidad = contarProductos();

    let cantidadCarrito = document.getElementById("cantidadCarrito");
    let cantidadPagina = document.getElementById("cantidadPagina");
    let resumenCantidad = document.getElementById("resumenCantidad");

    if (cantidadCarrito != null) {
        cantidadCarrito.innerText = cantidad;
    }

    if (cantidadPagina != null) {
        cantidadPagina.innerText = cantidad;
    }

    if (resumenCantidad != null) {
        resumenCantidad.innerText = cantidad;
    }

    let ids = [
        "totalTransferencia",
        "totalOtros",
        "totalCarrito",
        "totalTransferenciaPagina",
        "totalOtrosPagina",
        "totalPagina"
    ];

    for (let i = 0; i < ids.length; i++) {
        let elemento = document.getElementById(ids[i]);

        if (elemento != null) {
            elemento.innerText = total;
        }
    }
}

function actualizarCarrito() {
    mostrarCarritoLateral();
    mostrarCarritoPagina();
    actualizarTotales();
}

function iniciarPago() {
    if (calcularTotal() == 0) {
        alert("El carrito está vacío");
    } else {
        alert("Total a pagar: " + formatoPrecio(calcularTotal()));
    }
}

document.addEventListener("DOMContentLoaded", function () {
    actualizarCarrito();
});
