import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import AppHeader from './components/AppHeader'



class ImageLibrary extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mode: 'loading',
      images: [],
    }
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

    switch(this.state.mode) {
      case 'list':
        renderable = ''
        break
      default:
        renderable = loadingRender

    }
    return (
      <div className='image-library'>
        <div className='container'>
          <AppHeader client={this.props.client} />
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
