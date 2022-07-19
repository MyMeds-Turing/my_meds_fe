import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from '../../Components/Nav/Nav'
import { User } from '../../interfaces'
import { QueryRx } from '../../interfaces'
import { Route } from 'react-router-dom'
import SearchForm from '../Form/SearchForm';
import Dashboard from '../Dashboard/Dashboard';
import { GET_USER } from "../../GraphQL/Queries";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_RX } from '../../GraphQL/Mutations'



const App = () => {
  const [user, setUser] = useState<User>()
  const [meds, setMeds] = useState<QueryRx[]>([])
  const { loading, error, data, refetch } = useQuery(GET_USER)
  const [deleteMed] = useMutation(DELETE_RX)


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


  const deleteRX = (ID: number) => {
    console.log(ID)
    deleteMed({
      variables: {

        id: ID
      }
    })

  }

  return (
    <div className="App">
      {user ? <Nav name={user.fullName} /> : <Nav name={'No user found'} />}
      <Route exact path='/add-new'>
        {user ? <SearchForm userID={meds[0].userId} refetch={refetch} /> : <SearchForm userID={0} refetch={refetch} />}
      </Route>
      <Route exact path="/"><Dashboard meds={meds} deleteRX={deleteRX} /></Route>
    </div>
  );
}

export default App;
