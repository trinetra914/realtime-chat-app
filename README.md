\# Real-Time Chat Application



A real-time chat application built using React, Node.js, Express, Socket.io, and SQLite.



\## Features



\- Real-time messaging using Socket.io

\- Previous messages persist after page refresh

\- REST APIs for sending and fetching messages

\- SQLite database persistence

\- Username-based chat login

\- Message timestamps

\- Online user count

\- Typing indicator

\- Connection/disconnection status

\- Responsive chat UI

\- Automatic scrolling to latest messages

\- Error handling and input validation



\## Technology Stack



\### Frontend



\- React

\- Vite

\- Socket.io Client

\- CSS



\### Backend



\- Node.js

\- Express.js

\- Socket.io

\- SQLite

\- better-sqlite3

\- dotenv

\- CORS



\## Project Structure



```text

realtime-chat-app/

│

├── backend/

│   ├── src/

│   │   ├── controllers/

│   │   │   └── messageController.js

│   │   │

│   │   ├── db/

│   │   │   └── database.js

│   │   │

│   │   ├── models/

│   │   │   └── messageModel.js

│   │   │

│   │   ├── routes/

│   │   │   └── messageRoutes.js

│   │   │

│   │   ├── socket/

│   │   │   └── chatSocket.js

│   │   │

│   │   └── server.js

│   │

│   ├── package.json

│   └── chat.db

│

├── frontend/

│   ├── src/

│   │   ├── components/

│   │   │   ├── MessageBubble.jsx

│   │   │   ├── MessageInput.jsx

│   │   │   └── MessageList.jsx

│   │   │

│   │   ├── services/

│   │   │   ├── api.js

│   │   │   └── socket.js

│   │   │

│   │   ├── App.jsx

│   │   └── App.css

│   │

│   ├── .env.example

│   └── package.json

│

├── .gitignore

└── README.md

