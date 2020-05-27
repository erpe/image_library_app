import React from 'react'

import {render}  from '@testing-library/react'
import VariantList from './VariantList'


test('renders VariantList', () => {
  const {getByText} = render(<VariantList variants={[]} />)
  const needle = getByText(/None available/)
  expect(needle).toBeInTheDocument()
})
