import {Component} from 'react'
import {Link} from 'react-router-dom'

class WelcomeScreen extends Component {
  render() {
    return (
      <div>
        <h1>Hello, welcome to the FinancePeer</h1>
        <Link to="/login">Login</Link>
      </div>
    )
  }
}

export default WelcomeScreen
