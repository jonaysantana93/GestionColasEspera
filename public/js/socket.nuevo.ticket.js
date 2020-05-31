var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Connectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', (resp) => {
    label.text(resp.actual);
});

$('button').on('click', () => {
    socket.emit('siguienteTicket', null, function(nextTicket) {
        label.text(nextTicket);
    });
});