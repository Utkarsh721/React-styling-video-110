import React, {useContext} from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import classes from './Home.module.css';
import AuthContext from '../../Store/auth-context';

const Home = (props) => {
  const Authctx=useContext(AuthContext)
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={Authctx.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
