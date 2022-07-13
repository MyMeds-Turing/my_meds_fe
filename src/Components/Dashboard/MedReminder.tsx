import React from "react";
import { dummyMed } from '../../interfaces'
import './MedReminder.css'

type MedProps = {
    med: dummyMed
}

const MedReminder: React.FC<MedProps> = ({ med }) => {
    return (
        <div className="med-reminder">
            <p>{med.medName}</p>
            <p>{med.dose}</p>
            <p>{med.timeOfNextDose}</p>
            <button>TAKE YOUR MEDS</button>
        </div>
    )
}

export default MedReminder