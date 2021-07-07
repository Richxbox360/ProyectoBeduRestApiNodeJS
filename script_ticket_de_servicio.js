function busquedaAPI(ticket) {
    fetch('https://pruebaproyectobedu.herokuapp.com/posts/' + ticket)
  .then(response => response.json())
  .then(data => {
      if (data.name == "CastError") {
        document.getElementById('banner-ticket-search').style.display = "none";
        alert("Introduzca un número válido");
        throw new Error();
      }
      console.log(data);
      rellenarInfoTabla(data);
      
    })
  .catch(error => {
      console.log(error.message)
  })
}

function rellenarInfoTabla(ticket) {
    document.getElementById('banner-ticket-search').style.display = "flex";
    const ticketTabla = document.getElementById('ticket-td');
    const nombreTabla = document.getElementById('nombre-td');
    const correoTabla = document.getElementById('correo-td');
    const servicioTabla = document.getElementById('servicio-td');
    const empresaTabla = document.getElementById('empresa-td');
    const descripcionTabla = document.getElementById('descripcion-td');
    ticketTabla.innerHTML = ticket["_id"];
    nombreTabla.innerHTML = `${ticket.name} ${ticket.surname}`;
    correoTabla.innerHTML = `${ticket.email}@${ticket.domain}`;
    descripcionTabla.innerHTML = ticket.description;
}

function busqueda(event) {
    event.preventDefault();
    let ticket = document.getElementById('input-search-ticket').value;
    busquedaAPI(ticket);
}

/*------------------------*/

function fetchData(data) {
    fetch('https://pruebaproyectobedu.herokuapp.com/posts/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
        console.log("Success", data);
        alert("Ticket creado con éxito");
    }).catch(error => console.log("Error", error));
}

function generadorTicket(event) {
    event.preventDefault();

    let nombre = document.getElementById('nombre-generador').value;
    let apellido = document.getElementById('apellido-generador').value;
    let correo = document.getElementById('correo-generador').value;
    let dominio = document.getElementById('dominio-generador').value;
    let servicio = document.getElementById('select-generador').value;
    let descripcion = document.getElementById('descripcion-generador').value;
    console.log(nombre,correo,dominio,servicio,descripcion);
    
    const dataObj = {
        "name": nombre,
        "surname": apellido,
        "email": correo,
        "domain": dominio,
        "problem": servicio,
        "description": descripcion
    }

    fetchData(dataObj);
};

/*------------------------*/


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('button-search-ticket').addEventListener('click', busqueda)
})


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('button-generador').addEventListener('click', generadorTicket);
})