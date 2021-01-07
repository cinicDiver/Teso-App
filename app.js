var transAddWin = document.getElementById('transAddWin');
var userAddWin = document.getElementById('userAddWin');
var concAddWin = document.getElementById('concAddWin');

function showTransAddWin(){
  transAddWin.style.display = 'block';
}

function showUserAddWin(){
  userAddWin.style.display = 'block';
}

function showConcAddWin(){
  concAddWin.style.display = 'block';
}

//Create Firestore instance
var db = firebase.firestore();

//Function checks if user is admin
function isAdmin(){
  answ = true;
  try{
    db.collection('app').doc('permisos').get()
  }catch (error){
    answ=false;
  }
  return answ;
}

//Show or hide based on user
function showHidePanes(){
    var cajaDiv = document.getElementById('cajaDiv');
    var accionesDiv = document.getElementById('accionesDiv');
    var resumenDiv = document.getElementById('resumenDiv');
    var saldosDiv = document.getElementById('saldosDiv');
    var deudasDiv = document.getElementById('deudasDiv');
    var opcionesDiv = document.getElementById('opcionesDiv');
  if (!isAdmin()){
    cajaDiv.style.display='none';
    accionesDiv.style.display='none';
  }else{
    resumenDiv.style.display='none';
    saldosDiv.style.display='none';
    deudasDiv.style.display='none';
    opcionesDiv.style.display='none';
  }
};
showHidePanes();

//Fill main fields
var formatter = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'});
function fillFields(){
  if (isAdmin()){
    db.collection('app').doc('caja').get().then(function (info){
      document.getElementById('cashIn').innerHTML=formatter.format(info.data()['ingresos']);
      document.getElementById('cashOut').innerHTML=formatter.format(info.data()['egresos']);
      document.getElementById('cashFlow').innerHTML=formatter.format(info.data()['flujo']);
      if (info.data()['flujo']>0){
        document.getElementById('cashFlow').style.color='#4dff4d';
      }else{
        document.getElementById('cashFlow').style.color='#ff4d4d';
      }
    })
    db.collection('app').doc('contadores').get().then(function (info){
      document.getElementById('userNum').innerHTML=info.data()['usuarios'];
      document.getElementById('transNum').innerHTML=info.data()['transacciones'];
      document.getElementById('concNum').innerHTML=info.data()['conceptos'];
    })
  }
};
fillFields();

function hideTransAddWin(){
  transAddWin.style.display = 'none';
  fillFields();
}

function hideUserAddWin(){
  userAddWin.style.display = 'none';
  fillFields();
}

function hideConcAddWin(){
  concAddWin.style.display = 'none';
}

//Get users and concepts for lists
var allUsers, allConcepts;
function getUsers(){
  return db.collection('app').doc('identificadores').get().then(function (info){
    allUsers = info.data()['usuarios'];
  }).then(function (){
    var userList = document.getElementById('userList');
    var userConcDiv = document.getElementById('cbx-div-conc');
    for (var idUser in allUsers){
      var newOpt = document.createElement('option');
      newOpt.appendChild(document.createTextNode(allUsers[idUser]));
      newOpt.value=idUser;
      userList.appendChild(newOpt);
      var newCbx = document.createElement('input')
      newCbx.setAttribute('type','checkbox');
      newCbx.value=idUser;
      newCbx.insertAdjacentText('afterend',allUsers[idUser]);
      userConcDiv.appendChild(newCbx);
    }
  });
};
getUsers();

function getConcepts(){
  return db.collection('app').doc('identificadores').get().then(function (info){
    allConcepts=info.data()['conceptos'];
  }).then(function (){
    var conceptList=document.getElementById('conceptList');
    for (var concept in allConcepts){
      var newOpt = document.createElement('option');
      newOpt.appendChild(document.createTextNode(allConcepts[concept]));
      newOpt.value=concept;
      conceptList.appendChild(newOpt);
      //TODO: add concept checkboxes if needed.
    }
  });
};
getConcepts();

//Handle infinite scroll
var transWrapper = document.getElementById('scroll-wrapper');
var transContent = document.getElementById('scroll-content');

//Load transactions
function loadTransactions(){
  var transCall = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  for (var trans in transCall){
    var newDiv = document.createElement('div');
    newDiv.innerHTML=trans;
    transContent.appendChild(newDiv);
  }
}
loadTransactions();


transWrapper.addEventListener('scroll', function(){
  checkForNewDiv();
},false);

function checkForNewDiv (){
  console.log('Scrolled...')
}

function validateEmail(email){
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

function getUserState(){
  var radioCheck=document.getElementsByName('state');
  for (i=0;i<radioCheck.length;i++){
    if(radioCheck[i].checked){
      return parseInt(radioCheck[i].value);
    }
  }
}

function addUser(){
  var newUserEmail=document.getElementById('newUserEmail').value;
  var newUserPassword=document.getElementById('newUserPassword').value;
  var newUserName=document.getElementById('newUserName').value;
  var newUserLast=document.getElementById('newUserLast').value;
  var adminAcc = firebase.auth().currentUser;
  var userId, userState;;
  if (validateEmail(newUserEmail)){
    return db.collection('app').doc('contadores').get().then(function (info){
      userId="U-"+("0000"+(info.data()['usuarios']+1)).slice(-4);
    }).then(function (){
      userState=getUserState();
      db.collection('usuarios').doc(userId).set({
        name: newUserName+" "+newUserLast,
        state:userState,
        email:newUserEmail,
        favor:0
      }).then(function (){
        firebase.auth().createUserWithEmailAndPassword(newUserEmail,newUserPassword);
        firebase.auth().updateCurrentUser(adminAcc);
        var arrayKey = 'usuarios\.'+userId;
        db.collection('app').doc('identificadores').update({
          arrayKey:newUserName+" "+newUserLast
        });
        db.collection('app').doc('contadores').update({
          usuarios: firebase.firestore.FieldValue.increment(1)
        });
        alert(`Usuario ${newUserName} ${newUserLast} (${userId}) agregado. \nCorreo: ${newUserEmail}. \nContraseña: ${newUserPassword}`);
      }).catch(function (e){
        alert('Error agrengado al usuario: '+e)
      });
    }); 
  }
  else{
    alert('Email de usuario invalido.');
  }
};

function addTrans(){
  var userIDin = document.getElementById('userIDIn').value;
  var conceptIDIn = document.getElementById('conceptIDIn').value;
  var valueIn = document.getElementById('valueIn').value;
  var dateIn = document.getElementById('dateIn').value;
  var verifiedIn = document.getElementById('verifiedIn').value;
  var notesIn = document.getElementById('notesIn').value;
  var transID;

  return db.collection('app').doc('contadores').get().then(function(info){
    transID="T_"+("00000"+(info.data()['transacciones']+1)).slice(-5);
    console.log(transID);
    console.log(userIDin);
    console.log(conceptIDIn);
    console.log(valueIn);
    console.log(dateIn);
    console.log(verifiedIn);
    console.log(notesIn);
    db.collection('transacciones').doc(transID).set({
      usr_id : userIDin,
      concept_id : conceptIDin,
      value : valueIn,
      date : dateIn,
      verified : verifiedIn,
      notes : notesIn
    }).then(function(){
      alert('Transacción añadida.');
      db.collection('app').doc('contadores').update({
        transacciones: firebase.firestore.FieldValue.increment(1)
      });
      if (valueIn>0){
        db.collection('app').doc('caja').update({
          ingresos: firebase.firestore.FieldValue.increment(value)
        })
      }else{
        db.collection('app').doc('caja').update({
          egresos: firebase.firestore.FieldValue.increment(value)
        })
      };
      db.collection('app').doc('caja').update({
        balance: firebase.firestore.FieldValue.increment(value)
      })
    }).catch(function (e){
      alert("Error agregando la transacción: "+e);
    });
  })
}
