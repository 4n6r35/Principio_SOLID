function OpenDialogForm() {
    let add_button = document.getElementById("btn_add");
    let cancel_button = document.getElementById("cancel");
    let favDialog = document.getElementById("dialgoForm");

    //Update button opens a modal dialog
    add_button.addEventListener('click', function () {
        favDialog.showModal();
    });

    // Form cancel button closes the dialog box
    cancel_button.addEventListener('click', function () {
        favDialog.close()
    })
}
