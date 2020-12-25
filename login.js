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


  const uName = document.getElementById("uName");
  const uPass = document.getElementById("pwLine");
  const inBtn = document.getElementById("btnEntrar");

  inBtn.addEventListener("click", e =>{
      const userIn = uName.value;
      const userPw = uPass.value;
      const auth = firebase.auth();
      console.log("Ingresando al usuario: "+userIn);
      const promise = auth.signinwithemailandpassword(userIn,userPw);
      promise.catch(e => console.log(e.message()));
  })

