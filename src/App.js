import "./App.css";
import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'
function App() {
  const [dice, setDice] = React.useState(random());
  const [tenzies,setTenzies] = React.useState(false)
 function newDie(){
    return{
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false
    }
 }
 React.useEffect(()=>{
 let allHeld = dice.every(par => par.isHeld)
let firstVal = dice[0].value
const allSameVal = dice.every(die => die.value === firstVal)
if(allHeld && allSameVal){
  setTenzies(true)
  console.log("you won")
}},[dice])

  function random() {
    let store = []
    for (let i = 0; i < 10; i++) {
      store.push(newDie())
    }
    return store;
  }

  let holdDice = (id)=>{
   setDice(par => par.map(die =>{
      return die.id === id? {...die, isHeld: !die.isHeld}: die
   }))
  }


  function rollDice() {
    if(!tenzies){
      setDice(par => par.map(die =>{
        return die.isHeld? die: newDie()
      }))
    }else{
      setTenzies(false)
      setDice(random())
    }
   
  }


  let bob = dice.map((par) => {
 
    return (
      <Die key={par.id} value={par.value} isHeld={par.isHeld} holdDice={()=>holdDice(par.id)} />
    );
  });
console.log(tenzies)

  return (
    <div className="App">
      <div className="main-container">
    {tenzies && <Confetti />}
        <div>
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. <br />
            Click each die to freeze it at its current value <br /> between
            rolls.
          </p>
        </div>

        <div className="container">
          <div className="first">{bob}</div>
        </div>

        <div className="button">
            <button onClick={rollDice}>{tenzies?"New Game":"Roll"}</button>
      
        </div>
      </div>
    </div>
  );
}

export default App;
