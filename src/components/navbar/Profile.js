

const Profile = ({setShowProfile})=>{

    return (
        <div className="profile" onMouseLeave={()=>{setShowProfile(false)}}>
            <ul className="profile-list">
                <li >Orders</li>
                <li>Edit Profile</li>
                <li>Change Password</li>
                <li>Logout</li>
            </ul>

        </div>
    )
}

export default Profile