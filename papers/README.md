# Papers

PDFs linked from the portfolio. Filenames are referenced directly in
`index.html`, so keep them exactly as listed below.

## Expected files

| Filename | Reference |
|---|---|
| `brassica-mir156-mir172.pdf` | Agarwal R., Dhaka N., Sharma R., Jatain A. "Genome-wide evolutionary analysis of precursor sequences of MIR156 and MIR172 family members in Brassica species." *Research Journal of Biotechnology* 16(4), April 2021, pp 81-92. |
| `wi-vi-poster.pdf` | "Wi-Vi (Wireless Vision): Seeing Through Walls Using Wi-Fi Signals." Student poster, AmiFest, Amity University, 2018. *(not yet added; the publications row is unlinked until this file exists)* |

## Adding the Wi-Vi poster

1. Copy the file here as `wi-vi-poster.pdf`
2. In `index.html`, find the Wi-Vi `pub-row` (currently a `<div>`) and turn it
   back into a link:
   - change `<div class="pub-row">` to
     `<a class="pub-row" href="papers/wi-vi-poster.pdf" target="_blank" rel="noopener">`
   - change the closing `</div>` to `</a>`
   - add `<div class="pub-ext">&#8599;</div>` before the closing tag
   - add `<span class="pub-badge">PDF</span>` to the `pub-meta` line
