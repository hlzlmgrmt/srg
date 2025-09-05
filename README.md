# Srg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

Current status: Development.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project structure

This project consists of three modules.

### Wiki
The wiki is the main module of the project. It provides the router for the other modules, and provides the main navigation elements for the page.

The wiki module supplies a single-page application that renders static pages, located within the `assets/pages` resource path. The main navigation component 
parses status JSON file located at `assets/pages`, and computes the navigation element, its corresponding route, and displayed pages.

### Character Sheet

### Gamemasters' Tools

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
