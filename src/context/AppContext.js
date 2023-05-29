import { createContext,useReducer } from "react";

 const AppReducer = (state,action) =>{
    switch(action.type){
		case 'ADD-EXPENSE':
			return{
				...state,
				expenses:[...state.expenses,action.payload],
			}

		case 'DELETE_EXPENSE':
			return{
				...state,
				expenses:state.expenses.filter(
					(expense)=>expense.id !== action.payload
				)
			}
        default:
            return state;
    }
};

const initialState = {
    budget: 20000,
    expenses:[
        {id:1, name:'shooping',cost:40},
        {id:2, name:'holiday',cost:400},
    ]
}

export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
	// 4. Sets up the app state. takes a reducer, and an initial state
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// 5. Returns our context. Pass in the values we want to expose
	return (
		<AppContext.Provider
			value={{
				expenses: state.expenses,
				budget: state.budget,
				dispatch,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};