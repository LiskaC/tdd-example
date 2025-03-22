import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import stylistic from '@stylistic/eslint-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      '@stylistic': stylistic,
      '@stylistic/ts': stylistic
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@stylistic/indent': ['error', 2],
      '@stylistic/max-len': ['error', { 'code': 80, 'ignoreStrings': true }],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/ts/semi': ['error', 'never'],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/quotes': ['error', 'single']
    }
  }
]

export default eslintConfig
