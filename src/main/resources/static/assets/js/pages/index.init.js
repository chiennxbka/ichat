let input, filter, ul, li, a, i, j, div;
let stompClient = null;
let recipientId = null;
const userId = sessionStorage.getItem('userId');

function searchUser() {
    for (input = document.getElementById("serachChatUser"), filter = input.value.toUpperCase(), ul = document.querySelector(".chat-room-list"), li = ul.getElementsByTagName("li"), i = 0; i < li.length; i++) {
        -1 < li[i].querySelector("p").innerText.toUpperCase().indexOf(filter) ? li[i].style.display = "" : li[i].style.display = "none"
    }
}

function searchContacts() {
    for (input = document.getElementById("searchContact"), filter = input.value.toUpperCase(), list = document.querySelector(".sort-contact"), li = list.querySelectorAll(".mt-3 li"), div = list.querySelectorAll(".mt-3 .contact-list-title"), j = 0; j < div.length; j++) {
        var e = div[j];
        txtValue = e.innerText, -1 < txtValue.toUpperCase().indexOf(filter) ? div[j].style.display = "" : div[j].style.display = "none"
    }
    for (i = 0; i < li.length; i++) contactName = li[i], txtValue = contactName.querySelector("h5").innerText, -1 < txtValue.toUpperCase().indexOf(filter) ? li[i].style.display = "" : li[i].style.display = "none"
}

function searchContactOnModal() {
    for (input = document.getElementById("searchContactModal"), filter = input.value.toUpperCase(), list = document.querySelector(".contact-modal-list"), li = list.querySelectorAll(".mt-3 li"), div = list.querySelectorAll(".mt-3 .contact-list-title"), j = 0; j < div.length; j++) {
        var e = div[j];
        txtValue = e.innerText, -1 < txtValue.toUpperCase().indexOf(filter) ? div[j].style.display = "" : div[j].style.display = "none"
    }
    for (i = 0; i < li.length; i++) contactName = li[i], txtValue = contactName.querySelector("h5").innerText, -1 < txtValue.toUpperCase().indexOf(filter) ? li[i].style.display = "" : li[i].style.display = "none"
}

function onConnected(frame) {
    let url = stompClient.ws._transport.url;
    let sessionId = url.replace("ws://localhost:8082/ws",  "");
    sessionId = sessionId.replace("/websocket", "");
    sessionId = sessionId.substring(sessionId.lastIndexOf('/') + 1);
    // Subscribe to the Public Topic
    stompClient.subscribe('/user/'+ sessionId +'/queue/messages', onMessageReceived);
}

function onMessageReceived(payload) {
    const body = JSON.parse(payload.body)
    let i = 0;
    if (body.from_id !== userId) {
        const a = document.getElementById('users-chat').querySelector(".chat-conversation-list");
        const avatar = (body.senderImg !== undefined && body.senderImg !== null) ? '<img src="' + body.senderImg + '" class="rounded-circle avatar-xs" alt=""><span class="user-status"></span>' : '<div class="avatar-xs"><span class="avatar-title rounded-circle bg-primary text-white"><span class="username">JP</span><span class="user-status"></span></span></div>';
        a.insertAdjacentHTML("beforeend", '<li class="chat-list left" id="chat-list-' + (i++) + '" > '
          + '<div class="conversation-list">' +
          '<div class="user-chat-content">                        ' +
          '<div class="ctext-wrap">                            ' +
          '<div class="ctext-wrap-content">                                ' +
          '<p class="mb-0 ctext-content">                                    ' +
          '' + body.msg + '                                ' +
          '</p>                            ' +
          '</div>                            ' +
          '<div class="dropdown align-self-start message-box-drop">' +
          '<a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                                    ' +
          '<i class="ri-more-2-fill"></i>                                ' +
          '</a>' +
          '<div class="dropdown-menu">                                    ' +
          '<a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>' +
          '<a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>' +
          '<a class="dropdown-item d-flex align-items-center justify-content-between copy-message" href="#" id="copy-message-' + 1 + '">Copy <i class="bx bx-copy text-muted ms-2"></i></a>' +
          '<a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>' +
          '<a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Mark as Unread <i class="bx bx-message-error text-muted ms-2"></i></a>                                    ' +
          '<a class="dropdown-item d-flex align-items-center justify-content-between delete-item" id="delete-item-' + 1 + '" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>' +
          '</div></div></div>' +
          '<div class="conversation-name">' +
          '<small class="text-muted time">10:am</small>' +
          '<span class="text-success check-message-icon"><i class="bx bx-check"></i></span></div></div></div></li>');
        // a.insertAdjacentHTML("beforeend", '<li class="chat-list right" id="chat-list-' + h + '" > ' + '<div class="conversation-list">                    <div class="user-chat-content">                        <div class="ctext-wrap">                            <div class="ctext-wrap-content">                                <p class="mb-0 ctext-content">                                    ' + t + '                                </p>                            </div>                            <div class="dropdown align-self-start message-box-drop">                                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                                    <i class="ri-more-2-fill"></i>                                </a>                                <div class="dropdown-menu">                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>                                    <a class="dropdown-item d-flex align-items-center justify-content-between copy-message" href="#" id="copy-message-' + h + '">Copy <i class="bx bx-copy text-muted ms-2"></i></a>                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Mark as Unread <i class="bx bx-message-error text-muted ms-2"></i></a>                                    <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" id="delete-item-' + h + '" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>                            </div>                        </div>                    </div>                    <div class="conversation-name">                        <small class="text-muted time">' + p() + '</small>                        <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>                    </div>                </div>            </div>        </li>');
        const s = document.getElementById("chat-list-" + 1);
        s.querySelectorAll(".delete-item").forEach(function (e) {
            e.addEventListener("click", function () {
                a.removeChild(s)
            })
        }), s.querySelectorAll(".copy-message").forEach(function (e) {
            e.addEventListener("click", function () {
                s.childNodes[1].children[1].firstElementChild.firstElementChild.getAttribute("id");
                isText = s.childNodes[1].children[1].firstElementChild.firstElementChild.innerText, navigator.clipboard.writeText(isText)
            })
        })
    }
}

function onError(error) {
    console.log(error)
}

!function () {
    let n = "users-chat", l = "assets/images/users/user-dummy-img.jpg", o = "users",
      s = window.location.origin + "/api/v1/", c = "", d = 1;
    const socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({ userId: sessionStorage.getItem('userId') }, onConnected, onError);
    function a() {
        const a = document.getElementsByClassName("user-chat");
        document.querySelectorAll(".chat-user-list li a").forEach(function (e) {
            e.addEventListener("click", function (e) {
                a.forEach(function (e) {
                    e.classList.add("user-chat-show")
                });
                var t = document.querySelector(".chat-user-list li.active");
                t && t.classList.remove("active"), this.parentNode.classList.add("active")
            })
        }), document.querySelectorAll(".sort-contact ul li").forEach(function (e) {
            e.addEventListener("click", function (e) {
                a.forEach(function (e) {
                    e.classList.add("user-chat-show")
                })
            })
        }), document.querySelectorAll(".user-chat-remove").forEach(function (e) {
            e.addEventListener("click", function (e) {
                a.forEach(function (e) {
                    e.classList.remove("user-chat-show")
                })
            })
        })
    }

    function e(e, t) {
        const a = new XMLHttpRequest;
        a.open("GET", s + e, !0),
            a.responseType = "json",
            a.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('accessToken'))
            a.onload = function () {
                const e = a.status;
                t(200 === e ? null : e, a.response)
        }, a.send()
    }

    function u() {
        "users" == o ? (document.getElementById("channel-chat").style.display = "none", document.getElementById("users-chat").style.display = "block") : (document.getElementById("channel-chat").style.display = "block", document.getElementById("users-chat").style.display = "none"), q(s + "chats.json")
    }

    e("users.json", function (e, t) {
        null !== e ? console.log("Something went wrong: " + e) : (t[0].favorites.forEach(function (e, t) {
            const a = e.profile ? '<img src="' + e.profile + '" class="rounded-circle avatar-xs" alt=""><span class="user-status"></span>' : '<div class="avatar-xs"><span class="avatar-title rounded-circle bg-primary text-white"><span class="username">JP</span><span class="user-status"></span></span></div>',
              s = e.messagecount ? '<div class="ms-auto"><span class="badge badge-soft-dark rounded p-1">' + e.messagecount + "</span></div>" : "",
              i = e.messagecount ? '<a href="javascript: void(0);" class="unread-msg-user">' : '<a href="javascript: void(0);">',
              r = 1 === e.id ? "active" : "";
            document.getElementById("favourite-users").innerHTML += '<li id="contact-id-' + e.id + '" value="' + e.id + '" data-name="favorite" class="' + r + '">' + i + '<div class="d-flex align-items-center">' + '<div class="chat-user-img online align-self-center me-2 ms-0">' +'' + a + '</div><div class="overflow-hidden">' +'<p class="text-truncate mb-0">' + e.name + "</p></div>" + s + "" +"</div></a></li>"
        }), t[0].users.forEach(function (e, t) {
            const a = e.profile ? '<img src="' + e.profile + '" class="rounded-circle avatar-xs" alt=""><span class="user-status"></span>' : '<div class="avatar-xs"><span class="avatar-title rounded-circle bg-primary text-white"><span class="username">JL</span><span class="user-status"></span></span></div>',
              s = e.messagecount ? '<div class="ms-auto"><span class="badge badge-soft-dark rounded p-1">' + e.messagecount + "</span></div>" : "",
              i = e.messagecount ? '<a href="javascript: void(0);" class="unread-msg-user">' : '<a href="javascript: void(0);">';
            document.getElementById("usersList").innerHTML += '<li id="contact-id-' + e.id + '" value="' + e.id + '" data-name="direct-message">' + i + '<div class="d-flex align-items-center"><div class="chat-user-img online align-self-center me-2 ms-0">' + a + '</div><div class="overflow-hidden"><p class="text-truncate mb-0">' + e.name + "</p></div>" + s + "</div></a></li>"
        }), t[0].channels.forEach(function (e, t) {
            const a = e.messagecount ? '<div class="flex-shrink-0 ms-2"><span class="badge badge-soft-dark rounded p-1">' + e.messagecount + "</span></div>" : "",
              s = (e.messagecount && e.messagecount, e.messagecount ? '<a href="javascript: void(0);" class="unread-msg-user">' : '<a href="javascript: void(0);">');
            document.getElementById("channelList").innerHTML += '<li id="contact-id-' + e.id + '" data-name="channel">' + s + '                     <div class="d-flex align-items-center">                        <div class="flex-shrink-0 avatar-xs me-2">                            <span class="avatar-title rounded-circle bg-soft-light text-dark">#</span></div><div class="flex-grow-1 overflow-hidden"><p class="text-truncate mb-0">' + e.name + "</p></div><div>" + a + "</div></div></a></li>"
        })), a(), document.querySelectorAll("#favourite-users li, #usersList li") && document.querySelectorAll("#favourite-users li, #usersList li").forEach(function (r) {
            r.addEventListener("click", function (e) {
                o = "users", u(),
                n = "users-chat";
                const t = r.getAttribute("id"),
                a = r.querySelector(".text-truncate").innerHTML,
                re = r.getAttribute("value");
                recipientId = re,
                document.querySelector(".user-profile-sidebar .user-name").innerHTML = a,
                document.getElementById("users-chat").querySelector(".text-truncate .user-profile-show").innerHTML = a,
                document.querySelector(".user-profile-desc .text-truncate").innerHTML = a,
                document.querySelector(".audiocallModal .text-truncate").innerHTML = a,
                document.querySelector(".videocallModal .text-truncate").innerHTML = a;
                const s = document.getElementById(t).querySelector(".avatar-xs").getAttribute("src");
                s ? (document.querySelector(".user-own-img .avatar-sm").setAttribute("src", s),
                  document.querySelector(".user-profile-sidebar .profile-img").setAttribute("src", s),
                  document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", s),
                  document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", s)) :
                  (document.querySelector(".user-own-img .avatar-sm").setAttribute("src", l),
                    document.querySelector(".user-profile-sidebar .profile-img").setAttribute("src", l),
                    document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", l),
                    document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", l));
                const i = r.querySelector(".avatar-xs").getAttribute("src");
                document.getElementById("users-conversation").querySelectorAll(".left .chat-avatar").forEach(function (e) {
                    i ? e.querySelector("img").setAttribute("src", i) : e.querySelector("img").setAttribute("src", l)
                }), window.stop()
            })
        }), document.querySelectorAll("#channelList li").forEach(function (i) {
            i.addEventListener("click", function (e) {
                n = "channel-chat", o = "channel", u();
                var t = i.getAttribute("id"), a = i.querySelector(".text-truncate").innerHTML;
                document.getElementById("channel-chat").querySelector(".text-truncate .user-profile-show").innerHTML = a, document.querySelector(".user-profile-desc .text-truncate").innerHTML = a, document.querySelector(".audiocallModal .text-truncate").innerHTML = a, document.querySelector(".videocallModal .text-truncate").innerHTML = a, document.querySelector(".user-profile-sidebar .user-name").innerHTML = a;
                var s = document.getElementById(t).querySelector(".avatar-xs").getAttribute("src");
                s ? (document.querySelector(".user-own-img .avatar-sm").setAttribute("src", s), document.querySelector(".user-profile-sidebar .profile-img").setAttribute("src", s), document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", s), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", s)) : (document.querySelector(".user-own-img .avatar-sm").setAttribute("src", l), document.querySelector(".user-profile-sidebar .profile-img").setAttribute("src", l), document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", l), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", l))
            })
        })
    }), e("callList.json", function (e, t) {
        null !== e ? console.log("Something went wrong: " + e) : (callList = t, callList.forEach(function (e, t) {
            var a = !0 === e.callVideo ? '<button type="button" class="btn btn-link p-0 font-size-20 stretched-link" data-bs-toggle="modal" data-bs-target=".videocallModal"><i class="' + e.callTypeIcon + '"></i></button>' : '<button type="button" class="btn btn-link p-0 font-size-20 stretched-link" data-bs-toggle="modal" data-bs-target=".audiocallModal"><i class="' + e.callTypeIcon + '"></i></button>',
                s = e.profile ? '<img src="' + e.profile + '" class="rounded-circle avatar-xs" alt="">' : '<div class="avatar-xs"><span class="avatar-title rounded-circle bg-danger text-white">RL</span></div>';
            document.getElementById("callList").innerHTML += '<li id="calls-id-' + e.id + '" >        <div class="d-flex align-items-center">        <div class="chat-user-img flex-shrink-0 me-2">            ' + s + '        </div>            <div class="flex-grow-1 overflow-hidden">                <p class="text-truncate mb-0">' + e.name + '</p>                <div class="text-muted font-size-12 text-truncate"><i class="' + e.callArrowType + '"></i> ' + e.dateTime + '</div>            </div>            <div class="flex-shrink-0 ms-3">                <div class="d-flex align-items-center gap-3">                    <div>                        <h5 class="mb-0 font-size-12 text-muted">' + e.callTime + "</h5>                    </div>                    <div>                       " + a + "                    </div>                </div>            </div>        </div>      </li>"
        })), document.querySelectorAll("#callList li").forEach(function (i) {
            i.addEventListener("click", function (e) {
                var t = i.getAttribute("id"), a = i.querySelector(".text-truncate").innerHTML;
                document.querySelector(".videocallModal .text-truncate").innerHTML = a, document.querySelector(".audiocallModal .text-truncate").innerHTML = a;
                var s = document.getElementById(t).querySelector(".avatar-xs").getAttribute("src");
                s ? (document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", s), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", s)) : (document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", l), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", l))
            })
        })
    }), e("contacts.json", function (e, t) {
        var i, r;
        null !== e ? console.log("Something went wrong: " + e) : ((c = t).sort(function (e, t) {
            return e.name.localeCompare(t.name)
        }), r = i = "", c.forEach(function (e, t) {
            var a = e.profile ? '<img src="' + e.profile + '" class="img-fluid rounded-circle" alt="">' : '<span class="avatar-title rounded-circle bg-primary font-size-10">FP</span>';
            i = '<li>              <div class="d-flex align-items-center">                  <div class="flex-shrink-0 me-2">                      <div class="avatar-xs">                          ' + a + '                      </div>                  </div>                  <div class="flex-grow-1">                      <h5 class="font-size-14 m-0" >' + e.name + '</h5>                  </div>                  <div class="flex-shrink-0">                      <div class="dropdown">                          <a href="#" class="text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                              <i class="bx bx-dots-vertical-rounded align-middle"></i>                          </a>                          <div class="dropdown-menu dropdown-menu-end">                              <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Edit <i class="bx bx-pencil ms-2 text-muted"></i></a>                              <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Block <i class="bx bx-block ms-2 text-muted"></i></a>                              <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Remove <i class="bx bx-trash ms-2 text-muted"></i></a>                          </div>                      </div>                  </div>              </div>          </li>';
            var s = '<div class="mt-3" >          <div class="contact-list-title">' + e.name.charAt(0).toUpperCase() + '                </div>                <ul id="contact-sort-' + e.name.charAt(0) + '" class="list-unstyled contact-list" >';
            r != e.name.charAt(0) && (document.getElementsByClassName("sort-contact")[0].innerHTML += s), document.getElementById("contact-sort-" + e.name.charAt(0)).innerHTML = document.getElementById("contact-sort-" + e.name.charAt(0)).innerHTML + i, r = e.name.charAt(0)
        })), document.querySelectorAll(".sort-contact ul li").forEach(function (s) {
            s.addEventListener("click", function (e) {
                o = "users", u();
                var t = s.querySelector("li .font-size-14").innerHTML;
                document.querySelector(".text-truncate .user-profile-show").innerHTML = t, document.querySelector(".user-profile-desc .text-truncate").innerHTML = t, document.querySelector(".audiocallModal .text-truncate").innerHTML = t, document.querySelector(".videocallModal .text-truncate").innerHTML = t, document.querySelector(".user-profile-sidebar .user-name").innerHTML = t;
                var a = s.querySelector("li .align-items-center").querySelector(".avatar-xs .rounded-circle").getAttribute("src");
                a ? (document.querySelector(".user-own-img .avatar-sm").setAttribute("src", a), document.querySelector(".user-profile-sidebar .profile-img").setAttribute("src", a), document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", a), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", a)) : (document.querySelector(".user-own-img .avatar-sm").setAttribute("src", l), document.querySelector(".user-profile-sidebar .profile-img").setAttribute("src", l), document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", l), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", l)), document.getElementById("users-conversation").querySelectorAll(".left .chat-avatar").forEach(function (e) {
                    a ? e.querySelector("img").setAttribute("src", a) : e.querySelector("img").setAttribute("src", l)
                }), window.stop()
            })
        }), a()
    }), u();
    var t = document.querySelector(".user-profile-sidebar");
    document.querySelectorAll(".user-profile-show").forEach(function (e) {
        e.addEventListener("click", function (e) {
            t.classList.toggle("d-block")
        })
    }), window.addEventListener("DOMContentLoaded", function () {
        var e = document.querySelector("#chat-conversation .simplebar-content-wrapper");
        e.scrollTop = e.scrollHeight
    });
    var i = document.getElementById("chatinputmorecollapse");

    function m(e) {
        var t = document.getElementById(e).querySelector("#chat-conversation .simplebar-content-wrapper"),
            a = document.getElementsByClassName("chat-conversation-list")[0] ? document.getElementById(e).getElementsByClassName("chat-conversation-list")[0].scrollHeight - window.innerHeight + 250 : 0;
        a && t.scrollTo({top: a, behavior: "smooth"})
    }

    document.body.addEventListener("click", function () {
        new bootstrap.Collapse(i, {toggle: !1}).hide()
    }), i && i.addEventListener("shown.bs.collapse", function () {
        new Swiper(".chatinput-links", {
            slidesPerView: 3,
            spaceBetween: 30,
            breakpoints: {768: {slidesPerView: 4}, 1024: {slidesPerView: 6}}
        })
    }), document.querySelectorAll(".contact-modal-list .contact-list li").forEach(function (e) {
        e.addEventListener("click", function () {
            e.classList.toggle("selected")
        })
    }), document.querySelectorAll(".theme-img , .theme-color").forEach(function (e) {
        e.addEventListener("click", function (e) {
            var t, a, s = document.querySelector("input[name=bgcolor-radio]:checked");
            s && (s = s.id, (t = document.getElementsByClassName(s)) && (a = window.getComputedStyle(t[0], null).getPropertyValue("background-color"), document.querySelector(".user-chat-overlay").style.background = a, rgbColor = a.substring(a.indexOf("(") + 1, a.indexOf(")")), document.documentElement.style.setProperty("--bs-primary-rgb", rgbColor)));
            var i, r, n = document.querySelector("input[name=bgimg-radio]:checked");
            n && (n = n.id, i = document.getElementsByClassName(n), t && (r = window.getComputedStyle(i[0], null).getPropertyValue("background-image"), document.querySelector(".user-chat").style.backgroundImage = r))
        })
    });
    var r = document.querySelector("#chatinput-form"), f = document.querySelector("#chat-input"),
        v = document.querySelector(".chat-conversation-list"), g = document.querySelector(".chat-input-feedback");

    function p() {
        const e = 12 <= (new Date).getHours() ? "pm" : "am",
          t = 12 < (new Date).getHours() ? (new Date).getHours() % 12 : (new Date).getHours(),
          a = (new Date).getMinutes() < 10 ? "0" + (new Date).getMinutes() : (new Date).getMinutes();
        return t < 10 ? "0" + t + ":" + a + " " + e : t + ":" + a + " " + e
    }

    setInterval(p, 1e3);
    let h = 0;
    r && r.addEventListener("submit", function (e) {
        e.preventDefault();
        const t = n,
          a = f.value;
        0 === a.length ? (g.classList.add("show"), setTimeout(function () {
            g.classList.remove("show")
        }, 3e3)) : (function (e, t) {
            const chatMessage = {
                from_id: sessionStorage.getItem('userId'),
                to_id: recipientId,
                senderImg: 'assets/images/users/avatar-2.jpg',
                msg: t,
                type: 'CHAT'
            };
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));


            h++;
            const a = document.getElementById(e).querySelector(".chat-conversation-list");
            a.insertAdjacentHTML("beforeend", '<li class="chat-list right" id="chat-list-' + h + '" > '
              + '<div class="conversation-list">' +
              '<div class="user-chat-content">                        ' +
              '<div class="ctext-wrap">                            ' +
              '<div class="ctext-wrap-content">                                ' +
              '<p class="mb-0 ctext-content">                                    ' +
              '' + t + '                                ' +
              '</p>                            ' +
              '</div>                            ' +
              '<div class="dropdown align-self-start message-box-drop">' +
              '<a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                                    ' +
              '<i class="ri-more-2-fill"></i>                                ' +
              '</a>' +
              '<div class="dropdown-menu">                                    ' +
              '<a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>' +
              '<a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>' +
              '<a class="dropdown-item d-flex align-items-center justify-content-between copy-message" href="#" id="copy-message-' + h + '">Copy <i class="bx bx-copy text-muted ms-2"></i></a>' +
              '<a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>' +
              '<a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Mark as Unread <i class="bx bx-message-error text-muted ms-2"></i></a>                                    ' +
              '<a class="dropdown-item d-flex align-items-center justify-content-between delete-item" id="delete-item-' + h + '" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>' +
              '</div></div></div>' +
              '<div class="conversation-name">' +
              '<small class="text-muted time">' + p() + '</small>' +
              '<span class="text-success check-message-icon"><i class="bx bx-check"></i></span></div></div></div></li>');
            // a.insertAdjacentHTML("beforeend", '<li class="chat-list right" id="chat-list-' + h + '" > ' + '<div class="conversation-list">                    <div class="user-chat-content">                        <div class="ctext-wrap">                            <div class="ctext-wrap-content">                                <p class="mb-0 ctext-content">                                    ' + t + '                                </p>                            </div>                            <div class="dropdown align-self-start message-box-drop">                                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                                    <i class="ri-more-2-fill"></i>                                </a>                                <div class="dropdown-menu">                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>                                    <a class="dropdown-item d-flex align-items-center justify-content-between copy-message" href="#" id="copy-message-' + h + '">Copy <i class="bx bx-copy text-muted ms-2"></i></a>                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Mark as Unread <i class="bx bx-message-error text-muted ms-2"></i></a>                                    <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" id="delete-item-' + h + '" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>                            </div>                        </div>                    </div>                    <div class="conversation-name">                        <small class="text-muted time">' + p() + '</small>                        <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>                    </div>                </div>            </div>        </li>');
            const s = document.getElementById("chat-list-" + h);
            s.querySelectorAll(".delete-item").forEach(function (e) {
                e.addEventListener("click", function () {
                    a.removeChild(s)
                })
            }), s.querySelectorAll(".copy-message").forEach(function (e) {
                e.addEventListener("click", function () {
                    s.childNodes[1].children[1].firstElementChild.firstElementChild.getAttribute("id");
                    isText = s.childNodes[1].children[1].firstElementChild.firstElementChild.innerText, navigator.clipboard.writeText(isText)
                })
            })
        }(t, a), m(t)), f.value = ""
    });
    var y = document.querySelector("#channel-conversation");
    document.querySelector("#profile-foreground-img-file-input").addEventListener("change", function () {
        const e = document.querySelector(".profile-foreground-img"),
          t = document.querySelector(".profile-foreground-img-file-input").files[0], a = new FileReader;
        a.addEventListener(function () {
            e.src = a.result
        }, !1), t && a.readAsDataURL(t)
    }), document.querySelector("#profile-img-file-input").addEventListener("change", function () {
        const e = document.querySelector(".user-profile-image"),
          t = document.querySelector(".profile-img-file-input").files[0], a = new FileReader;
        a.addEventListener("load", function () {
            e.src = a.result
        }, !1), t && a.readAsDataURL(t)
    });
    for (var b = document.getElementsByClassName("favourite-btn"), x = 0; x < b.length; x++) {
        var w = b[x];
        w.onclick = function () {
            w.classList.toggle("active")
        }
    }
    new FgEmojiPicker({
        trigger: [".emoji-btn"],
        removeOnSelection: !1,
        closeButton: !0,
        position: ["top", "right"],
        preFetch: !0,
        dir: "assets/js/api/json",
        insertInto: document.querySelector(".chat-input")
    });

    function S(e, t, a, s, i) {
        var r = '<div class="ctext-wrap">';
        if (null != t) r += '<div class="ctext-wrap-content" id=' + e + '><p class="mb-0 ctext-content">' + t + "</p></div>"; else if (a && 0 < a.length) {
            for (r += '<div class="message-img mb-0">', x = 0; x < a.length; x++) r += '<div class="message-img-list">                <div>                    <a class="popup-img d-inline-block" href="' + a[x] + '">                        <img src="' + a[x] + '" alt="" class="rounded border">                    </a>                </div>                <div class="message-img-link">                <ul class="list-inline mb-0">                    <li class="list-inline-item dropdown">                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                            <i class="bx bx-dots-horizontal-rounded"></i>                        </a>                        <div class="dropdown-menu">                            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Download <i class="bx bx-download ms-2 text-muted"></i></a>                            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>                            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>                            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>                            <a class="dropdown-item d-flex align-items-center justify-content-between delete-image" href="#">Delete <i class="bx bx-trash ms-2 text-muted"></i></a>                        </div>                    </li>                </ul>                </div>            </div>';
            r += "</div>"
        } else 0 < s.length && (r += '<div class="ctext-wrap-content">            <div class="p-3 border-primary border rounded-3">            <div class="d-flex align-items-center attached-file">                <div class="flex-shrink-0 avatar-sm me-3 ms-0 attached-file-avatar">                    <div class="avatar-title bg-soft-primary text-primary rounded-circle font-size-20">                        <i class="ri-attachment-2"></i>                    </div>                </div>                <div class="flex-grow-1 overflow-hidden">                    <div class="text-start">                        <h5 class="font-size-14 mb-1">design-phase-1-approved.pdf</h5>                        <p class="text-muted text-truncate font-size-13 mb-0">12.5 MB</p>                    </div>                </div>                <div class="flex-shrink-0 ms-4">                    <div class="d-flex gap-2 font-size-20 d-flex align-items-start">                        <div>                            <a href="#" class="text-muted">                                <i class="bx bxs-download"></i>                            </a>                        </div>                    </div>                </div>            </div>            </div>        </div>');
        return !0 === i && (r += '<div class="dropdown align-self-start message-box-drop">                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                    <i class="ri-more-2-fill"></i>                </a>                <div class="dropdown-menu">                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>                    <a class="dropdown-item d-flex align-items-center justify-content-between copy-message" href="#" id="copy-message-' + h + '">Copy <i class="bx bx-copy text-muted ms-2"></i></a>                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Mark as Unread <i class="bx bx-message-error text-muted ms-2"></i></a>                    <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>                </div>            </div>'), r += "</div>"
    }

    function q(e) {
        let t, a, s;
        t = e, a = function (e, t) {
            var r, n;
            null !== e ? console.log("Something went wrong: " + e) : (r = "users" == o ? t[0].chats : t[0].channel_chat, document.getElementById(o + "-conversation").innerHTML = "", n = 0, r.forEach(function (t, e) {
                var a, s, i;
                0 < n ? --n : (a = t.from_id == d ? " right" : " left", s = c.find(function (e) {
                    return e.id == t.from_id
                }), i = '<li class="chat-list' + a + '" id=' + t.id + '>                        <div class="conversation-list">', d != t.from_id && (i += '<div class="chat-avatar"><img src="' + s.profile + '" alt=""></div>'), i += '<div class="user-chat-content">', i += S(t.id, t.msg, t.has_images, t.has_files, t.has_dropDown), r[e + 1] && t.from_id == r[e + 1].from_id && (n = function (e, t, a) {
                    for (var s = 0; e[t] && e[t + 1] && e[t + 1].from_id == a;) s++, t++;
                    return s
                }(r, e, t.from_id), i += function (e, t, a) {
                    for (var s = 0; e[t] && e[t + 1] && e[t + 1].from_id == a;) s = S(e[t + 1].id, e[t + 1].msg, e[t + 1].has_images, e[t + 1].has_files, e[t + 1].has_dropDown), t++;
                    return s
                }(r, e, t.from_id)), i += '<div class="conversation-name"><small class="text-muted time">' + t.datetime + '</small> <span class="text-success check-message-icon"><i class="bx bx-check-double"></i></span></div>', i += "</div>                </div>            </li>", document.getElementById(o + "-conversation").innerHTML += i)
            })), v.querySelectorAll(".delete-item").forEach(function (e) {
                e.addEventListener("click", function () {
                    2 == e.closest(".user-chat-content").childElementCount ? e.closest(".chat-list").remove() : e.closest(".ctext-wrap").remove()
                })
            }), y.querySelectorAll(".delete-item").forEach(function (e) {
                e.addEventListener("click", function () {
                    2 == e.closest(".user-chat-content").childElementCount ? e.closest(".chat-list").remove() : e.closest(".ctext-wrap").remove()
                })
            }), v.querySelectorAll(".chat-list").forEach(function (e) {
                e.querySelectorAll(".delete-image").forEach(function (e) {
                    e.addEventListener("click", function () {
                        1 == e.closest(".message-img").childElementCount ? e.closest(".chat-list").remove() : e.closest(".message-img-list").remove()
                    })
                })
            }), v.querySelectorAll(".copy-message").forEach(function (t) {
                t.addEventListener("click", function () {
                    var e = t.closest(".ctext-wrap").children[0] ? t.closest(".ctext-wrap").children[0].children[0].innerText : "";
                    navigator.clipboard.writeText(e)
                })
            }), y.querySelectorAll(".copy-message").forEach(function (t) {
                t.addEventListener("click", function () {
                    var e = t.closest(".ctext-wrap").children[0] ? t.closest(".ctext-wrap").children[0].children[0].innerText : "";
                    navigator.clipboard.writeText(e)
                })
            }), m("users-chat"), GLightbox({selector: ".popup-img", title: !1})
        }, (s = new XMLHttpRequest).open("GET", t, !0),
            s.responseType = "json",
            s.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('accessToken')),
            s.onload = function () {
            const e = s.status;
            a(200 === e ? null : e, s.response)
        }, s.send()
    }

    document.getElementById("emoji-btn").addEventListener("click", function () {
        setTimeout(function () {
            let e, t = document.getElementsByClassName("fg-emoji-picker")[0];
            !t || (e = window.getComputedStyle(t) ? window.getComputedStyle(t).getPropertyValue("left") : "") && (e = (e = e.replace("px", "")) - 40 + "px", t.style.left = e)
        }, 0)
    })
}();