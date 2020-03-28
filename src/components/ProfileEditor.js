import React from 'react'
export default function Header(props) {
    return(
        <div className = "editor">
                {
                    props.users.map(
                        user => <p>{user.username}</p>
                    )
                }
            <br/>
            <form>
                <input onChange = {props.changing} type='text' name='newFriend' placeholder='Enter Username' value = {props.friend}></input>
                <input onClick = {props.openAdd} type='submit' value = 'Add'></input>
            </form>
            <br/>
            <button onClick = {props.logOut}>Log Out</button>
        </div>
    )
}