import React from 'react'
import { render, asFragment } from '@testing-library/react'
import ImagesCollection from './ImagesCollection'


test('renders ImagesCollection', () => {
  const {asFragment} = render(
    <ImagesCollection
      onDelete={jest.fn}
      onShow={jest.fn}
      onEdit={jest.fn}
      images={[]}
      displayStyle={'card'}
    />)
  expect(asFragment()).toMatchSnapshot()
})
