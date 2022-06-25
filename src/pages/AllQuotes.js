import { useState, useEffect } from "react";
import useHttp from "../hooks/use-http";
import { useLocation, useNavigate } from "react-router-dom";

import { getAllQuotes } from "../lib/api";

import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const AllQuotes = props => {
    const [quotes, setQuotes] = useState([]);
    const { requestHttp, data: quoteLoaded, isLoading } = useHttp(getAllQuotes);

    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const sort = query.get("sort");

    useEffect(() => {
        requestHttp();
    }, [requestHttp]);

    useEffect(() => {
        let _quotes = [];
        for (const [key, value] of Object.entries(quoteLoaded)) {
            _quotes.push({
                id: key,
                text: value.text,
                author: value.author
            });
        }

        if (sort) {
            _quotes.sort((quoteA, quoteB) => {
                if (sort === "asc") {
                    return quoteA.id > quoteB.id ? 1 : -1;
                } else {
                    return quoteA.id < quoteB.id ? 1 : -1;
                }
            });
        }

        setQuotes([..._quotes]);
    }, [quoteLoaded, sort]);

    const sortHandle = () => {
        navigate(`${location.pathname}?sort=${sort === "asc" ? "desc" : "asc"}`);
    };

    return isLoading ? (
        <div className="centered">
            <LoadingSpinner />
        </div>
    ) : (
        <>
            <button className="btn--flat" onClick={sortHandle}>{`${
                sort === "asc" ? "Descending" : "Asceding"
            } sort`}</button>
            <QuoteList quotes={quotes} />
        </>
    );
};

export default AllQuotes;
