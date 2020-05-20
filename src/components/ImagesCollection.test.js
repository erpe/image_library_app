import React from 'react'
import { render, asFragment } from '@testing-library/react'
import ImagesCollection from './ImagesCollection'


test('renders ImagesCollection', () => {
  const {asFragment} = render(<ImagesCollection images={[]} displayStyle={'card'} />)
  expect(asFragment()).toMatchSnapshot()
})
