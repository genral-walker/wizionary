import Player from 'pages/Player';
import Animation from 'pages/Animation';

const App = () => {
  const path = window.location.pathname;

  return (
    <>
      {(path === '/' || path === '/player') && <Player />}
      {path === '/animation' && <Animation />}
    </>
  );
};

export default App;
