import {getMonstruos} from "./miBiblioteca.js";
const loader = document.getElementById("gif");
const btnTarjeta = document.getElementById("btnTarjetero");

btnTarjeta.addEventListener("click",()=>{
    crearTarjetas();
 });

 function crearCuerpoTarjeta(arr) {
    let card = document.createElement('div');

    arr.forEach((element) => {
        let c = document.createElement("div");

        for (const key in element) {
            let ttext = document.createElement("p");
            let texto = document.createTextNode(`${key}: ${element[key]}`);
            ttext.appendChild(texto);
            c.appendChild(ttext);
        }

        c.classList.add('card');
        card.appendChild(c);
    });

    return card;
}


function crearTarjetas() {
    const cardsContainer = document.getElementById('cards-container');

    getMonstruos()
        .then(datos => {
            const arr = datos.map(e => ({
                nombre: e.nombre,
                tipo: e.tipo,
                debilidad: e.debilidad,
                alias: e.alias,
                miedo: e.miedo
            }));

            const cuerpoTarjeta = crearCuerpoTarjeta(arr);
            cardsContainer.appendChild(cuerpoTarjeta);
        })
        .catch(error => {
            console.log("Hubo un error al obtener los datos: ", error);
        })
        .finally(() =>{
            loader.style.display = "none";
        });
}
