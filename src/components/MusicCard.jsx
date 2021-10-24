/**
 * Para a resolução do requisito 7 eu consultei a PR do amigo João Paulo Pereira em:
 * https://github.com/tryber/sd-015-b-project-trybetunes/pull/59
 * Para entender que como mostrar as muśicas recebidas da API.
 * Obrigado!!
 */

import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      // checked: false,
    };
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { loading } = this.state;
    if (loading) return (<Loading />);
    return (
      <section>
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <div>
          <label htmlFor={ trackId }>
            <input
              type="checkbox"
              id={ trackId }
              // checked={ checked }
              data-test-id={ `checkbox-music-${trackId}` }
            />
            Favorita
          </label>
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.string.isRequired,
  }).isRequired,
  // checked: PropTypes.bool.isRequired,
};

export default MusicCard;
