# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
import uuid
from itemadapter import ItemAdapter
from bs4 import BeautifulSoup
from langchain_experimental.text_splitter import SemanticChunker
from langchain_openai.embeddings import OpenAIEmbeddings
from openai import OpenAI
from qdrant_client import models, QdrantClient


class HunterresourcesPipeline:
    def process_item(self, item, spider):
        return item

class BodyTxtConverterPipeline:
    # use beautifulsoup to convert html to text
    def process_item(self, item, spider):
        content_as_string = ' '.join(item['content'])
        item['plain_body'] = BeautifulSoup(content_as_string, 'html.parser').get_text()

        return item
    
# class TextSplitterPipeline:
#     def open_spider(self, spider):
#         self.text_splitter = SemanticChunker(
#             OpenAIEmbeddings(), breakpoint_threshold_type="percentile"
#         )

#     def process_item(self, item, spider):
#         docs = self.text_splitter.create_documents([item['plain_body']])
#         item['chunks'] = []
#         for doc in docs:
#             text = doc.page_content.replace("\n", " ")
#             item['chunks'].append(text)
#         return item