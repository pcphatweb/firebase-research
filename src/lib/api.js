export const getAllQuotes = async () => {
    const response = await fetch('https://react-movie-api-9697e-default-rtdb.asia-southeast1.firebasedatabase.app/quotes.json');

    if(!response.ok) throw new Error('Something went wrong!');

    return await response.json();
}

export const getQuoteById = async (quoteId) => {
    const response = await fetch(`https://react-movie-api-9697e-default-rtdb.asia-southeast1.firebasedatabase.app/quotes/${quoteId}.json`);

    if(!response.ok) throw new Error('Something went wrong!');

    return await response.json();
}

export const addQuotes = async (quoteData) => {
    const response = await fetch('https://react-movie-api-9697e-default-rtdb.asia-southeast1.firebasedatabase.app/quotes.json', {
        method: 'POST',
        body: JSON.stringify(quoteData)
    });

    if(!response.ok) throw new Error('Something went wrong!');

    return await response.json();
};

export const getAllComments = async (quoteId) => {
    const response = await fetch(`https://react-movie-api-9697e-default-rtdb.asia-southeast1.firebasedatabase.app/comments/${quoteId}.json`);

    if(!response.ok) throw new Error('Something went wrong!');

    return await response.json();
}

export const addComment = async (requestData) => {
    const { commentData, quoteId } = requestData;
    const response = await fetch(`https://react-movie-api-9697e-default-rtdb.asia-southeast1.firebasedatabase.app/comments/${quoteId}.json`, {
        method: 'POST',
        body: JSON.stringify(commentData)
    });

    if(!response.ok) throw new Error('Something went wrong!');

    return await response.json();
};