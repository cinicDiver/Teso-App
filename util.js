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
  var actUrl = new URL(window.location.href);
  var userParam = actUrl.searchParams.get('user');
  var nxthref  = './'+clickedElementID+'.html?user='+userParam;
  window.location.href=nxthref;
};