import React from 'react'
import PropTypes from 'prop-types'


const VariantList = (props) => {

  const rows = props.variants.map((v, key) => {
    if (v.name !== 'preview') {
      return(
        <tr key={key}>
          <td>{v.id}</td>
          <td>{v.name}</td>
          <td>{v.width}x{v.height}</td>
          <td>{v.url}</td>
          <td>
            <button className='btn btn-sm btn-danger' onClick={() => props.onDeleteVariant(v)}>
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
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}

VariantList.propTypes = {
  variants: PropTypes.array.isRequired
}

export default VariantList
