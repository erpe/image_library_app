import React from 'react';
import { render } from '@testing-library/react';
import ImageLibrary from './ImageLibrary';

test('renders ImageLibary', () => {
  const { getByText } = render(<ImageLibary />);
  const element = getByText(/ImageLib/i);
  expect(element).toBeInTheDocument();
});
