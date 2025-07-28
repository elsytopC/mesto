// Performance monitoring utilities
interface PerformanceMetrics {
    domQueries: number;
    eventListeners: number;
    memoryUsage?: number;
    executionTime: number;
}

class PerformanceMonitor {
    private metrics: PerformanceMetrics = {
        domQueries: 0,
        eventListeners: 0,
        executionTime: 0
    };

    private startTime: number = 0;

    start(): void {
        this.startTime = performance.now();
    }

    end(): PerformanceMetrics {
        this.metrics.executionTime = performance.now() - this.startTime;
        return { ...this.metrics };
    }

    incrementDomQueries(): void {
        this.metrics.domQueries++;
    }

    incrementEventListeners(): void {
        this.metrics.eventListeners++;
    }

    getMetrics(): PerformanceMetrics {
        return { ...this.metrics };
    }
}

// DOM query optimization
const createDomCache = <T extends HTMLElement>(selector: string): (() => T | null) => {
    let cachedElement: T | null = null;
    let hasQueried = false;

    return (): T | null => {
        if (!hasQueried) {
            cachedElement = document.querySelector(selector) as T;
            hasQueried = true;
        }
        return cachedElement;
    };
};

// Event delegation helper
const createEventDelegator = <T extends Event>(
    container: HTMLElement,
    selector: string,
    handler: (event: T, target: HTMLElement) => void
): void => {
    container.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        const matchedElement = target.closest(selector);
        
        if (matchedElement) {
            handler(event as T, matchedElement as HTMLElement);
        }
    });
};

// Debounce utility for performance
const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: number;
    
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), wait);
    };
};

// Throttle utility for performance
const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Memory-efficient array operations
const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
};

// Efficient object cloning
const shallowClone = <T extends object>(obj: T): T => {
    return { ...obj };
};

// Type-safe null checks
const isElement = (value: unknown): value is HTMLElement => {
    return value instanceof HTMLElement;
};

const isFormElement = (value: unknown): value is HTMLFormElement => {
    return value instanceof HTMLFormElement;
};

// Export utilities
export {
    PerformanceMonitor,
    createDomCache,
    createEventDelegator,
    debounce,
    throttle,
    chunkArray,
    shallowClone,
    isElement,
    isFormElement,
    type PerformanceMetrics
};