import { App } from './App';

/**
 * Main application entry point
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize the application
        const app = new App();
        console.log('Mesto Russia application initialized successfully');
    } catch (error) {
        console.error('Failed to initialize application:', error);
        
        // Show user-friendly error message
        const errorMessage = document.createElement('div');
        errorMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff4444;
            color: white;
            padding: 20px;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            z-index: 10000;
            text-align: center;
        `;
        errorMessage.innerHTML = `
            <h3>Ошибка загрузки приложения</h3>
            <p>Пожалуйста, обновите страницу или попробуйте позже.</p>
            <small>${error instanceof Error ? error.message : 'Неизвестная ошибка'}</small>
        `;
        document.body.appendChild(errorMessage);
    }
});