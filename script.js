// Function to send a message
document.getElementById("chat-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const message = document.getElementById("message").value;

    if (username.trim() === "" || message.trim() === "") {
        alert("Both username and message are required.");
        return;
    }

    // Send message to the server via POST request
    try {
        await fetch("send_message.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, message })
        });

        document.getElementById("message").value = ""; // Clear message input
        fetchMessages(); // Refresh messages
    } catch (error) {
        console.error("Error sending message:", error);
    }
});

// Function to fetch and display messages
async function fetchMessages() {
    try {
        const response = await fetch("fetch_messages.php");
        
        // Check if the response is ok
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const messages = await response.json();
        const messagesContainer = document.getElementById("messages");

        messagesContainer.innerHTML = ""; // Clear existing messages
        messages.forEach((msg) => {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message");
            
            // Set the innerHTML correctly
            messageDiv.innerHTML = `<strong>${msg.user}</strong>: ${msg.message}`;
            messagesContainer.appendChild(messageDiv);
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

// Refresh messages every 5 seconds
setInterval(fetchMessages, 5000);

// Initial fetch to load messages on page load
fetchMessages();