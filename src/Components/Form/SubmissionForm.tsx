import React, { ChangeEvent, useState } from "react";

type MedProps = {
    chosenMedicine: string
}

const SubmissionForm: React.FC<MedProps> = ({ chosenMedicine }) => {
    const [formData, setFormData] = useState({
        every: '',
        frequency: '',
        dosage: '',
        dosesRemaining: 0,
        userInstructions: [],
        doctorInstructions: '',
        icon: ''
    })

    // isChecked does not work yet/will check all boxes!!! 
    const [isChecked, setIsChecked] = useState(false);

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    const handleChange = (field: string, e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [field]: e.target.value })
    }

    return (
        <>
            <div className="frequency-section">
                <label htmlFor="frequency-num">Every</label>
                <input
                    onChange={(e) => { handleChange('every', e) }}
                    className="frequency-num"
                    type='number'
                    placeholder='0'
                    min='0'
                    name='frequency-num'
                    value={formData.every} required
                />
                <select name="frequency" className="form-tag" value={formData.frequency}
                    onChange={(e) => { handleChange('frequency', e) }} required>
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
                        value="No-alcohol"
                        checked={isChecked}
                        onChange={handleOnChange} /> test
                    <input
                        type="checkbox"
                        id="reminder"
                        name="reminder"
                        value="Snooze Town"
                        checked={isChecked}
                        onChange={handleOnChange}
                    />
                </div>
            </div>
        </>
    )
}



export default SubmissionForm