import React from 'react'
export default function Header(props) {
    return(
        <div className = 'header'>
            <p> select chatroom </p>
            <p> {props.currentRoom.name} </p>
            <p> users in channel </p>
        </div>

    )
}