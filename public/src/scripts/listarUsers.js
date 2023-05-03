const tableDataBody = document.getElementById("table_body")

const url = () => 'http://localhost:2507/api/get-users'

const listUsers = async () => {
    try {
        const response = await fetch(url(),
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

const createTable = (users = []) => {
    tableDataBody.innerHTML = ''
    users.forEach(user => {
        const html = `
        <td scope="row" class="trb">${user.id_user}</td>        
        <td scope="row" class="trb">${user.name} ${user.lastname} </td>        
        <td scope="row" class="trb">${user.birthday}</td>        
        <td scope="row" class="trb">${user.gender}</td>        
        <td scope="row" class="trb">
            <button class="bt edit" />
            <button class="bt del"  />
        </td>
        `;
        const tr = document.createElement('tr')
        tr.id = 'data_id'
        tr.innerHTML = html;
        tableDataBody.appendChild(tr)
    })
}
const initTable = async () => {
    try {
        const user = await listUsers();
        createTable(user.data)
    } catch (error) {
        console.log(error)
    }
}

void (async () => {
    initTable()
})()