export const authReducer = (state, action) => {
    const { type, payload: { isAuthenticated, user } } = action;

    switch (type) {
        case "SET_AUTH":
            console.log(">> over set_auth");

            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user
            };

        default:
            return state;
    }
};
