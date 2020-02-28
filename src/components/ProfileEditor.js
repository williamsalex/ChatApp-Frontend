import React, {useState} from 'react'
export default function Header(props) {
    return(
        <div>
                {
                    props.friends.map(
                        friend => <p>{friend.name}</p>
                    )
                }
            <h3>Add Friends</h3>
            <input type='text' name='newFriend' placeholder='Enter Username'></input>
            <input type='submit'></input>
        </div>
    )
}

// import React, {useState} from 'react'
// export default function Header(props) {
//     let [tab, selectTab] = useState(0)
    
//     return(
//         <div>
//             <div>
//                 <button onClick = {() => selectTab(tab = 'friends')}>Friends</button>
//                 <button onClick = {() => selectTab(tab = 'profile')}>Profile</button>
//             </div>
//             <div>
//                 {
//                     tab === 'friends' ? 
//                         <div>
//                         {
//                             props.friends.map(
//                                 friend => <p>{friend.name}</p>
//                             )
//                         }
//                             <h3>Add Friends</h3>
//                             <input type='text' name='newFriend' placeholder='Enter Username'></input>
//                             <input type='submit'></input>
//                         </div>
//                     :
//                     <div>
//                         <input onChange = {props.changeData} class = 'input' type="text" name="username"></input>
//                         <input onChange = {props.changeData} class = 'input' type="password" placeholder = "Change Password" name="password"></input>
//                         <input onChange = {props.changeData} class = 'input' type='text' placeholder = 'Change Icon' name='icon'></input>
//                         <input onChange = {props.changeData} class = 'input' type='password' name='currentPassword' placeholder='Password' required></input>
//                         <input onClick = {props.handleSubmit} type='submit'></input>
//                     </div>
//                 }
//             </div>
//         </div>
//     )
// }