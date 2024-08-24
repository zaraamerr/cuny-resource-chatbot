# Cuny-Resource-Chatbot

# What's The Problem?
While Hunter provides students with a plethora of resources that can be found on their websites, it’s rather tedious and difficult to locate the resources sometimes. Webpages contain links to other webpages and students find themselves going down rabbit holes to find exactly what they’re looking for. It’s time-consuming and inconvenient if a student is facing an emergency and needs a resource urgently.

# What's The Solution?
Our solution was to create a chatbot made for and by Hunter students. It will give students in-depth accurate information on mental health, food assistance, housing initiatives, and more quickly, efficiently, and accurately. By simply asking the chatbot any question regarding resources, students can receive answers almost instantaneously without the extra clicks and tabs. Whether they want to see the most recent events Hunter is hosting, financial aid workshops, mental health resources, or important deadlines, the chatbot has it handy and ready to go as soon as you ask.

# How we built it
We used Python, specifically Scrapy and BeautifulSoup, to scrape information off of several Hunter websites and store it in a CSV file. We trained our Gemini chatbot with that data. Then, we built a clean and accessible interface with React where the user can interact with and query the chatbot for all their needs.

# Challenges we ran into
Zara: It was my first time doing web-scraping and it was really fun, but a little difficult to clean up and preprocess the information taken off the web for the chatbot to use. Allison: Deciding the platform for building the chatbot that best suited our goals. At first, I tried to use DialogFlow but found it too rigid since it could only take in information in FAQ format. It was also my first time using the tech stack in this project! Lots of troubleshooting and figuring out the finicky dependencies. Anita: I never had any experience with express.js so it was hard configuring the Gemini API with it. Aaleia: I had trouble integrating CUNY/Hunter events since we weren't able to access an existing API. It was also challenging to build an interactive calendar using React without having prior experience.

# Accomplishments that we're proud of
Getting the chatbot to work!! We're also proud of stepping out of our comfort zones and using technologies we've rarely ever used before.

# What we learned
How to work collaboratively on Github, learn about the vast amount of resources Hunter provides, get comfortable with React, Express, and Python, learn new ways to process data, use an LLM AI, and deploy our site.

# What's next for HawkHelper
We would like to expand to other CUNYs. We're all Hunter students, so we decided to tackle our own college's resource accessibility. But, HawkHelper will expand to all CUNYs and become CUNYHelper! We also want to make this chatbot into a Google Chrome extension that can be installed and used while surfing the websites, as well as a mobile app for on-the-go inquiries! We also want to give users the ability to make profiles in the future as well as full confidentiality concerning their requests.

# Video Walkthrough
Here is a walkthrough of our web app: 
<img src='https://github.com/zaraamerr/cuny-resource-chatbot/blob/prototype2/myapp/public/CTP%20Hackathon.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

# Technologies Used 
- Python
- React
- Express.js
- HTML
- CSS
- JavaScipt 
- Gemini API
