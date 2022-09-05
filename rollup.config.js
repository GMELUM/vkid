import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";

const extensions = ['.js', '.ts'];

export default {
    input: `./src/index.tsx`,
    output: [
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            plugins: [terser()],
            sourcemap: false,
        },
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            plugins: [terser()],
            sourcemap: false,
        },
        {
            file: 'dist/index.umd.js',
            format: 'umd',
            name: 'loginVKID',
            plugins: [terser()],
            sourcemap: false,
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve({ extensions }),
        commonjs(),
        typescript()
    ]
}