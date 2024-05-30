# Trieve - Search demo

## Requirements

We want you to scape the obsidian plugin directory at https://obsidian.md/plugins and upload each plugin as a chunk to our API.

After you have successfully uploaded all of the chunks to the service, we want you to create a frontend which mimics the UI of obsidian as it is now and implement searching functionality similar to them.

To start, you should create an account at https://dashboard.trieve.ai and create a dataset. Then, use the create chunk route to upload each chunk. You can use one of the search routes to search over the chunks.

For reference, our api docs are at https://docs.trieve.ai and https://api.trieve.ai/redoc.

## Components

Web Scraper 
	target: https://obsidian.md/plugins 
	Selenium
	Beautiful Soup (BS4)

React App

## Notes

Needed to use Selenium because Obsidian is a dynamic site. Parse with Beautiful Soup. 

Highlighting is not functional because I am using metadata to populate values, but only `chunk_html` is highlighted

Download counts were not scraped.

Scraper does not include all plugins: the Obsidian plugin page updates and removes results dynamically according to current view, and it's challenging to scrape all data under those conditions. 

I did not implement paging in the search results (limited to `page_size` in search request).

## Installation and Usage

### Scraper/ Chunker

install geckodriver (Chrome) for Selenium: https://www.selenium.dev/selenium/docs/api/py/#drivers

`cd tools`

create virtual environment:

`python3 -m venv venv`

set virtual environment:

`source venv/bin/activate`

install required modules: 

`pip3 install -r requirements.txt`

(if needed) update `scraper_chunker.py` values: `target_url`, `tr_organization`, `tr_dataset`, `tr_apikey`

run scraper and upload chunks to Trieve: `python3 scraper_chunker.py`

### React App

install dependencies from `package.json`:

`yarn`

run web app:

`yarn start`