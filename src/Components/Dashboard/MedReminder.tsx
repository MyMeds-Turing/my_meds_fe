import React from "react";
import { dummyMed } from '../../interfaces'
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import './MedReminder.css'

type MedProps = {
    med: dummyMed
}

const MedReminder: React.FC<MedProps> = ({ med }) => {
    console.log(med.timeOfNextDose);
    const EXPIRATION = 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();
  
    const timer = NOW_IN_MS + EXPIRATION;
    
    const date = new Date(med.timeOfNextDose)
    const date2 = new Date()
    const formatDate = date.toLocaleString('en-US')

    
    const formatDay = parseInt(formatDate.substring(2,4)) === date2.getDate() ? 'Today' :
    parseInt(formatDate.substring(2,4)) === (date2.getDate() + 1) ? 'Tomorrow' : formatDate.substring(0,8)

    return (
        <div className="med-reminder">
            <p>{med.medName}</p>
            <p>{med.dose}</p>
            <p>{formatDay} at {formatDate.substring(10)}</p>
            <CountdownTimer targetDate={timer}/>
            <button>TAKE YOUR MEDS</button>
        </div>
    )
}

export default MedReminder