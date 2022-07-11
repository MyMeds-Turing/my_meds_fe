import React, { useEffect, useState } from 'react';
import './Form.css';

type UserProps = {
    userID: number
  }

const Form: React.FC<UserProps> =({ userID }) => {
  const [medicine, setMedicine] = useState('')
  const [allMeds, setAllMeds] = useState<Array<string>>([])
  



  useEffect(() => {
    fetch('https://rxnav.nlm.nih.gov/REST/displaynames.json')
      .then(response => response.json())
      .then(data => console.log(data))   
  }, [])

  return (
    <div>
        <p>form will be here</p>
        <p>{userID}</p>
    </div>
  );
}

export default Form;
