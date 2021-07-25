import { Navbar, Home } from './components'
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Signup, Login,getUser } from './features'
import { Toaster } from "react-hot-toast";
import { useDispatch} from 'react-redux';
import PrivateRoute from './PrivateRoute'

function App() {
  const dispatch = useDispatch();
  let userData = JSON.parse(localStorage.getItem('userInfo')) || '';
  if (userData) {
    dispatch(getUser())
  }
  


  return (
    <div className="App">
      <Navbar />
      
      <Switch>
        <PrivateRoute exact component={Home} path='/home' ></PrivateRoute>
        <Route exact component={Signup} path='/signup'></Route>
        <Route exact component={Login} path='/login'></Route>
      </Switch>
      <Toaster />
    </div>
  );
}

export default App;
