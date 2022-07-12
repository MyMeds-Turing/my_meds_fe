import React from "react"
import capsule from './../../Assets/icons/capsule.png'
import roundPill from './../../Assets/icons/round-pill.png'
import './Graphic.css'


type ImageProps = {
    tag: string
}

const Graphic: React.FC<ImageProps> = ({tag}) => {
    let altText = `${tag} icon`
    let icon = () => {
        if(tag === 'capsule'){
            return capsule
        }
        if(tag === 'roundPill'){
            return roundPill
        }
    }
    return (
        <img src={icon()} alt={altText} className="medication-icon"/>
    )
}

export default Graphic