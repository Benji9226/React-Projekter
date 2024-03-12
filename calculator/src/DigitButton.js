import { ACTIONS } from './App'

// this is my digitbutton which makes sure that when i click the button it puts in the right digit
export default function DigitButton({ dispatch, digit}){
    return <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit }})}
    >
        {digit}
    </button>
}