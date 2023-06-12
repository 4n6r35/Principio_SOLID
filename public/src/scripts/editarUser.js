
async function usuario_a_actualizar(id) {
    let update_button = document.getElementById(`${id}`);
    let name_upd = document.getElementById("nup")
    let lastname_upd = document.getElementById("aup")
    let date_upd = document.getElementById("dup")
    let gender_upd = document.getElementById("fav_gender")
    let cancel_button = document.getElementById("cancel_update");
    let favDialog = document.getElementById("updateDialgoForm");
    try {
        const response = await fetch(`http://localhost:2507/api/get-user?id_user=${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        const { data } = await response.json();
        console.log(data)

        name_upd.value = data.user_name
        lastname_upd.value = data.user_lastname
        date_upd.value = data.user_birthday
        gender_upd.value = data.gender
        console.log(gender_upd.value)

        //Update button opens a modal dialog
        update_button.addEventListener('click', function () {
            favDialog.showModal();
        });


        // Form cancel button closes the dialog box
        cancel_button.addEventListener('click', function () {
            favDialog.close()
        })

    } catch (error) {
        console.log(error)
    }
}
