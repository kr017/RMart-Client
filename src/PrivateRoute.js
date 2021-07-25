import { useSelector} from 'react-redux';
import { userInfo} from './features'
import {Route,Redirect } from 'react-router-dom'

const PrivateRoute = ({...props})=>{
    const user = useSelector(userInfo)
    
    return user.accessToken ? (
        <Route  {...props}/>
      ) : (
        <Redirect to= "/login"/>
      )

}

export default PrivateRoute