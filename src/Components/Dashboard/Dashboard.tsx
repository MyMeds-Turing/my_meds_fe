import React from "react";
import { dummyMed } from '../../interfaces'
import MedReminder from './MedReminder';
import './Dashboard.css';

type MedProps = {
    meds: dummyMed[]
}

const Dashboard: React.FC<MedProps> = ({ meds }) => {
    const userMeds = meds.map(rx => {
        return (
            <MedReminder med={rx} key={rx.id} />
        )
    })
    return (
        <div className="dashboard">
            {userMeds}
        </div>
    )
}
export default Dashboard;

