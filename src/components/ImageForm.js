import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import {Formik, Form, Field} from 'formik'
import {toBase64} from '../utils'

const ImageForm = (props) => {
  var values

  const fileInput = useRef(null)

  if (props.image) {
    const img = props.image
    values = {
      alt: img.alt,
      category: img.category,
      copyright: img.copyright,
      file: '',
      //client: img.client,
    }
  } else {
    values = {
      alt: '',
      category: '',
      copyright: '',
      file: '',
      //client:
    }
  }


  const onSubmit = async (values) => {
    const file = fileInput.current.files[0]
    const b64 = await toBase64(file)

    // need to split resulting b64 string -
    // cause go won't eat it...
    // result is  "image/jpeg;base64,/9j/4AAQSkZJRg...
    // but needed without prefix "image/jpeg;base64,"
    let arr = b64.split(",")
    if (arr.length > 1) {
      values['data'] = arr[1]
      props.onSubmit(values)
    } else {
      console.error("b64 split failed: ", arr)
    }
  }

  return(
  <Formik
    initialValues={values}
    onSubmit={onSubmit}
  >{ ({errors, touched})  => (
      <Form>
        <div className='form-group'>
          <Field name='alt' className='form-control' placeholder='descriptive name' />
        </div>
        <div className='form-group'>
          <Field name='category' className='form-control' placeholder='category'/>
        </div>
        <div className='form-group'>
          <Field name='copyright' className='form-control' placeholder='copyright'/>
        </div>
        <div className='form-group'>
          <input type='file' className='file' name='file' ref={fileInput} />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </Form>
    )}
  </Formik>
  )
}

ImageForm.propTypes = {
  image: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
}

export default ImageForm
