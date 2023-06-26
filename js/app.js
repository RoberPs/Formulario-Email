
//Variable form
console.log(document.forms)
const formulario = document.querySelector('#enviar-mail')

//Variables
const btnEnviar = document.querySelector('#enviar')
const btnReset = document.querySelector('#resetBtn')
//variables inputs

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

//expresion regular
const exreg =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

//Eventos
eventos();
function eventos(){
    //Inicio de app
    document.addEventListener('DOMContentLoaded',iniciarApp);
    //Campos formulario 
    email.addEventListener('blur',validacion);
    asunto.addEventListener('blur',validacion);
    mensaje.addEventListener('blur',validacion);
    
    //Eviar email

    formulario.addEventListener('submit',enviarEmail);
     
    //Resetear btn

    btnReset.addEventListener('click', resetearForm);

}

//Funciones

function iniciarApp(){

    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed','opacity-50')
}

function validacion(e){
     
    //Elimina los mensajes de errores cuando rellenas un campo correctamente
   
    const error = document.querySelector('p.error');
    if(error){
        error.remove();
    }
   
    
    //Codigo para todos los campos   
    if(e.target.value.length > 0){
        //se deben eliminar las clases que no hagan falta
        e.target.classList.remove('border','border-red-500')
        e.target.classList.add('border','border-green-500')
        
    }else{
      /*   e.target.style.borderBottomColor = 'red' */
        e.target.classList.remove('border','border-green-500')
        e.target.classList.add('border','border-red-500');
        mostrarError('Todos los campos son obligatorios !!');
    }

   
    //Si el input seleccionado es tipo mail añdimos la exreg
    if(e.target.type === 'email'){
    
        
        if(exreg.test(e.target.value)){
            //Elimina los errores
            const error = document.querySelector('p.error');
            if(error){  
                error.remove();
            }
            e.target.classList.remove('border','border-red-500')
            e.target.classList.add('border','border-green-500')
        }else{
            e.target.classList.remove('border','border-green-500')
            e.target.classList.add('border','border-red-500');
            mostrarError('Email no valido');
        }
    }
    
    if(exreg.test(email.value) && asunto.value!=='' && mensaje.value!==''){
        btnEnviar.classList.remove('cursor-not-allowed','opacity-50')
        btnEnviar.disabled = false;

    }else{
        mostrarError('hay campos sin rellenar')
    }
}



function mostrarError(mensaje){
    const textoError = document.createElement('P');
    textoError.textContent = mensaje;
    textoError.classList.add('border','border-red-500','background-red-100','mt-3','text-center','text-red-500','pt-2','pb-2','color-red','error');
    
    const errores = document.querySelectorAll('.error');

    if(errores.length === 0){
        formulario.appendChild(textoError)
    }else{
        
    }  
}

function enviarEmail(e){
   e.preventDefault();

   //simulamos el envio del email con un spinner

   const spinner = document.querySelector('#spinner');
   spinner.style.display = 'flex';
   
   // Ocultamos spinner despues de 3s
   setTimeout(()=>{
       spinner.style.display = 'none'
       //mensaje
       const parrafo = document.createElement('P');
       parrafo.innerHTML = 'Email enviado correctamente';
       parrafo.classList.add('background-blue-100','text-blue-500','text-center','pt-2','pb-2','uppercase')
       formulario.insertBefore(parrafo,spinner)
       setTimeout(()=>{
           parrafo.remove();
           resetearForm();
           btnEnviar.disabled = true; 
       },5000)
   },3000);
}  

//Resetar formulario

function resetearForm(){
    formulario.reset();
}