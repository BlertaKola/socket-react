import './App.css'; 
const Message = ({ name, text, isCurrentUser }) => {
    return (
        <>
            <div
                className={`message ${isCurrentUser ? 'my-message' : 'other-message'}`}
            >
                <strong>{name}:</strong> {text}
            </div>
            



        </>
    )
}
export default Message