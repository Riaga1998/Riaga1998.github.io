# Papers

PDFs linked from the portfolio. Filenames are referenced directly in
`index.html`, so keep them exactly as listed below.

## Expected files

Filenames must be lowercase with hyphens and no spaces, since spaces
become `%20` in URLs.

| Filename | Status | Reference |
|---|---|---|
| `brassica-mir156-mir172.pdf` | present | Agarwal R., Dhaka N., Sharma R., Jatain A. "Genome-wide evolutionary analysis of precursor sequences of MIR156 and MIR172 family members in Brassica species." *Research Journal of Biotechnology* 16(4), April 2021, pp 81-92. |
| `wi-vi-poster.pdf` | not added | "Wi-Vi (Wireless Vision): Seeing Through Walls Using Wi-Fi Signals." Student poster, AmiFest, Amity University, 2018. The publications row stays unlinked until this file exists. |

## Adding the Wi-Vi poster

1. Copy the file here as `wi-vi-poster.pdf`
2. In `index.html`, find the Wi-Vi `pub-row` (currently a `<div>`) and turn it
   back into a link:
   - change `<div class="pub-row">` to
     `<a class="pub-row" href="papers/wi-vi-poster.pdf" target="_blank" rel="noopener">`
   - change the closing `</div>` to `</a>`
   - add `<div class="pub-ext">&#8599;</div>` before the closing tag
   - add `<span class="pub-badge">PDF</span>` to the `pub-meta` line
