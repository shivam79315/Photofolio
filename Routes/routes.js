import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AlbumImages from '../src/components/albumImages/Albumimage'; 
import Albumlist from '../src/components/albumList/Albumlist'; 

const App = () => {
  return (
    <Router>
      <Switch>

        <Route path="/" exact component={Albumlist} />
        <Route path="/:albumName/images" component={AlbumImages} />

      </Switch>
    </Router>
  );
};

export default App;
