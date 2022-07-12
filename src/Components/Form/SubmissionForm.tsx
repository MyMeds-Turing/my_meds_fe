import React, { ChangeEvent, useState } from "react";
import { Prescription } from '../../interfaces'

type MedProps = {
    chosenMedicine: string
}

const SubmissionForm: React.FC<MedProps> = ({ chosenMedicine }) => {
    const [formData, setFormData] = useState<Prescription>({
        med_name: chosenMedicine,
        timeOfLastDose: '',
        timeOfNextDose: '',
        frequencyInMin: 0,
        totalDoses: 0,
        dosesRemaining: 0,
        dosage: '',
        userInstructions: [],
        doctorInstructions: '',
        icon: ''
    })

    const [frequencyNum, setFrequencyNum] = useState<number>(0)

    const [frequencyUnits, setFrequencyUnits] = useState<string>('hour')

    const handleFrequency = () => {
        let multiplier: number;

        frequencyUnits === 'hour' ? multiplier = 60 :
            frequencyUnits === 'day' ? multiplier = 1440 : multiplier = 10080

        setFormData({
            ...formData,
            frequencyInMin: frequencyNum * multiplier
        })
    }

    const handleCheckBoxes = (instruction: string) => {
        setFormData({
            ...formData,
            userInstructions: [...formData.userInstructions, instruction]
        })
    };

    const handleChange = (field: string, e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [field]: e.target.value })
    }
    console.log(formData)
    return (
        <>
            <div className="frequency-section">
                <label htmlFor="frequency-num">Every</label>
                <input
                    onChange={(e) => setFrequencyNum(parseInt(e.target.value))}
                    className="frequency-num"
                    type='number'
                    placeholder='0'
                    min='0'
                    name='frequency-num'
                    required
                />
                <select name="frequency" className="form-tag"
                    onChange={(e) => setFrequencyUnits(e.target.value)} required>
                    <option value="hours">hours</option>
                    <option value="days">days</option>
                    <option value="weeks">weeks</option>
                </select>

            </div>
            {/* For Dosage Input, we built as text input and did not include total pills/prescription to accomodate for non-pill form (liquids, sprays, etc.), and varying  number of pills/milligram edge cases*/}
            <div className="dosage-section">
                <label htmlFor="dosage-num">Dosage</label>
                <input
                    onChange={(e) => { handleChange('dosage', e) }}
                    className="dosage-num"
                    type='text'
                    placeholder='Ex. 10mg'
                    name='dosage-num'
                    value={formData.dosage} required
                />
                <label htmlFor="doses-remaining">Remaining Doses</label>
                <input
                    onChange={(e) => { handleChange('dosesRemaining', e) }}
                    className="doses-remaining"
                    type='number'
                    placeholder='0'
                    min='0'
                    name='doses-remaining'
                    value={formData.dosesRemaining} required
                />
            </div>
            <div className="user-instructions">
                <label htmlFor="user-instructions">Reminders</label>
                <div className="reminders">
                    <input
                        type="checkbox"
                        id="reminder"
                        name="reminder"
                        value="No Alcohol"
                        onChange={(e) => handleCheckBoxes(e.target.value)} /> No Alcohol
                    <input
                        type="checkbox"
                        id="reminder"
                        name="reminder"
                        value="May Induce Drowziness"
                        onChange={(e) => handleCheckBoxes(e.target.value)} /> May Induce Drowziness
                </div>
            </div>
        </>
    )
}



export default SubmissionForm