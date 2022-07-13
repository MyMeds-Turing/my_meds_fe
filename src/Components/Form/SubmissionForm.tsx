import React, { ChangeEvent, useState } from "react";
import Graphic from "../Graphic/Graphic";
import { Prescription } from '../../interfaces'
import './SubmissionForm.css'

type MedProps = {
    chosenMedicine: string
}

const SubmissionForm: React.FC<MedProps> = ({ chosenMedicine }) => {
    const [formData, setFormData] = useState<Prescription>({
        id: 0,
        medName: chosenMedicine,
        timeOfLastDose: '',
        timeOfNextDose: '',
        frequencyInMin: 0,
        totalDoses: 0,
        dosesRemaining: 0,
        dose: '',
        userInstructions: [],
        additionalInstructions: '',
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
        if (!formData.userInstructions.includes(instruction)) {
            setFormData({
                ...formData,
                userInstructions: [...formData.userInstructions, instruction]
            })
        } else {
            setFormData({
                ...formData,
                userInstructions: formData.userInstructions.filter(ins => ins !== instruction)
            })
        }
    };

    const handleChange = (field: string, userInput: string | number) => {
        setFormData({ ...formData, [field]: userInput })
    }

    console.log(formData)

    return (
        <div className='form-inputs'>
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
                    <option value="hour">hours</option>
                    <option value="day">days</option>
                    <option value="week">weeks</option>
                </select>

            </div>
            <div className="dosage-section">
                <label htmlFor="dosage-num">Dosage: </label>
                <input
                    onChange={(event) => { handleChange('dose', event.target.value) }}
                    className="dosage-num"
                    type='text'
                    placeholder='Ex. 10mg'
                    name='dosage-num'
                    value={formData.dose} required
                />
                <br />
                <label htmlFor="doses-remaining">Remaining Doses: </label>
                <input
                    onChange={(event) => { handleChange('dosesRemaining', parseInt(event.target.value)) }}
                    className="doses-remaining"
                    type='number'
                    placeholder='0'
                    min='0'
                    name='doses-remaining'
                    value={formData.dosesRemaining} required
                />
                <br />
                <label htmlFor="doses-total">Total Doses: </label>
                <input
                    onChange={(event) => { handleChange('totalDoses', parseInt(event.target.value)) }}
                    className="doses-total"
                    type='number'
                    placeholder='0'
                    min='0'
                    name='doses-total'
                    value={formData.totalDoses} required
                />
            </div>
            <div className="user-instructions">
                <label htmlFor="user-instructions">Reminders</label>
                <div className="reminders">
                    <input
                        type="checkbox"
                        name="reminder"
                        value="No Alcohol"
                        onChange={(e) => handleCheckBoxes(e.target.value)} /> No Alcohol
                    <br />
                    <input
                        type="checkbox"
                        name="reminder"
                        value="May Induce Drowziness"
                        onChange={(e) => handleCheckBoxes(e.target.value)} /> May Induce Drowziness
                    <br />
                    <input
                        type="checkbox"
                        name="reminder"
                        value="Take With Food"
                        onChange={(e) => handleCheckBoxes(e.target.value)} /> Take With Food
                    <br />
                    <input
                        type="checkbox"
                        name="reminder"
                        value="No Heavy Machinery"
                        onChange={(e) => handleCheckBoxes(e.target.value)} /> No Heavy Machinery
                    <br />
                    <input
                        type="checkbox"
                        name="reminder"
                        value="Take in the Morning"
                        onChange={(e) => handleCheckBoxes(e.target.value)} /> Take in the Morning
                    <br />
                    <p>Additional Instructions:</p>
                    <input
                        type="text"
                        id="reminder"
                        name="reminder"
                        onChange={(event) => handleChange('additionalInstructions', event.target.value)} />
                    <br />
                    <div className="icon-selector">
                        <label htmlFor="icon">Choose an icon</label>
                        <br />
                        <input
                            type="radio"
                            id="icon"
                            name="icon"
                            value="capsule"
                            onChange={(event) => handleChange('icon', event.target.value)} />
                        <Graphic tag={'capsule'} />
                        <input
                            type="radio"
                            id="icon"
                            name="icon"
                            value="roundPill"
                            onChange={(event) => handleChange('icon', event.target.value)} />
                        <Graphic tag={'roundPill'} />
                    </div>
                    <br />
                </div>
            </div>
            <button onClick={() => handleFrequency()}>Submit</button>
        </div>
    )
}



export default SubmissionForm