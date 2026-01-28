import React, { useState, useEffect } from 'react';
import './Comments.css';

const Comments = ({ currentChannel, currentUser }) => {
  const [commentsList, setCommentsList] = useState(currentChannel?.comments || []);
  
  const [commentText, setCommentText] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCommentsList(currentChannel?.comments || []);
  }, [currentChannel]);

  const handleSubmit = async () => {
    if (!commentText.trim()) {
      alert("Будь ласка, напишіть текст коментаря.");
      return;
    }
    if (userRating === 0) {
      alert("Будь ласка, поставте оцінку каналу.");
      return;
    }
    if (!currentChannel || !currentChannel.id) {
      alert("Помилка: Не вдалося визначити ID каналу.");
      return;
    }

    setIsSubmitting(true);

    const newComment = {
      id: Date.now(), 
      user: currentUser ? currentUser.name : "Гість",
      text: commentText,
      rating: userRating,
      date: "щойно"
    };

    const updatedComments = [newComment, ...commentsList];

    try {
      const response = await fetch(`http://localhost:3001/channels/${currentChannel.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comments: updatedComments
        }),
      });

      if (!response.ok) {
        throw new Error('Не вдалося зберегти коментар на сервері');
      }

      setCommentsList(updatedComments);

      setCommentText('');
      setUserRating(0);
      setHoverRating(0);

    } catch (error) {
      console.error("Error saving comment:", error);
      alert("Сталася помилка при збереженні коментаря. Перевірте, чи запущено json-server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStaticStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star-icon ${index < rating ? 'filled' : 'empty-static'}`}>
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  const getAvatar = (username) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
  };

  return (
    <div className="comments-container">
      
      <div className="rate-channel-section">
        <h3 className="rate-title">Оцініть канал!</h3>
        <div className="stars-container interactive">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <span 
                key={index} 
                className={`star-icon ${ratingValue <= (hoverRating || userRating) ? 'filled' : 'empty'}`}
                onClick={() => setUserRating(ratingValue)}
                onMouseEnter={() => setHoverRating(ratingValue)}
                onMouseLeave={() => setHoverRating(0)}
                style={{ fontSize: '40px', cursor: 'pointer' }}
              >
                 {ratingValue <= (hoverRating || userRating) ? '★' : '☆'}
              </span>
            );
          })}
        </div>
      </div>

      <div className="comments-header">
        <h2 className="comments-title">Коментарі</h2>
        <span className="comments-count-badge">{commentsList.length}</span>
      </div>

      <div className="comment-form">
        <img 
          src={currentUser ? getAvatar(currentUser.name) : "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest"} 
          alt="User Avatar" 
          className="user-avatar-small" 
        />
        <div className="form-content">
          <textarea 
            className="comment-textarea" 
            placeholder="Напишіть коментар..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isSubmitting}
          ></textarea>
          <p className="form-helper-text">
            Коментарі приймаються тільки українською мовою.
          </p>
          <button 
            className="submit-btn" 
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? 'Збереження...' : 'Коментувати'}
          </button>
        </div>
      </div>

      <div className="comments-list">
        {commentsList.map((comment) => (
          <div key={comment.id} className="comment-card">
            <img 
              src={getAvatar(comment.user)} 
              alt={comment.user} 
              className="user-avatar-small" 
            />
            
            <div className="comment-body">
              <div className="comment-header">
                <div className="comment-author-info">
                  <span className="author-name">{comment.user}</span>
                  <span className="comment-date">{comment.date}</span>
                </div>
                <div className="comment-stars">
                  {renderStaticStars(comment.rating)}
                </div>
              </div>
              
              <div className="comment-text">
                {comment.text}
              </div>
              
              <button className="reply-btn">Відповісти</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;