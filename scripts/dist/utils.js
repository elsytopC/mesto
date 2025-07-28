class PerformanceMonitor {
    constructor() {
        this.metrics = {
            domQueries: 0,
            eventListeners: 0,
            executionTime: 0
        };
        this.startTime = 0;
    }
    start() {
        this.startTime = performance.now();
    }
    end() {
        this.metrics.executionTime = performance.now() - this.startTime;
        return { ...this.metrics };
    }
    incrementDomQueries() {
        this.metrics.domQueries++;
    }
    incrementEventListeners() {
        this.metrics.eventListeners++;
    }
    getMetrics() {
        return { ...this.metrics };
    }
}
// DOM query optimization
const createDomCache = (selector) => {
    let cachedElement = null;
    let hasQueried = false;
    return () => {
        if (!hasQueried) {
            cachedElement = document.querySelector(selector);
            hasQueried = true;
        }
        return cachedElement;
    };
};
// Event delegation helper
const createEventDelegator = (container, selector, handler) => {
    container.addEventListener('click', (event) => {
        const target = event.target;
        const matchedElement = target.closest(selector);
        if (matchedElement) {
            handler(event, matchedElement);
        }
    });
};
// Debounce utility for performance
const debounce = (func, wait) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), wait);
    };
};
// Throttle utility for performance
const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};
// Memory-efficient array operations
const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
};
// Efficient object cloning
const shallowClone = (obj) => {
    return { ...obj };
};
// Type-safe null checks
const isElement = (value) => {
    return value instanceof HTMLElement;
};
const isFormElement = (value) => {
    return value instanceof HTMLFormElement;
};
// Export utilities
export { PerformanceMonitor, createDomCache, createEventDelegator, debounce, throttle, chunkArray, shallowClone, isElement, isFormElement };
