// Adds subpath exports to the published package.json so consuming apps can
// `@use 'pkg:@underlayerdev/ui/design-tokens'`, `.../breakpoints`, or
// `.../containers` in Sass. ng-packagr doesn't know about these subpaths (it
// only tracks JS/TS entry points), so they're patched in after `ng build ui`
// runs.
import { readFileSync, writeFileSync } from 'node:fs';

const pkgPath = 'dist/ui/package.json';
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

pkg.exports ??= {};
pkg.exports['./design-tokens/*'] = './design-tokens/*';
pkg.exports['./breakpoints/*'] = './breakpoints/*';
pkg.exports['./containers/*'] = './containers/*';

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(
  'Patched dist/ui/package.json with ./design-tokens/*, ./breakpoints/*, and ./containers/* exports',
);
