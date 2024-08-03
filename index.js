const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const listEl = document.getElementById("list-el")
const deleteBtn = document.getElementById("delete-btn")
let notes = []

let localNotes= JSON.parse(localStorage.getItem("myNotes"))
if(localNotes) {
    urls = localNotes
    renderArray(notes)
}

inputBtn.addEventListener("click", function() {
    if(inputEl.value) {
        notes.push(inputEl.value)
        localStorage.setItem("myNotes", JSON.stringify(notes))
        inputEl.value = ""
        renderArray(notes)
    }
})

deleteBtn.addEventListener("dblclick", function() {
    localNotes = []
    notes = []
    localStorage.removeItem("myNotes")
    listEl.innerHTML = ""
})

function renderArray(array) {
    let list = ""
    for(let i = 0; i < array.length; i++) {
        list += `
            <li>
                ${
                    isCorrectUrl(array[i]) ?
                    `
                    <a target='_blank' href= ${array[i]}>
                        ${array[i]}
                    </a>
                    `
                    : `${array[i]}`
                }
            </li>
        `
    }
    listEl.innerHTML = list
}

function isCorrectUrl(str) {
    try {
        new URL(str)
        return true
    } catch(err) {
        return false
    }
}