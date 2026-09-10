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

function formatoPrecio(valor) {
    return valor.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
}

function calcularTotal() {
    let carrito = obtenerCarrito();
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio * carrito[i].cantidad;
    }

    return total;
}

function cambiarCantidad(indice, cambio) {
    let carrito = obtenerCarrito();

    if (carrito[indice] == null) {
        return;
    }

    carrito[indice].cantidad += cambio;

    if (carrito[indice].cantidad <= 0) {
        carrito.splice(indice, 1);
    }

    guardarCarrito(carrito);
    actualizarCarrito();
}

function quitarProducto(indice) {
    let carrito = obtenerCarrito();
    carrito.splice(indice, 1);
    guardarCarrito(carrito);
    actualizarCarrito();
}

function actualizarTotales() {
    let carrito = obtenerCarrito();
    let cantidadTotal = 0;

    for (let i = 0; i < carrito.length; i++) {
        cantidadTotal += carrito[i].cantidad;
    }

    let total = calcularTotal();

    let elCantidadCarrito = document.getElementById("cantidadCarrito");
    if (elCantidadCarrito != null) elCantidadCarrito.textContent = cantidadTotal;

    let elTotalCarrito = document.getElementById("totalCarrito");
    if (elTotalCarrito != null) elTotalCarrito.textContent = formatoPrecio(total);

    let elCantidadPagina = document.getElementById("cantidadPagina");
    if (elCantidadPagina != null) elCantidadPagina.textContent = cantidadTotal;

    let elTotalPagina = document.getElementById("totalPagina");
    if (elTotalPagina != null) elTotalPagina.textContent = formatoPrecio(total);
}

document.addEventListener("DOMContentLoaded", function () {
    actualizarCarrito();
});
