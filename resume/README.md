# Résumé

`resume.html` is the source of `static/resume.pdf`, the public résumé the site links to.

It follows the site's content rules: no phone number, the fitness employer is never named, and
no number is added, changed or rounded. It uses the site's fonts from `node_modules`, so run
`npm install` first.

To rebuild the PDF after an edit, print the page with headless Chrome (US Letter, no header or
footer), from the repo root:

```sh
chrome --headless=new --no-pdf-header-footer --print-to-pdf=static/resume.pdf resume/resume.html
```

Then check it is still two pages and that page two starts at a job heading.
