import { Routes, Route, Navigate, Link } from "react-router-dom";

import AllQuotes from "./pages/AllQuotes";
import QuoteDetail from "./pages/QuoteDetail";
import NewQuote from "./pages/NewQuote";
import Comments from "./components/comments/Comments";

import Main from "./components/layout/Layout";

function App() {
    return (
        <Main>
            <Routes>
                <Route path="/" element={<Navigate to="/quotes" />} />

                <Route path="/quotes" element={<AllQuotes />} />

                <Route path="/quotes/:quoteId" element={<QuoteDetail />}>
                    <Route
                        index
                        element={
                            <div className="centered">
                                <Link className="btn" to="comments">
                                    View comment
                                </Link>
                            </div>
                        }
                    />
                    <Route path="comments" element={<Comments />} />
                </Route>

                <Route path="/new-quote" element={<NewQuote />} />

                <Route path="*" element={<h1>404 Not found!</h1>} />
            </Routes>
        </Main>
    );
}

export default App;
