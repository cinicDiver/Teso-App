// Open links in mobiles
function handleSmallScreens() {
  document.querySelector('.navbar-toggler')
    .addEventListener('click', () => {
    let navbarMenu = document.querySelector('.navbar-menu')

    if (navbarMenu.style.display === 'flex') {
      navbarMenu.style.display = 'none'
      return
    }

    navbarMenu.style.display = 'flex'
  });
};
handleSmallScreens();

// Move between pages
function move(clickedElementID){
  var nxthref  = './'+clickedElementID+'.html';
  window.location.href=nxthref;
};

function hideElmnt(elmntID){
  const elmnt2Hide = document.getElementById('elmntID');
  if (elmnt2Hide.classList.contains('hidden')){
    console.log('Unhidding...');
    elmnt2Hide.classList.remove('hidden');
  }else{
    console.log('Hidding...');
    elmnt2Hide.classList.add('hidden');
  };
  
};

