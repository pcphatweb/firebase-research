import { useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const { quoteId } = useParams();

  const { requestHttp, status } = useHttp(addComment);

  const { onAddComment } = props;

  useEffect(() => {
    if(status === 'success') {
      onAddComment();
    }
  }, [status, onAddComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    // optional: Could validate here

    // send comment to server
    console.log('submitFormHandler', quoteId);

    requestHttp({
      commentData: {
        text: commentTextRef.current.value
      },
      quoteId: quoteId
    });
    event.target.reset();
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
