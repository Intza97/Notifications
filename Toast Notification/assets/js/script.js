const notifications = document.querySelector(".notifications"),
buttons = document.querySelectorAll(".buttons .btn");

// Objeto que contiene los detalles para diferentes tipos de notificaciones emergentes (toasts)
const toastDetails = {
    timer: 5000, // Duración predeterminada del toast en milisegundos
    success: {
        icon: 'fa-circle-check', // Icono para el toast de éxito
        text: 'Éxito: Este es un toast de éxito.', // Texto para el toast de éxito
    },
    error: {
        icon: 'fa-circle-xmark', // Icono para el toast de error
        text: 'Error: Este es un toast de error.', // Texto para el toast de error
    },
    warning: {
        icon: 'fa-triangle-exclamation', // Icono para el toast de advertencia
        text: 'Advertencia: Este es un toast de advertencia.', // Texto para el toast de advertencia
    },
    info: {
        icon: 'fa-circle-info', // Icono para el toast de información
        text: 'Información: Este es un toast de información.', // Texto para el toast de información
    }
}

// Función para eliminar un toast
const removeToast = (toast) => {
    toast.classList.add("hide"); // Agrega la clase 'hide' para iniciar la animación de salida
    if(toast.timeoutId) clearTimeout(toast.timeoutId); // Limpia el temporizador del toast si existe
    setTimeout(() => toast.remove(), 500); // Elimina el toast después de 500 ms
}

// Función para crear un toast
const createToast = (id) => {
    // Obtiene el icono y texto del toast según el id proporcionado
    const { icon, text } = toastDetails[id];
    const toast = document.createElement("li"); // Crea un nuevo elemento 'li' para el toast
    toast.className = `toast ${id}`; // Establece las clases para el toast
    // Establece el contenido HTML interno del toast
    toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
    notifications.appendChild(toast); // Agrega el toast al elemento 'ul' de notificaciones
    // Configura un temporizador para eliminar el toast después de la duración especificada
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}

// Agrega un evento de clic a cada botón para crear un toast cuando se hace clic
buttons.forEach(btn => {
    btn.addEventListener("click", () => createToast(btn.id));
});
