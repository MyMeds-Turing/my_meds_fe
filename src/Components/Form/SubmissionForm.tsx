import React, {ChangeEvent, useState} from "react";

type MedProps = {
    chosenMedicine: string
}

const SubmissionForm: React.FC<MedProps> = ({chosenMedicine}) => {
    const [formData, setFormData] = useState({
        every:'',
        frequency:'',
        dosage:'',
        totalDoses: 0,
        dosesRemaining: 0,
        userInstructions: [''],
        doctorInstructions: '',
        icon: ''
    })

    const handleChange = (field: string, e: ChangeEvent<HTMLInputElement> |ChangeEvent<HTMLSelectElement> ) => {
        setFormData({...formData, [field]: e.target.value})
    }

    return (
        <>
            <div className="frequency-section">
            <label htmlFor="frequency-num">Every</label>
            <input
                        onChange={(e) => {handleChange('every', e)}}
                        className="frequency-num"
                        type='number'
                        placeholder='0'
                        min = '0'
                        name='frequency-num'
                        value={formData.every} required
                    />
                    <select  name="frequency" className="form-tag" value={formData.frequency}
                     onChange={(e) => {handleChange('frequency', e)}} required>
                        <option value="hours">hours</option>
                        <option value="days">days</option>
                        <option value="weeks">weeks</option>
                    </select>      

            </div>
            <div className="dosage-section">
            <label htmlFor="dosage-num">Dosage</label>
            <input
                        onChange={(e) => {handleChange('dosage', e)}}
                        className="dosage-num"
                        type='text'
                        placeholder='Ex. 10mg'
                        name='dosage-num'
                        value={formData.dosage}required
                    />
            </div>
        </>
    )
}



export default SubmissionForm