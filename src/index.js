// ✔clock
// ✔todo
// ✔username
// ✔random bgimage
// ✔local weather
// ◾css
let body = document.querySelector("body")
const usernameBox = document.querySelector(".username")
const form = usernameBox.querySelector("form")
const weatherBox = document.querySelector(".weather")

//username persistance
function paintUsername(){
    const name = localStorage.getItem("username")
    if (name === null){
        usernameBox.querySelector("form")
        const input = document.createElement("input")
        input.setAttribute("placeholder", "사용자 이름")
        usernameBox.querySelector("form").appendChild(input)
    } else {
        usernameBox.querySelector("h1").innerText = `안녕하세요, ${name}님! 또 만났네요❤`
    }
}
function saveUsername(){
    localStorage.setItem("username", usernameBox.querySelector("input").value)
    paintUsername()
}
//랜덤 배경
function genRendom(){
    const n = Math.floor(Math.random() * 4)
    return n
}
function paintImage(n){
    const image = new Image();
    image.src = `img/${n}.jpg`
    image.classList.add("bgImage")
    body.appendChild(image)
}

function init(){
    // localStorage.removeItem("username")
    const randomNumber = genRendom()
    paintImage(randomNumber)
    paintUsername()
    form.addEventListener("submit", saveUsername)
}
init()