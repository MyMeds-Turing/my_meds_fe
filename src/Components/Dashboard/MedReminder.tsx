import React, { useState } from "react";
import { dummyMed } from '../../interfaces'
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import './MedReminder.css'

type MedProps = {
    med: dummyMed
}

const MedReminder: React.FC<MedProps> = ({ med }) => {
    const [infoHover, setInfoHover] = useState('hidden')
    const EXPIRATION = 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();
    
    const timer = NOW_IN_MS + EXPIRATION;
    
    const date = new Date(med.timeOfNextDose)
    const date2 = new Date()
    const formatDate = date.toLocaleString('en-US')
    console.log(formatDate);

    const formatDay = parseInt(formatDate.substring(2,4)) === date2.getDate() ? 'Today' :
    parseInt(formatDate.substring(2,4)) === (date2.getDate() + 1) ? 'Tomorrow' : formatDate.substring(0,8)

    return (
        <div className="med-box">
            <div className="med-reminder">
                <h3 className="med-name">{med.medName}</h3>
                <p>{med.dose}</p>
                <p>Next Dose: {formatDay} at {formatDate.substring(10)}</p>
                <CountdownTimer targetDate={timer}/>
                <div className="med-button-info-box">
                <button className="navButton">TAKE YOUR MEDS</button>
                <p className="med-info-hover" onMouseEnter={() => setInfoHover('')} onMouseLeave={() => setInfoHover('hidden')}>ℹ️</p>
                </div>
            </div>
            <div className={`med-info-box ${infoHover}`}>
                    <p>{med.userInstructions}</p>
                    <p>{med.additionalInstructions}</p>    
                    <p>Remaining Doses: {med.dosesRemaining}</p>    
            </div>
        </div>
    )
}

export default MedReminder