import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc, getDoc,
  query, where, orderBy,
  serverTimestamp, updateDoc
} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyC79Ar0meublFqSU-nIQTRlC7RCS7h25dI",
  authDomain: "my-project-base-b1e72.firebaseapp.com",
  databaseURL: "https://my-project-base-b1e72-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-project-base-b1e72",
  storageBucket: "my-project-base-b1e72.appspot.com",
  messagingSenderId: "958970710465",
  appId: "1:958970710465:web:9d4a987c7d5c19448a8740"
};

initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, 'books');

const q = query(
  colRef,
  // where("author", "==", "Hello"),
  orderBy('createdAt')
);

// Onload only

// getDocs(colRef)
//   .then( snapshot => {
//     let books = [];
//     snapshot.docs.forEach( doc => {
//       books.push({ ...doc.data(), id: doc.id })
//     });
//   })
//   .catch(err => {
//     console.log(err.message);
//   });


// Onload & On Update

// onSnapshot(/*colRef*/ q, snapshot => {
//   let books = [];
//   snapshot.docs.forEach( doc => {
//     books.push({ ...doc.data(), id: doc.id })
//   });

//   console.log(books);
// });

const addBook = document.querySelector(".add");
addBook.addEventListener('submit', (e) => {
  e.preventDefault();
  
  addDoc(colRef, {
    title: addBook.title.value,
    author: addBook.author.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addBook.reset();
  })
});

const deleteBook = document.querySelector(".delete");
deleteBook.addEventListener('submit', (e) => {
  e.preventDefault();

  const docRef = doc(db, 'books', deleteBook.id.value);

  deleteDoc(docRef)
    .then(() => {
      deleteBook.reset();
    })
  
});

const updateBook = document.querySelector('.update');
updateBook.addEventListener('submit', (e) => {
  e.preventDefault();
  const docRef = doc(db, 'books', updateBook.id.value);
  updateDoc(docRef, {
    title: 'new title'
  }).then(() => {
    updateBook.reset();
  });
});


const docRef = doc(db, 'books', "JLbwEa6zNypTOAzzVlbA");

// Onload only

// getDoc(docRef)
//   .then( doc => {
//     console.log(doc.data(), doc.id);
//   });


// Onload & On Update

onSnapshot(docRef, doc => {
  console.log(doc.data(), doc.id);
})