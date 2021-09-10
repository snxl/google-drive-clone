module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        `airbnb-base`,
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: `module`,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
    },
    plugins: [
        `prefer-arrow`,
    ],
    rules: {
        'no-console': `off`,
        'import/prefer-default-export': `off`,
        'import/extensions': `off`,
        indent: [
            `error`,
            4,
        ],
        'linebreak-style': [
            `error`,
            `unix`,
        ],
        quotes: [
            `error`, `single`, { allowTemplateLiterals: true },
        ],
        semi: [
            `error`,
            `always`,
        ],
        'class-methods-use-this': 'off',
        'no-useless-constructor': 'off',
        'no-empty-function': 'off',
        'no-restricted-syntax': 'off',
        'guard-for-in': 'off',
        'no-underscore-dangle': 'off',
    },
    ignorePatterns: `**/*.test.js`,
};
