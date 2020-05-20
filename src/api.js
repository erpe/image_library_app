const imagesUrl = '/api/images'
//const variantsUrl = '/api/variants'



class Api {
  constructor(host, client, token) {
    this.host = host
    this.client = client
    this.token = token
  }

  makeImagesUrl = () => {
    return this.host + imagesUrl + '?client=' + this.client
  }

  destroyImageUrl = (id) => {
    return this.host + imagesUrl + "/" + id
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
}

export default Api
