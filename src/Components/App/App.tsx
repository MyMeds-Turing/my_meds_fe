import React, { useEffect, useState } from 'react';
// import { Route } from 
import './App.css';
import Nav from '../../Components/Nav/Nav'
import { User } from '../../interfaces'
import { user1 } from '../../mockData'
import { dummyUser } from '../../interfaces'
import { dummyMed } from '../../interfaces'
import { Route } from 'react-router-dom'
import SearchForm from '../Form/SearchForm';
import Dashboard from '../Dashboard/Dashboard';
import { GET_USER } from "../../GraphQL/Queries";
import { useQuery } from "@apollo/client";



const App = () => {
  const [user, setUser] = useState<dummyUser>()
  const [meds, setMeds] = useState<dummyMed[]>([])
  const { loading, data } = useQuery(GET_USER)
  console.log(data);

  useEffect(() => {
    if (data) {
      setUser(data.fetchUser);
      setMeds(data.Rxs)
    }
  }, [data]);

  return (
    <div className="App">
      {user ? <Nav name={user.fullName} /> : <Nav name={'No user found'} />}
      <Route exact path='/add-new'>
        {user ? <SearchForm userID={user.id} /> : <SearchForm userID={0} />}
      </Route>
      <Route exact path="/"><Dashboard meds={meds}/></Route>
    </div>
  );
}

export default App;
