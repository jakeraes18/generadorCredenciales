let insertUsers = [];
let currentId = 1; // Inicializamos el ID en 1

function insertUser() {
    // Obtener los datos del formulario
    let name = document.getElementById('nameInfo').value;
    let age = document.getElementById('ageInfo').value;
    let country = document.getElementById('countryInfo').value;
    let career = document.getElementById('career').value;

    // Validar que no estén vacíos los campos
    if (!name || !age || !country || !career) {
        Swal.fire({
            title: 'Tenemos un problema.',
            text: 'Por favor, llene toda la información.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    } else {
        Swal.fire({
            title: 'Listo :)',
            text: 'La credencial se a agregado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }

    // Guardar el objeto usuario en el arreglo
    const newUser = { id: currentId, name: name, age: parseInt(age), country: country, career: career };
    insertUsers.push(newUser);

    // Mostrar el nuevo usuario en el HTML inmediatamente
    addUserToHtml(newUser);

    // Incrementar el identificador único para el próximo usuario
    currentId++;

    // Limpiar los campos del formulario después de agregar el usuario
    document.getElementById('userForm').reset();
}

function addUserToHtml(user) {
    let targetsDiv = document.getElementById('targets');

    // Obtener la plantilla oculta
    let template = document.querySelector('.infoTarget.template');

    // Verificar si la plantilla existe
    if (!template) {
        console.error("Error: No se encontró la plantilla en el DOM.");
        return; // Detener la ejecución si no existe
    }

    // Clonar la plantilla oculta
    let infoTargetTemplate = template.cloneNode(true);

    // Remover la clase "template" para hacer visible la copia
    infoTargetTemplate.classList.remove('template');

    // Actualizar los campos de la plantilla clonada con la información del usuario
    infoTargetTemplate.querySelector('#idd').textContent = `No. Empleado: ${user.id}`;
    infoTargetTemplate.querySelector('#nameInfo').textContent = `${user.name}`;
    infoTargetTemplate.querySelector('#ageInfo').textContent = `${user.age} años`;
    infoTargetTemplate.querySelector('#countryInfo').textContent = `${user.country}`;
    infoTargetTemplate.querySelector('#career').textContent = `${user.career}`;

    // Agregar la estructura modificada al div principal
    targetsDiv.appendChild(infoTargetTemplate);
}

document.addEventListener("DOMContentLoaded", function () {

    const apiUrl = "https://rickandmortyapi.com/api/character/";

    // Obtén los primeros 10 personajes (puedes cambiar el número si lo deseas)
    fetch(apiUrl + "?page=1")
        .then(response => response.json())
        .then(data => {
            const characters = data.results;
            const container = document.getElementById("targets");

            characters.forEach(character => {
                const characterDiv = document.querySelector(".template").cloneNode(true);

                characterDiv.style.display = "block";

                characterDiv.querySelector("#circ").src = character.image;
                characterDiv.querySelector("#nameInfo").textContent = character.name;
                characterDiv.querySelector("#career").textContent = character.species; // Puedes cambiarlo por "species" o alguna otra propiedad que quieras mostrar
                characterDiv.querySelector("#ageInfo").textContent = character.status; // Usando el estado como 'edad' de ejemplo
                characterDiv.querySelector("#countryInfo").textContent = character.origin.name; // Nombre del origen del personaje
                characterDiv.querySelector("#idd").textContent = `ID: ${character.id}`;

                container.appendChild(characterDiv);
            });
        })
        .catch(error => {
            console.error("Error al obtener datos de la API:", error);
        });
});