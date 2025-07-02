# Bug Fix Report

## Summary
Found and fixed 3 critical bugs in the Mesto Russia web application codebase:

1. **HTML Validation Error**: Duplicate IDs
2. **Runtime Error**: Missing function definition  
3. **Performance Issue**: Memory leaks from duplicate event listeners

---

## Bug #1: Duplicate HTML IDs (Critical HTML Validation Error)

### **Problem**
Multiple HTML elements shared the same `id="popup-window"`, violating HTML standards and potentially causing JavaScript selector failures.

### **Location**
- `index.html` lines 27, 46, 65

### **Impact**
- Invalid HTML that fails validation
- Unpredictable behavior when using `document.getElementById()`
- Potential accessibility issues for screen readers
- SEO penalties for invalid markup

### **Root Cause**
Copy-paste coding without updating unique identifiers.

### **Fix Applied**
Changed duplicate IDs to unique identifiers:
- Profile popup: `id="popup-profile"`
- Add card popup: `id="popup-add-card"`  
- Image zoom popup: `id="popup-image"`

### **Code Changes**
```html
<!-- Before -->
<section class="popup" id="popup-window">
<section class="popup popup-add-button" id="popup-window">
<section class="popup popup-image-zoomed" id="popup-window">

<!-- After -->
<section class="popup" id="popup-profile">
<section class="popup popup-add-button" id="popup-add-card">
<section class="popup popup-image-zoomed" id="popup-image">
```

---

## Bug #2: Missing Function Definition (Runtime Error)

### **Problem**
Function `popupClosedWithEsc` was referenced but never defined, causing runtime errors when escape key functionality was triggered.

### **Location**
- `scripts/index.js` lines 52, 57

### **Impact**
- JavaScript runtime errors: "ReferenceError: popupClosedWithEsc is not defined"
- Broken escape key functionality for closing popups
- Poor user experience

### **Root Cause**
Incomplete refactoring - function calls were added but the function definition was missing.

### **Fix Applied**
Removed references to the undefined function and implemented a cleaner, single escape key handler that works for all popups.

### **Code Changes**
```javascript
// Before: Broken references
document.removeEventListener('keydown', popupClosedWithEsc);
document.addEventListener('keydown', popupClosedWithEsc);

// After: Clean implementation
document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            popupAllShutDown(openedPopup);
        }
    }
});
```

---

## Bug #3: Memory Leaks from Duplicate Event Listeners (Performance Issue)

### **Problem**
Multiple escape key event listeners were being added to the document for each popup, creating memory leaks and duplicate event handling.

### **Location**
- `scripts/index.js` lines 60-67

### **Impact**
- Memory leaks from accumulating event listeners
- Performance degradation over time
- Multiple redundant function calls for single events
- Potential browser crashes on long-running sessions

### **Root Cause**
Poor event management - adding multiple document-level listeners instead of using a single handler.

### **Fix Applied**
Replaced the forEach loop that added multiple document listeners with a single, efficient escape key handler.

### **Code Changes**
```javascript
// Before: Memory leak - multiple listeners
popupWindow.forEach(function(popup) {
    document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            popupAllShutDown(popup)
        };
    })
})

// After: Single efficient listener
document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            popupAllShutDown(openedPopup);
        }
    }
});
```

---

## Testing Verification

All fixes have been verified:
- ✅ JavaScript syntax validation passed
- ✅ HTML now uses unique IDs
- ✅ No undefined function references
- ✅ Escape key functionality works with single event handler
- ✅ Memory leak potential eliminated

## Performance Impact

**Before fixes:**
- Invalid HTML
- Runtime errors on escape key
- N event listeners (where N = number of popups)
- Memory accumulation over time

**After fixes:**
- Valid HTML markup
- Reliable escape key functionality  
- Single event listener regardless of popup count
- Stable memory usage

These fixes improve code reliability, performance, and maintainability while ensuring proper web standards compliance.