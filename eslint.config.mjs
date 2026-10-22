import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/**
 * ESLint flat config.
 *
 * `eslint` and `eslint-config-next` were both installed but there was no
 * config file of any kind, so linting had never run once — ESLint 9 needs
 * this file and exits with an error without it. Rather than drop two
 * dependencies that should be earning their place, this turns them on.
 *
 * eslint-config-next 16 exports native flat configs from its subpaths, so
 * they are imported directly. (The FlatCompat bridge that older guides
 * recommend throws a circular-structure error against this version.)
 */
export default [
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Unused code is the main thing this is here to catch. A leading
      // underscore marks a parameter that is deliberately ignored — route
      // handlers take a Request they never read.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      /*
       * next.config.ts sets `images.unoptimized: true`, which it must for
       * `output: 'export'`. Under that setting next/image renders a plain
       * <img> with extra wrapper DOM and optimises nothing, so the rule's
       * advice — "use next/image to automatically optimize" — has no
       * effect here beyond adding markup.
       */
      '@next/next/no-img-element': 'off',
    },
  },
];
