import React, { useState } from 'react';
import AddChannelModal from './AddChannelModal';
import Registration from '../Registration/Registration';
import './AddChannelForm.css';

const AddChannelForm = ({ isAuth }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegOpen, setIsRegOpen] = useState(false);

  const openModal = () => {
    console.log('[AddChannelForm] Opening modal');
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const openRegistration = () => setIsRegOpen(true);
  const closeRegistration = () => setIsRegOpen(false);


  const renderAuthView = () => (
    <div className="add-channel-card">
      <h3 className="card-title">Додати ютуб-канал</h3>
      <p className="card-text">
        Заповніть форму, щоб запропонувати канал. <strong>Увага: розглядаються лише україномовні канали, російськомовні не додаються! </strong> Перевірте, чи каналу ще немає на сайті. Статус запиту можна відстежувати в акаунті. Додавання безкоштовне. Дякуємо за підтримку українського контенту!
      </p>
      <button onClick={openModal} className="card-btn">Заповнити форму</button>
    </div>
  );

  const renderGuestView = () => (
    <div className="add-channel-card">
      <h3 className="card-title">Додати ютуб-канал</h3>
      <p className="card-text">
        Хочете поділитися цікавим україномовним каналом? Додайте його на U2U, щоб більше українців могли дізнатися про нових авторів! <strong>Увага: розглядаються лише україномовні канали!</strong><br />
        Щоб запропонувати канал, <strong>увійдіть у свій акаунт</strong> і заповніть просту форму.
      </p>
      <button className="card-btn" onClick={openRegistration}>
        Увійти або зареєструватися
      </button>
    </div>
  );

  return (
    <section className="add-channel-section">
      {isAuth ? renderAuthView() : renderGuestView()}

      {isModalOpen && <AddChannelModal onClose={closeModal} />}

      <Registration 
        open={isRegOpen} 
        onClose={closeRegistration} 
      />
    </section>
  );
};

export default AddChannelForm;