//referencias del html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

//socket cliente
const socket = io();

socket.on('connect', ()=>{
    console.log('conectado al server');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
    
});

socket.on('disconnect', () => {
    console.log('desconectado del server');
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';

});

