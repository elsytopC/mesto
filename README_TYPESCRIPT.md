# Mesto Russia - TypeScript Version

This is a TypeScript rewrite of the original Mesto Russia project, featuring improved type safety, better code organization, and modern JavaScript practices.

## 🚀 Features

- **TypeScript**: Full type safety and better developer experience
- **Modular Architecture**: Clean separation of concerns with component-based design
- **Object-Oriented Design**: Classes for Cards, Profile, and Popup management
- **Form Validation**: Robust form validation with TypeScript interfaces
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Modern ES6+**: Uses modern JavaScript features and ES modules

## 📁 Project Structure

```
src/
├── types/
│   └── index.ts          # TypeScript type definitions
├── components/
│   ├── Card.ts           # Card component class
│   └── Profile.ts        # Profile component class
├── utils/
│   ├── popup.ts          # Popup management utilities
│   └── validation.ts     # Form validation utilities
├── data/
│   └── cards.ts          # Initial card data
├── App.ts                # Main application class
└── index.ts              # Application entry point
```

## 🛠️ Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Watch for changes**:
   ```bash
   npm run watch
   ```

## 🏗️ Build Commands

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and recompile
- `npm run clean` - Remove compiled files
- `npm run dev` - Build and serve the project
- `npm start` - Build and serve on port 3000

## 🏛️ Architecture

### Components

#### Card Component (`src/components/Card.ts`)
- Manages individual photo cards
- Handles like/unlike functionality
- Manages delete animations
- Type-safe event handling

#### Profile Component (`src/components/Profile.ts`)
- Manages user profile data
- Handles profile updates
- Avatar management
- Form data synchronization

### Utilities

#### Popup Management (`src/utils/popup.ts`)
- `Popup` class for individual popup management
- `PopupManager` singleton for global popup control
- Keyboard event handling (Escape key)
- Overlay click handling

#### Form Validation (`src/utils/validation.ts`)
- Comprehensive form validation
- Custom error messages
- Real-time validation feedback
- Button state management

### Main Application (`src/App.ts`)
- Orchestrates all components
- Manages DOM element initialization
- Handles global event listeners
- Error handling and recovery

## 🔧 TypeScript Features

### Type Safety
- Strict type checking enabled
- Interface definitions for all data structures
- Generic types for reusable components
- Union types for flexible APIs

### Error Handling
- Comprehensive error boundaries
- Type-safe error messages
- Graceful degradation
- User-friendly error display

### Code Organization
- Modular imports/exports
- Clear separation of concerns
- Consistent naming conventions
- Comprehensive documentation

## 🎯 Key Improvements

1. **Type Safety**: Eliminates runtime errors through compile-time type checking
2. **Maintainability**: Better code organization and modular architecture
3. **Scalability**: Easy to extend with new features
4. **Developer Experience**: Better IDE support and debugging
5. **Error Handling**: Robust error handling with user feedback
6. **Performance**: Optimized event handling and DOM manipulation

## 🔄 Migration from JavaScript

The TypeScript version maintains full compatibility with the original JavaScript version while adding:

- Type definitions for all data structures
- Class-based component architecture
- Improved error handling
- Better code organization
- Enhanced developer experience

## 📝 Usage

The application works exactly like the original version:

1. **Profile Editing**: Click the edit button to modify profile information
2. **Adding Cards**: Click the "+" button to add new photo cards
3. **Card Interaction**: Like/unlike cards, delete cards, view full-size images
4. **Form Validation**: Real-time validation with helpful error messages

## 🐛 Troubleshooting

If you encounter issues:

1. **Build Errors**: Check TypeScript compilation with `npm run build`
2. **Runtime Errors**: Check browser console for detailed error messages
3. **Missing Elements**: Ensure all required DOM elements are present
4. **Module Issues**: Verify ES module support in your browser

## 📄 License

MIT License - see original project for details.

## 🤝 Contributing

This TypeScript version maintains the same functionality as the original while providing a more robust and maintainable codebase. Contributions are welcome!