// variables
const tabla = document.querySelector("tbody")
let CarritoGuardado = JSON.parse(localStorage.getItem("MiCarrito"));
const CartelCompraFinalizada = document.querySelector(".CartelCompraExitosa")
const BotonFinalizar = document.querySelectorAll("button#FinalizarCompra")
let Carrito = CarritoGuardado || [];


// funciones
function actualizarCarritoGuardado() {
    localStorage.setItem("MiCarrito", JSON.stringify(Carrito));
    CarritoGuardado = JSON.parse(localStorage.getItem("MiCarrito")) || [];
}

function retornarFilaHTML(prenda) {
    tabla.innerHTML = "";
    return `<tr id="${prenda.id}">
                <td>${prenda.id}</td>
                <td>${prenda.nombre}</td>
                <td>$${prenda.precio}</td>
                <td><button class="eliminar" data-id="${prenda.id}">Eliminar</button></td>
            </tr>`
}

function BotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".eliminar");

    botonesEliminar.forEach((botonEliminar) => {
        botonEliminar.addEventListener("click", () => {
            const id = parseInt(botonEliminar.dataset.id);
            const EliminarID = Carrito.findIndex((producto) => producto.id === id);
            
            if (EliminarID !== -1) {
                Carrito.splice(EliminarID, 1);
                actualizarCarritoGuardado();
                cargarProductos();
            }
        });
    });
}

function calcularSubtotal() {
    let subtotal = 0;
    CarritoGuardado.forEach((producto) => {
        subtotal += producto.precio;
    });
    return subtotal;
}

function agregarFilaSubtotal(subtotal) {
    tabla.innerHTML += `
        <tr>
            <td colspan="1"></td>
            <td><strong>Subtotal:</strong></td>
            <td>$${subtotal}</td>
        </tr>
    `;
}

function cargarProductos() {
    if (CarritoGuardado && CarritoGuardado.length > 0) {
        tabla.innerHTML = "";

        CarritoGuardado.forEach((prenda) => {
            tabla.innerHTML += retornarFilaHTML(prenda);
        });

        const subtotal = calcularSubtotal();
        agregarFilaSubtotal(subtotal);
    }
    BotonesEliminar(); 
}
cargarProductos();


function CartelCompraExitosa() {
    Swal.fire({
        icon: 'success',
        title: '¡Compra finalizada con éxito!',
        html: `
            <p>Gracias por elegirnos, esperamos que vuelvas pronto</p>
            <hr>
            <p class="mb-0">A continuación te llegará un correo electrónico con tu factura y los detalles del envío.</p>`,
        customClass: {
            confirmButton: 'boton-sweet'
        }
    });
    return null;
}

function CartelErrorCompra() {
    Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Tu carrito está vacío. Debes seleccionar al menos un (1) producto para continuar.',
        customClass: {
            confirmButton: 'boton-sweet'
        }
    });
    return null;
}


function ClickBotonFinalizar() {
    BotonFinalizar.forEach((boton) => {
        boton.addEventListener("click", () => {
            if (CarritoGuardado && CarritoGuardado.length > 0) {
                tabla.innerHTML = "";
                CartelCompraFinalizada.innerHTML = CartelCompraExitosa();
                localStorage.clear();
            } else {
                Carrito = [];
                CartelCompraFinalizada.innerHTML = CartelErrorCompra();
            }
        });
    });
}
ClickBotonFinalizar();
