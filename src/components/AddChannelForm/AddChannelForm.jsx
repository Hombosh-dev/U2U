import React, { useState } from 'react';
import {
  MDXEditor,
  headingsPlugin,
  toolbarPlugin,
  linkPlugin,
  quotePlugin,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import './AddChannelForm.css';

const AddChannelForm = ({ isAuth }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    url: '',
    description: '',
    category: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const MAX_DESC = 1000;

  const openModal = () => setIsOpen(true);
  
  const closeModal = () => {
    setIsOpen(false);
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        setFormData({ url: '', description: '', category: '' });
      }, 300);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value) => {
    if (value && value.length <= MAX_DESC) {
      setFormData((prev) => ({ ...prev, description: value }));
    }
  };

  const safeParseJson = async (response) => {
    const text = await response.text();
    if (!text.trim()) return null;
    try {
      return JSON.parse(text);
    } catch (err) {
      throw new Error('Сервер повернув невалідний JSON');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.url.trim() || !formData.description.trim() || !formData.category.trim()) {
      setError('Заповніть усі обов’язкові поля');
      return;
    }
    if (formData.description.length > MAX_DESC) {
      setError('Опис не може перевищувати 1000 символів');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/channels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: formData.url.trim(),
          description: formData.description.trim(),
          category: formData.category.trim(),
          createdAt: new Date().toISOString()
        })
      });

      const result = await safeParseJson(response);

      if (!response.ok) {
        throw new Error(result?.message || `Сервер відповів ${response.status}`);
      }

      setSuccess(true);
      
    } catch (err) {
      setError(err.message || 'Не вдалося підключитися до сервера');
    } finally {
      setLoading(false);
    }
  };

  const renderModalContent = () => {
    if (success) {
      return (
        <div className="modal-overlay">
          <div style={{ background: '#ffffff', padding: '35px', borderRadius: '20px', width: '100%', maxWidth: '420px', boxShadow: '0 15px 35px rgba(0,0,0,0.15)', fontFamily: 'system-ui, -apple-system, sans-serif', textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '32px', fontWeight: '800', color: '#003366', letterSpacing: '-0.5px' }}>Дякуємо!</h2>
            <p style={{ fontSize: '16px', color: '#555', marginBottom: '24px' }}>
              Ваш канал успішно відправлено на модерацію.
            </p>
            <button 
              onClick={closeModal} 
              style={{ width: '100%', padding: '16px 0', background: '#2078D4', color: '#ffffff', fontWeight: '700', fontSize: '18px', border: 'none', borderRadius: '12px', cursor: 'pointer' }}
            >
              Зрозуміло!
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="modal-overlay">
        <div className="form-modal">
          <button className="close-btn" onClick={closeModal} disabled={loading}>×</button>

          <h2 className="form-title">Додати ютуб-канал</h2>

          <p className="form-warning">
            <strong>Увага: розглядаються лише україномовні канали, російськомовні не додаються!</strong><br />
            Перевірте, чи каналу ще немає на сайті. Статус запиту можна відстежувати в акаунті.
          </p>

          {error && (
            <div style={{ color: '#e74c3c', textAlign: 'center', margin: '15px 0' }}>{error}</div>
          )}

          <form onSubmit={handleSubmit} className="add-channel-form">
            <div className="form-group">
              <label htmlFor="url" className="form-label">URL-адреса каналу <span className="required">*</span></label>
              <input type="text" id="url" name="url" value={formData.url} onChange={handleInputChange} placeholder="https://www.youtube.com/@channelname" className="form-input" required disabled={loading} />
            </div>

            <div className="form-group">
              <label className="form-label">Опис каналу (до {MAX_DESC} символів) <span className="required">*</span></label>
              <div style={{ position: 'relative', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden', background: '#fff' }}>
                <MDXEditor
                  markdown={formData.description}
                  onChange={handleDescriptionChange}
                  plugins={[headingsPlugin(), linkPlugin(), quotePlugin(), toolbarPlugin({ toolbarContents: () => (<><BoldItalicUnderlineToggles /><CodeToggle /><CreateLink /></>), }),]}
                  contentEditableClassName="prose max-w-none min-h-[120px] p-3 focus:outline-none text-base"
                  placeholder="Введіть опис каналу..."
                  readOnly={loading}
                />
                <div style={{ position: 'absolute', bottom: '6px', right: '10px', background: formData.description.length > MAX_DESC ? '#e74c3c' : 'rgba(0,0,0,0.55)', color: 'white', padding: '3px 7px', borderRadius: '3px', fontSize: '0.82rem', pointerEvents: 'none' }}>
                  {formData.description.length} / {MAX_DESC}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Тематика каналу (до 3 категорій) <span className="required">*</span></label>
              <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} placeholder="Наприклад: Історія України, кулінарія, технології" className="form-input" required disabled={loading} />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Відправка...' : 'Відправити'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <section className="add-channel-section">
      {isAuth ? (
        <div className="add-channel-card">
          <h3 className="card-title">Додати ютуб-канал</h3>
          <p className="card-text">
            Заповніть форму, щоб запропонувати канал.<br />
            <strong>Увага: розглядаються лише україномовні канали, російськомовні не додаються!</strong><br />
            Перевірте, чи каналу ще немає на сайті. Статус запиту можна відстежувати в акаунті.<br />
            Додавання безкоштовне. Дякуємо за підтримку українського контенту!
          </p>
          <button onClick={openModal} className="card-btn">
            Заповнити форму
          </button>
        </div>
      ) : (
        <div className="add-channel-card">
          <h3 className="card-title">Додати ютуб-канал</h3>
          <p className="card-text">
            Заповніть форму, щоб запропонувати канал.<br />
            <strong>Увага: розглядаються лише україномовні канали, російськомовні не додаються!</strong><br />
            Перевірте, чи каналу ще немає на сайті. Статус запиту можна відстежувати в акаунті.<br />
            Додавання безкоштовне. Дякуємо за підтримку українського контенту!
          </p>
          <button className="card-btn">
            Увійти або зареєструватися
          </button>
        </div>
      )}

      {isOpen && renderModalContent()}
    </section>
  );
};

export default AddChannelForm;