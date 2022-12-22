import React, { useState } from "react";
import { ErrorAlert, LoadingIndicator } from "../../../components";
import { FirebaseErrorCode } from "../enum/errorCode";

interface IRequest {
    handler: () => any;
    onSuccess?: (data) => any;
}

export function useRequest() {
    const [responseComponent, setResponseComponent] = useState(null);

    const doRequest = async ({ handler, onSuccess }: IRequest) => {
        try {
            setResponseComponent(<LoadingIndicator />);

            const response = await handler();
            if (onSuccess) onSuccess(response);
        } catch (err) {
            const parsedFirebaseError = FirebaseErrorCode[err.code] ?? FirebaseErrorCode["default/error-message"];

            setResponseComponent(
                <ErrorAlert errorMessage={parsedFirebaseError} onClosedModal={() => setResponseComponent(null)} />
            );
        }
    };

    return [doRequest, responseComponent];
}
