export interface User {
    id: number,
    name: string,
    email: string,
    phone: number,
    notify: number,
    Rx: Prescription[]
}

export interface Prescription {
    id: number,
    medName: string,
    timeOfLastDose: string,
    timeOfNextDose: string,
    frequencyInMin: number,
    totalDoses: number,
    dosesRemaining: number,
    dose: string,
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
    timeOfNextDose: string,
    userInstructions: Array<string>
    additionalInstructions: string,
    dosesRemaining: number,
}