import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
    };
  }

  componentDidMount() {
    this.myGetMusics();
  }

  myGetMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsObject = await getMusics(id);
    this.setState({
      musics: musicsObject,
      artistName: musicsObject[0].artistName,
      collectionName: musicsObject[0].collectionName,
      albumImage: musicsObject[0].artworkUrl100,
    });
  }

  render() {
    const { musics, artistName, collectionName, albumImage } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <section>
            <img src={ albumImage } alt={ collectionName } />
            <h3 data-testid="artist-name">{ artistName }</h3>
            <span data-testid="album-name">{ collectionName }</span>
          </section>
          {musics
            .slice(1)
            .map((music, index) => <MusicCard key={ index } music={ music } />)}
        </div>
      </>
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
