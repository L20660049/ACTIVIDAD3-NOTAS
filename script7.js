// script.js

// Seleccionar elementos del DOM
const noteForm = document.getElementById('noteForm');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

// Cargar notas desde localStorage al abrir la página
document.addEventListener('DOMContentLoaded', loadNotes);

// Manejar el evento de agregar una nueva nota
noteForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    const noteText = noteInput.value.trim(); // Obtener el texto de la nota

    if (noteText !== '') {
        addNoteToList(noteText); // Agregar la nota a la lista
        saveNoteToLocalStorage(noteText); // Guardar la nota en localStorage
        noteInput.value = ''; // Limpiar el campo de texto
    }
});

// Función para agregar una nueva nota a la lista en el DOM
function addNoteToList(note) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.innerText = note;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerText = 'Eliminar';
    deleteBtn.addEventListener('click', function() {
        noteDiv.remove(); // Eliminar la nota del DOM
        deleteNoteFromLocalStorage(note); // Eliminar la nota de localStorage
    });

    noteDiv.appendChild(deleteBtn); // Agregar el botón de eliminar a la nota
    notesList.appendChild(noteDiv); // Agregar la nota a la lista
}

// Guardar una nueva nota en localStorage
function saveNoteToLocalStorage(note) {
    let notes = getNotesFromLocalStorage(); // Obtener notas existentes
    notes.push(note); // Agregar la nueva nota
    localStorage.setItem('notes', JSON.stringify(notes)); // Guardar en localStorage
}

// Obtener las notas desde localStorage
function getNotesFromLocalStorage() {
    let notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : []; // Retornar notas o un arreglo vacío
}

// Cargar todas las notas al iniciar la aplicación
function loadNotes() {
    let notes = getNotesFromLocalStorage(); // Obtener notas desde localStorage
    notes.forEach(function(note) {
        addNoteToList(note); // Agregar cada nota a la lista
    });
}

// Eliminar una nota de localStorage
function deleteNoteFromLocalStorage(noteToDelete) {
    let notes = getNotesFromLocalStorage(); // Obtener notas existentes
    notes = notes.filter(note => note !== noteToDelete); // Filtrar la nota a eliminar
    localStorage.setItem('notes', JSON.stringify(notes)); // Guardar la lista actualizada
}
