import React from 'react';
import { render } from '@testing-library/react';
import ImageLibrary from './ImageLibrary';

test('renders ImageLibary', () => {
  const { getByText } = render(<ImageLibrary  client={'me'} token={'123'} apiUrl={'http://localhost:3000'} />);
  const element = getByText(/ImageLib/i);
  expect(element).toBeInTheDocument();
});
