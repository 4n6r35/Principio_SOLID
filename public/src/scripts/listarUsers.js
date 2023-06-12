const { buttonNextPage, buttonPreviousPage, tableDataBody, currentPage: currentPageElement } = Elements;
// const tableDataBody = document.getElementById("table_body")

const url = () => `http://localhost:2507/api/get-users?size=${dataSize}&page=${currentPage}`;

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
        <td scope="row" class="trb">${user.id}</td>        
        <td scope="row" class="trb">${user.name} ${user.lastname} </td>        
        <td scope="row" class="trb">${user.birthday}</td>        
        <td scope="row" class="trb">${user.gender}</td>        
        <td scope="row" class="trb">
            <button id="${user.id}" class="bt edit" name="Editar" onclick="usuario_a_actualizar(${user.id})"/>
            <button id="${user.id}" class="bt del" name="Eliminar" onclick="eliminarFila(${user.id})" />
        </td>
        `;
        const tr = document.createElement('tr')
        tr.id = 'data-id-' + user.id
        tr.innerHTML = html;
        tableDataBody.appendChild(tr)
    })
}
const initTable = async () => {
    try {
        const users = await listUsers();
        // console.log(users)
        createTable(users.data)
        totalPages = users.count_pages;
        currentPage = 1;
        currentPageElement.innerText = currentPage;
    } catch (error) {
        console.log(error)
    }
}

buttonNextPage.addEventListener('click', async () => {
    const newPage = currentPage + 1;
    if (newPage <= totalPages) {
        currentPage = newPage;
        const user = await listUsers();
        createTable(user.data)
        currentPageElement.innerText = currentPage;
    }
})

buttonPreviousPage.addEventListener('click', async () => {
    const newPage = currentPage - 1;
    if (newPage > 0 && newPage <= totalPages) {
        currentPage = newPage;
        const users_page = await listUsers();
        createTable(users_page.data)
        currentPageElement.innerText = currentPage;
    }
})

void (async () => {
    initTable()
})()