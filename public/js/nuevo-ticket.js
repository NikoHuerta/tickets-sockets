//REFERENCIAS HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

//socket cliente
const socket = io();

socket.on('connect', ()=>{
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

socket.on('ultimo-ticket', (ultimoTicket) => {
    lblNuevoTicket.innerText = 'Ticket ' + ultimoTicket;
});


btnCrear.addEventListener('click', () => {
   
    socket.emit('siguiente-ticket', null, function (ticket) {
        lblNuevoTicket.innerText = ticket;
    });
})