import { FlatCompat } from "@eslint/eslintrc";
import { SemicolonPreference } from "typescript";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next", "prettier"],
    plugins: ["prettier"], // Runs Prettier as an ESLint rule
    rules: {
      semi: ["error"],
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
    },
  }),
];

export default eslintConfig;
