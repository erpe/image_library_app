import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ImageLibrary from './ImageLibrary'
import Api from './api'

class ImageLibraryAdmin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clientStats: [],

      clients: props.config.map((cfg) => cfg.client),
      selectedClient: null,
      // config contains client => formats => width, height, format, name
      config: props.config,
      activeFormats: [],
    }
  }

  // FIXME: is :config or :clientStats single point of truth

  componentDidMount() {
    const api = new Api(this.props.apiUrl, this.props.token, null)
    api.getClients()
      .then((clientStats) => {
        this.setState({
          selectedClient: null,
          // clientStats contains: client => images.count
          clientStats: clientStats,
          //clients: clientStats.map((cl) => cl.client)
        })
      })
  }

  onSelectClient = (client) => {
    this.setState({
      selectedClient: client,
      activeFormats: this.state.config.find((fe) => fe.client === client).formats,
    })
  }

  // only render ImageLib if client is selected
  //
  imageLibRender = () => {
    if (this.state.selectedClient) {
      return(
      <ImageLibrary
          formats={this.state.activeFormats}
          client={this.state.selectedClient}
          token={this.props.token}
          apiUrl={this.props.apiUrl}
        />
      )
    }
  }

  render() {

    const clientOptions = this.state.clients.map((cl,k) => {
      return <option key={k} value={cl}>{cl}</option>
    })

    return(
      <div className='image-library-admin'>
        <div className='form-group p-3'>
          <label className='label'>What client you want?</label>
          <select
            name='client'
            onChange={(evt) => this.onSelectClient(evt.target.value)}
            className='form-control'
          >
            <option>-- Select client --</option>
            {clientOptions}
          </select>
        </div>

        {this.imageLibRender()}

      </div>
    )

  }
}

ImageLibraryAdmin.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  config: PropTypes.array.isRequired,
}

export default ImageLibraryAdmin

