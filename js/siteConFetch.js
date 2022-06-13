AOS.init();

const body = document.body
const h1 = document.createElement("h1")
const div = document.createElement("div")
const header = document.querySelector("#header")
const lista = document.querySelector("#juegos")
const boton = document.querySelector("#boton")
const limpiar = document.querySelector("#limpiar")
const tituloNuevoJuego = document.querySelector("#nuevojuego")
const precioNuevoJuego = document.querySelector("#nuevoprecio")
const formulario = document.querySelector("#formulario")


header.innerText = "Bienvenido a la calculadora de juegos de Steam"


//Constructor de Método de Juegos
class Juego{
    constructor (nombre, precio){
        this.nombre = nombre;
        this.precio = parseFloat(precio).toFixed(2);
    }
    masIva(){
        return (this.precio * 0.21).toFixed(2);
    }
    masImpPais(){
        return (this.precio * 0.08).toFixed(2);
    }
    masImpGanancia(){
        return (this.precio * 0.35).toFixed(2);
    }
    impTotal(){
        return (this.precio * (1 + 0.21 + 0.08 + 0.35)).toFixed(2);
    }
}

// Generamos el append para agregar la lista al DOM
function appendear(e,imagen){
    

    let juego= document.createElement("li");
    juego.className = e.juego;
    juego.dataset.aos = `zoom-in`
    juego.className = "juegos-card"
    lista.append(juego)

    let titulo = document.createElement("div")

    let img = document.createElement("img");
    img.src= imagen
    juego.append(img)


    
    let datos = document.createElement("ul")
    juego.append(datos)

    let precio = document.createElement("li")
    precio.innerText = "precio: $" + e.precio
    datos.append(precio)

    let iva = document.createElement("li")
    iva.innerText = "iva: $" + e.iva
    datos.append(iva)

    let ganancias = document.createElement("li")
    ganancias.innerText = "ganancias: $" + e.ganancias
    datos.append(ganancias)

    let impPais = document.createElement("li")
    impPais.innerText = "impuesto país: $" + e.impPais
    datos.append(impPais)

    let total = document.createElement("li")
    total.innerText = "total: $" + e.total
    datos.append(total)
}

// Fetch para traer los datos del JSON donde están cargados los juegos
 fetch("../js/juegos.JSON")
    .then(res => res.json())
    .then(obj => {
        obj.forEach(e => {
            
            let juego = e[Object.keys(e)[0]]["data"]
            let imagen = juego.header_image;
            let nombre = juego.name;
            let precio = juego.price_overview.final/100;
            console.log(
                `Nombre: ${nombre}\nPrecio: $${precio}`
                )
                mostarar(nombre,precio,imagen)
                
            });
    })

    function mostarar(juego,precio,imagen){
    //cargamos el nuevo juego al método Juegos
    let newgame = new Juego(juego,precio)

    //hacemos un nuevo objeto con los precios
    let newgameCompleto = {
        nombre: newgame.nombre,
        precio: newgame.precio,
        iva: newgame.masIva(),
        ganancias: newgame.masImpGanancia(),
        impPais: newgame.masImpPais(),
        total: newgame.impTotal()
    }
    appendear(newgameCompleto,imagen)

    }