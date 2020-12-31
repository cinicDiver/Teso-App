var firebaseConfig = {
    apiKey: "AIzaSyBAaIrUjDfTYacu1w8AR3xdJ6fqEv5qgwE",
    authDomain: "teso-fire-uc.firebaseapp.com",
    projectId: "teso-fire-uc",
    storageBucket: "teso-fire-uc.appspot.com",
    messagingSenderId: "1099449504304",
    appId: "1:1099449504304:web:7a9d46e4a8ec16bac693f5",
    measurementId: "G-NZDSGZXQ66"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function validateEmail(email){
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};


const uName = document.getElementById("uName");
const uPass = document.getElementById("pwLine");
const inBtn = document.getElementById("btnEntrar");

var inFunc = function(event) {
  const userIn = uName.value;
  const userPw = uPass.value;
  const auth = firebase.auth();
  if (validateEmail(userIn)){
    const promise = auth.signInWithEmailAndPassword(userIn,userPw);
    promise.catch(e => {
      alert(e.message);
    });
  }else{
    alert("El usuario ingresado no es válido.")
  };
};

inBtn.addEventListener("click", inFunc, false);
window.addEventListener("keyup", e =>{
  if (e.key==='Enter'){
    e.preventDefault();
    inBtn.click();
  }
});


firebase.auth().onAuthStateChanged(firebaseUser =>{
  if(firebaseUser){
    window.location.href="./home.html";
  }else{
    alert("No se encuentra loggeado.")
  }
});