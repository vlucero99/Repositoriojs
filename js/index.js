// Variables
    const inputBuscar = document.querySelector("#inputBuscar")
    const divcontenedor = document.querySelector("#divcontenedor")
    const LogoCarrito = document.querySelector(".carrito")
    let busquedaEnProgreso = false;
    const carrito = []
    const ropa = [
        {id: 101, imagen: "./img/Remera_musculosa_beige.jpg", nombre: " Músculosa Beige", precio: 3500, descripción: "Remera musculosa color beige de algodón. Viene en talle S al XL." },
        {id: 102, imagen: "./img/Remera_negra.jpg", nombre: " Remera Negra", precio: 4000, descripción:"Remera volados color negra de algodón. Viene en talle S al XL."},
        {id: 103, imagen: "./img/Vestido_beige.jpg", nombre: " Vestido Beige", precio: 5000, descripción:"Vestido de fiesta color beige de lycra. Talle único."},
        {id: 104, imagen: "./img/Remera_musculosa_blanca.jpg", nombre: " Músculosa Blanca", precio: 3000, descripción:"Remera musculosa blanca estampada. Viene en talle S al L."},
        {id: 105, imagen: "./img/Jean_oscuro.jpg", nombre: " Jean Oscuro", precio: 7500, descripción:"Jean rígido oscuro. Viene en talle 32 al 50."},
        {id: 106, imagen: "./img/Bikini_celeste.jpeg", nombre: " Bikini Celeste", precio: 6500, descripción:"Bikini celeste de lycra. Viene en talle 1 al 3."},
        {id: 107, imagen: "./img/Vestido_floreado.jpg", nombre: " Vestido Floreado", precio: 4500, descripción:"Vestido floreado de algodón. Viene en talle 1 al 5."},
        {id: 108, imagen: "./img/Jean_clarito.jpg", nombre: " Jean MOM", precio: 8000, descripción:"Jean mom color celeste. Viene en talle 32 al 46."}
    ]
    const inputNombre = document.getElementById('inputNombre');
    const btnMostrarNombre = document.getElementById('btnMostrarNombre');
    const mensajeBienvenida = document.getElementById('mensajeBienvenida');
    let usuario = [];

    // Funciones
    inputBuscar.addEventListener("input", async () => {
        if (!busquedaEnProgreso) {
            busquedaEnProgreso = true;
            let param = inputBuscar.value.trim().toLowerCase();
            let Resultado = ropa.filter((prenda) => prenda.nombre.toLowerCase().includes(param));
            await mostrarResultados(Resultado, 1000);
            busquedaEnProgreso = false;
        }
    });
    
    LogoCarrito.addEventListener("mousemove", () => {
        if (carrito.length > 0) { 
            LogoCarrito.title = `${carrito.length} producto(s) en carrito`
        } else { 
            LogoCarrito.title = `Carrito vacío`
        } 
    })

    function CardsDeRopa(prenda) {
        return `<div class="card" style="width: 30rem; height: 50rem;">
                    <img src="${prenda.imagen}" class="card-img-top" alt="musculosa beige">
                    <div class="card-body">
                        <div class="titulo-card">${prenda.nombre} </div>
                        <p class="card-text">${prenda.descripción} Precio $ ${prenda.precio}. Código ${prenda.id}.</p>
                    </div>
                    <div class="boton">
                        <button id="${prenda.id}" type="button" class="comprar">Comprar</button>
                    </div>
                </div>`
    }
    function CardError () {
        return `<div class="alert alert-danger" role="alert">
        No se ha encontrado el producto.
        </div>`
    }

    function ClickBotonComprar() {
        const BotonComprar = document.querySelectorAll("button.comprar")
        if (BotonComprar.length > 0) {
            BotonComprar.forEach((boton)=> {
                boton.addEventListener("click", ()=> {
                    let PrendaSeleccionada = ropa.find((prenda)=> prenda.id === parseInt(boton.id))
                    carrito.push(PrendaSeleccionada)
                    localStorage.setItem("MiCarrito", JSON.stringify(carrito))
                })
            })
        }
    }

    function CargarPrendas() {
        if (ropa.length > 0) {
            ropa.forEach ((producto)=> divcontenedor.innerHTML += CardsDeRopa(producto))
            ClickBotonComprar()
        } else { 
            divcontenedor.innerHTML = CardError()
        }
    }
    CargarPrendas()


    async function mostrarResultados(resultados, delay) {
        divcontenedor.innerHTML = ""; 
        
        await new Promise((resolve) => setTimeout(resolve, delay));
        
        if (resultados.length > 0) {
            resultados.forEach((prenda) => {
                divcontenedor.innerHTML += CardsDeRopa(prenda);
            });
        } else {
            divcontenedor.innerHTML = CardError();
        }
        
        ClickBotonComprar();
    }

function cargarUsuarios() {
    fetch('usuarios.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON.');
            }
            return response.json();
        })
        .then(data => {
            nombre = data.nombre; 
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

    
    function mostrarBienvenida(nombre) {
        mensajeBienvenida.textContent = `¡Bienvenido/a, ${nombre}!`;
    }
    
    btnMostrarNombre.addEventListener('click', () => {
        const nombre = inputNombre.value.trim();
    
        if (nombre) {
            if (nombre.includes(nombre)) {
                mostrarBienvenida(nombre);
            } else {
                mensajeBienvenida.textContent = 'Lo sentimos, su nombre no está en la lista de usuarios permitidos.';
            }
        } else {
            mensajeBienvenida.textContent = 'Por favor, ingrese su nombre.';
        }
    });
    
    cargarUsuarios();