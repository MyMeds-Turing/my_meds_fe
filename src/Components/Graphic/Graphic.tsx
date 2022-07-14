import React from "react"
import capsule from './../../Assets/icons/capsule.png'
import roundPill from './../../Assets/icons/round_pill.png'
import noAlcohol from './../../Assets/icons/no_alcohol.png'
import mayInduceDrowziness from './../../Assets/icons/may_induce_drowziness.png'
import takeWithFood from './../../Assets/icons/take_with_food.png'
import noHeavyMachinery from './../../Assets/icons/no_heavy_machinery.png'
import takeInTheMorning from './../../Assets/icons/take_in_the_morning.png'
import takeInTheEvening from './../../Assets/icons/take_in_the_evening.png'
import dropper from './../../Assets/icons/dropper.png'
import fourPack from './../../Assets/icons/four_pack.png'
import medicineBottle from './../../Assets/icons/medicine_bottle.png'
import paste from './../../Assets/icons/paste.png'
import './Graphic.css'


type ImageProps = {
    tag: string
}

const Graphic: React.FC<ImageProps> = ({ tag }) => {
    let altText = `${tag} icon`
    let icon = () => {

        if (tag === 'capsule') {
            return capsule
        }
        if (tag === 'roundPill') {
            return roundPill
        }
        if (tag === 'noAlcohol') {
            return noAlcohol
        }
        if (tag === 'mayInduceDrowziness') {
            return mayInduceDrowziness
        }
        if (tag === 'takeWithFood') {
            return takeWithFood
        }
        if (tag === 'noHeavyMachinery') {
            return noHeavyMachinery
        }
        if (tag === 'takeInTheMorning') {
            return takeInTheMorning
        }
        if (tag === 'takeInTheEvening') {
            return takeInTheEvening
        }
        if (tag === 'dropper') {
            return dropper
        }
        if (tag === 'fourPack') {
            return fourPack
        }
        if (tag === 'medicineBottle') {
            return medicineBottle
        }
        if (tag === 'paste') {
            return paste
        }

    }
    return (
        <img src={icon()} alt={altText} className="icon" />
    )
}

export default Graphic