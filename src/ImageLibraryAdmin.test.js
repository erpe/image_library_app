import React from 'react';
import { render} from '@testing-library/react';
import ImageLibraryAdmin from './ImageLibraryAdmin';


const config = [{client: "one", formats: [{}]},{}]

test('renders ImageLibaryAdmin', () => {
  const {getByText, getByDisplayValue} = render(
    <ImageLibraryAdmin
      config={config}
      apiUrl={'http://example.com'}
      token={'123456'}/>
  )

  const ele = getByText(/As which client/i)
  expect(ele).toBeInTheDocument
})

