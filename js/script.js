const socket = io('http://localhost:8000/')

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const audio = new Audio('/ting.mp3');

const append = (message, position, otherClass) => {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageElement.classList.add(otherClass);
    messageContainer.appendChild(messageElement);
    if (position == 'left') {
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const username = prompt('Enter your name to join');

socket.emit('new-user-joined', username);

socket.on('user-joined', (username) => {
    append(`${username} joined the chat`, 'right', 'joined');
})

socket.on('receive', (data) => {
    append(`${data.username}: ${data.message}`, 'left', 'receive');
})

socket.on('left', (username) => {
    append(`${username} left the chat`, 'left', 'leave');
})