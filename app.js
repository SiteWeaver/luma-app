// =======================
// THEME
// =======================

const btn = document.getElementById("themeBtn")

btn.addEventListener("click", () => {
document.body.classList.toggle("dark")

if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark")
}else{
localStorage.setItem("theme","light")
}
})

if(localStorage.getItem("theme") === "dark"){
document.body.classList.add("dark")
}



// =======================
// GRID VIEW
// =======================

const viewToggle = document.getElementById("viewToggle")

viewToggle.addEventListener("click", () => {
document.body.classList.toggle("grid")
viewToggle.classList.toggle("active")
})



// =======================
// FILTER
// =======================

const filterBtn = document.getElementById("filterBtn")
const filterPanel = document.getElementById("filterPanel")
const filterOverlay = document.getElementById("filterOverlay")

filterBtn.addEventListener("click", () => {

filterBtn.classList.toggle("active")
filterPanel.classList.toggle("active")
filterOverlay.classList.toggle("active")

})

filterOverlay.addEventListener("click", () => {

filterBtn.classList.remove("active")
filterPanel.classList.remove("active")
filterOverlay.classList.remove("active")

})



// =======================
// ADD PAGE
// =======================

const addBtn = document.querySelector(".nav-item.add")
const addPage = document.getElementById("addPage")
const closeAdd = document.getElementById("closeAdd")

addBtn.addEventListener("click", () => {
addPage.classList.add("active")
})

closeAdd.addEventListener("click", () => {
addPage.classList.remove("active")
})



// =======================
// NAVIGATION
// =======================

const navItems = document.querySelectorAll(".nav-item")

const pages = {
home: document.getElementById("homePage"),
fav: document.getElementById("favPage"),
chat: document.getElementById("chatPage"),
profile: document.getElementById("profilePage")
}

navItems.forEach(item => {

item.addEventListener("click", () => {

navItems.forEach(i => i.classList.remove("active"))
item.classList.add("active")

const page = item.dataset.page

if(page === "add") return

document.querySelectorAll(".page").forEach(p=>{
p.classList.remove("active")
})

pages[page].classList.add("active")

})

})



// =======================
// ADD POST
// =======================

const publishBtn = document.getElementById("publishBtn")
const titleInput = document.getElementById("titleInput")
const priceInput = document.getElementById("priceInput")
const descInput = document.getElementById("descInput")
const feed = document.getElementById("feed")

publishBtn.addEventListener("click", () => {

const title = titleInput.value
const price = priceInput.value

const card = document.createElement("div")
card.className = "card"

card.innerHTML = `
<div class="card-body">
<div class="title">${title}</div>
<div class="price">${price} ₽</div>
</div>
`

feed.prepend(card)

addPage.classList.remove("active")

titleInput.value = ""
priceInput.value = ""
descInput.value = ""

})



// =======================
// TABS
// =======================

const tabs = document.querySelectorAll(".tab")

const tabContents = {
feed: document.getElementById("feedTab"),
near: document.getElementById("nearTab"),
auction: document.getElementById("auctionTab")
}

tabs.forEach(tab => {

tab.addEventListener("click", () => {

tabs.forEach(t => t.classList.remove("active"))
tab.classList.add("active")

const tabName = tab.dataset.tab

document.querySelectorAll(".tab-content").forEach(c=>{
c.classList.remove("active")
})

tabContents[tabName].classList.add("active")

})

})



// =======================
// AUCTION
// =======================

const bidBtn = document.getElementById("bidBtn")
const bidPrice = document.getElementById("bidPrice")
const bidInput = document.getElementById("bidInput")
const bidList = document.getElementById("bidList")

const timer = document.getElementById("auctionTimer")
const winnerBlock = document.getElementById("winnerBlock")

let price = 45000
let lastBidder = "Вы"

if(bidBtn){

bidBtn.addEventListener("click", () => {

const newBid = Number(bidInput.value)

if(newBid < price + 1000){
alert("Минимальная ставка +1000 ₽")
return
}

price = newBid

bidPrice.innerText = `Текущая ставка: ${price} ₽`

lastBidder = "Вы"

const bidItem = document.createElement("div")
bidItem.className = "bid-item"

bidItem.innerHTML = `
<span>Вы</span>
<span>${price} ₽</span>
`

bidList.prepend(bidItem)

bidInput.value = ""

})

}



// =======================
// TIMER
// =======================

let time = 2 * 60 * 60 + 15 * 60 + 10

if(timer){

const interval = setInterval(() => {

time--

let hours = Math.floor(time / 3600)
let minutes = Math.floor((time % 3600) / 60)
let seconds = time % 60

if(hours < 10) hours = "0" + hours
if(minutes < 10) minutes = "0" + minutes
if(seconds < 10) seconds = "0" + seconds

timer.innerText = `${hours}:${minutes}:${seconds}`

if(time <= 0){

clearInterval(interval)

timer.innerText = "Аукцион завершён"

bidBtn.disabled = true
bidBtn.innerText = "Завершён"

winnerBlock.innerText = `Победитель: ${lastBidder} — ${price} ₽`

}

}, 1000)

}



// =======================
// AUTO BIDS
// =======================

const users = ["Иван","Дмитрий","Алексей","Максим","Артур","Руслан"]

setInterval(() => {

if(!bidPrice) return
if(time <= 0) return

const randomUser = users[Math.floor(Math.random()*users.length)]

const step = Math.floor(Math.random()*3 + 1) * 1000

price += step

bidPrice.innerText = `Текущая ставка: ${price} ₽`

lastBidder = randomUser

const bidItem = document.createElement("div")
bidItem.className = "bid-item"

bidItem.innerHTML = `
<span>${randomUser}</span>
<span>${price} ₽</span>
`

bidList.prepend(bidItem)

}, 7000)



// =======================
// PRODUCT FULLSCREEN
// =======================

const productPage = document.getElementById("productPage")
const productImage = document.getElementById("productImage")
const productTitle = document.getElementById("productTitle")
const productPrice = document.getElementById("productPrice")
const closeProduct = document.getElementById("closeProduct")

document.addEventListener("click", (e)=>{

const card = e.target.closest(".card")

if(!card) return
if(!productPage) return

const img = card.querySelector("img")?.src
const title = card.querySelector(".title")?.innerText
const price = card.querySelector(".price")?.innerText

if(!img) return

productImage.src = img
productTitle.innerText = title
productPrice.innerText = price

productPage.classList.add("active")

})

if(closeProduct){
closeProduct.addEventListener("click", ()=>{
productPage.classList.remove("active")
})
}

