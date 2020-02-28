import React, { useState } from 'react'
export default function Room(props) {
    let [message, writeMessage] = useState(0)

    return(
         props.messages !== undefined ?
            <div className = 'open'>
            {
                props.messages.map(
                    message =>
                    message.user_id === props.currentUser.id ? 
                    <p className = 'self'>{message.content + ' < '}</p> :
                    <p className = 'other'> {props.users.find(element => element.id === message.user_id).username + ' > '+message.content}</p>
                )
            }
            <hr/>
                <div>
                    <input  type="text" name="message" placeholder = "send message"></input>
                    <input  type="submit"></input>
                </div>
            </div>
        :
            <div></div>
    )
}

// className = 'input--send'
// className = 'submit--send'