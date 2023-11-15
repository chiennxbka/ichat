!function () {
  "use strict";
    const url = window.location.href
    if (url.includes('logout'))
      sessionStorage.clear()
    const formElement = document.querySelector('form');
    const btnLogin = document.getElementById('btn-login');
    btnLogin.addEventListener('click', (event) => {
    event.preventDefault();
    const body = {
      'email': formElement.elements['email'].value,
      'password': formElement.elements['password-input'].value
    };
    const request = new XMLHttpRequest();
    request.open("POST", "/api/v1/auth/authenticate");
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          sessionStorage.setItem('session', request.response)
          window.location.replace('http://localhost:8082');
        } else {
          if (request.status === 500) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Server error!!!',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: request.responseText,
            })
          }
        }
      }
    };
    request.send(JSON.stringify(body));
  });
}();