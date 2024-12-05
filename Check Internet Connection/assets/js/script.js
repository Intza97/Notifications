const popup = document.querySelector(".popup"),
  wifiIcon = document.querySelector(".icon i"),
  popupTitle = document.querySelector(".popup .title"),
  popupDesc = document.querySelector(".popup .desc"),
  reconnectBtn = document.querySelector(".reconnect");

let isOnline = true, intervalId, timer = 10;

const checkConnection = async () => {
  try {
    // Intentar obtener datos aleatorios de la API. Si el código de estado está entre 200 y 300,
    // se considera que la conexión de red está en línea.
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnline = response.status >= 200 && response.status < 300;
  } catch (error) {
    isOnline = false; // Si hay un error, se considera que la conexión está fuera de línea.
  }
  timer = 10;
  clearInterval(intervalId);
  handlePopup(isOnline);
};

const handlePopup = (status) => {
  if (status) {
    // Si el estado es verdadero (en línea), actualizar el icono, título y descripción.
    wifiIcon.className = "uil uil-wifi";
    popupTitle.innerText = "Conexión Restaurada";
    popupDesc.innerHTML = "Su dispositivo está conectado a Internet.";
    popup.classList.add("online");
    return setTimeout(() => popup.classList.remove("show"), 2000);
  }

  // Si el estado es falso (sin conexión), actualizar el icono, título y descripción.
  wifiIcon.className = "uil uil-wifi-slash";
  popupTitle.innerText = "Conexión Perdida";
  popupDesc.innerHTML = "Su red no está disponible. Intentaremos reconectarlo en <b>10</b> segundos.";
  popup.className = "popup show";

  // Establecer un intervalo para disminuir el temporizador cada segundo.
  intervalId = setInterval(() => {
    timer--;
    if (timer === 0) checkConnection(); // Si el temporizador llega a 0, verificar la conexión nuevamente.
    popup.querySelector(".desc b").innerText = timer;
  }, 1000);
};

// Verificar el estado de la conexión cada 3 segundos si está en línea.
setInterval(() => isOnline && checkConnection(), 3000);

// Escuchar clics en el botón de reconexión para intentar reconectar.
reconnectBtn.addEventListener("click", checkConnection);
