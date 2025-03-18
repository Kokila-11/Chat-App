const socket = io();

// Get DOM elements
const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message');

// Log the connection
socket.on('connect', () => {
    console.log('Connected to server');
});

// Listen for incoming messages from other users
socket.on('message', (message) => {
    outputMessage(message, 'left');  // Messages from others will be on the left
});

// Handle form submission to send message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the message text
    const msg = messageInput.value;

    // Emit the message to the server
    socket.emit('chatMessage', msg);

    // Output the message sent by the user on the right
    outputMessage(msg, 'right');

    // Clear input field after sending the message
    messageInput.value = '';
    messageInput.focus();
});

// Function to display messages in the chat box
function outputMessage(message, side) {
    console.log('Displaying message:', message);  // Log the message
    const div = document.createElement('div');
    div.classList.add('message');
    div.classList.add(side === 'left' ? 'message-left' : 'message-right');
    div.innerHTML = `<p>${message}</p>`;
    chatBox.appendChild(div);

    // Scroll the chat box to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}
