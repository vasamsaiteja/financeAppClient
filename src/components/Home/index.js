import {Component} from 'react'
// import ReactFileReader from 'react-file-reader'
import Cookies from 'js-cookie'

class Home extends Component {
  state = {
    postsList: [],
  }

  handleFileChange = async e => {
    const reader = new FileReader()
    reader.readAsText(e.target.files[0])
    reader.onload = () => {
      this.setState(
        {
          postsList: reader.result,
        },
        () => this.postListToDb(),
      )
    }
    reader.onerror = () => {
      console.log('file error', reader.error)
    }
  }

  postListToDb = async () => {
    const {postsList} = this.state

    console.log('postsList inside', postsList)
    const url = 'http://localhost:3000/posts'
    const options = {
      method: 'POST',
      body: JSON.stringify(postsList),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('data', data)
  }

  //   handleFiles = async files => {
  //     const response = await fetch('../../../src/data.json', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       },
  //     })

  //     console.log('res', response)
  //   }

  //   postResponse = async () => {
  //     // reader.result

  //     const url = 'http://localhost:3000/posts'
  //     const options = {
  //       method: 'POST',
  //       body: postList,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //     const response = await fetch(url, options)
  //     // const data = await response.json()
  //     console.log(response)
  //   }

  render() {
    const {postsList} = this.state

    Cookies.remove('jwtToken')

    return (
      <div>
        <h1>Hello, welcome to the HOme page.</h1>
        <input type="file" onChange={this.handleFileChange} />

        {/* <ReactFileReader handleFiles={this.handleFiles} fileTypes={['.json']}>
          <button className="btn" type="button">
            Upload
          </button>
        </ReactFileReader> */}
      </div>
    )
  }
}

export default Home
