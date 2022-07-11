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
    userInstructions: Array<string>,
    doctorInstructions: string,
    icon: string
}
