import { Route, Switch } from 'react-router';
import OrderForm from './components/OrderForm'
import Orders from './pages/orders'
import './style/app.css'
import SingleOrder from './components/SingleOrder';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mb-5">
        <Switch>
          <Route path='/' exact component={OrderForm} />
          <Route path='/orders' exact component={Orders} />
          <Route path='/orders/:id' exact component={SingleOrder} />
        </Switch>
      </div >
    </>
  );
}
export default App;
