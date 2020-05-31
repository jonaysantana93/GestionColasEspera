const fs = require('fs');

class TicketControl {

    constructor() {

        this.hoy = new Date().getDate();
        this.listTicket = []; //Lista de tickects sin atender
        this.listUltimos4 = [];

        let data = require('../data/data.json');
        console.log(data);

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.listTicket = data.tickets;
            this.listUltimos4 = data.ultimos4;
        } else {
            this.reiniciarConteio();
        }

    }

    reiniciarConteio() {
        this.ultimo = 0;
        this.listTicket = [];
        this.listUltimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    siguienteTicket() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.listTicket.push(ticket);
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.listUltimos4;
    }

    atenderTicket(Escritorio) {
        if (this.listTicket.length === 0) {
            return 'No hay tickets';
        }

        let numTicket = this.listTicket[0].numero;
        this.listTicket.shift();

        let atenderTicket = new Ticket(numTicket, Escritorio);

        this.listUltimos4.unshift(atenderTicket) //Se agrega al principiio del array

        if (this.listUltimos4.length > 4) {
            this.listUltimos4.splice(-1, 1); //Borra el ultimo elemento de un array
        }

        console.log('Ultimos 4');
        console.log(this.listUltimos4);

        this.grabarArchivo();

        return atenderTicket;
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.listTicket,
            ultimos4: this.listUltimos4
        }

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));
    }
}

class Ticket {
    constructor(Numero, Escritorio) {
        this.numero = Numero;
        this.escritorio = Escritorio;
    }
}

module.exports = {
    TicketControl
}