import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
    '@app/api/*', '@api/client/*'
])