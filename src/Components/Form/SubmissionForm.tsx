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
                    <div className="reminder-icon-section">
                    <input
                        type="checkbox"
                        name="reminder"
                        value="no_alcohol"
                        onChange={(e) => handleCheckBoxes(e.target.value)} /> <Graphic tag={'noAlcohol'} />
                    No Alcohol
                    <br />
                    <input
                        type="checkbox"
                        name="reminder"
                        value="may_induce_drowziness"
                        onChange={(e) => handleCheckBoxes(e.target.value)} /> <Graphic tag={'mayInduceDrowziness'} />May Induce Drowziness
                    <br />
                    <input
                        type="checkbox"
                        name="reminder"
                        value="take_with_food"
                        onChange={(e) => handleCheckBoxes(e.target.value)} /> <Graphic tag={'takeWithFood'} />Take With Food
                    <br />
                    <input
                        type="checkbox"
                        name="reminder"
                        value="no_heavy_machinery"
                        onChange={(e) => handleCheckBoxes(e.target.value)} />  <Graphic tag={'noHeavyMachinery'} />No Heavy Machinery
                    <br />
                    <input
                        type="checkbox"
                        name="reminder"
                        value="take_in_the_morning"
                        onChange={(e) => handleCheckBoxes(e.target.value)} />  <Graphic tag={'takeInTheMorning'} />Take in the Morning
                    <br />
                    <input
                        type="checkbox"
                        name="reminder"
                        value="take_in_the_evening"
                        onChange={(e) => handleCheckBoxes(e.target.value)} />  <Graphic tag={'takeInTheEvening'} />Take in the Evening
                    <br />
                    </div>

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
                        <input
                            type="radio"
                            id="icon"
                            name="icon"
                            value="dropper"
                            onChange={(event) => handleChange('icon', event.target.value)} />
                        <Graphic tag={'dropper'} />
                        <input
                            type="radio"
                            id="icon"
                            name="icon"
                            value="fourPack"
                            onChange={(event) => handleChange('icon', event.target.value)} />
                        <Graphic tag={'fourPack'} />
                        <input
                            type="radio"
                            id="icon"
                            name="icon"
                            value="medicineBottle"
                            onChange={(event) => handleChange('icon', event.target.value)} />
                        <Graphic tag={'medicineBottle'} />
                        <input
                            type="radio"
                            id="icon"
                            name="icon"
                            value="paste"
                            onChange={(event) => handleChange('icon', event.target.value)} />
                        <Graphic tag={'paste'} />
                    </div>
                    <br />
                </div>
            </div>
            <button onClick={() => handleFrequency()}>Submit</button>
        </div>
    )
}



export default SubmissionForm