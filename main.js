import { Actor } from 'apify';
import { CheerioCrawler } from 'crawlee';

await Actor.main(async () => {
    const input = await Actor.getInput();
    const {
        category = 'autos',
        location = 'region-metropolitana',
        maxResults = 20,
        proxyConfiguration = { useApifyProxy: true }
    } = input;
    
    // Build start URL
    let startUrl = `https://www.yapo.cl/${category}`;
    if (location && location !== 'chile') {
        startUrl += `/${location}`;
    }
    
    console.log(`Starting Yapo.cl scraper`);
    console.log(`Category: ${category} | Location: ${location} | Max: ${maxResults}`);
    
    const proxyConfig = proxyConfiguration?.useApifyProxy 
        ? await Actor.createProxyConfiguration(proxyConfiguration)
        : undefined;
    
    let itemCount = 0;
    
    const crawler = new CheerioCrawler({
        proxyConfiguration: proxyConfig,
        requestHandlerTimeoutSecs: 60,
        maxRequestRetries: 3,
        
        async requestHandler({ request, $, log }) {
            log.info(`Processing: ${request.url}`);
            
            // Extract listings from page
            const listings = [];
            
            // Yapo listings: <div class="listing_thumbs"> contains ads
            $('div.listing_thumbs > div').each((i, el) => {
                if (itemCount >= maxResults) return false;
                
                const $el = $(el);
                const $link = $el.find('h2 a, h3 a').first();
                const title = $link.text().trim();
                const url = $link.attr('href');
                
                if (!title || !url) return;
                
                const fullUrl = url.startsWith('http') ? url : `https://www.yapo.cl${url}`;
                const price = $el.find('.price, [class*="price"]').first().text().trim() || null;
                const location = $el.find('.location, [class*="location"], [class*="region"]').first().text().trim() || null;
                const image = $el.find('img').first().attr('src') || null;
                const description = $el.find('.description, .excerpt, p').first().text().trim() || null;
                
                listings.push({
                    title,
                    price,
                    location,
                    url: fullUrl,
                    image,
                    description,
                    category,
                    scrapedAt: new Date().toISOString()
                });
                
                itemCount++;
            });
            
            log.info(`Extracted ${listings.length} listings from this page`);
            
            // Push to dataset
            if (listings.length > 0) {
                await Actor.pushData(listings);
            }
        },
        
        failedRequestHandler({ request, log }) {
            log.error(`Request ${request.url} failed`);
        },
    });
    
    await crawler.run([startUrl]);
    
    console.log(`Scraping complete! Total items: ${itemCount}`);
});
