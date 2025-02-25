// main.js or index.js for Deno Deploy

// **IMPORTANT SECURITY NOTE for DENO DEPLOY:**
// Use Deno Deploy Environment Variables for your API key.
// 1. In your Deno Deploy project settings, add an environment variable named `GEMINI_API_KEY`.
// 2. Set its value to your API key: `AIzaSyCiiRGnNb-w_jJ-5QLZQm6kF98XDCNcccc`
//
// Then, access it like this:
const API_KEY = Deno.env.get("GEMINI_API_KEY");

if (!API_KEY) {
    console.error("Error: GEMINI_API_KEY environment variable not set in Deno Deploy.");
}


async function generateContent(userMessage) {
    if (!API_KEY) {
        return "API key is not configured. Please check Deno Deploy environment variables.";
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`; // Using gemini-pro for coding help
    const headers = {
        'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
        contents: [{
            parts: [{ text: userMessage }]
        }]
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body,
        });

        if (!response.ok) {
            console.error(`Gemini API error: ${response.status} ${response.statusText}`);
            try {
                const errorData = await response.json();
                console.error("Error details:", errorData); // Log detailed error info if available
            } catch (jsonError) {
                console.error("Failed to parse error JSON:", jsonError);
            }
            return "Sorry, I encountered an error. Please try again.";
        }

        const data = await response.json();
        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text;
        } else {
            console.warn("Unexpected Gemini API response format:", data);
            return "I couldn't understand the response. Please try again.";
        }

    } catch (error) {
        console.error("Error during Gemini API call:", error);
        return "Oops! Something went wrong. Please try again later.";
    }
}


export default async function handleRequest(request) { // Deno Deploy entry point is default export
    const url = new URL(request.url);
    if (url.pathname === '/') {
        // Serve the HTML page
        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Coding Helper Chatbot</title>
        <style>
          body {
            background-color: #181818; /* Dark background */
            color: #f0f0f0; /* Light text */
            font-family: sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            margin: 0;
          }

          #chat-container {
            width: 80%;
            max-width: 800px;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            background-color: #222; /* Slightly darker chat area */
            overflow-y: auto; /* Enable scrolling for long chats */
            max-height: 600px; /* Limit chat area height */
          }

          .message {
            padding: 10px;
            margin-bottom: 8px;
            border-radius: 5px;
          }

          .user-message {
            background-color: #444; /* User message background */
            text-align: right;
          }

          .bot-message {
            background-color: #007bff; /* Bot message background (blueish for contrast) */
            color: white;
            text-align: left;
          }

          #input-area {
            display: flex;
            width: 80%;
            max-width: 800px;
          }

          #user-input {
            flex-grow: 1;
            padding: 10px;
            border: 1px solid #555;
            border-radius: 5px 0 0 5px;
            background-color: #333;
            color: #f0f0f0;
          }

          #send-button {
            padding: 10px 15px;
            border: none;
            border-radius: 0 5px 5px 0;
            background-color: #007bff;
            color: white;
            cursor: pointer;
          }

          #send-button:hover {
            background-color: #0056b3;
          }

          .loading-indicator {
              display: none; /* Initially hidden */
              margin-left: 10px;
              font-size: 1.2em;
              animation: blinker 1s linear infinite; /* Simple blinking animation */
          }

          @keyframes blinker {
              50% { opacity: 0; }
          }

        </style>
      </head>
      <body>
        <h1>Coding Helper Chatbot</h1>
        <div id="chat-container">
          <div class="message bot-message">Welcome! I'm your coding helper. Ask me anything!</div>
        </div>
        <div id="input-area">
          <input type="text" id="user-input" placeholder="Type your coding question..." />
          <button id="send-button">Send</button>
          <span id="loading-indicator" class="loading-indicator">...</span>
        </div>

        <script>
          const chatContainer = document.getElementById('chat-container');
          const userInput = document.getElementById('user-input');
          const sendButton = document.getElementById('send-button');
          const loadingIndicator = document.getElementById('loading-indicator');


          sendButton.addEventListener('click', sendMessage);

          userInput.addEventListener('keydown', (event) => {
              if (event.key === 'Enter') {
                  sendMessage();
                  event.preventDefault(); // Prevent default form submission/newline
              }
          });


          async function sendMessage() {
            const message = userInput.value.trim();
            if (!message) return;

            appendMessage('user-message', message);
            userInput.value = '';
            loadingIndicator.style.display = 'inline'; // Show loading indicator
            sendButton.disabled = true; // Disable button while waiting

            try {
              const botResponse = await getBotResponse(message);
              appendMessage('bot-message', botResponse);
            } catch (error) {
              appendMessage('bot-message', "Sorry, something went wrong. Please try again.");
              console.error("Error getting bot response:", error);
            } finally {
              loadingIndicator.style.display = 'none'; // Hide loading indicator
              sendButton.disabled = false; // Re-enable button
              chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
            }
          }


          function appendMessage(senderClass, messageText) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', senderClass);
            messageDiv.textContent = messageText;
            chatContainer.appendChild(messageDiv);
          }

          async function getBotResponse(message) {
            const response = await fetch('/api/chat', { // Call the API endpoint
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.response; // Assuming the Worker returns { response: "..." }
          }


        </script>
      </body>
      </html>
    `;
        return new Response(html, {
            headers: { 'Content-Type': 'text/html' },
        });
    } else if (url.pathname === '/api/chat' && request.method === 'POST') {
        // Handle API call to Gemini
        try {
            const reqBody = await request.json();
            const userMessage = reqBody.message;
            if (!userMessage) {
                return new Response(JSON.stringify({ error: "No message provided" }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            const botResponse = await generateContent(userMessage);
            return new Response(JSON.stringify({ response: botResponse }), {
                headers: { 'Content-Type': 'application/json' },
            });

        } catch (error) {
            console.error("API Chat Error:", error);
            return new Response(JSON.stringify({ error: "Failed to process chat request" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

    } else {
        return new Response('Not Found', { status: 404 });
    }
}
