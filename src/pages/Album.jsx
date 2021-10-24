import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      favoriteMusics: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.myGetMusics();
    this.byMakingFavorite();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { favoriteMusics } = this.state;
    if (prevState.favoriteMusics !== favoriteMusics) {
      this.getCheckeds();
    }
  }

  byMakingFavorite = async () => {
    this.setState({
      loading: true,
    });
    const getFavorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteMusics: getFavorites,
    });
  };

  myGetMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsObject = await getMusics(id);
    this.setState({
      loading: false,
      musics: musicsObject,
    });
  }

  getCheckeds = () => {
    const { favoriteMusics } = this.state;
    favoriteMusics.forEach(({ trackId }) => {
      const getIDofMusic = document.getElementById(`${trackId}`);
      if (getIDofMusic) {
        getIDofMusic.checked = 'true';
      }
    });
  };

  renderInfo() {
    const { musics } = this.state;
    if (musics.length > 0) {
      const { artworkUrl100 } = musics[0];
      const { artistName } = musics[0];
      const { collectionName } = musics[0];
      return (
        <section>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h4 data-testid="artist-name">{ artistName }</h4>
          <span data-testid="album-name">{ collectionName }</span>
        </section>
      );
    }
  }

  render() {
    const { musics, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        { this.renderInfo() }
        {musics
          .slice(1)
          .map((music, index) => (<MusicCard
            key={ index }
            music={ music }
          />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
