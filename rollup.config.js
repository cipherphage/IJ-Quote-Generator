import resolve, { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json' assert { type: "json" };

export default {
    input: './src/index.tsx',
    output: [
        {
            file: pkg.module,
            format: "esm",
            sourcemap: true,
            strict: true,
            name: 'react-natural-typing-effect'
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        postcss({ extensions: ['.css'] }),
        terser()
    ],
    external: ['react', 'react-dom']
};