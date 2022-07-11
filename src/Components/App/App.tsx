import React, { useEffect, useState } from 'react';
// import { Route } from 
import './App.css';
import Nav from '../../Components/Nav/Nav'
import { User } from '../../interfaces'
import { user1 } from '../../mockData'
import { Route } from 'react-router-dom'
import SearchForm from '../Form/SearchForm';

const App = () => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    setUser(user1)
  }, [])

  return (

    <div className="App">
      {user ? <Nav name={user.name} /> : <Nav name={'No user found'} />}
      <Route exact path='/add-new'>
        {user ? <SearchForm userID={user.id} /> : <SearchForm userID={0} />}
      </Route>
    </div>
  );
}

export default App;
