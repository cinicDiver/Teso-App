//Handle infinite scroll
var transWrapper = document.getElementById('scroll-wrapper');
var transContent = document.getElementById('scroll-content');

transWrapper.addEventListener('scroll', function(){
  checkForNewDiv();
},false);

function checkForNewDiv (){
  console.log('Scrolled...')
  
}

function loadTransactions(){
  var transCall = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  for (var trans in transCall){
    var newDiv = document.createElement('div');
    newDiv.innerHTML=trans;
    transContent.appendChild(newDiv);
  }
}
loadTransactions();

var userAddWin = document.getElementById('userAddWin');

function showUserAddWin(){
  userAddWin.style.display = 'block';
}

function hideUserAddWin(){
  userAddWin.style.display = 'none';
}

function addUser(){
  console.log('User added.')
}

var transAddWin = document.getElementById('transAddWin');

function showTransAddWin(){
  transAddWin.style.display = 'block';
}

function hideTransAddWin(){
  transAddWin.style.display = 'none';
}

function addTrans(){
  console.log('Transaction added.')
}