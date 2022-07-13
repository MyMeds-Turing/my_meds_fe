import React from "react";
import { dummyMed } from '../../interfaces'


type MedProps = {
    med: dummyMed
}

const MedReminder: React.FC<MedProps> = ({ med }) => {
    return (
        <div className="med-reminder" key={med.id}>
            <p>{med.medName}</p>
            <p>{med.dose}</p>
            <p>{med.timeOfNextDose}</p>
        </div>
    )
}

export default MedReminder