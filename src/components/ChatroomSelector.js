import React from 'react'
export default function Selector(props) {
    return(
        <div>
            {
                props.rooms.map(
                    room =>
                    props.currentRoom.id === room.id ? 
                    <p class = 'selected'>{room.name}</p>
                    :
                    <p class = 'notSelected' onClick = {props.changeRoom}>{room.name}</p>
                    )
            }
        </div>
    )
}