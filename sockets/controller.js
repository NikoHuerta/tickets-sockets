const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();


const socketController = (socket) => {

    //cuando un cliente se conecta
    console.log('Cliente Conectado', socket.id);
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('ticket-pendientes', ticketControl.tickets.length);
    //ticket-pendientes / ticketControl.tickets.length



    socket.on('disconnect',()=>{
        console.log('Cliente desconectado', socket.id);
    });

    socket.on('siguiente-ticket', (payload, callback) => {
        
        const siguiente = ticketControl.siguiente();
        callback(siguiente);

        //Notificar que hay un nuevo ticket pendiente de asignar
        socket.broadcast.emit('ticket-pendientes', ticketControl.tickets.length);
    });

    socket.on('atender-ticket', ( { escritorio } , callback) => {
        //console.log(escritorio);
        if(!escritorio){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }
        const ticket = ticketControl.atenderTicket(escritorio);
        //Notificar cambio en los ultimos4

        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
        socket.emit('ticket-pendientes', ticketControl.tickets.length); //emite al llamador del evento
        socket.broadcast.emit('ticket-pendientes', ticketControl.tickets.length); //broadcast emite a todos menos al "llamador del evento"
        

        if(!ticket){
            return callback({
                ok: false,
                msg: 'No hay tickets pendientes'
            });
        }else{
            return callback({
                ok: true,
                ticket
            });
        }

    });

}

module.exports = {
    socketController
}