function eliminarFila(id) {

    fetch(`http://localhost:2507/api/delete-user?id_user=${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                // (this).closest('tr').remove();
                // const fila = document.getElementsByClassName(`[data-id="${id}"]`).closest('tr');
                const fila = document.getElementById(`data-id-${id}`)
                fila.closest('tr');
                fila.remove();
            } else {
                throw new Error('No se pudo eliminar la fila');
            }
        })
        .catch(error => {
            console.error(error);
        });
}
