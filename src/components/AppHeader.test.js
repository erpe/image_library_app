import React from 'react'
import { render } from '@testing-library/react'
import AppHeader from './AppHeader'


test('renders AppHeader', () => {
  const {getByText } = render(<AppHeader client={'findMe'} />)
  const ele = getByText(/findMe/i)
  expect(ele).toBeInTheDocument()
})

