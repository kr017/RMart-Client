import './App.css';
import { Navbar, Home,ProductInfo} from './components'
import { Route, Switch } from 'react-router-dom';
import { Signup, Login,getUser,Cart,Address} from './features'
import { Toaster } from "react-hot-toast";
import { useDispatch} from 'react-redux';
import PrivateRoute from './PrivateRoute'
import  './config/AxiosConfig'


function App() {
  const dispatch = useDispatch();
  let userData = JSON.parse(localStorage.getItem('userInfo')) || '';
  if(userData.name && userData.accessToken){
    dispatch(getUser())
  }
  
  


  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact component={Home} path='/home' ></Route>
        <Route exact component={Signup} path='/signup'></Route>
        <Route exact component={Login} path='/login'></Route>
        <Route exact component={ProductInfo} path='/shop/:product_id'></Route>
        <PrivateRoute exact component={Cart} path='/cart'></PrivateRoute>
        <PrivateRoute exact component={Address} path='/address'></PrivateRoute>
      </Switch>
      <Toaster />
    </div>
  );
}

export default App;
