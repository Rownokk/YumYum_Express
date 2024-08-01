import React from 'react';
import './AppDownload.css';
import { FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';

const AppDownload = () => {
    const faqData = [
        {
            question: "What is the delivery time?",
            answer: "Delivery times typically range from 30 to 60 minutes, depending on your location and the restaurant's current order volume."
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
            question: "What should I do if my food is incorrect or missing?",
            answer: "If there’s an issue with your order, please contact our customer support through the app or call our hotline. We'll assist you with resolving the issue."
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

