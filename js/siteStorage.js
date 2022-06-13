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


localStorage.getItem("listaStorage") != null ?
JSON.parse(localStorage.getItem("listaStorage")).forEach(e => {
    mostrar(e)
}): console.log("tutubem")

function cargarJuego(juego, precio){

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

    //convertimos el objeto en string
    let stringify = JSON.stringify(newgameCompleto)

    //subimos el string a el storage
    localStorage.setItem(juego, stringify)


    //agregamos o recuperamos el array con la lista de juegos a acceder
    if(localStorage.getItem("listaStorage") != null )
        {
            // si no está vacía le pushea el nuevo juego y actualiza el storage
            let catalogo = JSON.parse(localStorage.getItem("listaStorage"))
            catalogo.push(newgame.nombre)
            let catalogoString = JSON.stringify(catalogo)
            localStorage.setItem("listaStorage",catalogoString)
        }
        else
        {
            // si la lista está vacía crea una nueva
            localStorage.setItem("listaStorage", `["${newgame.nombre}"]`)
        }

    // con la funcion mostrar agregamos el juego al DOM
    mostrar(newgame.nombre)
}

// cargarJuego("Mario Kart",1500)
// cargarJuego("Super Smash",1250)
// cargarJuego("Donkey Kong",900)
// cargarJuego("Kirby",1360)
// cargarJuego("Mario Party",999.58)
// cargarJuego("Bomber Man",1300)

//DOMinating the website
header.innerText = "Bienvenido a la calculadora de juegos de Steam"

function mostrar(juego){
    let e = JSON.parse(localStorage.getItem(juego))
    appendear(e)
}


function appendear(e){
    let nombre= document.createElement("li");
    nombre.className = e.nombre;
    nombre.innerText = e.nombre;
    nombre.dataset.aos = `zoom-in`
    nombre.className = "juegos-card"
    lista.append(nombre)

    let datos = document.createElement("ul")
    nombre.append(datos)

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


// Formulario para agregar nuevos juegos
formulario.addEventListener("submit", e => {
    e.preventDefault()
    cargarJuego(tituloNuevoJuego.value, precioNuevoJuego.value)
})

limpiar.addEventListener("click",()=>{
    localStorage.clear()
    lista.innerHTML = ""
})