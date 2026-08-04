import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Messages.css";

function Messages() {

  const [conversations, setConversations] = useState([]);

  const [selectedChat, setSelectedChat] = useState(null);

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
  if (location.state?.item) {
    console.log("Opened from Item Details:", location.state.item);
  }
}, [location]);


  const fetchConversations = async () => {

  try {

    const { data } = await axios.get(
      "https://campuscrate-1vil.onrender.com/api/messages",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
console.log(data);
    setConversations(data.conversations);
    console.log(data.conversations);

  }

  catch (error) {

    console.log(error);

  }

  finally {

    setLoading(false);

  }

};

const fetchMessages = async (claimId) => {

  try {

    const { data } = await axios.get(

      `https://campuscrate-1vil.onrender.com/api/messages/${claimId}`,

      {

        headers:{

          Authorization:`Bearer ${token}`

        }

      }

    );

    setMessages(data.messages);

  }

  catch(error){

    console.log(error);

  }

};

const sendMessage = async () => {

  if (!newMessage.trim()) return;

  try {

    await axios.post(

      "https://campuscrate-1vil.onrender.com/api/messages",

      {

        claimId:selectedChat.claimId._id,

        receiver:

selectedChat.sender._id===selectedChat.receiver._id

?selectedChat.receiver._id

:selectedChat.sender._id,

        message:newMessage

      },

      {

        headers:{

          Authorization:`Bearer ${token}`

        }

      }

    );

    setNewMessage("");

    fetchMessages(selectedChat.claimId._id);

  }

  catch(error){

    console.log(error);

  }

};

useEffect(()=>{

fetchConversations();

},[]);

return (

<section className="messages-page">

  {/* LEFT SIDEBAR */}

  <div className="chat-sidebar">

    <div className="chat-sidebar-header">

      <h2>Messages</h2>

      <input
        type="text"
        placeholder="Search conversations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>

    <div className="conversation-list">

      {loading ? (

        <h3 className="loading-chat">
          Loading...
        </h3>

      ) : conversations.length === 0 ? (

        <div className="empty-chat">

          <h3>No Conversations</h3>

          <p>
            Your conversations will appear here.
          </p>

        </div>

      ) : (

        conversations
          .filter((chat) =>
            chat.claimId?.itemId?.title
              ?.toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((chat) => (

            <div
              key={chat._id}
              className={`conversation-card ${
                selectedChat?._id === chat._id
                  ? "active-chat"
                  : ""
              }`}
              onClick={() => {

                setSelectedChat(chat);

                fetchMessages(chat.claimId._id);

              }}
            >

              <img
                src={
                  chat.claimId?.itemId?.photoUrl ||
                  "https://placehold.co/80x80"
                }
                alt=""
                className="conversation-image"
              />

              <div className="conversation-info">

                <h3>

                  {chat.claimId?.itemId?.title}

                </h3>

                <p>

                  {chat.message}

                </p>

              </div>

            </div>

          ))

      )}

    </div>

  </div>

  {/* RIGHT */}

  <div className="chat-window">

  {!selectedChat ? (

    <div className="no-chat">

      <div className="chat-placeholder">

        💬

      </div>

      <h2>Select a Conversation</h2>

      <p>

        Choose a conversation from the left to
        start messaging.

      </p>

    </div>

  ) : (

    <>

      {/* HEADER */}

      <div className="chat-header">

        <img
          src={
            selectedChat.claimId.itemId.photoUrl ||
            "https://placehold.co/60"
          }
          alt=""
        />

        <div>

          <h3>

            {selectedChat.claimId.itemId.title}

          </h3>

          <span>

            Active Conversation

          </span>

        </div>

      </div>

      {/* CHAT */}

      <div className="messages-container">

        {messages.map((msg)=>(

          <div

            key={msg._id}

            className={`message-bubble ${
              msg.sender._id===selectedChat.sender._id
                ? "received"
                : "sent"
            }`}

          >

            <p>

              {msg.message}

            </p>

            <span>

              {new Date(
                msg.createdAt
              ).toLocaleTimeString([],{

                hour:"2-digit",

                minute:"2-digit"

              })}

            </span>

          </div>

        ))}

      </div>

      {/* INPUT */}

      <div className="chat-input">

        <input

          type="text"

          placeholder="Type a message..."

          value={newMessage}

          onChange={(e)=>

            setNewMessage(e.target.value)

          }

          onKeyDown={(e)=>{

            if(e.key==="Enter"){

              sendMessage();

            }

          }}

        />

        <button

          onClick={sendMessage}

        >

          Send

        </button>

      </div>

    </>

  )}

</div>

</section>

);

}

export default Messages;