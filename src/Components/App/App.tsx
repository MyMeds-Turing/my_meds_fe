import { useEffect, useState } from 'react';
import './App.css';
import Nav from '../../Components/Nav/Nav'
import { User } from '../../interfaces'
import { QueryRx } from '../../interfaces'
import { Route } from 'react-router-dom'
import SearchForm from '../Form/SearchForm';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import { GET_ALL_USERS, GET_USER } from "../../GraphQL/Queries";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_RX, TAKE_RX } from '../../GraphQL/Mutations'
// export {ID}
// let ID = 0

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User>()
  const [meds, setMeds] = useState<QueryRx[]>([])
  const { loading, error, data, refetch } = useQuery(GET_USER)

  const [deleteMed] = useMutation(DELETE_RX)
  const [takeMed] = useMutation(TAKE_RX)

  useEffect(() => {
    /// change this to be based on what credentials were inputed (if correct)
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

  const takeRx = (id: string) => {
    console.log(id);
    takeMed({
      variables: {
        ID: {
          id: id
        }
      }
    })
  }

  const deleteRX = (id: number) => {
    deleteMed({
      variables: {
        ID: {
          "id": id
        }
      }
    })
  }

  return (
    <main className="App">
      {!isLoggedIn ? <Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} /> : 
        <div>
      {user ? <Nav name={user.fullName} /> : <Nav name={'No user found'} />}
      <Route exact path='/add-new'>
        {user && <SearchForm userID={(user.id)} refetch={refetch} />}
      </Route>
      <Route exact path="/">
        {meds.length ? <Dashboard meds={meds} deleteRX={deleteRX} takeRx={takeRx} refetch={refetch} /> :
          <h1>Click on Add Meds Button to get started!</h1>}
      </Route>
      </div>
      }
    </main>
  );
}


export default App;
