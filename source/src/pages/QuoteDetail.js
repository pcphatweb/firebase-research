import { useEffect } from "react";

import {
    Outlet,
    useParams,
    useLocation,
    matchPath
} from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getQuoteById } from "../lib/api";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = props => {
    const { requestHttp, data: quoteLoaded, isLoading } = useHttp(getQuoteById);

    const { quoteId } = useParams();
    const location = useLocation();

    const matchQuoteDetail = matchPath({
        path: "/quotes/:quoteId",
        exact: true
    }, location.pathname);

    useEffect(() => {
        requestHttp(quoteId);
    }, [requestHttp, quoteId]);

    return (
        <>
            <h1>Quote Detail Page</h1>
            {isLoading && (
                <div className="centered">
                    <LoadingSpinner />
                </div>
            )}
            {quoteLoaded && <HighlightedQuote {...quoteLoaded} />}
            {!quoteLoaded && <NoQuotesFound />}

            {/* {matchQuoteDetail && (
                <div className="centered">
                    <Link className="btn" to={`comments`}>
                        View comment
                    </Link>
                </div>
            )} */}

            <Outlet context={quoteId} />
        </>
    );
};

export default QuoteDetail;
