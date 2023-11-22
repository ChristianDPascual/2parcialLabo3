import {getMonstruos,getterTabla} from "./miBiblioteca.js";
const divTabla = document.getElementById("divTabla");
const filTipo = document.getElementById("filtroTipo");
const filtroDebilidad = document.getElementById("filtrarDebilidad");
const filtrarAZNombre = document.getElementById("azNombre");
const filtrarAZAlias = document.getElementById("azAlias");
const filtroMiedo = document.getElementById("miedo");
const loader = document.getElementById("gif");


export function crearTabla()
{
    getMonstruos()
    .then( datos => {
        const arr = datos.map(e=>({id:e.id,nombre:e.nombre,tipo:e.tipo,debilidad:e.debilidad,alias:e.alias,miedo:e.miedo}));
        let tab = ordenarFuerzaMiedo(arr);
        let tabla = document.createElement("table");
        tabla.appendChild(crearCabeceraTabla(tab[0]));
        tabla.appendChild(crearCuerpoTabla(tab));
        tabla.classList.add("table-striped");
        tabla.classList.add('table-hover');
        tabla.classList.add("table");
        console.log(tabla);
        divTabla.appendChild(tabla);
    })
    .catch( error => {
        console.log("Hubo un error al obtener los datos: ",error);
    })
    .finally(() =>{
        loader.style.display = "none";
    });
}

function crearCabeceraTabla(objeto){
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    for(const key in objeto)
    {
        let th = document.createElement("th");
        let texto = document.createTextNode(key);
        th.appendChild(texto);
        tr.appendChild(th);
    }

    thead.appendChild(tr);
    thead.classList.add('thead-dark');

    return thead;
}

function crearCuerpoTabla(arr)
{
    let tbody = document.createElement("tbody");

    arr.forEach( (element) => {
        let tr = document.createElement("tr");
        for(const key in element){
            let td = document.createElement("td");
            let texto = document.createTextNode(element[key]);
            td.appendChild(texto);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });

    return tbody;
}

export function refrescarDiv(div,tabla){
    while(div.hasChildNodes())
    {
        div.removeChild(div.firstElementChild);
    }

    div.appendChild(tabla);
}

function mapearArray(arr)
{
    return arr.map(e=>({nombre:e.nombre,tipo:e.tipo,debilidad:e.tipo,alias:e.alias,miedo:e.miedo}));
}



export function elFiltrador(fTipo,fDebilidad,fNombre,fAlias,fMiedo)
{

    getMonstruos()
    .then( datos => {
        //aca tengo q ver q carajo filtre
        let filtro = datos;

        if(fTipo === true)
        {
            filtro = filtrarTipos(filtro,filTipo.value);
        }

        if(fDebilidad === true)
        {
            filtro = filtrarDebilidades(filtro,filtroDebilidad.value);
        }

        if(fNombre === true)
        {
            if(filtrarAZNombre.checked === true)
            {
                filtro = ordenarAZNombre(filtro);
            }
            else
            {
                filtro = ordenarZANombre(filtro);
            }
        }

        if(fAlias === true)
        {
            if(filtrarAZAlias.checked === true)
            {
                filtro = ordenarAZAlias(filtro);
            }
            else
            {
                filtro = ordenarZAAlias(filtro);
            }
        }

        if(fMiedo === true)
        {
            filtro = filtrarMiedos(filtro,filtroMiedo.value);
        }

        filtro = ordenarFuerzaMiedo(filtro);

        let tabla = document.createElement("table");
        tabla.appendChild(crearCabeceraTabla(filtro[0]));
        tabla.appendChild(crearCuerpoTabla(filtro));
        tabla.classList.add("table-striped");
        tabla.classList.add('table-hover');
        tabla.classList.add("table");
        console.log(tabla);
        divTabla.appendChild(tabla);
    })
    .catch( error => {
        console.log("Hubo un error al obtener los datos: ",error);
    })
    .finally(() =>{
        loader.style.display = "none";
    });
}

export function filtrarTipos(arr,condicion)
{
    return arr.filter(m=>m.tipo === condicion);
}

export function filtrarDebilidades(arr,condicion)
{
    return arr.filter(m=>m.debilidad === condicion);
}

export function filtrarMiedos(arr,condicion)
{
    console.log(condicion);
    return arr.filter(m=>m.miedo <= condicion);
}

export function ordenarAZNombre(datos)
{
    return datos.sort((a,b)=> a.nombre.localeCompare(b.nombre)); 
}

export function ordenarZANombre(datos)
{
    return datos.sort((b,a)=> a.nombre.localeCompare(b.nombre)); 
}

export function ordenarAZAlias(datos)
{
    return datos.sort((a,b)=> a.alias.localeCompare(b.alias)); 
}

export function ordenarZAAlias(datos)
{
    return datos.sort((b,a)=> a.alias.localeCompare(b.alias)); 
}

export function ordenarFuerzaMiedo(datos)
{
    return datos.sort((b,a)=> a.miedo-b.miedo); 
}