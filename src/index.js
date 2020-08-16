// ✔clock
// ✔todo
// ✔username
// ✔random bgimage
// ✔local weather
// ◾css
let body = document.querySelector("body")
// const outerBox = document.querySelector(".outerbox")
const usernameBox = document.querySelector(".username")
const form = usernameBox.querySelector("form")
const weatherBox = document.querySelector(".weather")

//username persistance
function paintUsername(){
    usernameBox.querySelector("h1").innerText = `안녕하세요, ${localStorage.getItem("username")}님! 또 만났네요❤`
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

//지역별 날씨


function init(){
    const randomNumber = genRendom()
    paintImage(randomNumber)
    paintUsername()
    form.addEventListener("submit", saveUsername)
}
init()