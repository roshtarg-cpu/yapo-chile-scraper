# Yapo.cl Chile Classifieds Scraper

Extract classified listings from Yapo.cl, Chile's largest marketplace for vehicles, real estate, jobs, and general merchandise.

## Features

- **Fast Cheerio-powered scraping** - No browser overhead
- **Multiple categories** - Vehicles, real estate, jobs, marketplace
- **Regional filtering** - Target specific Chilean regions
- **Clean JSON output** - Title, price, location, image, URL
- **Proxy support** - Built-in Apify proxy rotation
- **Rate limiting** - Respectful scraping with retries

## Categories

- `autos` - Vehicles (cars, motorcycles)
- `bienes-raices` - Real Estate (sale & rent)
- `empleos` - Jobs
- `marketplace` - General items

## Input

```json
{
  "category": "autos",
  "location": "region-metropolitana",
  "maxResults": 20
}
```

## Output

```json
{
  "title": "Toyota Corolla 2020",
  "price": "$12.500.000",
  "location": "Santiago, Región Metropolitana",
  "url": "https://www.yapo.cl/...",
  "image": "https://...",
  "description": "...",
  "category": "autos",
  "scrapedAt": "2026-09-05T04:25:00.000Z"
}
```

## Use Cases

- Market research for Chilean market
- Price monitoring
- Inventory aggregation
- Real estate analysis
- Job market trends

## Compatible with AI Agents

Use via **Apify MCP** integration with Claude, ChatGPT, and other AI assistants for automated data collection.

---

**Note:** Respects Yapo.cl's terms of service. Use responsibly and in compliance with local regulations.
