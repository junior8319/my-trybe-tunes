/**
 * Para a resolução do requisito 6 eu consultei a PR do amigo João Paulo Pereira em:
 * https://github.com/tryber/sd-015-b-project-trybetunes/pull/59
 * Para entender que era necessário usar o estado individual do componente e também usar callbacks para que
 * eventos pudessem desencadear funções na sequência umas das outras
 * Também foi grande a ajuda de colegas nas mentorias, como:
 * Mayara Andronico, Lucas Pinheiro, Gabriel Alves e Alessandro Fuhr
 * Além da grande ajuda de Isaac Batista e André Horman
 * Obrigado!!!
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabledSearchButton: true,
      lastSearch: '',
      artistName: '',
      albums: [],
    };
  }

  onEnterArtistName = ({ target }) => {
    const { value } = target;
    this.setState({
      artistName: value,
    }, this.enableSearchButton);
  };

  enableSearchButton = () => {
    const minimumNumberOfCharacters = 2;
    const { artistName } = this.state;
    const enable = artistName.length >= minimumNumberOfCharacters;
    this.setState({
      isDisabledSearchButton: !enable,
      lastSearch: artistName,
    });
  };

  searchAlbumsFromArtist = async (event) => {
    const { artistName, lastSearch } = this.state;
    event.preventDefault();
    const receivedAlbums = await searchAlbumsAPI(artistName);
    this.setState({
      albums: [...receivedAlbums],
      artistName: lastSearch,
      lastSearch: '',
    }, this.listAlbums);
  };

  listAlbums = () => {
    const { albums, artistName } = this.state;
    if (albums.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return (
      <section>
        <h3>{`Resultado de álbuns de: ${artistName}`}</h3>
        {albums.map((album) => (
          <div key={ album.collectionId }>
            <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            <h3>{ album.collectionName }</h3>
            <p>{ album.collectionPrice }</p>
            <p>{ album.trackCount }</p>
            <p>{ album.releaseDate }</p>
            <Link
              key={ album.collectionId }
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `/album/${album.collectionId}` }
            >
              Veja
            </Link>
          </div>
        ))}
      </section>
    );
  }

  render() {
    const { searchAlbumsFromArtist, onEnterArtistName, listAlbums } = this;
    const { isDisabledSearchButton, lastSearch } = this.state;
    return (
      <>
        <div data-testid="page-search">
          <Header />
          <h1>Busca</h1>
        </div>
        <div>
          <form>
            <label htmlFor="search-artist-input">
              Artista:
              <input
                data-testid="search-artist-input"
                type="text"
                value={ lastSearch }
                onChange={ onEnterArtistName }
              />
            </label>
            <button
              data-testid="search-artist-button"
              disabled={ isDisabledSearchButton }
              type="submit"
              onClick={ searchAlbumsFromArtist }
            >
              Pesquisar
            </button>
          </form>
          { listAlbums() }
        </div>
      </>
    );
  }
}

export default Search;
