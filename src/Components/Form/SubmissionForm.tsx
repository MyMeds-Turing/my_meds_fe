import React, { ChangeEvent, useState } from "react";
import Graphic from "../Graphic/Graphic";
import { MutationRx, doseInfo } from '../../interfaces'
import './SubmissionForm.css'
import { ADD_RX } from '../../GraphQL/Mutations'
import { useMutation } from "@apollo/client";
import './SubmissionForm.css'
import { Link } from "react-router-dom";

type MedProps = {
    chosenMedicine: string,
    userID: any
    refetch: any
}

const SubmissionForm: React.FC<MedProps> = ({ chosenMedicine, userID, refetch }) => {
    const [doseObject, setDoseObject] = useState<doseInfo>({ amt: '', unit: 'pill(s)' })

    const [formData, setFormData] = useState<MutationRx>({
        medName: chosenMedicine,
        timeBetweenDose: 0,
        totalDoses: 0,
        dose: '',
        userInstructions: "",
        additionalInstructions: '',
        icon: 'roundPill',
        userId: parseInt(userID),
    })
    const [modal, setModal] = useState<boolean>(false)
    const [frequencyNum, setFrequencyNum] = useState<number>(0)
    const [frequencyUnits, setFrequencyUnits] = useState<string>('hour')
    const [postMed] = useMutation(ADD_RX)

    const handleSubmit = () => {
        let multiplier: number;
        frequencyUnits === 'hour' ? multiplier = 60 :
            frequencyUnits === 'day' ? multiplier = 1440 : multiplier = 10080

        setFormData({
            ...formData,
            timeBetweenDose: frequencyNum * multiplier,
            // userInstructions: formData.userInstructions,
            dose: `${doseObject.amt} ${doseObject.unit}`,
            totalDoses: Math.floor(formData.totalDoses / parseInt(doseObject.amt))
        })
        setModal(true)
    }

    const handleCheckBoxes = (instruction: string) => {

        let addInstructions = formData.userInstructions
        console.log('addinstructions', addInstructions.split(', '));
        if (!addInstructions.split(', ').includes(instruction)) {
            addInstructions += instruction + ', '
        } else {
            addInstructions = addInstructions.split(', ').filter(ins => ins !== instruction).join(', ')
        }

        setFormData({
            ...formData,
            userInstructions: addInstructions
        })
    };

    const handleChange = (field: string, userInput: string | number) => {
        setFormData({ ...formData, [field]: userInput })
    }

    const handleDoseUpdate = (field: string, userInput: string) => {
        console.log(userInput)
        setDoseObject({ ...doseObject, [field]: userInput })
    }

    const handleMutation = () => {
        postMed({
            variables: {
                userInput: formData
            }
        })
        refetch()
    }

    return (
        <section className='form-inputs'>
             <h2>{chosenMedicine}</h2>
        
            <section className="dosage-section">
                <label htmlFor="dosage-num">Take</label>
                <input
                    className="dosage-num"
                    type='number'
                    placeholder='0'
                    min='0'
                    onChange={(e) => handleDoseUpdate('amt', e.target.value)}
                />
                <select name="dosage-unit" className="form-tag" onChange={(e) => handleDoseUpdate('unit', e.target.value)}>
                    <option value="pill(s)">pill(s)</option>
                    <option value="mg(s)">mg(s)</option>
                    <option value="ml(s)">ml(s)</option>
                    <option value="puff(s)">puff(s)</option>
                    <option value="tsp(s)">tsp(s)</option>
                </select>
                <br />
                <label htmlFor="frequency-num"> Every</label>
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
                <br />
                <label htmlFor="doses-total">Total Quantity In Prescription : </label>
                <input
                    onChange={(event) => { handleChange('totalDoses', parseInt(event.target.value)) }}
                    className="doses-total"
                    type='number'
                    placeholder='0'
                    min='0'
                    name='doses-total'
                    value={formData.totalDoses} required
                />
            </section>
            <section className="user-instructions">
                <label htmlFor="user-instructions">Reminders:</label>
                <section className="reminders">
                    <section className="reminder-icon-section">
                        <div className="checkbox-input">
                            <input
                                type="checkbox"
                                name="reminder"
                                value="Take in the Morning"
                                onChange={(e) => handleCheckBoxes(e.target.value)} />  <Graphic tag={'takeInTheMorning'} />
                            <p className="checkbox-label">Take in the Morning</p>
                        </div>
                        <br />
                        <div className="checkbox-input">
                            <input
                                type="checkbox"
                                name="reminder"
                                value="Take in the Evening"
                                onChange={(e) => handleCheckBoxes(e.target.value)} />  <Graphic tag={'takeInTheEvening'} />
                            <p className="checkbox-label">Take in the Evening</p>
                        </div>
                        <br />
                        <div className="checkbox-input">
                            <input
                                type="checkbox"
                                name="reminder"
                                value="Take With Food"
                                onChange={(e) => handleCheckBoxes(e.target.value)} /> <Graphic tag={'takeWithFood'} />
                            <p className="checkbox-label">Take With Food</p>
                        </div>
                        <br />
                        <div className="checkbox-input">
                            <input
                                type="checkbox"
                                name="reminder"
                                value="No Alcohol"
                                onChange={(e) => handleCheckBoxes(e.target.value)} /> <Graphic tag={'noAlcohol'} />
                            <p className="checkbox-label">No Alcohol</p>
                        </div>
                        <br />
                        <input
                            id="takeAM"
                            type="checkbox"
                            name="reminder"
                            value="Take in the Morning"
                            onChange={(e) => handleCheckBoxes(e.target.value)} />  <Graphic tag={'takeInTheMorning'} />Take in the Morning
                        <div className="checkbox-input">
                            <input
                                type="checkbox"
                                name="reminder"
                                value="May Induce Drowziness"
                                onChange={(e) => handleCheckBoxes(e.target.value)} /> <Graphic tag={'mayInduceDrowziness'} />
                            <p className="checkbox-label">May Induce Drowziness</p>
                        </div>
                        <br />
                        <div className="checkbox-input">
                            <input
                                type="checkbox"
                                name="reminder"
                                value="No Heavy Machinery"
                                onChange={(e) => handleCheckBoxes(e.target.value)} />  <Graphic tag={'noHeavyMachinery'} />
                            <p className="checkbox-label">No Heavy Machinery</p>
                        </div>
                        <br />
                    </section>
                    <label htmlFor="additional-instructions">Additional Instructions:</label>
                    <br/>
                    <input
                        className='additional-instructions'
                        type="text"
                        id="reminder"
                        name="reminder"
                        onChange={(event) => handleChange('additionalInstructions', event.target.value)} />
                    <br />
                    <section className="icon-selector">
                        <label htmlFor="icon">Choose an icon : </label>
                        <br />
                        <div className="med-graphic-option">
                            <input
                                type="radio"
                                id="icon"
                                name="icon"
                                value="capsule"
                                onChange={(event) => handleChange('icon', event.target.value)} />
                            <Graphic tag={'capsule'} />
                        </div>
                        <div className="med-graphic-option">
                            <input
                                type="radio"
                                id="icon"
                                name="icon"
                                value="roundPill"
                                onChange={(event) => handleChange('icon', event.target.value)} />
                            <Graphic tag={'roundPill'} />
                        </div>
                        <div className="med-graphic-option">
                            <input
                                type="radio"
                                id="icon"
                                name="icon"
                                value="dropper"
                                onChange={(event) => handleChange('icon', event.target.value)} />
                            <Graphic tag={'dropper'} />
                        </div>
                        <div className="med-graphic-option">
                            <input
                                type="radio"
                                id="icon"
                                name="icon"
                                value="syringe"
                                onChange={(event) => handleChange('icon', event.target.value)} />
                            <Graphic tag={'syringe'} />
                        </div>
                        <div className="med-graphic-option">
                            <input
                                type="radio"
                                id="icon"
                                name="icon"
                                value="fourPack"
                                onChange={(event) => handleChange('icon', event.target.value)} />
                            <Graphic tag={'fourPack'} />
                        </div>
                        <div className="med-graphic-option">
                            <input
                                type="radio"
                                id="icon"
                                name="icon"
                                value="medicineBottle"
                                onChange={(event) => handleChange('icon', event.target.value)} />
                            <Graphic tag={'medicineBottle'} />
                        </div>
                        <div className="med-graphic-option">
                            <input
                                type="radio"
                                id="icon"
                                name="icon"
                                value="paste"
                                onChange={(event) => handleChange('icon', event.target.value)} />
                            <Graphic tag={'paste'} />
                        </div>
                        <div className="med-graphic-option">
                            <input
                                type="radio"
                                id="icon"
                                name="icon"
                                value="coughSyrup"
                                onChange={(event) => handleChange('icon', event.target.value)} />
                            <Graphic tag={'coughSyrup'} />
                        </div>
                        <div className="med-graphic-option">
                            <input
                                type="radio"
                                id="icon"
                                name="icon"
                                value="inhaler"
                                onChange={(event) => handleChange('icon', event.target.value)} />
                            <Graphic tag={'inhaler'} />
                        </div>
                    </section>
                    <br />
                </section>
            </section>
            <button className="submit" onClick={() => handleSubmit()}>Submit</button>
            {modal && <section className="modal" onClick={() => setModal(false)}>
                <article className="modal-confirm">
                    <h4>Please confirm:</h4>
                    <p>{chosenMedicine}</p>
                    <p>{formData.dose}</p>
                    <p>Addn'l Instructions: {formData.userInstructions}</p>
                    <p>{formData.additionalInstructions}</p>
                    <div className="modal-buttons-box">
                        <button className="modal-button" onClick={() => setModal(false)}>Edit</button>
                        <Link to="/my_meds_fe/">
                            <button className="modal-button" onClick={() => handleMutation()}>Confirm</button>
                        </Link>
                    </div>
                </article>
            </section>}
        </section>
    )
}



export default SubmissionForm