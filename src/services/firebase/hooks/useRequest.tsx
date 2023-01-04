import React, { useState } from "react";
import { ErrorAlert, LoadingIndicator } from "../../../components";
import { FirebaseErrorCode } from "../enum/errorCode";

interface IRequest {
    handler: () => any;
    onSuccess?: (data) => any;
}

export function useRequest() {
    const [responseComponent, setResponseComponent] = useState(null);

    const doRequest = async (
        { handler, onSuccess }: IRequest,
        errorMessage = FirebaseErrorCode["default/error-message"]
    ) => {
        try {
            setResponseComponent(<LoadingIndicator />);

            const response = await handler();
            if (onSuccess) onSuccess(response);
            setResponseComponent(null);
        } catch (err) {
            const parsedFirebaseError = FirebaseErrorCode[err.code] ?? errorMessage;

            setResponseComponent(
                <ErrorAlert errorMessage={parsedFirebaseError} onClosedModal={() => setResponseComponent(null)} />
            );
        }
    };

    return [doRequest, responseComponent];
}
