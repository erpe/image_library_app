import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AppHeader from './components/AppHeader'
import Navtabs from './components/Navtabs'
import ImagesCollection from './components/ImagesCollection'
import ImageForm from './components/ImageForm'
import Image from './components/Image'
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
    this.api = new Api(props.apiUrl, props.token, props.client)
  }

  componentDidMount() {
    this.api.getImages()
      .then((images) => {
        this.setState({
          images: images,
          mode: 'list',
          selectedImage: null,
        })
      })
  }


  componentDidUpdate(prevProps) {
    if (this.props.client !== prevProps.client) {
      this.api = new Api(this.props.apiUrl, this.props.token, this.props.client)
      this.api.getImages()
        .then((images) => {
          this.setState({
            images: images,
            mode: 'list',
            selectedImage: null,
          })
        })
      this.setState({
        //mode: 'list'
      })
    }
  }

  onCreateImage = async (values) => {
    let image = await this.api.createImage(values)
    let preview = await this.api.createVariant(image, {
      width: 150,
      height: 150,
      format: 'jpeg',
      name: 'preview',
      client: 'image_library'
    })
    image.variants = [preview]
    let all = this.state.images
    all = all.concat(image)
    this.setState({
      images: all,
      mode: 'list',
    })
  }


  onCreateVariant = async (format) => {
    const formatForClient = Object.assign({}, format, { client: this.props.client })
    this.api.createVariant(this.state.selectedImage, formatForClient)
      .then((variant) => {
        let toUpdate = this.state.images.find(img => img.id === this.state.selectedImage.id)
        let vars = toUpdate.variants
        vars.push(variant)
        toUpdate.variants = vars
        let filtered = this.state.images.filter(img => img.id !== this.state.selectedImage.id)
        filtered.push(toUpdate)
        this.setState({
          images: filtered,
          selectedImage: toUpdate
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
    if ( await this.api.destroyImage(id) ) {
      this.setState({
        images: this.state.images.filter((img) => img.id !== id),
        mode: 'list'
      })
    } else {
      console.error("Error deleting image ", id)
    }
  }

  onDeleteVariant = async (variant)  => {
    let imgId = variant.image_id
    let image = this.state.images.find((img) => img.id === variant.image_id)
    image.variants = image.variants.filter((v) => v.id !== variant.id)
    let images = this.state.images.filter((img) => img.id !== imgId)
    images.push(image)
    if ( await this.api.destroyVariant(variant.id) ) {
      this.setState({
        images: images,
        selectedImage: image,
        mode: 'showImage',
      })
    } else {
      console.error("Error deleting variant ", variant.id)
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
                        <ImagesCollection
                          onDelete={this.onDeleteImage }
                          images={this.state.images}
                          onShow={this.onShowImage}
                          onEdit={this.onEditImage}
                        />
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
                        <Image
                          image={this.state.selectedImage}
                          client={this.props.client}
                          onShow={this.onShowImage}
                          onEdit={this.onEditImage}
                          onDelete={this.onDeleteImage}
                          formats={this.props.formats}
                          onCreateVariant={this.onCreateVariant}
                          onDeleteVariant={this.onDeleteVariant}
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
      <div className='image-library p-3'>
        <AppHeader client={this.props.client} />

        <Navtabs
          onListClick={ () => this.setState({mode: 'list'})}
          onNewClick={() => this.setState({mode: 'new'})}
          onAboutClick={() => this.setState({mode: 'about'})}
          active={this.state.mode}
        />

        {renderable}
      </div>
    )
  }
}

ImageLibrary.propTypes = {
  client: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
  formats: PropTypes.array.isRequired,
}

export default ImageLibrary;
