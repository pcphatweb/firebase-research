import { useState, useEffect } from "react";

import useHttp from "../hooks/use-http";
import { addQuotes } from "../lib/api";
import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = props => {
    const [errorMessage, setErrorMessage] = useState("");
    const { requestHttp, isLoading, error: requestHttpError } = useHttp(
        addQuotes
    );

    useEffect(() => {
        setErrorMessage(requestHttpError);
    }, [requestHttpError]);

    const addQuoteHandle = quoteData => {
        if (quoteData.text.length > 0) {
            requestHttp(quoteData, { success: "/" });
        } else {
            setErrorMessage("Please input data");
        }
    };

    return (
        <QuoteForm
            isLoading={isLoading}
            error={errorMessage}
            onAddQuote={addQuoteHandle}
        />
    );
};

export default NewQuote;
