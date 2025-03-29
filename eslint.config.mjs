import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import unusedImports from "eslint-plugin-unused-imports";
import jest from "eslint-plugin-jest";

export default [
  {
    // Apply to all TypeScript & JavaScript files
    ignores: ["dist/**", "build/**", "node_modules/**"],
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2019,
      sourceType: "module",
      globals: {
        ...jest.environments.globals.globals,
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier,
      "no-unsanitized": noUnsanitized,
      "unused-imports": unusedImports,
      "import": importPlugin,
      jest,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      "import/extensions": [".ts", ".tsx"],
      "react": { version: "detect" },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...jest.configs.recommended.rules,

      // Prettier
      "prettier/prettier": "error",

      // TypeScript Rules
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
      "@typescript-eslint/no-use-before-define": ["error", { classes: false, functions: false }],

      // Import Rules
      "import/order": [
        "error",
        {
          "alphabetize": { order: "asc", caseInsensitive: false },
          "groups": ["builtin", "external", "internal", "index", "object", "parent", "sibling", "unknown"],
          "newlines-between": "never",
        },
      ],
      "import/namespace": ["error", { allowComputed: true }],
      "import/newline-after-import": ["error", { count: 1 }],
      "import/no-duplicates": ["error", { considerQueryString: true }],
      "import/no-cycle": "error",
      "import/no-unresolved": ["error", { ignore: ["^.+\\.svg\\?inline$"] }],

      // General JS Rules
      "no-debugger": "warn",
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "prefer-const": ["error", { destructuring: "any", ignoreReadBeforeAssign: false }],
      "quotes": ["error", "double", { avoidEscape: true, allowTemplateLiterals: false }],

      // Security Rules
      "security/detect-non-literal-fs-filename": "off",
      "security/detect-object-injection": "off", // Can be turned on later
      "security/detect-non-literal-regexp": "off", // Only relevant for Node.js servers

      // Unused Imports
      "unused-imports/no-unused-imports": "error",

      // Other Rules
      "require-await": "error",
    },
  },
];
