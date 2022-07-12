import { User } from './interfaces'

export const user1: User =
{
    id: 55,
    name: 'Artan',
    email: 'artanmyrtolli@gmail.com',
    phone: 9085176416,
    notify: 1, //0-none, 1-text, 2-email, 3-email & text
    Rx: [
        {
            med_name: 'Claritin',
            timeOfLastDose: '1/10/2011 9:00:00',
            timeOfNextDose: '1/11/2011 9:00:00',
            frequencyInMin: 1456,
            totalDoses: 100,
            dosesRemaining: 25,
            dosage: '25',
            userInstructions: ['take with food', 'no alcohol', 'no heavy machinery'],
            doctorInstructions: 'none',
            icon: 'blue_pill'
        }
    ]
}