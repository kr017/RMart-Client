import './App.css';
import { Navbar, Home, ProductInfo, EditProfile } from './components'
import { Route, Switch,Redirect } from 'react-router-dom';
import { Signup, Login, getUser, Cart, Address, OrderTable, Wishlist, Payment, Order } from './features'
import { Toaster } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import PrivateRoute from './PrivateRoute'
import './config/AxiosConfig'


function App() {
  const dispatch = useDispatch();
  let userData = JSON.parse(localStorage.getItem('userInfo')) || '';
  if (userData.name && userData.accessToken) {
    dispatch(getUser())
  }




  return (
    <div className="App">
      <Navbar />
      {/* <Order/> */}
      <Switch>
        <Route exact  path='/' render={() => {
          return (
            <Redirect to="/home" />
          )
        }}
        ></Route>
        <Route exact component={Home} path='/home' ></Route>
        <Route exact component={Signup} path='/signup'></Route>
        <Route exact component={Login} path='/login'></Route>
        <Route exact component={ProductInfo} path='/shop/:product_id'></Route>
        <PrivateRoute exact component={Cart} path='/cart'></PrivateRoute>
        <PrivateRoute exact component={Address} path='/address'></PrivateRoute>
        <PrivateRoute exact component={Wishlist} path='/wishlist'></PrivateRoute>
        <PrivateRoute exact component={EditProfile} path='/edit/profile'></PrivateRoute>
        <PrivateRoute exact component={Payment} path='/payment/:address_id'></PrivateRoute>
        <PrivateRoute exact component={OrderTable} path='/orders'></PrivateRoute>
        <PrivateRoute exact component={Order} path='/order/:order_id'></PrivateRoute>
      </Switch>
      <Toaster />
    </div>
  );
}

export default App;
