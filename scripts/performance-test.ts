// Performance test utilities
import { PerformanceMonitor, createDomCache, debounce, throttle } from './utils.js';

// Test DOM query performance
const testDomQueryPerformance = (): void => {
    const monitor = new PerformanceMonitor();
    monitor.start();
    
    // Simulate multiple DOM queries (before optimization)
    for (let i = 0; i < 100; i++) {
        document.querySelector('.popup');
        document.querySelector('.profile');
        document.querySelector('.elements');
    }
    
    const beforeMetrics = monitor.end();
    console.log('Before optimization - DOM queries:', beforeMetrics.domQueries);
    
    // Test cached DOM queries (after optimization)
    const monitor2 = new PerformanceMonitor();
    monitor2.start();
    
    const getPopup = createDomCache<HTMLElement>('.popup');
    const getProfile = createDomCache<HTMLElement>('.profile');
    const getElements = createDomCache<HTMLElement>('.elements');
    
    for (let i = 0; i < 100; i++) {
        getPopup();
        getProfile();
        getElements();
    }
    
    const afterMetrics = monitor2.end();
    console.log('After optimization - DOM queries:', afterMetrics.domQueries);
    console.log('Performance improvement:', ((beforeMetrics.executionTime - afterMetrics.executionTime) / beforeMetrics.executionTime * 100).toFixed(2) + '%');
};

// Test event listener performance
const testEventListenerPerformance = (): void => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    // Create test elements
    for (let i = 0; i < 100; i++) {
        const element = document.createElement('div');
        element.className = 'test-element';
        element.textContent = `Element ${i}`;
        container.appendChild(element);
    }
    
    const monitor = new PerformanceMonitor();
    monitor.start();
    
    // Before: Individual event listeners
    const elements = container.querySelectorAll('.test-element');
    elements.forEach(element => {
        element.addEventListener('click', () => {
            console.log('Clicked:', element.textContent);
        });
    });
    
    const beforeMetrics = monitor.end();
    console.log('Before optimization - Event listeners:', beforeMetrics.eventListeners);
    
    // After: Event delegation
    const monitor2 = new PerformanceMonitor();
    monitor2.start();
    
    container.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('test-element')) {
            console.log('Clicked:', target.textContent);
        }
    });
    
    const afterMetrics = monitor2.end();
    console.log('After optimization - Event listeners:', afterMetrics.eventListeners);
    console.log('Memory efficiency improvement:', ((beforeMetrics.eventListeners - afterMetrics.eventListeners) / beforeMetrics.eventListeners * 100).toFixed(2) + '%');
    
    // Cleanup
    document.body.removeChild(container);
};

// Test debounce performance
const testDebouncePerformance = (): void => {
    let callCount = 0;
    const expensiveFunction = () => {
        callCount++;
        console.log('Function called:', callCount);
    };
    
    const debouncedFunction = debounce(expensiveFunction, 100);
    
    console.log('Testing debounce performance...');
    
    // Simulate rapid calls
    for (let i = 0; i < 10; i++) {
        debouncedFunction();
    }
    
    setTimeout(() => {
        console.log('Final call count:', callCount);
        console.log('Debounce efficiency: Reduced from 10 calls to', callCount, 'calls');
    }, 200);
};

// Test throttle performance
const testThrottlePerformance = (): void => {
    let callCount = 0;
    const expensiveFunction = () => {
        callCount++;
        console.log('Throttled function called:', callCount);
    };
    
    const throttledFunction = throttle(expensiveFunction, 100);
    
    console.log('Testing throttle performance...');
    
    // Simulate rapid calls
    const interval = setInterval(() => {
        throttledFunction();
    }, 10);
    
    setTimeout(() => {
        clearInterval(interval);
        console.log('Final call count:', callCount);
        console.log('Throttle efficiency: Limited calls to', callCount, 'over 1 second');
    }, 1000);
};

// Run all performance tests
const runPerformanceTests = (): void => {
    console.log('=== TypeScript Performance Optimization Tests ===\n');
    
    console.log('1. DOM Query Performance Test:');
    testDomQueryPerformance();
    console.log('\n');
    
    console.log('2. Event Listener Performance Test:');
    testEventListenerPerformance();
    console.log('\n');
    
    console.log('3. Debounce Performance Test:');
    testDebouncePerformance();
    console.log('\n');
    
    console.log('4. Throttle Performance Test:');
    testThrottlePerformance();
    console.log('\n');
    
    console.log('=== Performance Tests Complete ===');
};

// Export for use in other modules
export {
    testDomQueryPerformance,
    testEventListenerPerformance,
    testDebouncePerformance,
    testThrottlePerformance,
    runPerformanceTests
};

// Auto-run tests if this file is executed directly
if (typeof window !== 'undefined') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runPerformanceTests);
    } else {
        runPerformanceTests();
    }
}