# NextJS Note - here, the reminder

## _app.tsx
The file is used to initialize the pages. 
- Persist layout between page changes
- Keep state when navigating pages
- Inject additional data into pages
- Add global CSS

It is used for the application shell, including things like naviagtion and layout that are consistent across all the pages

## _document.tsx
This file is used to augment the application's <html> and <body> tags.
It is rendered on the server side, so we can't add event handlers or browser-only apis here.
It is typically used for
- Changing the initial server side rendered document markup
- Adding custom attributes to the <html> or <body> tags
- Adding external stylesheets or scripts

It is used to modify the initial HTML document that is rendered on the server