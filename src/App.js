import 'antd/dist/antd.css'
import React from 'react';
import { Provider } from 'react-redux'
import MovieRoute from './movie/MovieRoute';
function App({ ...props }) {
  return (
    <React.Fragment>
      <MovieRoute/>
    </React.Fragment>
  )
}

export default App;
