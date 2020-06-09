const imagesUrl = '/api/images'
const variantsUrl = '/api/variants'
const clientsUrl = '/api/clients'

class Api {
  constructor(host, token, client) {
    this.host = host
    this.client = client
    this.token = token
  }

  makeImagesUrl = () => {
    return this.host + imagesUrl
  }

  getClientsUrl = () => {
    return this.host + clientsUrl
  }

  variantsUrl = (id) => {
    return this.host + imagesUrl + "/" + id + "/variants"
  }

  destroyVariantUrl = (id) => {
    return this.host + variantsUrl + "/" + id
  }

  destroyImageUrl = (id) => {
    return this.host + imagesUrl + "/" + id
  }

  updateImageUrl = (id) => {
    return this.host + imagesUrl + "/" + id
  }

  getClients = async () => {
    let res = await fetch(this.getClientsUrl(), {
      headers: {
        'Authorization': 'Bearer ' + this.token
      },
      mode: 'cors'
    })

    try {

      let clientStats = await res.json()
      if (res.ok) {
        return clientStats
      } else {
        throw new Error('Api Error: ', JSON.stringify(clientStats))
      }
    }

    catch (e) {
      console.error(e.message)
      throw new Error('content kein json: ' + e.message)
    }
  }

  getImages = async () => {
    let res = await fetch(this.makeImagesUrl(), {
      headers: {
        'Authorization': 'Bearer ' + this.token
      },
      mode: 'cors'
    })

    try {
      let images = await res.json()
      if (res.ok) {
        return images
      } else {
        throw new Error('Api Error: ' + JSON.stringify(images))
      }
    }

    catch (e) {
      throw new Error('content kein json: ' + e.message)
    }
  }


  createImage = async (values) => {

    let res = await fetch(this.makeImagesUrl(), {
      headers: {
        'Authorization': 'Bearer ' + this.token
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(values)
    })

    try {
      let image = await res.json()
      if (res.ok) {
        return image
      } else {
        throw new Error('Api Error: ' + JSON.stringify(image))
      }
    }

    catch (e) {
      throw new Error('content kein json: ' + e.message)
    }
  }


  updateImage = async (id, values) => {

    let res = await fetch(this.updateImageUrl(id), {
      headers: {
        'Authorization': 'Bearer ' + this.token
      },
      method: 'PATCH',
      mode: 'cors',
      body: JSON.stringify(values)
    })

    try {
      let image = await res.json()
      if (res.ok) {
        return image
      } else {
        throw new Error('Api Error: ' + JSON.stringify(image))
      }
    }

    catch (e) {
      throw new Error('content kein json: ' + e.message)
    }
  }

  destroyImage = async (id) => {
    const url = this.destroyImageUrl(id)
    let res = await fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + this.token
      },
      method: 'DELETE',
      mode: 'cors'
    })

    if (res.status === 204) {
      return true
    } else {
      console.error("RES: ", res)
      throw new Error('Api Error: could not delete image ' + id )
    }
  }

  createVariant = async (image, format) => {
    let res = await fetch(this.variantsUrl(image.id), {
      headers: {
        'Authorization': 'Bearer ' + this.token
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(format)
    })

    try {
      let variant = await res.json()
      if (res.ok) {
        return variant
      } else {
        throw new Error('Api Error: ' + JSON.stringify(variant))
      }
    }

    catch (e) {
      throw new Error('content kein json: ' + e.message)
    }
  }

  destroyVariant = async (id) => {
    const url = this.destroyVariantUrl(id)
    let res = await fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + this.token
      },
      method: 'DELETE',
      mode: 'cors'
    })

    if (res.status === 204) {
      return true
    } else {
      console.error("RES: ", res)
      throw new Error('Api Error: could not delete variant ' + id )
    }
  }
}

export default Api
