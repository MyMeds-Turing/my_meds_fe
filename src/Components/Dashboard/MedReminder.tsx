import React, { useState } from "react";
import { QueryRx } from '../../interfaces'
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import './MedReminder.css'

type MedProps = {
    med: QueryRx
}

const MedReminder: React.FC<MedProps> = ({ med }) => {
    const [infoHover, setInfoHover] = useState('hidden')

    const nextDose = new Date(med.timeOfNextDose)
    const timeNow = new Date()
    const formatDate = nextDose.toLocaleString('en-US')

    const timeDiff = timeNow.getTime() + (nextDose.getTime() - timeNow.getTime())

    const formatDay = parseInt(formatDate.substring(2, 4)) === timeNow.getDate() ? 'Today' :
        parseInt(formatDate.substring(2, 4)) === (timeNow.getDate() + 1) ? 'Tomorrow' : formatDate.substring(0, 8)

    return (
        <div className="med-box">
            <div className="med-reminder">
                <h3 className="med-name">{med.medName}</h3>
                <p>{med.dose}</p>
                <p>Next Dose: {formatDay} at {formatDate.substring(10)}</p>
                <CountdownTimer targetDate={timeDiff} />
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