import React from 'react'
export default function Auth(props) {
    if (props.loggedIn === false){
        return (
            <div className = 'modal-overlay'>
                <div className = 'modal'>
                    <form>
                        <input onChange = {props.logIn} type="text" placeholder = "Username" name="username" required></input>
                        <input onChange = {props.logIn} type="password" placeholder = "Password" name="password" required></input>
                        <input onChange = {props.logIn} type='password' name='confirm' placeholder='Confirm Password' required></input>
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