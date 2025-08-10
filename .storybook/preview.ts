import type { Preview } from '@storybook/react-vite';
// Library component styles (if present)
// import '../lib/styles/index.css'
// App Tailwind and CSS variables (single theme)
import '../src/index.css';
// UI Kit CSS (ensure design tokens/styles are available)
import 'ennabl-ui-kit-beta/dist/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    docs: {
      source: {
        state: 'open',
      },
      autodocs: true,
    },
    layout: 'fullscreen',
  },
};

export default preview;