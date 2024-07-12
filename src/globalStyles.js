import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
  body,
  #root{
    font-family: 'Poppins', 'sans-serif';
    background-color: #181A1E;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
  }

  html {
    font-size: 62.5%;
    // DISBALE TEXT SELECTION ON PAGES
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select:none; 
    user-select:none;
    -o-user-select:none;

    @media (max-width: 800px) {
      font-size: 56.25%;
    }

    @media (max-width: 600px) {
      font-size: 50%;
    }
  }
`;

export default GlobalStyle;
