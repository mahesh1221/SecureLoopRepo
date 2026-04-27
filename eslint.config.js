import base from '@secureloop/eslint-config/base';
import react from '@secureloop/eslint-config/react';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/coverage/**',
      '**/.turbo/**',
      '**/*.tsbuildinfo',
      '**/next-env.d.ts',
      '.claude/worktrees/**',
      'scripts/**',
    ],
  },
  ...base,
  ...react.slice(base.length).map((cfg) => ({
    ...cfg,
    files: [
      'apps/**/*.{ts,tsx}',
      'packages/ui/**/*.{ts,tsx}',
      'packages/design-system/**/*.{ts,tsx}',
    ],
  })),
];
