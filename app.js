// =======================
// THEME
// =======================

const btn = document.getElementById("themeBtn")

if(btn){
btn.addEventListener("click", () => {
document.body.classList.toggle("dark")

localStorage.setItem(
"theme",
document.body.classList.contains("dark") ? "dark" : "light"
)
})
}

if(localStorage.getItem("theme") === "dark"){
document.body.classList.add("dark")
}



// =======================
// GRID VIEW
// =======================

const viewToggle = document.getElementById("viewToggle")

if(viewToggle){
viewToggle.addEventListener("click", () => {
document.body.classList.toggle("grid")
viewToggle.classList.toggle("active")
})
}



// =======================
// FILTER
// =======================

const filterBtn = document.getElementById("filterBtn")
const filterPanel = document.getElementById("filterPanel")
const filterOverlay = document.getElementById("filterOverlay")

if(filterBtn && filterPanel && filterOverlay){

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

}



// =======================
// ADD PAGE
// =======================

const addBtn = document.querySelector(".nav-item.add")
const addPage = document.getElementById("addPage")
const closeAdd = document.getElementById("closeAdd")

if(addBtn && addPage && closeAdd){

addBtn.addEventListener("click", () => {
addPage.classList.add("active")
})

closeAdd.addEventListener("click", () => {
addPage.classList.remove("active")
})

}



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

if(pages[page]){
pages[page].classList.add("active")
}

})

})



// =======================
// ADD POST
// =======================

const publishBtn = document.getElementById("publishBtn")
const titleInput = document.getElementById("titleInput")
const priceInput = document.getElementById("priceInput")
const descInput = document.getElementById("descInput")
const imageInput = document.getElementById("imageInput")
const feed = document.getElementById("feed")

let posts = JSON.parse(localStorage.getItem("posts")) || []

function savePosts(){
localStorage.setItem("posts", JSON.stringify(posts))
}

if(publishBtn){

publishBtn.addEventListener("click", () => {

const title = titleInput.value.trim()
const price = priceInput.value.trim()
const desc = descInput.value.trim()
const file = imageInput.files[0]

if(!title || !price || !desc || !file){
alert("Заполни все поля")
return
}

const reader = new FileReader()

reader.onload = function(e){

const image = e.target.result

const card = document.createElement("div")
card.className = "card"
card.dataset.seller =
localStorage.getItem("profileName") || "Deni"

card.dataset.avatar =
localStorage.getItem("profileAvatar") ||
"https://i.pravatar.cc/200"

card.innerHTML = `
<div class="card-image-wrap">

<img src="${image}">

<div class="fav-btn">
<i data-lucide="heart"></i>
</div>

</div>

<div class="card-body">

<div class="title">${title}</div>

<div class="price">
${price} ₽
</div>

<div class="desc">
${desc}
</div>

</div>
`

feed.prepend(card)

navigator.geolocation.getCurrentPosition((position)=>{

const post = {

id: Date.now(),
title,
price,
desc,
img:image,

sellerName:
localStorage.getItem("profileName") || "Deni",

sellerAvatar:
localStorage.getItem("profileAvatar") ||
"https://i.pravatar.cc/200",

lat: position.coords.latitude,
lng: position.coords.longitude

}

posts.unshift(post)

savePosts()

renderPosts()
renderFavorites()

lucide.createIcons()

})


addPage.classList.remove("active")

titleInput.value = ""
priceInput.value = ""
descInput.value = ""
imageInput.value = ""

}

reader.readAsDataURL(file)

})

}
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

if(tabContents[tabName]){
tabContents[tabName].classList.add("active")
}

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

if(bidBtn){
bidBtn.disabled = true
bidBtn.innerText = "Завершён"
}

if(winnerBlock){
winnerBlock.innerText = `Победитель: ${lastBidder} — ${price} ₽`
}

}

}, 1000)

}



// =======================
// AUTO BIDS
// =======================

const users = ["Иван","Дмитрий","Алексей","Максим","Артур","Руслан"]

setInterval(() => {

if(!bidPrice || time <= 0) return

const randomUser = users[Math.floor(Math.random()*users.length)]
const step = (Math.floor(Math.random()*3)+1)*1000

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
const productDesc = document.getElementById("productDesc")
const sellerName =
document.getElementById("sellerName")

const sellerAvatar =
document.getElementById("sellerAvatar")
const closeProduct = document.getElementById("closeProduct")

// закрытие fullscreen
if(closeProduct){

closeProduct.addEventListener("click", ()=>{

productPage.classList.remove("active")

})

}
document.addEventListener("click", (e)=>{

// ❌ если клик по кнопкам — выходим
if(
e.target.closest(".fav-btn") ||
e.target.closest(".nav-item") ||
e.target.closest(".bid-btn") ||
e.target.closest(".input") ||
e.target.closest("button")
){
return
}

// ✅ только обычный клик по карточке
const card = e.target.closest(".card")

if(!card || !productPage) return

const img = card.querySelector("img")?.src
const title = card.querySelector(".title")?.innerText
const price = card.querySelector(".price")?.innerText
const desc = card.querySelector(".desc")?.innerText
const seller =
card.dataset.seller

const avatar =
card.dataset.avatar

if(!img) return

productImage.src = img
productTitle.innerText = title
productPrice.innerText = price
productDesc.innerText = desc || ""
const sellerName =
document.getElementById("sellerName")

const sellerAvatar =
document.getElementById("sellerAvatar")
sellerName.innerText = seller || "Deni"

sellerAvatar.src =
avatar || "https://i.pravatar.cc/200"

productPage.classList.add("active")

})
// =======================
// ICONS
// =======================

lucide.createIcons()

// =======================
// FAVORITES (ДОБАВЛЕНО)
// =======================

let favorites = JSON.parse(localStorage.getItem("favorites")) || []

function saveFavorites(){
localStorage.setItem("favorites", JSON.stringify(favorites))
}

function renderFavorites(){

const favPage = document.getElementById("favPage")
if(!favPage) return

favPage.innerHTML = ""

favorites.forEach(item => {

const card = document.createElement("div")
card.className = "card"

card.innerHTML = `
<img src="${item.img}">

<div class="card-body">
<div class="title">${item.title}</div>
<div class="price">${item.price}</div>
</div>
`

favPage.appendChild(card)

})

}



// =======================
// LIKE CLICK (ДОБАВЛЕНО)
// =======================

document.addEventListener("click", (e)=>{

const favBtn = e.target.closest(".fav-btn")
if(!favBtn) return

const card = favBtn.closest(".card")

const title = card.querySelector(".title").innerText
const price = card.querySelector(".price").innerText
const img = card.querySelector("img").src

const item = { title, price, img }

const index = favorites.findIndex(f => f.title === title)

if(index > -1){
favorites.splice(index,1)
favBtn.classList.remove("active")
}else{
favorites.push(item)
favBtn.classList.add("active")
}

saveFavorites()
renderFavorites()

})

renderFavorites()

// 🔥 обновляем иконки после загрузки страницы
lucide.createIcons()

// восстановление лайков при загрузке
setTimeout(() => {

document.querySelectorAll(".card").forEach(card => {

const title = card.querySelector(".title")?.innerText

if(!title) return

const isFav = favorites.find(f => f.title === title)

if(isFav){
const btn = card.querySelector(".fav-btn")
if(btn) btn.classList.add("active")
}

})

}, 100)

// =======================
// EDIT PROFILE
// =======================

const editProfileBtn = document.getElementById("editProfileBtn")
const editProfileModal = document.getElementById("editProfileModal")
const closeEditProfile = document.getElementById("closeEditProfile")

const saveProfileBtn = document.getElementById("saveProfileBtn")

const sellerProfileName =
document.getElementById("sellerProfileName")
const sellerProfileAvatar =
document.getElementById("sellerProfileAvatar")
const profileBio = document.getElementById("profileBio")
const nameInput = document.getElementById("nameInput")
const bioInput = document.getElementById("bioInput")
const avatarInput = document.getElementById("avatarInput")

// OPEN

if(editProfileBtn){

editProfileBtn.addEventListener("click", ()=>{

editProfileModal.classList.add("active")

nameInput.value = sellerProfileName.innerText
bioInput.value = profileBio.innerText

})

}

// CLOSE

if(closeEditProfile){

closeEditProfile.addEventListener("click", ()=>{
editProfileModal.classList.remove("active")
})

}

// SAVE

if(saveProfileBtn){

saveProfileBtn.addEventListener("click", ()=>{

const newName = nameInput.value.trim()
const newBio = bioInput.value.trim()

if(newName){
sellerProfileName.innerText = newName
localStorage.setItem("profileName", newName)
}

if(newBio){
profileBio.innerText = newBio
localStorage.setItem("profileBio", newBio)
}

// AVATAR

const file = avatarInput.files[0]

if(file){

const reader = new FileReader()

reader.onload = function(e){

sellerProfileAvatar.src = e.target.result

localStorage.setItem(
"profileAvatar",
e.target.result
)

}

reader.readAsDataURL(file)

}

editProfileModal.classList.remove("active")

})

}

// LOAD

const savedName = localStorage.getItem("profileName")
const savedBio = localStorage.getItem("profileBio")
const savedAvatar = localStorage.getItem("profileAvatar")

if(savedName){
sellerProfileName.innerText = savedName
}

if(savedBio){
profileBio.innerText = savedBio
}

if(savedAvatar){
sellerProfileAvatar.src = savedAvatar
}


// =======================
// LOAD POSTS
// =======================

function renderPosts(){

feed.innerHTML = ""

const profileGrid = document.getElementById("profileGrid")

if(profileGrid){
profileGrid.innerHTML = ""
}
posts.forEach(post => {

const card = document.createElement("div")
card.className = "card"
card.dataset.seller = post.sellerName
card.dataset.avatar = post.sellerAvatar

card.innerHTML = `
<div class="card-image-wrap">

<img src="${post.img}">

<div class="fav-btn">
<i data-lucide="heart"></i>
</div>

</div>

<div class="card-body">
<div class="title">${post.title}</div>
<div class="price">${post.price} ₽</div>
<div class="desc">${post.desc}</div>
</div>
`

feed.prepend(card)

// PROFILE

const profileGrid = document.getElementById("profileGrid")

if(profileGrid){

const profileCard = card.cloneNode(true)

profileGrid.prepend(profileCard)

}

})

lucide.createIcons()

}

renderPosts()

// =======================
// AUTH
// =======================

const authPage = document.getElementById("authPage")
const app = document.getElementById("app")

const authName = document.getElementById("authName")
const authPassword = document.getElementById("authPassword")

const registerBtn = document.getElementById("registerBtn")
const loginBtn = document.getElementById("loginBtn")

// REGISTER

if(registerBtn){

registerBtn.addEventListener("click", ()=>{

const name = authName.value.trim()
const password = authPassword.value.trim()

if(!name || !password){
alert("Заполни все поля")
return
}

const user = {
name,
password
}

localStorage.setItem(
"user",
JSON.stringify(user)
)

localStorage.setItem(
"isAuth",
"true"
)

openApp()

})

}

// LOGIN

if(loginBtn){

loginBtn.addEventListener("click", ()=>{

const savedUser = JSON.parse(
localStorage.getItem("user")
)

if(!savedUser){
alert("Аккаунт не найден")
return
}

if(
authName.value === savedUser.name &&
authPassword.value === savedUser.password
){

localStorage.setItem(
"isAuth",
"true"
)

openApp()

}else{
alert("Неверные данные")
}

})

}

// OPEN APP

function openApp(){

authPage.style.display = "none"
app.style.display = "block"

}

// AUTO LOGIN

if(localStorage.getItem("isAuth") === "true"){
openApp()
}else{
app.style.display = "none"
}

// LOGOUT

const logoutBtn = document.getElementById("logoutBtn")

if(logoutBtn){

logoutBtn.addEventListener("click", ()=>{

localStorage.removeItem("isAuth")

location.reload()

})

}

// =======================
// CHAT
// =======================

const sendMessageBtn = document.getElementById("sendMessageBtn")
const messageInput = document.getElementById("messageInput")
const messages = document.getElementById("messages")

if(sendMessageBtn){

sendMessageBtn.addEventListener("click", sendMessage)

}

if(messageInput){

messageInput.addEventListener("keypress", (e)=>{

if(e.key === "Enter"){
sendMessage()
}

})

}

// =======================
// REAL CHAT
// =======================

let currentChat = null
let chats = JSON.parse(
localStorage.getItem("chats")
) || {}

function renderMessages(){

messages.innerHTML = ""

const currentMessages =
chats[currentChat] || []

currentMessages.forEach(msg => {

const div = document.createElement("div")

div.className =
msg.type === "me"
? "message me"
: "message other"

div.innerText = msg.text

messages.appendChild(div)

})

messages.scrollTop = messages.scrollHeight

}

function saveChats(){
localStorage.setItem(
"chats",
JSON.stringify(chats)
)
}

function sendMessage(){

const text = messageInput.value.trim()

if(!text) return
if(!currentChat) return

if(!chats[currentChat]){
chats[currentChat] = []
}

chats[currentChat].push({
type:"me",
text
})

saveChats()

renderMessages()

messageInput.value = ""

// fake reply

setTimeout(()=>{

chats[currentChat].push({
type:"other",
text:"Хорошо 👌"
})

saveChats()


},1000)

}



// =======================
// CHAT SWITCH
// =======================

const chatItems =
document.querySelectorAll(".chat-item")

chatItems.forEach(item => {

item.addEventListener("click", ()=>{

chatItems.forEach(i=>{
i.classList.remove("active-chat")
})

item.classList.add("active-chat")

currentChat =
item.querySelector(".chat-name").innerText

renderMessages()

})

})

renderMessages()

setTimeout(()=>{

const reply = document.createElement("div")
reply.className = "message other"

reply.innerText = "Хорошо 👌"

messages.appendChild(reply)

messages.scrollTop = messages.scrollHeight

}, 1000)


// =======================
// SEARCH
// =======================

const searchInput = document.getElementById("searchInput")

if(searchInput){

searchInput.addEventListener("input", () => {

const value = searchInput.value.toLowerCase()

const cards = document.querySelectorAll("#feed .card")

cards.forEach(card => {

const title = card
.querySelector(".title")
?.innerText
.toLowerCase()

if(title.includes(value)){
card.style.display = "block"
}else{
card.style.display = "none"
}

})

})

}

// =======================
// MAP
// =======================

const mapElement = document.getElementById("map")

if(mapElement){

const map = L.map('map').setView([55.7558, 37.6173], 13)

// POSTS ON MAP

posts.forEach(post => {

if(!post.lat || !post.lng) return

const marker = L.marker([post.lat, post.lng])
.addTo(map)
.bindPopup(`
<b>${post.title}</b><br>
${post.price} ₽
`)

// CLICK MARKER

marker.on("click", ()=>{

productImage.src = post.img
productTitle.innerText = post.title
productPrice.innerText = post.price + " ₽"
productDesc.innerText = post.desc

productPage.classList.add("active")

})
})

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
attribution: '&copy; OpenStreetMap'
}
).addTo(map)

// GEO

navigator.geolocation.getCurrentPosition((position)=>{
    const userLat = position.coords.latitude
const userLng = position.coords.longitude

const lat = position.coords.latitude
const lng = position.coords.longitude

map.setView([lat, lng], 14)

L.marker([lat, lng])
.addTo(map)
.bindPopup("Вы здесь")
.openPopup()

})

}

const postsCount = document.getElementById("postsCount")
const likesCount = document.getElementById("likesCount")
const salesCount = document.getElementById("salesCount")

function updateProfileStats(){

// POSTS

if(postsCount){
postsCount.innerText = posts.length
}

// LIKES

if(likesCount){
likesCount.innerText = favorites.length
}

// SALES (demo)

if(salesCount){
salesCount.innerText = Math.floor(posts.length / 2)
}

}

updateProfileStats()

// =======================
// SELLER PROFILE
// =======================

const openSellerProfile =
document.getElementById("openSellerProfile")

if(openSellerProfile){

openSellerProfile.addEventListener("click", ()=>{

// данные продавца
const seller =
sellerName.innerText

const avatar =
sellerAvatar.src

// avatar
sellerProfileAvatar.src = avatar

// name
sellerProfileName.innerText = seller

// закрыть товар
productPage.classList.remove("active")

// pages
document.querySelectorAll(".page").forEach(page=>{
page.classList.remove("active")
})

profilePage.classList.add("active")

// nav
navItems.forEach(i=>{
i.classList.remove("active")
})

document
.querySelector('[data-page="profile"]')
.classList.add("active")

})

}



// =======================
// OPEN CHAT
// =======================

const openSellerChat =
document.getElementById("openSellerChat")

if(openSellerChat){

openSellerChat.addEventListener("click", ()=>{

// имя продавца
currentChat =
sellerName.innerText

// создаем чат если нет
if(!chats[currentChat]){
chats[currentChat] = []
}

// открыть страницу чата
document.querySelectorAll(".page").forEach(page=>{
page.classList.remove("active")
})

chatPage.classList.add("active")

// active nav
navItems.forEach(i=>{
i.classList.remove("active")
})

document
.querySelector('[data-page="chat"]')
.classList.add("active")

// render
renderMessages()

})

}