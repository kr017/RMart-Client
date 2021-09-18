import { Link} from 'react-router-dom'

const Profile = ({ setShowProfile, setUpdatePassword, logoutUser }) => {

    return (
        <div className="profile" onMouseLeave={() => { setShowProfile(false) }}>
            <ul className="profile-list">
                <li className=" profile-list-item" onClick={()=>{setShowProfile(false)}} >Orders</li>
                <li className="nav-item profile-list-item" onClick={()=>{setShowProfile(false)}} ><Link className="nav-link" to="/edit/profile" >Edit Profile</Link></li>
                <li className="profile-list-item" onClick={() => { setShowProfile(false); setUpdatePassword(true) }} >Change Password</li>
                <li className="nav-item" onClick={()=>{setShowProfile(false)}}><button className="btn-logout" onClick={logoutUser}>Logout</button></li>
            </ul>

        </div>
    )
}

export default Profile