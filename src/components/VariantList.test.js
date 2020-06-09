import React from 'react'
import {render}  from '@testing-library/react'
import VariantList from './VariantList'


test('renders VariantList', () => {
  const {getByText} = render(<VariantList variants={[{ name: 'my_variant' }]} />)
  const needle = getByText(/my_variant/)
  expect(needle).toBeInTheDocument()
})
