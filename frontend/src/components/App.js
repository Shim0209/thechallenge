import React from 'react';
import GlobalStyles from "components/GlobalStyles";
import Router from 'components/Router';
import { faCheckSquare, faCoffee, fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';
// fontawesome 사용
library.add(fas, fab, faCheckSquare, faCoffee);

function App() {
  return (
    <>
      <Router />
      <GlobalStyles />
    </>
  );
};
export default App;
