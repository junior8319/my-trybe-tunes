import React from 'react';
import { Redirect } from 'react-router-dom';

class Loading extends React.Component {
  render() {
    return (
      <div>
        <h2>Carregando...</h2>
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Loading;
