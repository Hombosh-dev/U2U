import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import QACard from '../../components/QACard/QACard';

const About = () => {
    const [qaData, setQaData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/db.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setQaData(data.qa);
                setError(null);
            } catch (error) {
                setError(error.message);
                console.error("Failed to fetch Q&A data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="about-page">
            <div className="about-container">
                <div className="breadcrumbs">
                    <Link to="/">Головна</Link> / <Link to="/about">Про проєкт</Link>
                </div>

                <section className="about-section">
                    <h1 className="section-title">Про проєкт</h1>
                    <div className="about-text">
                        <p>
                            <strong>U2U: Ukrainians to Ukrainians</strong> — простір для українців, які шукають україномовний контент, що надихає та відповідає їхнім інтересам. Після початку повномасштабного вторгнення, для багатьох українців постало питання: як відмовитися від російськомовного контенту та знайти якісну альтернативу українською? Ми створили U2U, щоб зробити цей шлях простішим і приємнішим, об'єднуючи в одному місці найкращі україномовні ресурси.
                        </p>
                        <p>
                            Наш сайт призначений для молоді, яка хоче відкривати нове та унікальне. На U2U ви знайдете добірки від популярних YouTube-каналів до менш відомих, але не менш цікавих українських креаторів, що заслуговують на увагу.
                        </p>
                        <p>
                            Наша місія — зробити український контент більш доступним, підтримати розвиток українських контент-мейкерів і надати платформу, де кожен може знайти щось для себе. З U2U ви відкриєте, наскільки різнобарвним та цікавим є український інформаційний простір.
                        </p>
                        <p>
                            У майбутньому ми плануємо розширити платформу і включити до неї музику, ігри українського виробництва. Ми віримо, що кожен зможе знайти вітчизняний контент для душі, відкрити нових авторів та насолодитися українською культурою.
                        </p>
                        <p>
                            <strong>U2U — українці для українців. Разом ми будуємо простір для себе та про себе.</strong>
                        </p>
                    </div>
                </section>

                <section className="qa-section">
                    <h2 className="section-title">Питання та відповіді</h2>
                    <div className="qa-list">
                        {loading && <p>Loading Q&A...</p>}
                        {error && console.log("Error fetching data:", error)}
                        {qaData && qaData.map((item) => (
                            <QACard key={item.id} question={item.question} answer={item.answer} />
                        ))}
                    </div>
                </section>

                <section className="suggestions-section">
                    <h2 className="section-title">Маєш пропозиції для покращення сайту?</h2>
                    <form className="suggestions-form">
                        <label htmlFor="suggestion">Напишіть пропозиції</label>
                        <textarea
                            id="suggestion"
                            placeholder="Напр. “Додати коментарі”"
                        />
                        <button type="submit">Відправити</button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default About;
