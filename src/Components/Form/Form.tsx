import React, { ReactComponentElement, ReactNode, useEffect, useState } from 'react';
import './Form.css';

type UserProps = {
    userID: number
  }

const Form: React.FC<UserProps> =({ userID }) => {
  const [chosenMedicine, setChosenMedicine] = useState<string>('')
  const [allMeds, setAllMeds] = useState<Array<string>>([])
  const [displayResults, setDisplayResults] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<ReactNode[]>([])
  
  useEffect(() => {
    fetch('https://rxnav.nlm.nih.gov/REST/displaynames.json')
      .then(response => response.json())
      .then(data => setAllMeds(data.displayTermsList.term))
  }, [])
  
  const displaySearchResults = (userInput: string) => {
    setDisplayResults(true)
      const userSearchMeds = allMeds.filter(med => med.includes(userInput))
      const formattedResults = userSearchMeds.map(userMed => {
        return <p className='form__search-result' key={userMed} onClick={() => handleUserChoice(userMed)}>{userMed}</p>
      })
      setSearchResults(formattedResults)
  }

  const handleUserChoice = (userChoice: string) => {
    setChosenMedicine(userChoice)
    setDisplayResults(false)
  }

  return (
    <div>
        <p>form will be here</p>
        <p>{userID}</p>
        <div className='form__medicine-lookup'>
          <h2>Search Medicine</h2>
          <input type='text' placeholder='Medicine Name' onChange={event => displaySearchResults(event.target.value)}/>
          <button>Submit</button>
        </div>
        {displayResults && <div className='form__live-search-results-box'>
            {searchResults}
        </div>}
        {chosenMedicine && <h2>{chosenMedicine}</h2>}
    </div>
  );
}

export default Form;
