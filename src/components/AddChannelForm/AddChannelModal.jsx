import React, { useState, useRef } from 'react';
import './AddChannelForm.css';

const AddChannelModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ url: '', category: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const editorRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const applyStyle = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) editorRef.current.focus();
  };

  const toggleHeader = (e) => {
    e.preventDefault();
    const currentBlock = document.queryCommandValue('formatBlock');
    if (currentBlock === 'h3') {
        document.execCommand('formatBlock', false, 'p');
    } else {
        document.execCommand('formatBlock', false, 'h3');
    }
  };

  const toggleQuote = (e) => {
    e.preventDefault();
    const currentBlock = document.queryCommandValue('formatBlock');
    if (currentBlock === 'blockquote') {
        document.execCommand('formatBlock', false, 'p');
    } else {
        document.execCommand('formatBlock', false, 'blockquote');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDescription = editorRef.current ? editorRef.current.innerHTML : '';
    const plainDesc = currentDescription.replace(/<[^>]+>/g, '').trim();

    if (!formData.url.trim() || !plainDesc || !formData.category.trim()) return;

    setLoading(true);
    const finalData = { ...formData, description: currentDescription };
    
    try {
      console.log('Sending Data:', finalData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="form-modal" onClick={e => e.stopPropagation()}>
        {success ? (
          <div className="success-message">
            <h2>Дякуємо!</h2>
            <p>Ваш канал успішно відправлено.</p>
            <button onClick={onClose} className="submit-btn">Закрити</button>
          </div>
        ) : (
          <>
            <div className="modal-header">
                <h2 className="form-title">Додати ютуб-канал</h2>
                <button className="close-icon-btn" onClick={onClose}>×</button>
            </div>
            <p className="modal-warning">
                <strong>Увага: розглядаються лише україномовні канали!</strong>
            </p>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>URL-адреса каналу<span className="required">*</span></label>
                <input 
                  name="url" 
                  value={formData.url} 
                  onChange={handleInputChange} 
                  className="form-input" 
                  placeholder="Введіть посилання на канал." 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Опис каналу (до 1000 символів)<span className="required">*</span></label>
                <div className="fake-editor-container">
                    <div 
                        className="editor-content-editable"
                        contentEditable="true"
                        suppressContentEditableWarning={true}
                        ref={editorRef}
                        data-placeholder="Введіть опис каналу."
                    ></div>

                    <div className="editor-toolbar">
                        <button type="button" className="tool-btn bold" onMouseDown={(e) => {e.preventDefault(); applyStyle('bold');}}>B</button>
                        <button type="button" className="tool-btn italic" onMouseDown={(e) => {e.preventDefault(); applyStyle('italic');}}>I</button>
                        <button type="button" className="tool-btn" onMouseDown={toggleHeader}>H</button> 
                        <button type="button" className="tool-btn" onMouseDown={toggleQuote}>”</button>
                        <button type="button" className="tool-btn link" onMouseDown={(e) => {e.preventDefault(); applyStyle('createLink', prompt('URL:'));}}>🔗</button>
                    </div>
                </div>
              </div>

              <div className="form-group">
                <label>Оберіть тематику каналу (до 3 категорій)<span className="required">*</span></label>
                <input 
                  name="category" 
                  value={formData.category} 
                  onChange={handleInputChange} 
                  className="form-input" 
                  placeholder="Напишіть тематику." 
                  required 
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Відправка..." : "Відправити"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddChannelModal;
