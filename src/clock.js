const clockBox = document.querySelector(".clock")

function showTime(){
    const now = new Date()
    const h = function(){
        const n = now.getHours()
        if (n < 10){
            return "0" + n
        } else {
            return n
        }
    }
    const m = function(){
        const n = now.getMinutes()
        if (n < 10){
            return "0" + n
        } else {
            return n
        }
    }
    const s = function(){
        const n = now.getSeconds()
        if (n < 10){
            return "0" + n
        } else {
            return n
        }
    }
    clockBox.querySelector("span").textContent = `${h()}:${m()}:${s()}`
}

function init(){
    showTime()
    setInterval(showTime,1000)
}
init()