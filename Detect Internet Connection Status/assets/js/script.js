// Seleccionando todos los elementos requeridos
const wrapper = document.querySelector(".wrapper"),
toast = wrapper.querySelector(".toast"),
title = toast.querySelector("span"),
subTitle = toast.querySelector("p"),
wifiIcon = toast.querySelector(".icon"),
closeIcon = toast.querySelector(".close-icon");
window.onload = ()=>{
    function ajax(){
        let xhr = new XMLHttpRequest(); //creando un nuevo objeto XML
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true); //enviando una solicitud GET a esta URL
        xhr.onload = ()=>{ //una vez que ajax se cargue
            //si el estado de ajax es igual a 200 o menor que 300, significa que el usuario está obteniendo datos de la URL proporcionada
            //o si su estado de respuesta es 200, significa que está en línea
            if(xhr.status == 200 && xhr.status < 300){
                toast.classList.remove("offline");
                title.innerText = "Ahora estás en línea";
                subTitle.innerText = "¡Hurra! Internet está conectado.";
                wifiIcon.innerHTML = '<i class="uil uil-wifi"></i>';
                closeIcon.onclick = ()=>{ //ocultar la notificación toast al hacer clic en el ícono de cerrar
                    wrapper.classList.add("hide");
                }
                setTimeout(()=>{ //ocultar automáticamente la notificación toast después de 5 segundos
                    wrapper.classList.add("hide");
                }, 5000);
            }else{
                offline(); //llamando a la función offline si el estado de ajax no es igual a 200 o no es menor que 300
            }
        }
        xhr.onerror = ()=>{ 
            offline(); //llamando a la función offline si la URL pasada no es correcta o devuelve un error 404 u otro error
        }
        xhr.send(); //enviando una solicitud GET a la URL proporcionada
    }
    function offline(){ //función para estado offline
        wrapper.classList.remove("hide");
        toast.classList.add("offline");
        title.innerText = "Ahora estás desconectado";
        subTitle.innerText = "¡Ups! Internet está desconectado.";
        wifiIcon.innerHTML = '<i class="uil uil-wifi-slash"></i>';
    }
    setInterval(()=>{ //esta función setInterval llama a ajax frecuentemente cada 100 ms
        ajax();
    }, 100);
}
