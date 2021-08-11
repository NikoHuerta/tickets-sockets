//REFERENCIAS HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams(window.location.search);
//console.log(searchParams);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlerta.style.display = 'none';



//socket cliente
const socket = io();

socket.on('connect', ()=>{
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});


socket.on('ticket-pendientes', (numero) => {
    lblPendientes.innerText = numero;
    if(numero == 0){
        divAlerta.style.display = '';
    }else{
        divAlerta.style.display = 'none';
    }
});



btnAtender.addEventListener('click', () => {
    
    socket.emit('atender-ticket', { escritorio },  ({ok, ticket, msg}) => {
        if(!ok){
            lblTicket.innerText = `Nadie`;
            divAlerta.firstElementChild.innerText = msg;
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = `Ticket ${ticket.numero}`;
    });
    // socket.emit('siguiente-ticket', null, function (ticket) {
    //     lblNuevoTicket.innerText = ticket;
    // });
})