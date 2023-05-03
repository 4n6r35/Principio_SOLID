function eliminarFila(id) {
    fetch(`http://localhost:2507/api/delete-user/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                const fila = document.querySelector(`[data-id="${id}"]`).closest('tr');
                fila.remove();
            } else {
                throw new Error('No se pudo eliminar la fila');
            }
        })
        .catch(error => {
            console.error(error);                                                           
        });
}

const tabla = document.getElementById('table_body');

tabla.addEventListener('click', function (event) {
    if (event.target.classList.contains('del')) {
        const id = event.target.dataset.id;
        eliminarFila(id);
    }
});
