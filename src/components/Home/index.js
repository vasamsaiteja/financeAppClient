import {Component} from 'react'
// import ReactFileReader from 'react-file-reader'
import Cookies from 'js-cookie'
import Posts from '../Posts'

import './index.css'

class Home extends Component {
  state = {
    postsList: [],
    isLoading: false,
    showPost: false,
    dbPostList: [],
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const getPostsList = await res.json()
    console.log('check', getPostsList)
    this.setState({
      postsList: getPostsList,
    })
  }

  handleFileChange = async e => {
    const reader = new FileReader()
    reader.readAsText(e.target.files[0])
    reader.onload = () => {
      this.setState({
        dbPostList: reader.result,
      })
    }
    reader.onerror = () => {
      console.log('file error', reader.error)
    }
    this.setState({
      showPost: true,
    })
  }

  postListToDb = async () => {
    const {dbPostList} = this.state

    const url = 'https://vassam-sai-financepeer.herokuapp.com/posts'
    const options = {
      method: 'POST',
      body: dbPostList,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('data', data)
  }

  render() {
    const {postsList, showPost} = this.state

    console.log('postsList inside', postsList)
    Cookies.remove('jwtToken')
    return (
      <div>
        <div className="main-container">
          <h1 className="main-heading">FinancePeer Home</h1>
        </div>
        {showPost ? (
          <ul>
            {postsList &&
              postsList.map(each => (
                <li className="post-container" key={each.title}>
                  <h1 className="heading">{each.title}</h1>
                  <img
                    className="image"
                    src="https://banner2.cleanpng.com/20180605/wzl/kisspng-computer-icons-image-file-formats-no-image-5b16ff0d4b81e2.4246835515282337413093.jpg"
                    alt="post"
                  />
                  <p>{each.body}</p>
                </li>
              ))}
          </ul>
        ) : (
          <div className="post-container">
            <h1 className="main-heading title">
              Hello, welcome to the Home page.
            </h1>
            <input type="file" onChange={this.handleFileChange} />
          </div>
        )}
      </div>
    )
  }
}

export default Home
