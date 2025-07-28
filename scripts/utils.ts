// Performance optimization utilities
export class PerformanceOptimizer {
    private static readonly debounceCache = new Map<string, number>();
    private static readonly throttleCache = new Map<string, number>();

    /**
     * Debounce function calls to improve performance
     */
    static debounce<T extends (...args: any[]) => any>(
        func: T,
        delay: number,
        key?: string
    ): (...args: Parameters<T>) => void {
        return (...args: Parameters<T>) => {
            const cacheKey = key || func.toString();
            const existingTimeout = this.debounceCache.get(cacheKey);
            
            if (existingTimeout) {
                clearTimeout(existingTimeout);
            }
            
            const timeoutId = window.setTimeout(() => {
                func(...args);
                this.debounceCache.delete(cacheKey);
            }, delay);
            
            this.debounceCache.set(cacheKey, timeoutId);
        };
    }

    /**
     * Throttle function calls to limit execution frequency
     */
    static throttle<T extends (...args: any[]) => any>(
        func: T,
        delay: number,
        key?: string
    ): (...args: Parameters<T>) => void {
        return (...args: Parameters<T>) => {
            const cacheKey = key || func.toString();
            const lastCall = this.throttleCache.get(cacheKey);
            const now = Date.now();
            
            if (!lastCall || now - lastCall >= delay) {
                func(...args);
                this.throttleCache.set(cacheKey, now);
            }
        };
    }

    /**
     * Memoize function results for better performance
     */
    static memoize<T extends (...args: any[]) => any>(
        func: T,
        keyGenerator?: (...args: Parameters<T>) => string
    ): T {
        const cache = new Map<string, ReturnType<T>>();
        
        return ((...args: Parameters<T>): ReturnType<T> => {
            const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
            
            if (cache.has(key)) {
                return cache.get(key)!;
            }
            
            const result = func(...args);
            cache.set(key, result);
            return result;
        }) as T;
    }
}

// DOM utilities for better performance
export class DOMUtils {
    private static readonly elementCache = new Map<string, HTMLElement | null>();
    private static readonly elementsCache = new Map<string, HTMLElement[]>();

    /**
     * Cached DOM element query with better performance
     */
    static querySelector<T extends HTMLElement>(selector: string): T | null {
        if (this.elementCache.has(selector)) {
            return this.elementCache.get(selector) as T | null;
        }
        
        const element = document.querySelector(selector) as T | null;
        this.elementCache.set(selector, element);
        return element;
    }

    /**
     * Cached DOM elements query with better performance
     */
    static querySelectorAll<T extends HTMLElement>(selector: string): T[] {
        if (this.elementsCache.has(selector)) {
            return this.elementsCache.get(selector)! as T[];
        }
        
        const elements = Array.from(document.querySelectorAll(selector)) as T[];
        this.elementsCache.set(selector, elements);
        return elements;
    }

    /**
     * Clear DOM cache when elements might have changed
     */
    static clearCache(): void {
        this.elementCache.clear();
        this.elementsCache.clear();
    }

    /**
     * Safe element creation with error handling
     */
    static createElement<K extends keyof HTMLElementTagNameMap>(
        tagName: K,
        attributes?: Record<string, string>
    ): HTMLElementTagNameMap[K] {
        const element = document.createElement(tagName);
        
        if (attributes) {
            Object.entries(attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }
        
        return element;
    }

    /**
     * Batch DOM operations for better performance
     */
    static batchDOMOperations(operations: (() => void)[]): void {
        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
            operations.forEach(operation => operation());
        });
    }
}

// Event utilities for better memory management
export class EventUtils {
    private static readonly eventListeners = new Map<Element, Map<string, EventListener>>();

    /**
     * Add event listener with automatic cleanup tracking
     */
    static addEventListener(
        element: Element,
        event: string,
        listener: EventListener,
        options?: AddEventListenerOptions
    ): void {
        element.addEventListener(event, listener, options);
        
        if (!this.eventListeners.has(element)) {
            this.eventListeners.set(element, new Map());
        }
        
        const elementListeners = this.eventListeners.get(element)!;
        const key = `${event}_${listener.toString()}`;
        elementListeners.set(key, listener);
    }

    /**
     * Remove event listener with cleanup
     */
    static removeEventListener(
        element: Element,
        event: string,
        listener: EventListener
    ): void {
        element.removeEventListener(event, listener);
        
        const elementListeners = this.eventListeners.get(element);
        if (elementListeners) {
            const key = `${event}_${listener.toString()}`;
            elementListeners.delete(key);
        }
    }

    /**
     * Clean up all event listeners for an element
     */
    static cleanupElement(element: Element): void {
        const elementListeners = this.eventListeners.get(element);
        if (elementListeners) {
            elementListeners.forEach((listener, key) => {
                const [event] = key.split('_');
                if (event) {
                    element.removeEventListener(event, listener);
                }
            });
            elementListeners.clear();
        }
        this.eventListeners.delete(element);
    }

    /**
     * Clean up all event listeners
     */
    static cleanupAll(): void {
        this.eventListeners.forEach((elementListeners, element) => {
            elementListeners.forEach((listener, key) => {
                const [event] = key.split('_');
                if (event) {
                    element.removeEventListener(event, listener);
                }
            });
        });
        this.eventListeners.clear();
    }
}

// Type-safe utilities
export class TypeUtils {
    /**
     * Type guard for checking if value is not null or undefined
     */
    static isDefined<T>(value: T | null | undefined): value is T {
        return value !== null && value !== undefined;
    }

    /**
     * Type guard for checking if value is a string
     */
    static isString(value: unknown): value is string {
        return typeof value === 'string';
    }

    /**
     * Type guard for checking if value is a number
     */
    static isNumber(value: unknown): value is number {
        return typeof value === 'number' && !isNaN(value);
    }

    /**
     * Type guard for checking if value is a function
     */
    static isFunction(value: unknown): value is Function {
        return typeof value === 'function';
    }

    /**
     * Safe type assertion with runtime check
     */
    static assertType<T>(value: unknown, typeGuard: (value: unknown) => value is T): T {
        if (typeGuard(value)) {
            return value;
        }
        throw new Error(`Value ${value} does not match expected type`);
    }
}

// Export all utilities
export { PerformanceOptimizer as Perf, DOMUtils as DOM, EventUtils as Events, TypeUtils as Types };