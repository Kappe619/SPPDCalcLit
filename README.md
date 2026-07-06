# SPPD Calculator

SPPD Calculator is being rebuilt as a TypeScript web app using Lit. The app will calculate upgrade cap costs for a deck of cards, let the user enter available caps, configure up to 12 cards by rarity and level, and show the total cost plus the remaining buffer.

## Features

- Tracks available caps entered by the user.
- Shows 12 card calculation panels.
- Supports four card rarities: Common, Rare, Epic, and Legendary.
- Supports card levels 1 through 7.
- Calculates individual card costs based on rarity and level.
- Displays total deck cost.
- Displays the remaining buffer and highlights it when the cost exceeds the available caps.

## Project Structure

```text
src/
    app.ts
    main.ts
    data.ts
    types.ts
    styles.css
    components/
        card-panel.ts
index.html
package.json
tsconfig.json
```

## Main Files

- `src/app.ts` is the main Lit app entry point.
- `src/components/card-panel.ts` will host one card calculator panel.
- `src/data.ts` contains the cap cost lookup table.
- `src/types.ts` defines shared types for the app.

## Cost Calculation

Each card cost is selected from the fixed cost tables in `src/data.ts`.

When the user changes a card rarity or level, the app can recalculate that card's cost. The total deck cost is then compared with the available caps to derive the remaining buffer.

## Cap Cost Overview

| Rarity | Level 1 | Level 2 | Level 3 | Level 4 | Level 5 | Level 6 | Level 7 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Common | 0 | 0 | 0 | 0 | 100 | 275 | 575 |
| Rare | 0 | 0 | 0 | 125 | 325 | 650 | 1075 |
| Epic | 0 | 0 | 175 | 425 | 800 | 1275 | 1825 |
| Legendary | 0 | 200 | 475 | 875 | 1375 | 1950 | 2575 |

## Requirements

- Node.js
- npm

## Running the App

1. Install dependencies with `npm install`.
2. Start the dev server with `npm run dev`.
3. Open the local Vite URL in your browser.
