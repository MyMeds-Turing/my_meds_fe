import React, { useState } from "react";
import { QueryRx } from '../../interfaces'
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import './MedReminder.css'
import warningSign from '../../Assets/icons/warningSign.png'
import Graphic from '../Graphic/Graphic'

type MedProps = {
    med: QueryRx,
    deleteRX: any
    refetch: any
    takeRx: any
}

const MedReminder: React.FC<MedProps> = ({ med, deleteRX, refetch, takeRx }) => {
    const [infoHover, setInfoHover] = useState('hidden')
    const [refillHover, setRefillHover] = useState('hidden')
    const [modal, setModal] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(false)

    const showWarning = med.dosesRemaining > (med.totalDoses * .1) ? 'hidden' : ""

    const nextDose = new Date(med.timeOfNextDose)
    const timeNow = new Date()
    const formatDate = nextDose.toLocaleString('en-US')

    const timeDiff = timeNow.getTime() + (nextDose.getTime() - timeNow.getTime())

    const formatDay = parseInt(formatDate.substring(2, 4)) === timeNow.getDate() ? 'Today' :
        parseInt(formatDate.substring(2, 4)) === (timeNow.getDate() + 1) ? 'Tomorrow' : formatDate.substring(0, 9)

    return (
        <div className="med-box">
            <div className="med-reminder">
                <div className="med-name-container">
                    <Graphic tag={med.icon} />
                    <h3 className="med-name">{med.dose} of {med.medName}</h3>

                    <img className={`warning-icon ${showWarning}`} src={warningSign} onMouseEnter={() => setRefillHover('')} onMouseLeave={() => setRefillHover('hidden')} />
                </div>
                <p className="next-dose">Next Dose: {formatDay} at {formatDate.substring(10)}</p>
                <div className="reminder-icons">
                </div>
                <CountdownTimer targetDate={timeDiff} />
                <div className="med-button-info-box">
                    <button className="navButton" disabled={med.dosesRemaining < 1 ? true : false} onClick={() => takeRx(med.id)}>TAKE YOUR MEDS</button>
                    <button className='navButton delete-rx' onClick={() => setConfirmationModal(true)}>DELETE</button>
                    <p className="med-info-hover" onMouseEnter={() => setInfoHover('')} onMouseLeave={() => setInfoHover('hidden')}>ℹ️</p>
                </div>
            </div>
            <div className={`med-info-box ${infoHover}`}>
                <p>{med.userInstructions}</p>
                <p>{med.additionalInstructions}</p>
                <p>Remaining Doses: {med.dosesRemaining}</p>
            </div>
            <div className={`med-info-box refill ${refillHover}`}>
                <p>{`You have ${med.dosesRemaining} doses remaining.`}</p> 
                <p> {`Please consider refilling your medicine.`}</p>
            </div>
            {modal && <div className="modal" onClick={() => setModal(false)}>
                <div className="modal-confirm">
                    <h4>{med.medName} has been successfully deleted!</h4>
                    <button className="navButton" onClick={() => refetch()}>Continue</button>
                </div>
            </div>}
            {confirmationModal && <div className="modal" onClick={() => setModal(false)}>
                <div className="modal-confirm">
                    <h4>Are you sure you want to remove {med.medName}?</h4>
                    <div className="button-container">
                    <button className="navButton" onClick={() => {
                        setConfirmationModal(false)
                    }}>No, Take Me Home</button>
                    <button className="navButton" onClick={() => {
                        deleteRX(med.id)
                        refetch()
                        setConfirmationModal(false)
                    }}>Yes, Delete My Med</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default MedReminder