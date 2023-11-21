import {Personaje} from "./personaje.js";
import {Monstruo} from "./monstruo.js";
const loader = document.getElementById("gif");
Object.setPrototypeOf(Monstruo.prototype,Personaje.prototype);

const URL = "http://localhost:3000/monstruos";

export function getMonstruos(){
    loader.style.display = "block";
    /*
    return fetch(URL)
    .then( (res) => {
        if(res.ok == true){
            return res.json();
        }
        else{
            throw new Error("la solicitud no fue exitosa");
        }
    })
    .catch( (error) => {
        console.log(`Error ${error.status} : ${error.statusText}`);
    })*/

    return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(fetch(URL)
          .then( (res) => {
            if(res.ok == true){
                return res.json();
            }
            else{
                throw new Error("la solicitud no fue exitosa");
            }
        })
        .catch( (error) => {
            console.log(`Error ${error.status} : ${error.statusText}`);
        }));}, 3000);
  });
    

}

export function postMonstruo(nombre,tipo,debilidad,alias,miedo)
{
    generarID()
    .then( datos => {
        const valores = datos.map(e=>({id:e.id}));
        let contador = 1;
        let num;
        do{
            num = Math.floor(Math.random()*100);

            for(let x in valores){
                console.log(x);
                if(num === x)
                {
                    contador = 1;
                }
                else
                {
                    contador = 0;
                }
            };

        }while(contador == 1);

        let nMonstruo = new Monstruo(num,nombre,tipo,debilidad,alias,miedo);
        console.log(nMonstruo);

        fetch(URL,{
            method: "POST",
            headers : {
                "Content-Type": "application/json;charset=UTF-8",
            },
            body : JSON.stringify(nMonstruo),
        })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => console.log(data))
        .catch((res) => console.error(`Error ${res.status} : ${res.statusText}`));
    })
    .catch( error => {
        console.log("Hubo un error al generar un id: ",error);
    });
}

export function deleteMonstruo(id)
{
    fetch(URL + "/" + id,{
        method: "DELETE"
        })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => console.log(data))
        .catch((res) => console.error(`Error ${res.status} : ${res.statusText}`));
}


export function updateMonstruo(id,nombre,tipo,debilidad,alias,miedo)
{
    let uMonstruo = new Monstruo(id,nombre,tipo,debilidad,alias,miedo);
    fetch(URL + "/" + uMonstruo.id,{
        method: "PUT",
        headers : {
            "Content-Type": "application/json;charset=UTF-8",
        },
        body : JSON.stringify(uMonstruo),
        })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => console.log(data))
        .catch((res) => console.error(`Error ${res.status} : ${res.statusText}`));
}


export function validarTipo(value)
{
    if(!(value === null) && (value ==="humanoide" || value ==="demonio" || value ==="no muerto" || value === "bestia"))
    {
        return true;         
    }
    return false;   
}

export function validarDebilidad(value)
{
    if(!(value === null) && (value ==="fuego" || value ==="luz solar" || value ==="espada de plata" || value === "biblia"))
    {
        return true;         
    }
    return false;   
}

export function validarTexto(value)
{
    if(!(value === null) && value.length > 0 && !Number(value))
    {
        return true;         
    }
    return false;      
}

export function validarNumero(value)
{
    if(!(value === null) && Number(value) && value>=0)
    {
        return true;   
    }
    return false;
}

function generarID()
{
    return fetch(URL)
    .then( (res) => {
        if(res.ok == true){
           return res.json();
        }
        else{
            throw new Error("Error al intentar generar un nuevo ID");
        }
    })
    .catch( (error) => {
        console.log(`Error ${error.status} : ${error.statusText}`);
    })
   
}

