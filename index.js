const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const listEl = document.getElementById("list-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
let notes = []

let localNotes= JSON.parse(localStorage.getItem("myNotes"))
if(localNotes) {
    notes = localNotes
    renderArray(notes)
}

function getActiveTabUrl(callback) {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if(tabs.length > 0)
            callback(tabs[0].url)
    })
    } else if (typeof browser !== 'undefined' && browser.tabs) {
        browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if(tabs.length > 0)
            callback(tabs[0].url)
    })
    } else {
      console.error('Unsupported browser');
    }
}
  
tabBtn.addEventListener("click", () => {
    getActiveTabUrl((url) => {
        if(url) {
            notes.push(url)
            localStorage.setItem("myNotes", JSON.stringify(notes))
            renderArray(notes)
        }
    })
})

inputBtn.addEventListener("click", () => {
    if(inputEl.value) {
        notes.push(inputEl.value)
        localStorage.setItem("myNotes", JSON.stringify(notes))
        inputEl.value = ""
        renderArray(notes)
    }
})

// TODO: add delete specific note button
deleteBtn.addEventListener("dblclick", () => {
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