export default (state, action) => {
    switch(action.type) {
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            }
        case 'ADD_RECEIPT':
            return {
                ...state,
                receipts: [action.payload, ...state.receipts]
            }
        default:
            return state;
    }
}