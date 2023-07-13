import {fileURLToPath} from 'node:url'
import {mergeConfig} from 'vite'
import {configDefaults, defineConfig} from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: 'jsdom',
            exclude: [...configDefaults.exclude, 'e2e/*'],
            root: fileURLToPath(new URL('./src/', import.meta.url)),
            transformMode: {
                web: [/\.[jt]sx$/]
            },
            coverage: {
                all: true,
                provider: 'istanbul',
                reportsDirectory: './src/components/coverage',
                reporter: ['text', 'json'],
                exclude: ['main.ts', 'shims-vue.d.ts', 'coverage/**/*', 'App.vue', 'views/**/*', 'router/**/*'],

            }
        }
    })
)
