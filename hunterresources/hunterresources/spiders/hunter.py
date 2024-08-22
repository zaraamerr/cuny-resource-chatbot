# This package will contain the spiders of your Scrapy project
#
# Please refer to the documentation for information on how to create and manage
# your spiders.

import scrapy
from hunterresources.items import HunterItem
import csv

class HunterresourcesSpider(scrapy.Spider):
    name = 'hunter'
    allowed_domains = ['hunter.cuny.edu']
    start_urls = ['https://hunter.cuny.edu/students/health-wellness/emergency-support-resources/', 
                  'https://hunter.cuny.edu/students/health-wellness/counseling-and-wellness-services/', 
                  'https://hunter.cuny.edu/students/health-wellness/accessibility/',
                  'https://hunter.cuny.edu/students/health-wellness/accessibility/services-and-programs/access-technology-center/',
                  'https://hunter.cuny.edu/students/health-wellness/accessibility/services-and-programs/cuny-leads/',
                  'https://hunter.cuny.edu/students/health-wellness/accessibility/services-and-programs/note-taking-services/',
                  'https://hunter.cuny.edu/students/health-wellness/accessibility/guidelines-forms/alternative-testing-instructions-and-testing-arrangement-form/',
                  'https://hunter.cuny.edu/students/health-wellness/behavioral-response-team/',
                  'https://hunter.cuny.edu/diversity-and-compliance/workplace-violence/',
                  'https://hunter.cuny.edu/hunterhelpers/about/',
                ]
    
    def __init__(self):
        self.csv_file = open('output.csv', 'w', newline='', encoding='utf-8')
        self.csv_writer = csv.writer(self.csv_file)
        self.csv_writer.writerow(['title', 'content', 'links'])

    def parse(self, response):
        item = HunterItem()

        # Example: Extract all text under a specific section, like emergency resources
        item['title'] = response.css('h1::text').get()
         # Extracting and cleaning all paragraph and list item text across the entire page
        raw_content = response.css('p::text, li::text').getall()
        cleaned_content = [text.strip() for text in raw_content if text.strip()]  # Removes empty strings and whitespace
        
        item['content'] = cleaned_content

        raw_links = response.css('.a:link, a::attr(href)').getall()
        unique_links = list(set(raw_links))  # Convert to set to remove duplicates, then back to list
        
        item['links'] = unique_links

        # Write data to CSV
        self.csv_writer.writerow([item['title'], ' '.join(item['content']), ', '.join(item['links'])])
        
        yield item

    def closed(self, reason):
        self.csv_file.close()
