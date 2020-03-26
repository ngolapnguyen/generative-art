module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [2, "always", ["feature", "fix", "test"]],
        "references-empty": [2, "never"]
    },
    parserPreset: {
        parserOpts: {
            issuePrefixes: ["GA-"]
        }
    }
};
