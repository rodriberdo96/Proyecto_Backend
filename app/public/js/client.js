window.onload = () => {
    const socket = io();

    socket.on("messages", data => {
        loadMessages(data)
    })

    function loadMessages(data) {
        const html = data.map((elem, index) => {
            return(`
                <div class="direct-chat-info clearfix">
                    <span id="chatName" class="direct-chat-name pull-right">${elem.email}</span>
                    <span id= "chatDate" class="direct-chat-timestamp pull-left">${elem.date}</span>
                </div>
                <div id="chatText" class="direct-chat-text">${elem.textoMensaje}</div>
            `)
        }).join(" ");
        document.getElementById('messages').innerHTML = html;
    }

    document.getElementById('formChat').addEventListener('submit', (e) => {
        e.preventDefault()
        agregarMensaje()
    })

    function agregarMensaje() {
        const nuevoMensaje = {
            email: document.getElementById('div-email').innerText,
            textoMensaje: document.getElementById('textoMensaje').value
        }
        socket.emit("newMessage",nuevoMensaje)
    }
}
