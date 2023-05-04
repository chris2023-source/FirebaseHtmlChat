import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js"
import { getFirestore, query , collection, onSnapshot, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnTXAw2_GTDwpW4wPV5ILcDp9IShldGew",
  authDomain: "my-first-project-db058.firebaseapp.com",
  projectId: "my-first-project-db058",
  storageBucket: "my-first-project-db058.appspot.com",
  messagingSenderId: "851676766630",
  appId: "1:851676766630:web:1f0185ac2176db6bce2f67",
  measurementId: "G-B2WTD41WC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let firestore = getFirestore(app);

const params = new URLSearchParams(location.search)
const chatRoomId = params.get('roomId')
const userId = params.get('userId')
console.log(userId)
console.log(chatRoomId)

const content = document.getElementById("content")
const sendMessageButton = document.getElementById("sendMessageButton")
const messageCollection = collection(firestore, "chatRoom", chatRoomId, "messages")
sendMessageButton.addEventListener("click", sendMessage)

//chatRoom/100001/messages/7R3Vs1nWceRwe6G1yoYj
const listener = onSnapshot(
    query(messageCollection),
    { includeMetadataChanges: true },
    (querySnapshot) => {
        console.log(querySnapshot)
        for(const change of querySnapshot.docChanges()){
            if(change.type==='added'){
                console.log(change.doc.data().message)
                const message = change.doc.data()
                const messageDiv = document.createElement("div")
                messageDiv.innerText = change.doc.data().message
                console.log(message.userId)
                if(message.user === `${userId}`){
                    messageDiv.style.marginBottom = "20px"
                    messageDiv.style.marginTop = "20px"
                    messageDiv.style.marginLeft = "30%"
                    messageDiv.style.border = "solid"
                    messageDiv.style.padding = "10px"
                    messageDiv.style.wordBreak = "break-all"
                    messageDiv.style.borderRadius = "10px"
                }else {
                    messageDiv.style.marginBottom = "20px"
                    messageDiv.style.marginTop = "20px"
                    messageDiv.style.marginRight = "30%"
                    messageDiv.style.border = "solid"
                    messageDiv.style.padding = "10px"
                    messageDiv.style.wordBreak = "break-all"
                    messageDiv.style.borderRadius = "10px"
                }
                content.appendChild(messageDiv)
            }
        }
    });

function sendMessage(){
    if(user.value){
        addDoc(messageCollection,{
            message: user.value,
            user: userId,
            date: serverTimestamp()
        })
    }
}