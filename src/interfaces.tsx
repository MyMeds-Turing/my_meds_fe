export interface User {
    id: number,
    fullName: string,
    email: string,
}


export interface MutationRx {
    medName: string,
    timeBetweenDose: number,
    totalDoses: number,
    dose: string,
    userInstructions: string,
    additionalInstructions: string,
    icon: string
    userId: number,
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
    totalDoses: number,
    userId: number,
}