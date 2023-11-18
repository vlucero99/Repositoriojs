let nombre 
do {
    nombre = prompt("Ingrese su nombre");

    if (nombre === "") {
        alert("Debe ingresar un nombre.");
    }
} while (nombre === "");
        alert("Bienvenido/a " + nombre);

function MenuDeOpciones() {

    const carrito = []
    const ropa = [
        {codigo: 101, nombre: " Músculosa Beige", precio: 3500},
        {codigo: 102, nombre: " Remera Negra", precio: 4000},
        {codigo: 103, nombre: " Vestido Beige", precio: 5000},
        {codigo: 104, nombre: " Músculosa Blanca", precio: 3000},
        {codigo: 105, nombre: " Jean Oscuro", precio: 7500},
        {codigo: 106, nombre: " Bikini Celeste", precio: 6500},
        {codigo: 107, nombre: " Vestido Floreado", precio: 4500},
        {codigo: 108, nombre: " Jean MOM", precio: 8000}
    ]
    
    function BuscarArticulo(codigo){
    let ArticuloSeleccionado = ropa.find((articulo)=> articulo.codigo === codigo)
    return ArticuloSeleccionado
    }
    
    function comprar() {
        let codigo = prompt("Ingresa el código del articulo a comprar.\n(el cód. numérico que figura debajo de la imagen)")
        let ArticuloElegido = BuscarArticulo(parseInt(codigo))
    
        if (ArticuloElegido !== undefined) {
            carrito.push(ArticuloElegido)     
            alert(ArticuloElegido.nombre + " se agregó al carrito.")
            let respuesta = confirm("¿Deseas elegir otro artículo?")
            if (respuesta === true) {
                comprar()
            } else {
                let subtotal = carrito.reduce((acumulador, prenda)=> acumulador + prenda.precio, 0)
                let FinalizarCompra
                FinalizarCompra = prompt("El costo de tu compra es: $", subtotal, "\nMuchas gracias por elegirnos.")
            }
    
        } else {
            alert("Código de artículo incorrecto.")
        }
    }
    function EliminarDelCarrito() {
        let codigo = prompt("Ingresa el cód de producto a quitar:")
        let indice = carrito.findIndex((articulo)=> articulo.codigo === parseInt(codigo))
    
        if (indice !== -1) {
            carrito.splice(indice, 1)
        }
    }
    function MostrarCarrito() {
        let nombre = carrito.map ((articulo)=> articulo.nombre)
        return nombre
    }

    let opcion;
    do {
        opcion = parseInt(prompt("Elija alguna de las siguientes opciones\n" + "1.Comprar\n" + "2. Ver carrito\n" + "3. Eliminar artículo del Carrito\n" + "4. Salir"));
        switch (opcion) {
            case 1:
                comprar()
                break;
            case 2:
                alert(MostrarCarrito())
                break;
            case 3:
                EliminarDelCarrito()
                alert("Artículo eliminado con éxito")
                break;
            case 4:
                alert("Gracias por tu compra");
                break;
            default:
                alert("Opción no válida");
                
        }

    } while (opcion !== 4);
}

MenuDeOpciones();


