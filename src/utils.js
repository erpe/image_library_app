const formatDate = (arg, format) => {

  if (arg) {
    let date = new Date(arg)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let month = date.getMonth()
    month = month +1
    let strTime = hours + ":" + minutes
    let str = date.getDate() + "." + month + "." + date.getFullYear()

    if (format === 'long') {
      str =  str + " " + strTime
    }

    return str

  } else {

    return ""

  }
}

const loadFile = (file) => {
  return new Promise((resolve) => {
    let reader = new FileReader()

    reader.onloadend = () => { resolve(reader.result) }
    reader.readAsArrayBuffer(file)
  })
}


const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = (error) => reject(error)
})

export {formatDate, loadFile, toBase64}
