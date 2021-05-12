const date = new Date().getTime()
let hours=0, minutes=0, seconds=0
let miliseconds = 0
let idTimer = null
const h1Hour = document.getElementById("hours")
const h1Minutes = document.getElementById("minutes")
const h1Seconds = document.getElementById("seconds")
const button = document.getElementById("btStartStop")

const arrowClass = document.getElementsByClassName("arrow")
Array.from(arrowClass).forEach((x,i) => {
    x.addEventListener("click", (e) => {
        switch(i)
        {
            case 0:
                {
                    hours++
                    setText(h1Hour, hours)
                    break
                }
            case 1:
                {
                    if(hours > 0)
                    {
                        hours--
                        setText(h1Hour, hours)
                    }
                    break
                }
            case 2:
                {
                    if(minutes < 60 && minutes >= 0)
                    {
                        minutes++
                    }
                    if(minutes > 59)
                    {
                        minutes = 0
                    }
                    setText(h1Minutes, minutes)
                    break
                }
            case 3:
                {
                    if(minutes > 0)
                    {
                        minutes--
                        setText(h1Minutes, minutes)
                    }
                    break
                }
            case 4:
                {
                    if(seconds < 60 && seconds >= 0)
                    {
                        seconds++
                    }
                    if(seconds > 59)
                    {
                        seconds = 0
                    }
                    setText(h1Seconds, seconds)
                    break
                }
            case 5:
                {
                    if(seconds > 0)
                    {
                        seconds--
                        setText(h1Seconds, seconds)
                    }
                    break
                }
        }
    })
})

button.addEventListener("click", (e) => {
    e.preventDefault()
    if(e.target.className === "resume")
    {
        toMili()
        idTimer = window.setInterval(() => {setTimerHeader()}, 1000)
    }
    if(e.target.className === "stop")
    {
        clearInterval(idTimer)
        idTimer = null
        e.target.className = "resume"
        e.target.innerText = "resume"
    }
    hideTimerPanel()
})

function toMili()
{
    miliseconds = 0
    miliseconds += seconds * 1000
    miliseconds += minutes * 60000
    miliseconds += hours * 3600000
}

function setText(element, text)
{
    if(text < 10)
        element.innerText = "0" + text
    else
        element.innerText = text
}

function setTimerHeader()
{
    ConvertMs()
    setText(h1Hour, hours)
    setText(h1Minutes, minutes)
    setText(h1Seconds, seconds)
    if(miliseconds > 0)
        miliseconds -= 1000
    else
    {
        alert("koniec czasu !")
        clearInterval(idTimer)
        idTimer = null
        hideTimerPanel()
    }
}

function ConvertMs()
{
    let temp = miliseconds
    hours = Math.floor(miliseconds / 3600000)
    temp -= hours * 3600000
    minutes = Math.floor(temp / 60000)
    temp -= minutes * 60000
    seconds = Math.floor(temp / 1000)
}

function hideTimerPanel()
{
    const timerClass = document.getElementsByClassName("time")
    if(h1Hour.innerText === "00" && h1Minutes.innerText === "00" && h1Seconds.innerText === "00")
    {
        button.className = "start"
        button.innerText = "START"
        Array.from(arrowClass).forEach(x => {
            x.style.display = "inline"
        })
    }
    else
    {
        if(idTimer === null)
        {
            if(button.className === "start")
            {
                toMili()
                idTimer = window.setInterval(() => {setTimerHeader()}, 1000)
                Array.from(arrowClass).forEach(x => {
                    x.style.display = "none"
                })
                button.className = "stop"
                button.innerText = "PAUSE"
            }
        }
        else
        {
            button.className = "stop"
            button.innerText = "stop"
        }
    }
}

//setTimerHeader(date)

