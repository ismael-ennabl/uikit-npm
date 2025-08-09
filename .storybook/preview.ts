import type { Preview } from '@storybook/react-vite'
// Load component library styles
import '../lib/styles/index.css'
// Load app tailwind styles so shadcn-based UI components render correctly in Storybook
import '../src/index.css'
// Theme overrides: unify default styling to tweakcn palette
import '../src/styles/themes/tweakcn.css'

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