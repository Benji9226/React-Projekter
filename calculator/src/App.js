import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./styles.css"

//These are the different actions of my calculator
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
}

function reducer(state, { type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT: 

    //makes it so when i have calcutlated a number, next time i put in a new number i overwites the previouse calculation
    if(state.overwrite) {
      return{
        ...state,
        currentOperand: payload.digit,
        overwrite: false,
      }
    }
    // Makes sure that if the first number is a 0, u can't add more 0's to it.
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }

      //Makes it so u cant add multiple periods to a number
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      // makes it so i cant choose an operation if there isnt any digits imputed
      if (state.currentOperand == null && state.previousOperand == null){
        return state
      }
      
      //Makes it so i can change the operation if it hit the wrong one
      if (state.currentOperand == null) {
        return{
          ...state,
          operation: payload.operation,
        }
      }
      
      //This makes it so my current operand becomes my previouse operand, and resets the current one so i can type a new number
      if(state.previousOperand == null){
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return{
        ...state,
        previousOperand: evaluate(state),
        operation:payload.operation,
        currentOperand: null
      }

    case ACTIONS.CLEAR:
      return {}  //Returns empty state, so deletes everything
    
    case ACTIONS.EVALUATE:
      // this checks if i have all the necessary things to make a calculation, if not then it wont do anything
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
        return state
      }

      return{
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }
      if(state.currentOperand == null) return state
      if(state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        }
      }

      return{
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
  }
}

function evaluate({currentOperand, previousOperand, operation}){
  const previous = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)

  if(isNaN(previous) || isNaN(current)) return ""

  let computation = ""
  switch (operation){
    case "+":
      computation = previous + current
      break
    case "-":
      computation = previous - current
      break
    case "*":
      computation = previous * current
      break
    case "÷":
      computation = previous / current
      break
  }
  return computation.toString()
}

const INTEGER_FORMATER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split('.')
  if(decimal == null) return INTEGER_FORMATER.format(integer)
  return `${INTEGER_FORMATER.format(integer)}.${decimal}`
}

function App() {
  // this controles the state of the calculator
  const [{ currentOperand, previousOperand, operation}, dispatch] = useReducer(
    reducer,
     {}
    )


  return (
    <div className="calculator-grid">
      <div className="output">
        {/* these two divs are my operands, so the number that im putting in. Current is obviously the one 
        i'm typing in the moment, and the previous is the one i've alredy typed*/}
        <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
        {/* my buttons*/}
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  )
}

export default App;
