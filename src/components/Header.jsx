import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.myGetUser();
  }

  myGetUser = async () => {
    const person = await getUser();
    const { name } = person;
    this.setState({
      userName: name,
      loading: false,
    });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          <h1>TrybeTunes</h1>
          <h3 data-testid="header-user-name">
            { loading ? <Loading /> : userName }
          </h3>
        </div>
        <nav>
          <Link to="/search" data-testid="link-to-search">Busca</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
