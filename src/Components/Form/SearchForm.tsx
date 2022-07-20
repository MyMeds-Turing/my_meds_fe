import React, { ReactNode, useEffect, useState } from 'react';
import './SearchForm.css';
import SubmissionForm from './SubmissionForm'

type UserProps = {
  userID: number
  refetch: any
}

const SearchForm: React.FC<UserProps> = ({ userID, refetch }) => {
  console.log(userID)
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
    const userSearchMeds = allMeds.filter(med => med.includes(userInput.toLowerCase()))
    const formattedResults = userSearchMeds.map((userMed) => {
      return <p tabIndex={0} className='form__search-result' key={userMed} onClick={() =>
        handleUserChoice(userMed)} onKeyDown={(event) => handleEnterPress(userMed, event)}
        >{userMed}</p>
    })
    setSearchResults(formattedResults)
  }

  const handleEnterPress = (userChoice:string, e:React.KeyboardEvent<HTMLParagraphElement> ) => {
     if (e.key === 'Enter') {
      setChosenMedicine(userChoice)
      setDisplayResults(false)

    }

  }
  const handleUserChoice = (userChoice: string) => {  
    setChosenMedicine(userChoice)
    setDisplayResults(false)
  }

  return (
    <div className="form-wrapper">
      <div className='form__medicine-lookup'>
        {!showSubmissionForm && <h2 className='search-med'>{chosenMedicine || 'Find My Med'}</h2>}
        {!showSubmissionForm && <div className='search-container'> <label htmlFor="med-input-label">Search Medicine By Name: </label><input type='text' className="med-input-label" placeholder='Medicine Name' 
        onChange={event => displaySearchResults(event.target.value)} /></div>}
      </div>
       {displayResults && <section className='form__live-search-results-box'>{searchResults}</section>}
      {!showSubmissionForm && <button className="continue" onClick={() => setShowSubmissionForm(true)}>Continue</button>}
      {showSubmissionForm && <SubmissionForm chosenMedicine={chosenMedicine} userID={userID} refetch={refetch} />}
    </div>
  );
}

export default SearchForm;
