export default function Die(prop){

    const styles = {
        backgroundColor: prop.isHeld?"#59E391":"white"
    }
    return(
        <div onClick={prop.holdDice} style={styles}>{prop.value}</div>

    ) 
}