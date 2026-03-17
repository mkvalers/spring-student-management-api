---
name: react
description: "Get best practices for developing applications with React."
---

# React Best Practices

Your goal is to help me write high-quality React applications by following modern, established best practices.

## Project Setup & Structure

- **Tooling:** Use Vite for project scaffolding and bundling.
- **Language:** Use TypeScript for type safety and better developer experience.
- **Structure:** Organize by feature/domain, not by type (e.g., `src/features/students/`, not `src/components/`, `src/hooks/`).
- **Absolute Imports:** Configure path aliases (e.g., `@/features/...`) via `tsconfig.json` and `vite.config.ts`.

## Components

- **Functional Components:** Always use functional components with hooks. Never use class components.
- **Single Responsibility:** Each component should do one thing. Split large components into smaller, focused ones.
- **Props Typing:** Always define prop types with TypeScript interfaces or types.
- **Default Exports:** Use default exports for page-level components; named exports for shared/reusable components.

## State Management

- **Local State:** Use `useState` for simple, component-scoped state.
- **Derived State:** Compute derived values during render instead of storing them in state.
- **Server State:** Use a data-fetching library (e.g., TanStack Query) for server state — avoid managing loading/error/data manually with `useEffect`.
- **Global State:** Use Zustand or React Context (with `useReducer`) for lightweight global state. Avoid prop drilling beyond 2 levels.

## Hooks

- **Custom Hooks:** Extract reusable stateful logic into custom hooks prefixed with `use` (e.g., `useStudents`).
- **Dependency Arrays:** Always specify correct and complete dependency arrays in `useEffect`, `useMemo`, and `useCallback`.
- **Avoid Overuse:** Do not reach for `useMemo`/`useCallback` prematurely — only use them when there is a measurable performance issue.
- **Cleanup:** Always return a cleanup function from `useEffect` when subscribing to events, timers, or external resources.

## Data Fetching

- **TanStack Query:** Use `useQuery` for GET requests and `useMutation` for POST/PUT/DELETE.
- **API Layer:** Centralize all API calls in a dedicated service layer (e.g., `src/services/studentService.ts`) using `axios` or `fetch`.
- **Error Boundaries:** Use React Error Boundaries to catch and display errors gracefully.

## Forms

- **React Hook Form:** Use `react-hook-form` for form state and validation. Avoid controlled inputs with `useState` for complex forms.
- **Schema Validation:** Pair with `zod` for schema-based validation and type inference.

## Routing

- **React Router v6+:** Use `createBrowserRouter` with the data API (loaders/actions) for routing.
- **Lazy Loading:** Use `React.lazy` and `Suspense` to code-split at the route level.
- **Protected Routes:** Wrap authenticated routes in a guard component that checks auth state.

## Styling

- **Scoped Styles:** Use CSS Modules or a utility-first library like Tailwind CSS. Avoid global CSS except for resets and design tokens.
- **Component Libraries:** Use headless UI libraries (e.g., Radix UI, shadcn/ui) for accessible, unstyled primitives.

## Performance

- **Memoization:** Use `React.memo` to prevent unnecessary re-renders of pure components that receive stable props.
- **List Keys:** Always use stable, unique keys (not array index) when rendering lists.
- **Virtualization:** Use `TanStack Virtual` or `react-window` for long lists.

## Testing

- **Unit/Component Tests:** Use Vitest + React Testing Library. Test behavior, not implementation details.
- **Queries:** Prefer `getByRole`, `getByLabelText` over `getByTestId` to write accessible-first tests.
- **Mocking:** Mock API calls at the network level using `msw` (Mock Service Worker).

## Security

- **Avoid `dangerouslySetInnerHTML`:** Never use it with unsanitized user input.
- **Environment Variables:** Prefix public env vars with `VITE_`. Never expose secrets in the client bundle.
- **Auth Tokens:** Store JWTs in memory or `httpOnly` cookies. Avoid `localStorage` for sensitive tokens.
