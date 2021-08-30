import './index.css'
import store from './redux/store'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import StepperFormPage from './pages/stepper-form';
import ViewJobs from './pages/view-jobs';
import User from './pages/user';
import NavBar from "./Components/navbar"

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/"> <StepperFormPage /> </Route>
            <Route path="/jobs/view"> <ViewJobs /> </Route>
            <Route path="/user"> <User /> </Route>
          </Switch>
        </Router>
      </Provider>
    </>
  );
}

export default App;
