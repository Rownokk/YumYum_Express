import React from 'react';
import './AppDownload.css';
import { FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';

const AppDownload = () => {
    const faqData = [
        {
            question: "What is the return policy?",
            answer: "You can return any item within 30 days of purchase. Make sure it is in its original condition."
        },
        {
            question: "How can I track my order?",
            answer: "You can track your order using the tracking number provided in the confirmation email."
        },
        {
            question: "What payment methods are accepted?",
            answer: "We accept all major credit cards, PayPal, and Apple Pay."
        },
        {
            question: "How do I contact customer service?",
            answer: "You can contact customer service via email at support@example.com or call us at (123) 456-7890."
        }
    ];

    return (
        <div className='faq' id='faq'>
            <div className="faq-container">
                <h2 className="faq-title">Frequently Asked Questions</h2>
                {faqData.map((item, index) => (
                    <div key={index} className="faq-item">
                        <div className="faq-question-container">
                            <FaQuestionCircle className="faq-icon" />
                            <p className="faq-question">{item.question}</p>
                        </div>
                        <div className="faq-answer-container">
                            <FaCheckCircle className="faq-icon" />
                            <p className="faq-answer">{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AppDownload;

