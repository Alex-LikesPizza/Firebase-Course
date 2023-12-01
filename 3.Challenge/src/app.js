import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc
} from 'firebase/firestore';

const path = require('path');

const firebaseConfig = {
  apiKey: "AIzaSyBixJhq3unue2qEplVM8SoKs0gqRZtpyzc",
  authDomain: "task-manager-a9e34.firebaseapp.com",
  projectId: "task-manager-a9e34",
  storageBucket: "task-manager-a9e34.appspot.com",
  messagingSenderId: "742176434780",
  appId: "1:742176434780:web:4d7ea9b953f6e7bf3a5499"
};

initializeApp(firebaseConfig);

const db = getFirestore();

const tasks = collection(db, 'tasks');

const taskContainer = document.querySelector(".tasks");
onSnapshot(tasks, snapshot => {
  const data = [];
  snapshot.forEach( task => {
    data.push({...task.data(), id: task.id});
  });
  
  for(const task of data){
    const listItem = document.createElement('li');
    listItem.dataset.id = task.id;
    listItem.innerHTML = `
      <p>${task.title}</p> 
      <span class="tasks-date">${task.date}</span> 
    `;

    const deleteItem = document.createElement('span');
    deleteItem.classList.add('tasks-delete');
    deleteItem.textContent = "x";
    deleteItem.addEventListener('click', () => {
      const docRef = doc(db, 'tasks', task.id);
      deleteDoc(docRef)
        .then(() => {
          for(const elem of taskContainer.children){
            if(elem.dataset.id === task.id){
              taskContainer.removeChild(elem);
            }
          }
        });
    });

    listItem.appendChild(deleteItem);
    taskContainer.appendChild(listItem);
  }
  
  
});


const form = document.querySelector(".task-form");
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const [year, month, day] = form.date.value.split('-');
  const data = {
    title: form.title.value,
    date: `${day}-${month}-${year}`
  }
  addDoc(tasks, data)
    .then(() => {
      form.reset();
    })
});
