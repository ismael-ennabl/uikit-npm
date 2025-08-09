import type { Preview, Decorator } from '@storybook/react-vite'
// Load component library styles
import '../lib/styles/index.css'
// Load app tailwind styles so shadcn-based UI components render correctly in Storybook
import '../src/index.css'
// Optional theme (tweakcn) overrides, scoped by data-theme attribute
import '../src/styles/themes/tweakcn.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme for Storybook preview',
      defaultValue: 'default',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default' },
          { value: 'tweakcn', title: 'Tweakcn' },
        ],
        dynamicTitle: true,
      },
    },
  },
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

// Decorator to apply selected theme by toggling a data attribute on <html>
export const decorators: Decorator[] = [
  (Story, context) => {
    const theme = context.globals.theme ?? 'default';
    const root = document.documentElement;
    if (theme === 'default') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', String(theme));
    }
    return Story();
  },
];

export default preview;