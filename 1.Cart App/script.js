import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
  databaseURL: "https://playground-6dce0-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingCartDB = ref(database, "shopItems");


const form = document.getElementById('cart');
const list = document.getElementById('list');

function removeListItem(key){
  const item = ref(database, "shopItems/" + key);
  remove(item)
}

function addListItem(key, value){
  const listItem = document.createElement('li');
  listItem.textContent = value;
  listItem.addEventListener("click", () => {removeListItem(key)});
  list.appendChild(listItem);
}
onValue(shoppingCartDB, snapshot => {
  const items = snapshot.val()? Object.entries(snapshot.val()) : [];
  list.innerHTML = "";
  for(const [key, value] of items){
    addListItem(key, value);
  }
});

function submit(e){
  e.preventDefault();
  const inputValue = e.target[0].value;
  // addListItem(inputValue);
  push(shoppingCartDB,inputValue);

  e.target.reset();
}

form.addEventListener('submit', submit)