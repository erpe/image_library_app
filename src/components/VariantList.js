import React from 'react'
import PropTypes from 'prop-types'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const VariantList = (props) => {

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url)
    toast("url copied to clipboard...")
  }

  const rows = props.variants.map((v, key) => {
    if (v.name !== 'preview') {
      return(
        <tr key={key}>
          <td>{v.id}</td>
          <td>{v.name}</td>
          <td className='text-nowrap'>{v.width}x{v.height}</td>
          <td className='text-nowrap'><a href={v.url} target='_blank' rel='noopener noreferrer'>{v.url}</a></td>
          <td className='text-nowrap text-right'>
            <button className='btn btn-sm btn-outline-info'
              onClick={() => copyUrl(v.url)} >
              Copy 2 Clipboard
            </button>&nbsp;
            <button className='btn btn-sm btn-outline-danger' onClick={() => props.onDeleteVariant(v)}>
              Delete
            </button>
          </td>
        </tr>
      )
    }
    return ""
  })



  if (props.variants.length < 2) {
    return(
      <React.Fragment>
        <p>None available</p>
      </React.Fragment>
    )
  } else {
    return(
      <div className='table-responsive'>
        <table className='table table-dark table-hover table-striped table-sm'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Dimension</th>
              <th>Url</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    )
  }
}

VariantList.propTypes = {
  variants: PropTypes.array.isRequired
}

export default VariantList
