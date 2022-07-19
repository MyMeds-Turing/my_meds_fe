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
    userID: number
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
        icon: '',
        userId: userID,
    })
    const [modal, setModal] = useState<boolean>(false)
    const [frequencyNum, setFrequencyNum] = useState<number>(0)
    const [frequencyUnits, setFrequencyUnits] = useState<string>('hour')
    const [postMed] = useMutation(ADD_RX)


    console.log(formData)

    const handleSubmit = () => {
        let multiplier: number;
        frequencyUnits === 'hour' ? multiplier = 60 :
            frequencyUnits === 'day' ? multiplier = 1440 : multiplier = 10080

        setFormData({
            ...formData,
            timeBetweenDose: frequencyNum * multiplier,
            // userInstructions: formData.userInstructions,
            dose: `${doseObject.amt} ${doseObject.unit}`
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

    //on change of EITHER dose amount or dose unit, we want to update formData.dose with the concatented version

    const handleDoseUpdate = (field: string, userInput: string) => {
        console.log(userInput)
        setDoseObject({ ...doseObject, [field]: userInput })
        console.log('doseObject onChange event', doseObject, 'formData.dose on doseObject change', formData.dose)

        // setFormData({ ...formData, dose: `${doseObject.amt} ${doseObject.unit}` })
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
        <div className='form-inputs'>
            <div className="frequency-section">
                <h2>{chosenMedicine}</h2>
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
            </div>
            <div className="user-instructions">
                <label htmlFor="user-instructions">Reminders</label>

                <div className="reminders">
                    <div className="reminder-icon-section">
                        <input
                            type="checkbox"
                            name="reminder"
                            value="No Alcohol"
                            onChange={(e) => handleCheckBoxes(e.target.value)} /> <Graphic tag={'noAlcohol'} />
                        No Alcohol
                        <br />
                        <input
                            type="checkbox"
                            name="reminder"
                            value="May Induce Drowziness"
                            onChange={(e) => handleCheckBoxes(e.target.value)} /> <Graphic tag={'mayInduceDrowziness'} />May Induce Drowziness
                        <br />
                        <input
                            type="checkbox"
                            name="reminder"
                            value="Take With Food"
                            onChange={(e) => handleCheckBoxes(e.target.value)} /> <Graphic tag={'takeWithFood'} />Take With Food
                        <br />
                        <input
                            type="checkbox"
                            name="reminder"
                            value="No Heavy Machinery"
                            onChange={(e) => handleCheckBoxes(e.target.value)} />  <Graphic tag={'noHeavyMachinery'} />No Heavy Machinery
                        <br />
                        <input
                            id="takeAM"
                            type="checkbox"
                            name="reminder"
                            value="Take in the Morning"
                            onChange={(e) => handleCheckBoxes(e.target.value)} />  <Graphic tag={'takeInTheMorning'} />Take in the Morning
                        <br />
                        <input
                            type="checkbox"
                            name="reminder"
                            value="Take in the Evening"
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
                        <label htmlFor="icon">Choose an icon : </label>
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
            <button onClick={() => handleSubmit()}>Submit</button>
            {modal && <div className="modal" onClick={() => setModal(false)}>
                <div className="modal-confirm">
                    <h4>Please confirm:</h4>
                    <p>{chosenMedicine}</p>
                    <p>{formData.dose}</p>
                    <p>Addn'l Instructions: {formData.userInstructions}</p>
                    <p>{formData.additionalInstructions}</p>
                    <div className="modal-buttons-box">
                        <button onClick={() => setModal(false)}>Edit</button>
                        <Link to="/">
                            <button onClick={() => handleMutation()}>Confirm</button>
                        </Link>
                    </div>
                </div>
            </div>}
        </div>
    )
}



export default SubmissionForm