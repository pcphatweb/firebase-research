import { useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
    data: {},
    status: "",
    error: "",
    isLoading: false,
    requestHttp: () => {}
};
const requestReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REQUEST_PENDING":
            return {
                ...state,
                status: "pending",
                isLoading: true
            };
        case "REQUEST_SUCCESS":
            return {
                ...state,
                data: action.data || {},
                status: "success",
                isLoading: false
            };
        case "REQUEST_FAIL":
            return {
                ...state,
                status: "fail",
                error: action.message,
                isLoading: false
            };
        default:
            return state;
    }
};

const useHttp = requestAction => {
    const navigate = useNavigate();
    const [requestState, dispatch] = useReducer(requestReducer, initialState);

    const request = useCallback(
        (requestData, redirectTo = {success: null, fail: null}) => {
            dispatch({ type: "REQUEST_PENDING" });
            requestAction(requestData)
                .then(response => {
                    dispatch({ type: "REQUEST_SUCCESS", data: response });
                    if (redirectTo.success) navigate(redirectTo.success);
                })
                .catch(error => {
                    dispatch({ type: "REQUEST_FAIL", message: error.message });
                    if (redirectTo.fail) navigate(redirectTo.fail);
                });
        },
        [requestAction, navigate]
    );

    return {
        ...requestState,
        requestHttp: request
    };
};

export default useHttp;
