// type of state
type AuthState = {
    isAuthenticated: boolean;
    name: string;
    accessToken: string;
    refeshToken: string;
}
//initial state
const initialState: AuthState = {
    isAuthenticated: false,
    name: '',
    accessToken: '',
    refeshToken: ''
}
//reducer
export const authReducer = (currentState=initialState, action: any) => {

    if(action.type === 'SET_AUTH_STATE'){
        return {
            ...action.payload
        }
    }
    return currentState;

}