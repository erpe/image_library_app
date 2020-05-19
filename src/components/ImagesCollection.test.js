import React from 'react'
import { render } from '@testing-library/react'
import ImagesCollection from './ImagesCollection'


test('renders ImagesCollection', () => {
  const {getByText} = render(<ImagesCollection images={[]} displayStyle={'card'} />)
  const ele = getByText(/Filter/)
  expect(ele).toBeInTheDocument()
})
