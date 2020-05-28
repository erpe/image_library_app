import React from 'react'
import {render}  from '@testing-library/react'
import ImageRow from './ImageRow'


test('renders ImageRow', () => {

  const variant = {
    name: 'preview',
    url: 'http://example.com/img.jpg',
    filename: 'img.jpg',
    format: 'jpeg',
    height: 50,
    width: 50,
    id: 1,
    image_id: 1
  }

  const img = {
    id: 1,
    alt: "some text",
    copyright: "none",
    width: 100,
    height: 100,
    url: "http://example.com/img/1.jpg",
    variants: [variant],
  }

  const {getByText} = render(
    <table>
    <tbody>
    <ImageRow
      image={img}
      onShow={jest.fn}
      onEdit={jest.fn}
      onDelete={jest.fn} />
    </tbody>
    </table>
  )

  const ele = getByText(/some text/i)
  expect(ele).toBeInTheDocument()
})
