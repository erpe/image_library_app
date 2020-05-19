import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AppHeader from './components/AppHeader'
import Navtabs from './components/Navtabs'
import Api from './api'
import './index.scss'

class ImageLibrary extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mode: 'loading',
      images: [],
    }
    this.api = new Api(props.apiUrl, props.client, props.token)
  }

  componentDidMount() {
    this.api.getImages()
      .then((images) => {
        this.setState({
          images: images,
          mode: 'about'
        })
      })
  }

  listClick = () => {
    this.setState({
      mode: 'list'
    })
  }

  newClick = () => {
    this.setState({
      mode: 'new'
    })
  }

  aboutClick = () => {
    this.setState({
      mode: 'about'
    })
  }

  render() {
    let renderable

    const loadingRender = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )

    const formRender = (
      <div className='new-form'>
        <h2>Create Image</h2>
      </div>
    )

    const listRender = (
      <div className='list-view'>
        <h2>Images</h2>
      </div>
    )


    const aboutRender = (
      <div className='about-view'>
        <h2>About</h2>
      </div>
    )

    switch(this.state.mode) {
      case 'list':
        renderable = listRender
        break
      case 'new':
        renderable = formRender
        break
      case 'about':
        renderable = aboutRender
        break
      default:
        renderable = loadingRender
    }

    return (
      <div className='image-library'>
        <div className='container'>
          <AppHeader client={this.props.client} />

          <Navtabs
            onListClick={this.listClick}
            onNewClick={this.newClick}
            onAboutClick={this.aboutClick}
            active={this.state.mode}
          />

          {renderable}
        </div>
      </div>
    )
  }
}

ImageLibrary.propTypes = {
  client: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
}

export default ImageLibrary;
