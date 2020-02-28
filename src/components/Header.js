import React from 'react'
export default function Header(props) {
    return(
        <div className = 'header'>
            <p> chatrooms </p>
            <p> {props.currentRoom.name} </p>
            <p> edit </p>
        </div>

    )
}