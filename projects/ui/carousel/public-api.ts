// Secondary entry point (`@underlayerdev/ui/carousel`), not re-exported from
// the root barrel: CarouselComponent pulls in @splidejs/splide (~36 kB
// minified), and the root entry ships as a single FESM file — anything that
// imports even one symbol from it (ButtonComponent, in every app shell)
// drags the whole file's dependency graph along, splide included, whether
// or not that consumer ever uses a carousel. A real module boundary is what
// actually stops that; nothing on the import side can.
//
// The component's own source lives in this folder too, not in
// src/components/carousel/ re-exported from here: ng-packagr's secondary
// entry points need to own their files — a public-api.ts that only
// re-exports a file from outside its own directory tree makes ng-packagr's
// internal dependency graph crash on external templateUrl/styleUrl
// resolution ("Cannot destructure property 'pos' of
// 'file.referencedFiles[index]' as it is undefined").
export * from './carousel';
