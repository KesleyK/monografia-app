import React, { useState } from "react";
import { ErrorAlert, LoadingIndicator } from "../../../components";
import { FirebaseErrorCode } from "../enum/errorCode";

interface IRequest {
    request: () => any;
    onSuccess?: (data) => any;
}

export function useRequest({ request, onSuccess }: IRequest) {
    const [responseComponent, setResponseComponent] = useState(null);

    const doRequest = async () => {
        try {
            setResponseComponent(<LoadingIndicator />);

            const response = await request();
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
