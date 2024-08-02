inputBtn = document.getElementById("input-btn")
inputEl = document.getElementById("input-el")
listEl = document.getElementById("list-el")
leads = []
inputBtn.addEventListener("click", function() {
    leads.push(inputEl.value)
    inputEl.value = ""
    renderLeads()
})

function renderLeads() {
    let listLeads = ""
    for(let i = 0; i < leads.length; i++) {
        listLeads += `
            <li>
                <a target='_blank' href= ${leads[i]}>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    listEl.innerHTML = listLeads
}