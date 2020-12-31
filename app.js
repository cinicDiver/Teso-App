
//Handle infinite scroll
var transWrapper = document.getElementById('scroll-wrapper');
var transContent = document.getElementById('scroll-content');

transWrapper.addEventListener('onscroll', function(){
  checkForNewDiv();
},false);

function checkForNewDiv (){
  console.log('Scrolled...')
  
}