import React, {useState} from 'react'
import PropTypes from 'prop-types'
import ImageCard from './ImageCard'
import ImageRow from './ImageRow'

const ImagesCollection = (props) => {

  const [images, setImages] = useState(props.images)
  const [category, setCategory] = useState(null)
  const [displayStyle, setDisplayStyle] = useState('card')
  const [sort, setSort] = useState('reset')

  let renderable
  let style

  const categories = [...new Set(props.images.map((img) => img.category))]

  const filterCategory = (category) => {
    setSort('reset')
    if (category === 'reset') {
      setCategory(null)
      setImages(props.images)
    } else {
      setCategory(category)
      setImages(props.images.filter((img) =>  img.category === category))
    }
  }

  const sortBy = (attribut) => {
    if (attribut === 'reset') {
      setSort('reset')
    } else {
      setSort(attribut)
      let sortedImages = images.sort((a,b) => {
        return a[attribut].localeCompare(b[attribut])
      })

      setImages(sortedImages)
    }
  }

  const toggleDisplayStyle = () => {
    setDisplayStyle( (displayStyle === 'card') ? 'table' : 'card')
  }

  if (displayStyle === 'card') {
    style = 'card-columns'
    renderable = images.map((img, key) => {
      return (
        <ImageCard
          version={'preview'}
          image={img}
          key={key}
          onDelete={props.onDelete}
          onEdit={props.onEdit}
          onShow={props.onShow}/>
      )
    })
  }

  const tableRows = () => {
    let tableRender = images.map((img, key) => {
      return(
       <ImageRow
          key={key}
          image={img}
          onShow={props.onShow}
          onEdit={props.onEdit}
          onDelete={props.onDelete} />
      )
    })
    return tableRender
  }

  if (displayStyle === 'table') {
    style = 'table-responsive'
    renderable = (
      <table className='table table-dark table-sm table-hover table-striped'>
        <thead>
          <tr>
            <th>Thumb</th>
            <th>#</th>
            <th>Category</th>
            <th>Alt</th>
            <th>Copyright</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableRows()}
        </tbody>
      </table>
    )
  }

  const categoryOptions = () => {
    return categories.sort().map((cat) => <option value={cat}>{cat}</option>)
  }

  return(
    <div>
      <div className='form-inline mb-3'>

        <button onClick={() => toggleDisplayStyle()}
                className='btn btn-sm btn-outline-light mr-3'>
          List as {displayStyle === 'card' ? 'table' : 'cards'}
        </button>

        <label htmlFor='category' className='label mr-1'>
          Filter by
        </label>

        <select
          className='form-control form-control-sm bg-dark text-light mr-3'
          name='category'
          onChange={(evt) => filterCategory(evt.target.value)}
        >
          <option value='reset'> -- Select Category --</option>
          {categoryOptions()}
        </select>

        <label htmlFor='sort' className='mr-1'>Sort by</label>
        <select className='form-control form-control-sm bg-dark text-light'
          onChange={(evt) => sortBy(evt.target.value)}
          value={sort}
        >
          <option value='reset' >-- Select Sort --</option>
          <option value='alt'>Alt</option>
          <option value='category'>Category</option>
          <option value='copyright'>Copyright</option>
        </select>
      </div>
      <div className={style}>
        {renderable}
      </div>
    </div>
  )
}

ImagesCollection.propTypes = {
  images: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default ImagesCollection
