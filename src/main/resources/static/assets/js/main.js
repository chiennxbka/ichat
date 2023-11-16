!function () {
    "use strict";
    // let stompClient = null;
    const session = JSON.parse(sessionStorage.getItem('session'));
    if (session !== null) {
        let token = session.access_token;
        if (token === null || token === undefined) {
            window.location.replace('http://localhost:8082/login');
        }
        sessionStorage.setItem('accessToken', token);
        sessionStorage.setItem('userId', session.userId);
        sessionStorage.setItem('name', session.name);
        /*const socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);*/
    } else {
        window.location.replace('http://localhost:8082/login');
    }

    function onConnected() {
        // Subscribe to the Public Topic
        stompClient.subscribe('/topic/public/*', onMessageReceived);

        // Tell your username to the server
        stompClient.send("/app/chat.join",
          {},
          JSON.stringify({from_id: sessionStorage.getItem('userId'), type: 'JOIN'})
        )
    }

    function onMessageReceived(payload) {
        console.log(payload)
    }

    function onError(error) {
        console.log(error)
    }
}();