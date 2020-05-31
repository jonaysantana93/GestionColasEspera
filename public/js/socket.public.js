var socket = io();
var ticket1 = $('#lblTicket1');
var ticket2 = $('#lblTicket2');
var ticket3 = $('#lblTicket3');
var ticket4 = $('#lblTicket4');

var escritorio1 = $('#lblEscritorio1');
var escritorio2 = $('#lblEscritorio2');
var escritorio3 = $('#lblEscritorio3');
var escritorio4 = $('#lblEscritorio4');

var lblTickets = [ticket1, ticket2, ticket3, ticket4];
var lblEscritorios = [escritorio1, escritorio2, escritorio3, escritorio4];

socket.on('estadoActual', (data) => {
    actualizaHTML(data.ultimos4);

});


socket.on('ultimos4', (data) => {
    //Reproducir audio
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(data.ultimos4);

});


function actualizaHTML(ultimos4) {
    for (var i = 0; i <= ultimos4.length - 1; i++) {
        lblTickets[i].text(`Ticket ${ultimos4[i].numero}`);
        lblEscritorios[i].text(`Escritorio ${ultimos4[i].escritorio}`);
    }
}