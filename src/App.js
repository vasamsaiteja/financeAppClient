import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      {/* <Route component={NotFound} /> */}
      {/* <LoginForm /> */}
    </Switch>
  </BrowserRouter>
)

export default App
