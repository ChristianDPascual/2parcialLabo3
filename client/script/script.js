import { crearTabla,refrescarDiv,elFiltrador} from "./tabla.js";
import { validarDebilidad,validarNumero,validarTexto,validarTipo,postMonstruo,updateMonstruo,deleteMonstruo } from "./miBiblioteca.js";

const divTabla = document.getElementById("divTabla");
const filtrador = document.getElementById("filtrador");
const opcionesDesplegable = document.getElementById("menuDesplegable");
const btnOp = document.getElementById("btnOp");
const body = document.getElementById("body");
const btnAbrirForm = document.querySelector("#btnNuevoMonstruo");
const formu = document.querySelector("#formulario");
const btnGuardarForm = document.querySelector("#btnGuardar");
const btnCerrarForm = document.querySelector("#btnCerrar");
const btnLimpiarForm = document.querySelector("#btnBorrar");
const btnModificarForm = document.querySelector("#btnModificar");
const btnEliminarForm = document.querySelector("#btnEliminar");
const btnSalirForm = document.querySelector("#btnSalir");
const nombre = document.getElementById("nombreMonstruo");
const tipo = document.getElementById("tipoMonstruo");
const debilidad = document.getElementById("debilidadMonstruo");
const alias = document.getElementById("aliasMonstruo");
const miedo = document.getElementById("cnivelMiedo")
const btnClean = document.getElementById("btnClean");
const btnBuscar = document.getElementById("btnBuscar");
const filtrarTipo = document.getElementById("filtroTipo");
const filtrarDebilidad = document.getElementById("filtrarDebilidad");
const filtrarAZNombre = document.getElementById("azNombre");
const filtrarZANombre = document.getElementById("zaNombre");
const filtrarAZAlias = document.getElementById("azAlias");
const filtrarZAAlias = document.getElementById("zaAlias");
const filtrarMiedo = document.getElementById("miedo");
const textoMiedo = document.getElementById("nivelMiedo");
const loader = document.getElementById("gif");
let valorID;


window.addEventListener("load",()=>{
   crearTabla();
   filtrarMiedo.value = 10;
   textoMiedo.textContent = filtrarMiedo.value;
});

btnOp.addEventListener("click",()=>{
    body.classList.toggle("body_move");
    filtrador.classList.toggle("filtrador_move")
    
    if(opcionesDesplegable.style.display === 'none' || opcionesDesplegable.style.display === ''){
        opcionesDesplegable.style.display = 'block';
    }
    else{
        opcionesDesplegable.style.display = 'none';
    }
});

btnAbrirForm.addEventListener("click",()=>{
    limpiarForm();
    formu.showModal();
    btnGuardarForm.style.visibility = 'visible';
    btnLimpiarForm.style.visibility = 'visible';
    btnCerrarForm.style.visibility = 'visible';
    btnModificarForm.style.visibility = 'hidden';
    btnEliminarForm.style.visibility = 'hidden';
    btnSalirForm.style.visibility = 'hidden';
});//boton abrir

btnCerrarForm.addEventListener("click",()=>{
   formu.close();
});//boton cerrar

btnSalirForm.addEventListener("click",()=>{
    formu.close();
 });

btnLimpiarForm.addEventListener("click",()=>{
    limpiarForm();
});

btnEliminarForm.addEventListener("click",()=>{
    if(mostrarConfirmacion() === true)
    {
        deleteMonstruo(valorID);
        refrescarDiv(divTabla,crearTabla()); 
    }
    else
    {
        window.alert("Operacion cancelada");
    }
 });

btnModificarForm.addEventListener("click",()=>{

    
    let id = valorID;
    let n;
    let t;
    let a;
    let m;
    let d;
    let verificacion = true;
    let mensaje = [];
    let alerta;
    let error ="";


    if(validarTexto(nombre.value))
    {
        n = nombre.value;
    }
    else
    {
        alerta = "nombre";
        verificacion = false;
        mensaje.push(alerta);
        
    }

    if(validarTexto(alias.value))
    {
        a = alias.value
    }
    else
    {
        alerta = "alias";
        verificacion = false;
        mensaje.push(alerta);
    }

    if(validarNumero(miedo.value))
    {
        m = miedo.value;
    }
    else
    {
        alerta = "miedo";
        verificacion = false;
        mensaje.push(alerta);
    }

    if(validarTipo(tipo.value))
    {
        t = tipo.value;
    }
    else
    {
        alerta = "tipo";
        verificacion = false;
        mensaje.push(alerta);
    }

    if(validarDebilidad(debilidad.value))
    {
        d = debilidad.value;
    }
    else
    {
        alerta = "debilidad";
        verificacion = false;
        mensaje.push(alerta);
    }

    
    if(verificacion === true )
    {
        if(mostrarConfirmacion()===true)
        {
            window.alert("monstruo modificado exitosamente");
            formu.close();   
            updateMonstruo(id,n,t,d,a,parseInt(m));
            refrescarDiv(divTabla,crearTabla());  
        }
        else
        {
            window.alert("modificacion cancelada");
        }
    }
    else
    {
        console.log(mensaje.length);
        for(let i = 0; i < mensaje.length; i++)
        {
            console.log();
            if( i+1 === mensaje.length)
            {
                error = error+mensaje[i]+".";
            }
            else
            {
                error = error+mensaje[i]+", ";
            }
        };
        window.alert("Error al cargar los datos del formulario.\nRevisar "+error);
    }
    
})

btnGuardarForm.addEventListener("click",()=>{

    let n;
    let t;
    let a;
    let m;
    let d;
    let verificacion = true;
    let mensaje = [];
    let alerta;
    let error ="";


    if(validarTexto(nombre.value))
    {
        n = nombre.value;
    }
    else
    {
        alerta = "nombre";
        verificacion = false;
        mensaje.push(alerta);
        
    }

    if(validarTexto(alias.value))
    {
        a = alias.value
    }
    else
    {
        alerta = "alias";
        verificacion = false;
        mensaje.push(alerta);
    }

    if(validarNumero(miedo.value))
    {
        m = miedo.value;
    }
    else
    {
        alerta = "miedo";
        verificacion = false;
        mensaje.push(alerta);
    }

    if(validarTipo(tipo.value))
    {
        t = tipo.value;
    }
    else
    {
        alerta = "tipo";
        verificacion = false;
        mensaje.push(alerta);
    }

    if(validarDebilidad(debilidad.value))
    {
        d = debilidad.value;
    }
    else
    {
        alerta = "debilidad";
        verificacion = false;
        mensaje.push(alerta);
    }

    
    if(verificacion === true)
    {
        window.alert("monstruo cargada exitosamente");
        formu.close();   
        postMonstruo(n,t,d,a,parseInt(m));
        refrescarDiv(divTabla,crearTabla());     
    }
    else
    {
        console.log(mensaje.length);
        for(let i = 0; i < mensaje.length; i++)
        {
            console.log();
            if( i+1 === mensaje.length)
            {
                error = error+mensaje[i]+".";
            }
            else
            {
                error = error+mensaje[i]+", ";
            }
        };
        window.alert("Error al cargar los datos del formulario.\nRevisar "+error);
    }
    
});

divTabla.addEventListener("click",function(event){
    event.preventDefault();
    const filaClickeada = event.target.closest('tr');
    if(filaClickeada)
    {
        valorID = filaClickeada.cells[0].innerText;
        nombre.value = filaClickeada.cells[1].innerText;
        tipo.value = filaClickeada.cells[2].innerText;
        debilidad.value = filaClickeada.cells[3].innerText;
        alias.value = filaClickeada.cells[4].innerText;
        miedo.value = filaClickeada.cells[5].innerText;
        formu.showModal();
        btnGuardarForm.style.visibility = 'hidden';
        btnLimpiarForm.style.visibility = 'hidden';
        btnCerrarForm.style.visibility = 'hidden';
        btnModificarForm.style.visibility = 'visible';
        btnEliminarForm.style.visibility = 'visible';
        btnSalirForm.style.visibility = 'visible';
        
    }

});

btnClean.addEventListener("click",()=>{
    limpiarMenuDesplegable();
    refrescarDiv(divTabla,crearTabla());
});

btnBuscar.addEventListener("click",()=>{
    let fTipo = false;
    let fDebilidad = false;
    let fNombre = false;;
    let fAlias = false;;
    let fMiedo = false;

    if(filtrarTipo.value != "Tipo")
    {
        fTipo = true;
    }

    if(filtrarDebilidad.value != "Debilidad")
    {
        fDebilidad = true;
    }

    if(!(filtrarAZNombre.checked === false && filtrarZANombre.checked === false))
    {
        fNombre = true;
    }

    if(!(filtrarAZAlias.checked === false && filtrarZAAlias.checked === false))
    {
        fAlias = true;
    }

    if(filtrarMiedo.value<10)
    {
        fMiedo = true;
    }

    if(fTipo === true || fDebilidad === true || fNombre === true || fAlias === true || fMiedo === true)
    {
       loader.style.display = "block";
       refrescarDiv(divTabla,elFiltrador(fTipo,fDebilidad,fNombre,fAlias,fMiedo));
    }
    else
    {
        console.log("asdd");
    }
});

function mostrarConfirmacion() {
    const respuesta = confirm('¿Estás seguro que deseas continuar?');
  
    if (respuesta === true) {
      return true;
    } else {
        return false;
    }
  }

function limpiarForm(){
    nombre.value = null;
    tipo.value = "Tipo";
    debilidad.value = "Debilidad";
    alias.value = null;
    miedo.value = null;
};

filtrarMiedo.addEventListener("click",()=>{
    textoMiedo.textContent= filtrarMiedo.value;
});

function limpiarMenuDesplegable()
{
    filtrarTipo.value ="Tipo";
    filtrarDebilidad.value = "Debilidad";
    filtrarAZNombre.checked =  false;
    filtrarZANombre.checked = false;
    filtrarAZAlias.checked = false;
    filtrarZAAlias.checked = false;
    filtrarMiedo.value = 10;
    textoMiedo.textContent = filtrarMiedo.value;
}