const socket = io();
const messages = [];
let email = "";

const form = document.getElementById('mensajeForm');

Swal.fire({
    title: "Enter your email address",
    input: "text",
    text: "Enter your email",
    inputValidator: (value) => {
      return !value && "You need to write something!";
    },
    allowOutsideClick: false,
  }).then((result) => {
    email = result.value;
  });

form.addEventListener('submit', e => {
    console.log(e.target.message.value);
    e.preventDefault();
    const data = {
        user: email,
        message: e.target.message.value,
        accion: 'guardarMensaje'
    }
    socket.emit('mensaje', data);
    form.reset();
});