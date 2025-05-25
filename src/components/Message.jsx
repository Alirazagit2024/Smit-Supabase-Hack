// Message.jsx example
const Message = ({ message, isOwn }) => {
  return (
    <div className={`message ${isOwn ? "own" : ""}`}>
      <p><strong>{message.sender}</strong>: {message.message}</p>
    </div>
  );
};

export default Message;
