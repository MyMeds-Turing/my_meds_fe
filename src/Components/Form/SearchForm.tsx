import React, { ReactNode, useEffect, useState } from 'react';
import './SearchForm.css';
import SubmissionForm from './SubmissionForm'

type UserProps = {
    userID: number
  }

const SearchForm: React.FC<UserProps> =({ userID }) => {
  const [chosenMedicine, setChosenMedicine] = useState<string>('')
  const [allMeds, setAllMeds] = useState<Array<string>>([])
  const [displayResults, setDisplayResults] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<ReactNode[]>([])
  const [showSubmissionForm, setShowSubmissionForm] = useState<boolean>(false)
  
  useEffect(() => {
    fetch('https://rxnav.nlm.nih.gov/REST/displaynames.json')
      .then(response => response.json())
      .then(data => setAllMeds(data.displayTermsList.term))
  }, [])
  
  const displaySearchResults = (userInput: string) => {
    setChosenMedicine('')
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
        <p>{userID}</p>
        <div className='form__medicine-lookup'>
          <h2>{chosenMedicine || 'Search Medicine'}</h2>
          {!showSubmissionForm && <input type='text' placeholder='Medicine Name' onChange={event => displaySearchResults(event.target.value)}/>}
        </div>
        {displayResults && <div className='form__live-search-results-box'>
            {searchResults}
        </div>}
        {!showSubmissionForm && <button onClick={() => setShowSubmissionForm(true)}>Continue</button>}
        {showSubmissionForm && <SubmissionForm chosenMedicine={chosenMedicine}/>}
    </div>
  );
}

export default SearchForm;