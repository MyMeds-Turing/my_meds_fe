import React from 'react';
import './Form.css';

type userProps = {
    userID: string
  }

const Form: React.FC<userProps> =({ userID }) => {


  return (
    <div>
        <p>form will be here</p>
        <p>{userID}</p>
    </div>
  );
}

export default Form;
