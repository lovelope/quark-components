module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'git add --force'],
  '*.{json,md,html}': ['prettier --write', 'git add --force'],
  '*.{css,less}': ['prettier --write', 'git add --force'],
};
