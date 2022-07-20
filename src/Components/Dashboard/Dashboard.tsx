import React from "react";
import { QueryRx } from '../../interfaces'
import MedReminder from './MedReminder';
import './Dashboard.css';

type MedProps = {
    meds: QueryRx[]
    deleteRX: any
    refetch: any
    takeRx: any
}

const Dashboard: React.FC<MedProps> = ({ meds, deleteRX, refetch, takeRx }) => {
    const userMeds = meds.map(rx => {
        return (
            <MedReminder med={rx} key={rx.id} deleteRX={deleteRX} refetch={refetch} takeRx={takeRx}/>
        )
    })
    return (
        <div className="dashboard">
            {userMeds}
        </div>
    )
}
export default Dashboard;

