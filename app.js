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

  var firestore = firebase.firestore();
  const docRef = firestore.doc("tesoreria/afiliados");
  const uName = document.querySelector("#uName");
  const uPass = document.querySelector("#pwLine");
  const inBtn = document.querySelector("#btnEntrar");

  inBtn.addEventListener("click", function(){
      const userIn = uName.value;
      console.log("Ingresando al usuario: "+userIn); 
  })

