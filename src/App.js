import React from 'react';

import Boggle from './modules/boggle-react'

// window.onbeforeunload = function() {
//   return "the Game will be ended if you leave this page, are you sure?";
// }

class App extends React.Component {

  render() {
    return (
      <Boggle />
    )
  }
}

export default App