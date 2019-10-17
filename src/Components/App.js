import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Footer from "./Footer";
import Routes from "./Routes";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
        <>
          <Wrapper>
            <Routes />
            <Footer />
          </Wrapper>
        </>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
