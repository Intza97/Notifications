const btns = document.querySelectorAll(".btn");
const output = document.querySelector(".notifications");
const closeBtn = document.querySelector(".close-btn");

const message = document.createElement("div");
const success = document.createElement("div");
const danger = document.createElement("div");

notifications=[
    message,success,danger
];
notifications.forEach(n => {
    n.classList.add("notification");
});

message.classList.add("info");
success.classList.add("success");
danger.classList.add("danger");

message.innerHTML=`
<div>
    <span class="material-symbols-outlined icon">chat_bubble</span>
    <div>
    <h3>John Doe</h3>
    <p>Genial, ¡muchas gracias por la rápida respuesta!</p>
    </div>
      <span class="material-symbols-outlined close-btn">
    close
    </span>
</div>`;
success.innerHTML=`
<div>
    <span class="material-symbols-outlined icon">done</span>
    <div>
    <h3>Cambios guardados</h3>
    <p>La fecha del contrato se cambió correctamente</p>
    </div>
      <span class="material-symbols-outlined close-btn">
    close
    </span>
</div>`;
danger.innerHTML=`
<div>
    <span class="material-symbols-outlined icon">delete</span>
    <div>
    <h3>Documento eliminado</h3>
    <p>Documento eliminado correctamente</p>
    </div>
      <span class="material-symbols-outlined close-btn">
    close
    </span>
</div>`;
btns.forEach(btn=>{
    btn.addEventListener("click",()=>{
        const id =btn.dataset.alert;
        const n = notifications[id].cloneNode(true);
        output.appendChild(n);
    });
});
window.addEventListener("animationend",e => {
    if(e.target.classList.contains("notification")){
        e.target.remove();
    }
});
window.addEventListener("click",e => {
    if(e.target.classList.contains("close-btn")){
        e.target.parentElement.remove();
    }
})