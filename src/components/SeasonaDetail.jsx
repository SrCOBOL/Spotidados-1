//Aqui eu consigo os detalhes em lista das musicas e artistas

import React from 'react';

const SeasonalDetail = ({ filters }) => {
  const data = {
    verão: [{ musica: 'Música 1', artista: 'Artista 1' }],
    inverno: [{ musica: 'Música 2', artista: 'Artista 2' }],
    outono: [{ musica: 'Música 3', artista: 'Artista 3' }],
    primavera: [{ musica: 'Música 4', artista: 'Artista 4' }],
  };

  if (!filters.estacao) return null;

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <h4>Detalhes de {filters.estacao}</h4>
      <ul>
        {data[filters.estacao.toLowerCase()].map((item, index) => (
          <li key={index}>
            {item.musica} - {item.artista}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeasonalDetail;