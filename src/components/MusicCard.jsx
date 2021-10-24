/**
 * Para a resolução dos requisito 7, 8 e 9 eu consultei a PR do amigo João Paulo Pereira em:
 * https://github.com/tryber/sd-015-b-project-trybetunes/pull/59
 * Para entender que ia precisar usar a fase de atualização do componente(estado) e usar funções para
 * obter as músicas favoritas.
 * Obrigado!!
 */

import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isFavorite: false,
    };
  }

  handleFavoriteStatus = async () => {
    const { music } = this.props;
    const { isFavorite } = this.state;
    this.setState({
      loading: true,
    });
    await addSong(music);
    this.setState({
      loading: false,
      isFavorite: !isFavorite,
    });
  }

  render() {
    const { handleFavoriteStatus } = this;
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { loading, isFavorite } = this.state;
    if (loading) return (<Loading />);
    return (
      <section>
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            checked={ isFavorite }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ handleFavoriteStatus }
          />
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
