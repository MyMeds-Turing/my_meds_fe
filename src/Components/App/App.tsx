import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from '../../Components/Nav/Nav'
import { User } from '../../interfaces'
import { QueryRx } from '../../interfaces'
import { Route } from 'react-router-dom'
import SearchForm from '../Form/SearchForm';
import Dashboard from '../Dashboard/Dashboard';
import { GET_USER } from "../../GraphQL/Queries";
import { useQuery } from "@apollo/client";



const App = () => {
  const [user, setUser] = useState<User>()
  const [meds, setMeds] = useState<QueryRx[]>([])
  const { loading, error, data } = useQuery(GET_USER)

  useEffect(() => {
    if (data) {
      setUser(data.fetchUser);
      setMeds(data.fetchUserRxs)
    }
    console.log(data)
  }, [data]);

  if (loading) {
    return <h1>LOADING...</h1>
  }

  if (error) {
    console.log(error)
    return <h1>SOMETHING WENT WRONG...</h1>
  }

  return (
    <div className="App">
      {user ? <Nav name={user.fullName} /> : <Nav name={'No user found'} />}
      <Route exact path='/add-new'>
        {user ? <SearchForm userID={meds[0].userId} /> : <SearchForm userID={0} />}
      </Route>
      <Route exact path="/"><Dashboard meds={meds} /></Route>
    </div>
  );
}

export default App;
