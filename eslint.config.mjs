import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add custom rules here
  {
    rules: {
      // Turn off no-explicit-any error
      "@typescript-eslint/no-explicit-any": "off",
      
      // Warn on unused vars instead of error
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];

export default eslintConfig;
