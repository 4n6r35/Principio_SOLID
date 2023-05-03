const add_user = document.getElementById("add_user");
let dialog = document.getElementById("dialgoForm");

add_user.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = {}
    const inputs = event.target;

    for (const input of inputs) {
        if (input.value && input.value != '') {
            data[input.name] = input.value
        }
    }

    try {
        const res = await fetch("http://localhost:2507/api/create-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const dataRes = await res.json();
        console.log(dataRes)
        if (res.status != 200) {
            throw new Error(dataRes.msg)
        }
        initTable();
    } catch (error) {
        console.log(error)
    }
    dialog.close();
})