export interface User {
    id: number,
    fullName: string,
    email: string,
}


export interface MutationRx {
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

export interface QueryRx {
    id: number,
    medName: string,
    dose: string,
    timeOfNextDose: string,
    userInstructions: Array<string>
    additionalInstructions: string,
    dosesRemaining: number,
    icon: string,
    totalDoses: number
}