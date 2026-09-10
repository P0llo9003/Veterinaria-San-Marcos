const productos = [
    { id: 1, img: "IMG/comidaperro.png", nombre: "Alimento para Perros", precio: 25000 }
];

function renderProductos() {
    const contenedor = document.getElementById("contenedorProductos");
    contenedor.innerHTML = productos.map(p => `
        <div class="cardProducto">
            <img src="${p.img}" alt="${p.nombre}" class="imgProducto">
            <h3>${p.nombre}</h3>
            <p class="precioProducto">$${p.precio.toLocaleString("es-CL")}</p>
            <button onclick="agregarCarrito(${p.id})">Agregar al Carrito</button>
        </div>
    `).join("");
}

function agregarCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const carrito = obtenerCarrito();
    const existente = carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(carrito);
    actualizarCarrito();

    const noti = document.getElementById("noti");
    if (noti) {
        noti.textContent = "Producto agregado correctamente";
        setTimeout(() => noti.textContent = "", 3000);
    }
} 

document.addEventListener("DOMContentLoaded", renderProductos);