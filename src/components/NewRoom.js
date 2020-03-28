import React from 'react'
export default function NewRoom(props) {
    if (props.createRoom === true){
        return (
            <div className = 'modal-overlay'>
                <div className = 'modal'>
                <form>
                    <input onChange = {props.logIn} type="text" placeholder = "Room Name" name="roomName" required></input>
                    <input onClick = {props.submit} type='submit' name='login'></input>
                </form>
                </div>
            </div>
        )
    } else {
        return(
            null
        )
    }
}