import { ACTIONS } from './App'

// this is my operationbutton which makes sure that when i click the button it puts in the right operation

export default function OperationButton({ dispatch, operation}){
    return <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation }})}
    >
        {operation}
    </button>
}