import commonJS from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";
import typescript from "@rollup/plugin-typescript";
import deletePlugin from "rollup-plugin-delete";
import postcss from "rollup-plugin-postcss";

const production = process.env.NODE_ENV === "production";

export default {
  input: "src/index.tsx",

  output: {
    file: "public/index.js",
    format: "iife",
    sourcemap: !production,
  },
  plugins: [
    deletePlugin({
      targets: ["public/**", "!public", "!public/index.html", "!public/*.ico"],
    }),
    resolve({}),
    commonJS({
      include: "node_modules/**",
    }),
    postcss({
      extensions: [".scss"],
      extract: false,
      use: ["sass"],
      minimize: production,
    }),
    typescript(),
    !production && sourcemaps(),
  ],
  watch: {
    include: "src/**",
  },
};
