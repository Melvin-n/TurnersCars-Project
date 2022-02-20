import React, {useEffect, useState, useRef} from 'react'
import '../css/chatbox.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
export default function Chatbox() {

    const [userMessage, setUserMessage] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [messageList, setMessageList] = useState([])

    //handle message imput form
    const handleChange = (e) => {
        setUserMessage(e.target.value)
    }

    // opens/closes chat box
    const handleClick = () => {
        setOpenModal(openModal => !openModal)
    }

    //send message to server and gets  back response, adds both messages to mesage list (displayed on DOM)
    let chatMessages = document.getElementById('messages-list')
    const sendMessage = (e) => {
        setMessageList(messageList => [...messageList, <li className='user-message box arrow-right'>{userMessage}</li>])
        e.preventDefault()
        fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({"message": userMessage})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setMessageList(messageList => [...messageList, <li className='bot-message box arrow-left'>{data}</li>])
            setUserMessage('')
        })
    }

    //keeps chatbox scroll position at bottom
    useEffect(() => {
        if (openModal) {
      chatMessages.scrollTop = chatMessages.scrollHeight
    }}, [messageList]);


    
  return (
    <>
        {!openModal &&<button id="chat-modal" onClick={handleClick}>Ask for help</button>}
        <div id="chat-container">
            {openModal && <>
            <button id="chat-minimize" onClick={handleClick}><p>TurnersBot</p> <p>—</p></button>
            <div id="chat-box" >           
                <ul id='messages-list' reversed>
                {messageList.map((message) => (
                    message
                ))}
                </ul>
                <form id="message-form" method="POST" action='/' encType="application/json">
                    <input id="message-input" 
                        type="text" 
                        name="message" 
                        placeholder="Type a message..." 
                        autoComplete="off"
                        value={userMessage}
                        onChange={handleChange} /> 
                    <input id='send-message' type="submit" value="Send" onClick={sendMessage} />
                </form>
        </div>
        </>}

        </div>
    </>
  )
}



