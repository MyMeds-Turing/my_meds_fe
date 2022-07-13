export interface User {
    id: number,
    name: string,
    email: string,
    phone: number,
    notify: number,
    Rx: Prescription[]
}

export interface Prescription {
    med_name: string,
    timeOfLastDose: string,
    timeOfNextDose: string,
    frequencyInMin: number,
    totalDoses: number,
    dosesRemaining: number,
    dosage: string,
    userInstructions: Array<string>,
    additionalInstructions: string,
    icon: string
}


export interface dummyUser {
    id: number,
    email: string,
    fullName: string
}

export interface dummyMed {
    id: number,
    medName: string,
    dose: string,
    timeOfNextDose: string
}