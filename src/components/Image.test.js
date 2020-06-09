import React from 'react'
import {render}  from '@testing-library/react'
import Image from './Image'

test('renders Image', () => {
  const img = {
    alt: "some text",
    copyright: "none",
    width: 100,
    height: 100,
    url: "http://example.com/img/1.jpg",
    variants: [],
  }
  const {getAllByText, getByText} = render(
    <Image
      image={img}
      client={"test"}
      formats={[]}
      onCreateVariant={jest.fn}
      onDeleteVariant={jest.fn}
      onEdit={jest.fn}
      onDelete={jest.fn}
    />)
  const arr = getAllByText(/some text/)
  expect(arr[0]).toBeInTheDocument()
  const needle = getByText(/No Variant available/)
  expect(needle).toBeInTheDocument()
})
