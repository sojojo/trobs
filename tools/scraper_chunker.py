from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup 
import logging
import requests
import time

target_url = "https://obsidian.md/plugins"

tr_url = "https://api.trieve.ai/api/chunk"
tr_organization = "1abdd605-4489-41d2-93fd-a1c9393a48d3"
tr_dataset = "98d5f5aa-4f78-488d-9b9a-06e218296d36"
tr_apikey = "tr-fTc046hbE6cYBrYsGoyzoQNkqtCAbWyH"

logger = logging.getLogger(__name__)

# ignore the empty div tags that look like plugin data
def check_content(tag):
	return tag.find('div') and len(tag.contents) > 0

# scrape html data
def scrape_html():
	browser = webdriver.Chrome()

	browser.get(target_url)

	browser.maximize_window()

	# ensure that the page has fully loaded 
	time.sleep(20)

	# TODO - selenium: scroll through slowly to get all content

	# render everything and store information in static HTML 
	html = browser.page_source 
	browser.close()

	# use Beautiful Soup and Python's html.parser
	soup = BeautifulSoup(html, "html.parser") 

	f = open("obsidian.html", "w")
	f.write(soup.prettify())
	f.close()

	# get all first level divs in the plugin container
	plugin_container = soup.find('div', class_="plugins-container") 
	plugins = plugin_container.find_all(check_content, recursive=False) 
	logger.info("number of plugins: %d" % len(plugins))
	return plugins


# create Trieve chunks from plugin html
def create_chunk_data(plugin_html):
	chunks = []
	for plugin in plugin_html:
		name = plugin.find('div', class_="leading-tight").text
		author = plugin.find('p').text.replace(u'By\xa0', u'')
		description = plugin.find('div', class_="py-3").text.replace('\n','')
		link = plugin.find('div', class_="mt-auto").find('div').find('a', class_="ml-auto").get('href')

		chunk_html = "%s\n%s\n%s" % (name, author, description)
		metadata = {
			"name":name,
			"author":author,
			"description":description,
			"link":link
		}
		chunks.append({
			"chunk_html":chunk_html, 
			"link":link,
			"metadata":metadata
		})
	return chunks

def load_chunk_data(chunks):
	header = {
		"Content-Type": "application/json",
	    "TR-Organization": tr_organization,
	    "TR-Dataset": tr_dataset,
	    "Authorization": tr_apikey
	}
	for chunk in chunks:
		response = requests.post(tr_url, json=chunk, headers=header)
		logger.info(response.status_code)
		logger.info(response.reason)
		logger.info(response.text)

if __name__ == '__main__':
	logging.basicConfig(filename='myapp.log', level=logging.INFO)
	html = scrape_html()
	chunks = create_chunk_data(html)
	load_chunk_data(chunks)