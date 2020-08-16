const toDoBox = document.querySelector(".todo")
const ulTodo = document.querySelector("ul")
let toDo = []

function appendToDo(event){
    const input = toDoBox.querySelector("input")
    event.preventDefault()
    const currentValue = input.value
    input.value = ""
    const newId = toDo.length
    const obj = {
        text: currentValue,
        id: newId
    }
    toDo.push(obj)
    saveToDo()
    paint(obj)
}
function deleteTodo(event){
    const li = event.target.parentNode
    const liId = parseInt(li.id)
    ulTodo.removeChild(li)
    
    const clean = toDo.filter(function(e){
        const status = (e.id !== liId)
        if(e.id > liId){
            e.id -= 1
        }
        return status
    })
    toDo = clean
    renewId(ulTodo, liId)
    
    saveToDo()
}
function paint(obj){
    const li = document.createElement("li")
    const span = document.createElement("span")
    const delBtn = document.createElement("button")
    
    span.innerText = obj.text;
    delBtn.innerText = "❌"
    delBtn.addEventListener("click", deleteTodo)
    delBtn.classList.add("delBtn")
    
    li.id = obj.id
    li.appendChild(span)
    li.appendChild(delBtn)
    ulTodo.appendChild(li)
}
function loadToDo(){
    const loadedtoDo = localStorage.getItem("toDo")
    if(loadedtoDo !== null){
        toDo = JSON.parse(loadedtoDo)
        toDo.forEach(p => {
            paint(p)
        })
    }
}
function saveToDo(){
    localStorage.setItem("toDo", JSON.stringify(toDo))
}
function renewId(ul, liId){
    const children = ul.children
    for(let c in children){
        const cId = parseInt(children[c].id)
        if (cId > liId){
            children[c].id = cId-1
        }
    }
    return ul
}
function init(){
    loadToDo()
    toDoBox.querySelector("form").addEventListener("submit", appendToDo)
}
init()