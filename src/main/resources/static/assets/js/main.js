!function () {
    "use strict";
    const session = JSON.parse(sessionStorage.getItem('session'));
    if (session !== null) {
        let token = session.access_token;
        if (token === null || token === undefined) {
            window.location.replace('http://localhost:8082/login');
        }
        sessionStorage.setItem('accessToken', token);
    } else {
        window.location.replace('http://localhost:8082/login');
    }

}();