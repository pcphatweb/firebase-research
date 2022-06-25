import { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';

const Comments = (props) => {
    const { requestHttp, data: commentLoaded } = useHttp(getAllComments);
    const [comments, setComments] = useState([]);
    const [isAddingComment, setIsAddingComment] = useState(false);

    const quoteId = useOutletContext();
    
    console.log(quoteId);
    useEffect(() => {
        requestHttp(quoteId);
    }, [requestHttp, quoteId]);

    useEffect(() => {
        let _comments = [];
        for (const [key, value] of Object.entries(commentLoaded)) {
            _comments.push({
                id: key,
                text: value.text
            });
        }
        setComments(_comments);
    }, [commentLoaded]);

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    const addCommentHandle = useCallback(() => {
        requestHttp(quoteId);
    }, [requestHttp, quoteId]);

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className='btn' onClick={startAddCommentHandler}>
                    Add a Comment
        </button>
            )}
            {isAddingComment && <NewCommentForm onAddComment={addCommentHandle} />}
            {
                comments.map((comment) => {
                    return <p key={comment.id}>{comment.text}</p>;
                })
            }
        </section>
    );
};

export default Comments;
