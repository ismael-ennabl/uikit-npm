import type { Preview } from '@storybook/react-vite'
// Library component styles
import '../lib/styles/index.css'
// App Tailwind and CSS variables (single theme)
import '../src/index.css'
// UI Kit CSS (ensure design tokens/styles are available)
import 'ennabl-ui-kit-beta/dist/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    docs: {
      // Show the full source code in the docs
      source: {
        state: 'open'
      }
    },

    layout: 'fullscreen',
  },
};

export default preview;