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
}

export default Api
