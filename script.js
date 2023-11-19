async function sendMessage() {
    const messageInput = document.getElementById('messageInput').value;
    if (messageInput.trim() === '') return;

    // Create sender message in the chat box
    const senderChat = document.createElement('div');
    senderChat.className = 'message sender';
    senderChat.innerHTML = `<p>${messageInput}</p>`;
    document.getElementById('chatBox').appendChild(senderChat);

    // Send the message to the server to save in the database
    try {
        await axios.post('/api/save-message', { text: messageInput, type: 'sender' });
    } catch (error) {
        console.error('Error sending message:', error);
    }

    // Fetch data from the server's API
    try {
        const response = await axios.get('/api/fetch-data');
        const responseData = response.data.message;

        // Create receiver message in the chat box with the fetched data
        const receiverChat = document.createElement('div');
        receiverChat.className = 'message receiver';
        receiverChat.innerHTML = `<p>${responseData}</p>`;
        document.getElementById('chatBox').appendChild(receiverChat);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
