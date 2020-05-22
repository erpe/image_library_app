import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AppHeader from './components/AppHeader'
import Navtabs from './components/Navtabs'
import ImagesCollection from './components/ImagesCollection'
import ImageForm from './components/ImageForm'
import ImageCard from './components/ImageCard'
import Api from './api'
import './index.scss'

class ImageLibrary extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mode: 'loading',
      displayStyle: 'card',
      images: [],
      selectedImage: null,
    }
    this.api = new Api(props.apiUrl, props.client, props.token)
  }

  componentDidMount() {
    this.api.getImages()
      .then((images) => {
        this.setState({
          images: images,
          mode: 'about',
          selectedImage: null,
        })
      })
  }


  onCreateImage = async (values) => {
    values['client'] = this.props.client
    this.api.createImage(values)
      .then((image) => {
        let all = this.state.images
        all = all.concat(image)
        this.setState({
          images: all,
          mode: 'list',
        })
      })
  }

  onUpdateImage = async (values) => {
    this.api.updateImage(this.state.selectedImage.id, values)
      .then((image) => {
        let filtered = this.state.images.filter((img) => img.id !== image.id)
        this.setState({
          images: filtered.concat(image),
          mode: 'list',
        })
      })
  }

  onDeleteImage = async (id) => {
    console.log("ON Delete Image")
    if ( await this.api.destroyImage(id) ) {
      this.setState({
        images: this.state.images.filter((img) => img.id !== id),
        mode: 'list'
      })
    } else {
      console.error("Error deleting image ", id)
    }
  }

  onShowImage = async (img) => {
    this.setState({
      mode: 'showImage',
      selectedImage: img
    })
  }

  onEditImage = async (img) => {
    this.setState({
      mode: 'editImage',
      selectedImage: img
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

    switch(this.state.mode) {
      case 'list':
        renderable =  <div className='list-view'>
                        <h2>Images</h2>
                        <p>Filter | Sort</p>
                        <ImagesCollection
                          onDelete={this.onDeleteImage }
                          images={this.state.images}
                          onShow={this.onShowImage}
                          onEdit={this.onEditImage}
                          displayStyle={this.state.displayStyle}/>
                      </div>
        break
      case 'new':
        renderable =  <div className='new-form'>
                        <h2>Create Image</h2>
                        <ImageForm onSubmit={this.onCreateImage}/>
                      </div>
        break
      case 'about':
        renderable =  <div className='about-view'>
                        <h2>About</h2>
                      </div>
        break
      case 'showImage':
        renderable =  <div className='image-view'>
                        <ImageCard
                          image={this.state.selectedImage}
                          onShow={this.onShowImage}
                          onEdit={this.onEditImage}
                          onDelete={this.onDeleteImage}
                        />
                      </div>
        break
      case 'editImage':
        renderable =  <div className='edit-form'>
                        <h2>Edit Image</h2>
                        <ImageForm
                          image={this.state.selectedImage}
                          onSubmit={this.onUpdateImage}/>
                      </div>
        break
      default:
        renderable = loadingRender
    }

    return (
      <div className='image-library'>
        <div className='container'>
          <AppHeader client={this.props.client} />

          <Navtabs
            onListClick={ () => this.setState({mode: 'list'})}
            onNewClick={() => this.setState({mode: 'new'})}
            onAboutClick={() => this.setState({mode: 'about'})}
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
