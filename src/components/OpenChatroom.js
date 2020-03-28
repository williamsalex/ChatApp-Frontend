import React from 'react'
export default function Room(props) {
    return(
         props.messages !== undefined && props.loggd !== false && props.currRoom.id !== 0 ?
         <div className = "content">
            <div className = 'open'>
            {
                props.messages.map(
                    message =>
                    message.user_id === props.currentUser.id ? 
                    <p className = 'self'>{message.content + ' < '}</p> :
                    <p className = 'other'> {props.users.find(element => element.id === message.user_id).username + ' > '+message.content}</p>
                )
            }
            </div>
            <hr/>
            <div className = "footer">
            <form>
                <input onChange = {props.onChange} type="text" name="message" placeholder = "Message" value = {props.value}></input>
                <input onClick = {props.handleSubmission} type="submit" value = 'Send'></input>
            </form>
            </div>
            </div>
        :
            <div></div>
    )
}