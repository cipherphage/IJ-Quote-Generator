import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json' assert { type: "json" };

export default {
    input: './src/index.tsx',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
            strict: true,
            name: 'react-typing-effect'
        }

    ],
    plugins: [
        typescript({ tsconfig: './tsconfig.json' }),
        postcss({ extensions: ['.css'] }),
        terser()
    ],
    external: ['react', 'react-dom']
};