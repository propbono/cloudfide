# File Tree Explorer

A modern, responsive file tree explorer application built with React 19, TypeScript, and Vite. This application allows users to visualize and navigate a hierarchical file structure with ease.

## 🏗️ Architectural Decisions

This project was built with a focus on performance, maintainability, and modern development practices.

### Tech Stack & Rationale
- **React 19 & Vite**: Selected for the latest concurrent features and an ultra-fast development experience (HMR). The build process is optimized for production.
- **TypeScript**: Enforced strict typing to prevent runtime errors and improve developer experience with better tooling support.
- **Tailwind CSS**: Utilized for rapid UI development, ensuring a consistent design system without the overhead of writing custom CSS files or CSS-in-JS runtime costs.
- **React Router v6**: Implements client-side routing to manage views (Home, Tree View) effectively.

### Key Implementation Details
- **State Management**: We use React's **Context API** (`TreeContext`) for global state management. Given the application's current scope, this avoids the boilerplate of external libraries like Redux while still providing a clean way to share the tree state across components.
- **Recursive Rendering**: The tree structure is rendered using recursive components (`TreeNodeItem`). This is the most natural and readable way to handle hierarchical data of arbitrary depth.
- **Persistence**: Data is persisted using `localStorage`, allowing users to retain their tree structure across sessions without requiring a backend service.
- **Linting & Formatting**: `Biome` is used for extremely fast linting and formatting, ensuring code quality and consistency.

## 🚀 Future Improvements (What I would do with more time)

If given more time, the following enhancements would be prioritized to scale the application and improve UX:

1.  **Virtualization**: Implementing windowing (e.g., using `react-window` or `tanstack-virtual`) to handle large datasets (10k+ nodes) efficiently. Currently, rendering a massive tree all at once would impact DOM performance.
2.  **Advanced State Management**: Migrating to **Zustand** or **Jotai** for more granular state updates and better performance selectors if the state complexity grows.
3.  **Drag & Drop**: Implementing `dnd-kit` or `react-dnd` to allow users to reorganize files and folders intuitively.
4.  **Accessibility (a11y)**: Enhancing keyboard navigation (arrow keys to traverse the tree) and ensuring full ARIA compliance for screen readers.
5.  **Comprehensive Testing**:
    - Adding **E2E tests** (Playwright or Cypress) to verify critical user flows.
    - Increasing unit test coverage for complex logic like tree traversal and search algorithms.
6.  **Lazy Loading**: Implementing asynchronous loading of folder contents to support backend integration and reduce initial load time for large trees.

## ⚠️ Known Limitations & Mitigation Strategies

While the current implementation serves as a solid MVP, there are several limitations inherent to the architectural choices made for simplicity. Below is a detailed breakdown of these limitations and how they can be overcome in a production-grade application.

### 1. Performance & Scalability
- **Limitation**:
  - **Recursive Rendering**: The tree is rendered recursively. For extremely deep trees (100+ levels) or folders with thousands of items, this will cause significant DOM bloating and main-thread blocking, leading to UI lag.
  - **Synchronous Search**: The search algorithm runs on the main thread. Searching a tree with 50k+ nodes will freeze the UI until the operation completes.
- **Strategy to Overcome**:
  - **Virtualization**: Implement `react-window` or `react-virtuoso` to only render nodes currently visible in the viewport. This makes rendering performance independent of total tree size.
  - **Web Workers**: Offload the search and heavy data processing logic to a Web Worker to keep the main thread responsive.

### 2. Data Persistence
- **Limitation**:
  - **Local Storage Quota**: The entire tree is stored in `localStorage`, which is synchronous and typically capped at ~5MB. Large tree structures will fail to save, and reading/writing large JSON strings can block the main thread.
- **Strategy to Overcome**:
  - **IndexedDB**: Switch to `IndexedDB` (using a wrapper like `idb` or `dexie.js`) for asynchronous storage with significantly higher quotas (hundreds of MBs).

### 3. Accessibility (a11y)
- **Limitation**:
  - **Keyboard Navigation**: While tab-navigable, the tree does not support standard ARIA tree interactions (e.g., using Arrow keys to traverse, expand, and collapse nodes).
  - **Screen Readers**: The current implementation lacks full `role="tree"` and `role="treeitem"` semantics required for optimal screen reader experiences.
- **Strategy to Overcome**:
  - **Headless UI Libraries**: Adopt `react-aria` (specifically `useTree`) or Radix UI to handle complex accessibility logic, focus management, and keyboard interactions automatically.

### 4. Search Experience
- **Limitation**:
  - **Flat Results**: Search results are displayed as a flat list. While the path is shown, the visual hierarchy of the tree is lost during search, making it harder to understand the context of a result.
- **Strategy to Overcome**:
  - **Tree Filtering**: Instead of a flat list, implement a filter that preserves the tree structure, automatically expanding relevant parent folders and dimming unrelated nodes.


## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Run linting and formatting
pnpm lint

# Run typecheck
pnpm typecheck
```
