import React from 'react'
import PropTypes from 'prop-types'
import {Formik, Form, Field} from 'formik'


const ImageForm = (props) => {
  var values
  if (props.image) {
    const img = props.image
    values = {
      alt: img.alt,
      category: img.category,
      copyright: img.copyright,
      //client: img.client,
    }
  } else {
    values = {
      alt: '',
      category: '',
      copyright: '',
      //client:
    }
  }
  return(
  <Formik
    initialValues={values}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }, 1000)
    }}
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
          <Field type='file' className='file' name='file' />
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
