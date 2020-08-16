const toDoBox = document.querySelector(".todo")
const ulPending = toDoBox.querySelector(".pending").querySelector("ul")
const ulFinished = toDoBox.querySelector(".finished").querySelector("ul")

let pending = []
let finished = []

function appendToDo(event){
    const input = toDoBox.querySelector("input")
    event.preventDefault()
    const currentValue = input.value
    input.value = ""
    const newId = pending.length
    const obj = {
        text: currentValue,
        id: newId,
        status: true
    }
    if(obj.status) pending.push(obj)
    else finished.push(obj)
    saveToDo()
    paint(obj)
}
function moveTodo(event){
    const li = event.target.parentElement
    const ul = li.parentElement
    const liId = parseInt(li.id)
    if(ul === ulPending){
        //ul에서 없애기
        ulPending.removeChild(li)
        //배열에서 없애고 추가하기
        const clean = pending.filter(function(e){
            const status = (e.id !== liId)
            if (!status){
                e.id = finished.length
                e.status = false
                finished.push(e)
                paint(e)
            }else{
                if(e.id > liId){
                    //배열 남은 id 갱신
                    e.id -= 1
                }
            }
            return status
        })
        pending = clean
        //li id 갱신
        renewId(ulPending, liId)
    } else {
        ulFinished.removeChild(li)
        const clean = finished.filter(function(e){
            const status = (e.id !== liId)
            if (!status){
                e.id = pending.length
                e.status = true
                pending.push(e)
                paint(e)
            } else {
                if(e.id > liId){
                    e.id -= 1
                }
            }
            return status
        })
        finished = clean
        renewId(ulFinished, liId)
    }
    saveToDo()
}
function deleteTodo(event){
    const li = event.target.parentNode
    const ul = li.parentNode
    const liId = parseInt(li.id)
    ul.removeChild(li)
    
    if(ul === ulPending){
        clean = pending.filter(function(e){
            const status = (e.id !== liId)
            if(e.id > liId){
                e.id -= 1
            }
            return status
        })
        pending = clean
        renewId(ulPending, liId)
    } else {
        clean = finished.filter(function(e){
            const status = (e.id !== liId)
            if(e.id > liId){
                e.id -= 1
            }
            return status
        })
        finished = clean
        renewId(ulFinished, liId)
    }
    saveToDo()
}
function paint(obj){
    const li = document.createElement("li")
    const span = document.createElement("span")
    const delBtn = document.createElement("button")
    const finBtn = document.createElement("button")
    
    span.innerText = obj.text;
    delBtn.innerText = "❌"
    delBtn.addEventListener("click", deleteTodo)
    delBtn.classList.add("delBtn")
    finBtn.innerText = "✔"
    finBtn.addEventListener("click",moveTodo)
    
    li.id = obj.id
    li.appendChild(span)
    li.appendChild(delBtn)
    li.appendChild(finBtn)
    if(obj.status){
        ulPending.appendChild(li)
    } else {
        ulFinished.appendChild(li)
    }
}
function loadToDo(){
    const loadedPending = localStorage.getItem("pending")
    const loadedFinished = localStorage.getItem("finished")
    if(loadedPending !== null){
        pending = JSON.parse(loadedPending)
        pending.forEach(p => {
            paint(p)
        })
    }
    if(loadedFinished !== null){
        finished = JSON.parse(loadedFinished)
        finished.forEach(p => {
            paint(p)
        })
    }
}
function saveToDo(){
    localStorage.setItem("pending", JSON.stringify(pending))
    localStorage.setItem("finished", JSON.stringify(finished))
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