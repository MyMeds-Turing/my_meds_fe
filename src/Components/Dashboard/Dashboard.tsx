import React from "react";
import { QueryRx } from '../../interfaces'
import MedReminder from './MedReminder';
import './Dashboard.css';

type MedProps = {
    meds: QueryRx[]
    deleteRX: any
}

const Dashboard: React.FC<MedProps> = ({ meds, deleteRX }) => {
    const userMeds = meds.map(rx => {
        return (
            <MedReminder med={rx} key={rx.id} deleteRX={deleteRX} />
        )
    })
    return (
        <div className="dashboard">
            {userMeds}
        </div>
    )
}
export default Dashboard;

