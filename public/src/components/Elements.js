const dataSize = 10;
let totalPages = 1;
let currentPage = 1;

const Elements = Object.freeze({
    currentPage: document.getElementById("current_page"),
    tableDataBody: document.getElementById("table_body"),
    buttonNextPage: document.getElementById("button_next_page"),
    buttonPreviousPage: document.getElementById("button_previous_page"),
})
