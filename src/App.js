import { createGlobalStyle } from 'styled-components';


import { AppContextWrapper } from './contexts/app';
import { ThemeContextWrapper } from './contexts/theme';

import Home from './components/Home';

const BaseStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Barlow Semi Condensed', sans-serif;
    margin: 0;
    padding: 0;
  }
  
  img {
    display: block;
    max-width: 100%;
    object-fit: cover;
  }
`;

const App = () => {

  return (
    <AppContextWrapper>
      <ThemeContextWrapper>
          <BaseStyles />

          <Home />
      </ThemeContextWrapper>
    </AppContextWrapper>
  );
}

export default App;
