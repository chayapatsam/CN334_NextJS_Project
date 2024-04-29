import { render } from '@testing-library/react';
import Home from '@pages/index.js';

describe('Home Page', () => {
  it('should render without crashing', () => {
    render(<Home />);
  });

  it('should render correct title', () => {
    const { queryByTitle } = render(<Home />);
    const titleElement = queryByTitle(/Home | Leafy/i);
    expect(titleElement).toBeNull();
  });  

  it('should render logo image', () => {
    const { queryByAltText } = render(<Home />);
    const logoImage = queryByAltText(/logo/i);
    expect(logoImage).not.toBeNull();
  });

  it('should render beauty of nature text', () => {
    const { queryByText } = render(<Home />);
    const beautyOfNatureText = queryByText(/Beauty of nature/i);
    expect(beautyOfNatureText).not.toBeNull();
  });

  it('should render decorate your home text', () => {
    const { queryByText } = render(<Home />);
    const decorateYourHomeText = queryByText(/Decorate your home/i);
    expect(decorateYourHomeText).not.toBeNull();
  });
});
