var firebaseConfig = {
    apiKey: "AIzaSyBAaIrUjDfTYacu1w8AR3xdJ6fqEv5qgwE",
    authDomain: "teso-fire-uc.firebaseapp.com",
    projectId: "teso-fire-uc",
    databaseURL: "https://teso-fire-uc-default-rtdb.firebaseio.com",
    storageBucket: "teso-fire-uc.appspot.com",
    messagingSenderId: "1099449504304",
    appId: "1:1099449504304:web:7a9d46e4a8ec16bac693f5",
    measurementId: "G-NZDSGZXQ66"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const logout = document.getElementById("logOutB");

logout.addEventListener('click',e =>{
    e.preventDefault();
    auth.signOut().then(()=>{
      window.location.href="./index.html"
    })
});

auth.onAuthStateChanged(user =>{
  if(user){

  }else{
    window.location.href="./index.html";
  }
});
