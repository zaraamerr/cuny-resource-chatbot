const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 5000;

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");

// Load environment variables from .env
require("dotenv").config();

// console.log(process.env)

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

async function uploadToGemini(path, mimeType) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  return file;
}

async function waitForFilesActive(files) {
  console.log("Waiting for file processing...");
  for (const name of files.map((file) => file.name)) {
    let file = await fileManager.getFile(name);
    while (file.state === "PROCESSING") {
      process.stdout.write(".");
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      file = await fileManager.getFile(name);
    }
    if (file.state !== "ACTIVE") {
      throw Error(`File ${file.name} failed to process`);
    }
  }
  console.log("...all files ready\n");
}

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 0,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  // TODO Make these files available on the local file system
  // You may need to update the file paths
  const files = [await uploadToGemini("output.csv", "text/csv")];

  // Some files have a processing delay. Wait for them to be ready.
  await waitForFilesActive(files);

  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {
            fileData: {
              mimeType: files[0].mimeType,
              fileUri: files[0].uri,
            },
          },
          {
            text: "You will answer questions that students will ask you about Hunter resources. You will only use the data provided to you. When applicable you will provide links to supplement your response. But only relevant links that the data has provided.  ",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Okay, I'm ready to answer questions about Hunter resources based on the data you provided. Ask away! 😊 \n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "I have recently gone homeless. what can hunter do to help me?",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "I understand this is a difficult situation.  Hunter does offer several resources that might be helpful:\n\n* **Emergency Support and Resources:**  This page lists several programs and resources for students, including food assistance programs and laptop loan programs. It also mentions the Affordable Connectivity Program, which could help with internet access.  [https://hunter.cuny.edu/students/health-wellness/emergency-support-resources/](https://hunter.cuny.edu/students/health-wellness/emergency-support-resources/)\n* **Counseling & Wellness Services:** This department provides mental health counseling, crisis intervention, and referrals. They may be able to connect you with community resources that address homelessness. [https://hunter.cuny.edu/students/health-wellness/counseling-and-wellness-services/](https://hunter.cuny.edu/students/health-wellness/counseling-and-wellness-services/)\n\nIt's important to remember that you can reach out to the Dean of Students office at **dean.of.students@hunter.cuny.edu** for additional support and guidance. They may be able to provide more specific information on homelessness resources. \n\nI hope this information helps.  Remember, you are not alone, and there are people who can help. \n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "i am disabled and need accommodations. who can i contact for this? ",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "You're in the right place to find help! Hunter College has a dedicated office for students with disabilities:\n\n**Office of AccessABILITY**\n\n* **Mission:** To ensure a comprehensively accessible college experience for all students with disabilities.\n* **Services:** They provide a wide range of services, including:\n    * Alternative testing arrangements\n    * Note-taking services\n    * Reader services\n    * Access technology training (through the Access & Technology Center)\n    * Advocacy and support\n    * And more!\n\nYou can find more information about their specific services and resources on their website: [https://hunter.cuny.edu/students/health-wellness/accessibility/](https://hunter.cuny.edu/students/health-wellness/accessibility/)\n\n**Contact Information:**\n\n* **Phone:** 212-772-4000\n\nDon't hesitate to reach out to them for support. They are there to help you succeed at Hunter! 😊 \n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "i need help taking notes because i broke my hand. what should i do?\n",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "It sounds like you need some assistance with note-taking while you recover. Here's what I recommend you do:\n\n1. **Contact the Office of AccessABILITY:**  They can help you get the accommodations you need. They offer note-taking services for students with disabilities, which might include providing a note-taker for your classes.  [https://hunter.cuny.edu/students/health-wellness/accessibility/](https://hunter.cuny.edu/students/health-wellness/accessibility/)\n\n2. **Get Documentation:**  It's important to have documentation from your doctor about your injury and the impact it has on your ability to take notes. This will help the Office of AccessABILITY provide appropriate accommodations.\n\n3. **Talk to Your Professors:**  Let your professors know about your injury and your need for assistance. They may be willing to work with you and the Office of AccessABILITY to provide alternative note-taking solutions.\n\n4. **Explore Other Options:**  While the Office of AccessABILITY is your best resource, you can also explore other options like:\n\n    * **Recording lectures:** Ask if you can record your lectures with your phone or a voice recorder.\n    * **Asking classmates:**  See if a classmate would be willing to share their notes with you.\n    * **Using a Livescribe Echo smartpen:**  This pen can record audio and capture handwritten notes. [https://s29068.pcdn.co/wp-content/uploads/livescribe-echo-smartpen.jpg.optimal.jpg](https://s29068.pcdn.co/wp-content/uploads/livescribe-echo-smartpen.jpg.optimal.jpg) \n\nDon't hesitate to ask for help. The sooner you do, the better equipped you'll be to keep up with your classes. \n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "i'm a student and i'm getting harassed by another student at school. help me\n",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "I'm so sorry to hear that you're experiencing harassment. It's never okay, and you deserve to feel safe and respected at school.  Here's what you should do:\n\n1. **Document the Harassment:**  Keep a record of every incident, including:\n    * **Dates and times:**  When did the harassment occur?\n    * **What happened:**  Be specific about the words, actions, or behaviors that you consider harassment.\n    * **Where it happened:**  Was it in a classroom, hallway, or online?\n    * **Witnesses:**  Did anyone else see or hear what happened?\n\n2. **Tell Someone You Trust:** Talk to a trusted friend, family member, or another student.  You may also want to consider talking to:\n    * **A Professor:**  They can offer support and may have experience in dealing with harassment. \n    * **A Counselor:** Hunter College offers Counseling & Wellness Services. They can provide you with guidance and support. [https://hunter.cuny.edu/students/health-wellness/counseling-and-wellness-services/](https://hunter.cuny.edu/students/health-wellness/counseling-and-wellness-services/)\n\n3. **Report the Harassment:**  Hunter College has a dedicated office to address these issues:\n\n    * **Office of Diversity and Compliance:** They handle complaints of harassment, discrimination, and other violations of the CUNY policy. \n    * **Contact Information:**\n        * **Email:** HCWPVC@Hunter.cuny.edu\n        * **Phone:** 212-396-6466\n        * **Website:**  [https://www.hunter.cuny.edu/diversityandcompliance/](https://www.hunter.cuny.edu/diversityandcompliance/)\n\n4. **Seek Legal Advice:** If the harassment is severe, you may want to consult with a lawyer to understand your legal options. \n\nRemember, you're not alone. Harassment is a serious issue, and there are resources available to help you. Don't be afraid to reach out for help.  \n\nI hope you can find the support you need to feel safe and respected at Hunter College. \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "where can i get purple nailpolish" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Unfortunately, I can't provide you with specific store locations for purple nail polish.  I am a language model and don't have access to real-time information like that.  \n\nHowever, here are some places you can easily find purple nail polish:\n\n* **Drugstores:** Walgreens, CVS, Rite Aid often carry a wide range of nail polish colors, including purple.\n* **Department stores:** Macy's, Nordstrom, and Sephora usually have a variety of nail polish brands, including many purple shades.\n* **Beauty supply stores:** These stores often have a greater selection of more unique colors, including many shades of purple.\n* **Online retailers:** Amazon, Ulta, and Target all sell a huge variety of nail polishes, including purple. \n\nYou can also search for \"purple nail polish\" on Google or your preferred search engine, and often, local stores will pop up in the results.\n\nGood luck finding the perfect purple polish! 💅 \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "what kinds of clubs are available" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Hunter College has a vibrant club scene! Here's a taste of what's available, based on the data I have:\n\n**General Interests:**\n\n* **Student Clubs:**  Hunter has a wide variety of clubs covering everything from academics and activism to sports and hobbies. [https://hunter.cuny.edu/students/campus-life/student-clubs/](https://hunter.cuny.edu/students/campus-life/student-clubs/)\n\n**Specific Examples:**\n\n* **The Possabilities Club:**  This club is for students with disabilities and their allies. [https://hunter.cuny.edu/students/health-wellness/accessibility/students/the-possabilities-club/](https://hunter.cuny.edu/students/health-wellness/accessibility/students/the-possabilities-club/)\n\n**To Find More:**\n\n* **Visit the Student Life website:** [https://hunter.cuny.edu/students/campus-life/student-clubs/](https://hunter.cuny.edu/students/campus-life/student-clubs/)\n* **Attend the Student Activities Fair:** This event happens at the start of each semester and is a great way to explore clubs and meet other students.\n* **Check the Hunter College bulletin boards:** These are often filled with posters advertising club meetings and events.\n\nI hope this helps! It sounds like a great way to connect with other students and explore your interests. \n\n\n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "where is Hunter College?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: 'Hunter College is located in **Manhattan, New York City**. \n\nThe main campus is at:\n\n**695 Park Avenue**\n**New York, NY 10065**\n\nYou can also find it easily by searching for "Hunter College" on Google Maps or any mapping app. 🗺️ \n\nLet me know if you have any other questions about Hunter College! 😊 \n',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "when should i submit my testing arrangement form?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "You should submit your Testing Arrangement Form (TAF) **at least two weeks prior to the test date**. \n\nHere's why:\n\n* **Time for Processing:** The Office of AccessABILITY needs time to process your request, find a proctor, and make arrangements for your testing accommodation.\n* **Securing a Proctor:**  Finding a qualified proctor can take time, especially for exams with specific needs like note-taking or reading.\n* **Final Exams:**  For final exams, it's especially important to submit your TAF early, as the office will be busy with many requests.\n\nYou can find more information about the TAF and how to submit it on the Office of AccessABILITY website. \n\nLet me know if you have any other questions about the testing process. \n\n\n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "what if i missed the deadline?\n" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "It's great you're thinking ahead! Missing the deadline for your Testing Arrangement Form (TAF) isn't ideal, but there are still things you can do:\n\n1. **Contact the Testing Coordinator:** Reach out to the Testing Coordinator at the Access & Technology Center as soon as possible. Explain your situation and see if they can make an exception. \n   * **Phone:** 212-650-3582\n   * **Email:** accesstesting@hunter.cuny.edu\n\n2. **Talk to Your Instructor:**  Discuss the situation with your professor and see if they're willing to work with you and the Access & Technology Center to find a solution.\n\n3. **Arrange for an Alternative Time:** If possible, you might be able to arrange for a substitute time to take the exam with the instructor's approval. \n\n**Important Notes:**\n\n* **Medical Documentation:** If you have a medical reason for missing the deadline, make sure you have proper documentation from a doctor.\n* **Missed Exams:**  If you don't take the exam at the scheduled time, it will be returned to the department, and you may need to arrange for a makeup exam with the professor.\n\nWhile it's best to submit your TAF on time, don't panic if you missed the deadline.  Communicate clearly and see what options are available.  \n\n\n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "can i bring my smartwatch?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Unfortunately, you're not allowed to bring a smartwatch into the testing area unless specifically permitted by your professor. \n\nHere's why:\n\n* **Cheating Concerns:** Smartwatches can be used to store information, access the internet, or communicate with others, which could be considered cheating.\n* **Testing Regulations:** The Office of AccessABILITY has strict rules about what's allowed in testing areas to ensure a fair and secure environment.\n\n**What to Do:**\n\n* **Check Your Accommodations:**  Review your approved accommodations. If your professor has specifically authorized the use of a smartwatch for testing purposes, then you can bring it.\n* **Speak to Your Professor:** If you think you need a smartwatch for testing purposes due to your disability, contact your professor and explain your situation. \n* **Contact the Testing Coordinator:**  If you have any questions about the testing regulations or need to request a specific accommodation, contact the Testing Coordinator.\n\nRemember, it's important to follow the guidelines to ensure a fair and secure testing environment for everyone. \n\n\n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "i need some food where can i get it at hunter" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Hunter College offers a few options for grabbing food on campus:\n\n* **The Roosevelt House Dining Hall:** This is the main dining hall on campus. They offer a variety of meal plans, as well as a la carte options. \n    * [http://roosevelthouse.hunter.cuny.edu/](http://roosevelthouse.hunter.cuny.edu/)\n\n* **The Student Center:**  The Student Center has a cafe and a few other food vendors. \n\n* **The Bookstore:** The bookstore also has a small cafe with snacks and drinks.\n\n* **The Surrounding Neighborhood:**  Hunter College is located in a great neighborhood with lots of restaurants and cafes.  You can easily walk to nearby eateries for more choices.\n\nIf you're looking for specific types of food, you can check the websites of these locations or ask around on campus. You can also use Google Maps or other mapping apps to search for restaurants near Hunter College.\n\nI hope this helps you find a delicious bite to eat on campus! \n\n\n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "i cant afford food where can i get some " }],
      },
      {
        role: "model",
        parts: [
          {
            text: "I understand that affordability is a concern, especially for students.  Hunter College does offer resources to help with food insecurity, and there are also community resources that can help. \n\nHere are some places you can turn to for help:\n\n* **Hunter College Emergency Support Programs:**\n    * **Food Assistance Programs:** Check the Emergency Support and Resources page for information on food pantry schedules and other assistance programs.  [https://hunter.cuny.edu/students/health-wellness/emergency-support-resources/](https://hunter.cuny.edu/students/health-wellness/emergency-support-resources/)\n    * **Contact Raquel Torres:**  Email her at rt2049@hunter.cuny.edu for additional information about food assistance.\n\n* **The Dean of Students Office:** They can direct you to other resources and support services on campus. \n    * **Email:** dean.of.students@hunter.cuny.edu\n\n* **Community Food Resources:**\n    * **New York City Department of Education Free Meal Plan:**  This program provides free meals to children and adults, with no registration or ID required.  [https://www.schools.nyc.gov/school-life/food/free-meals](https://www.schools.nyc.gov/school-life/food/free-meals)\n    * **Food Banks and Pantries:** You can find a list of local food banks and pantries on websites like Food Bank for NYC or Feeding America.\n\nRemember, there are people who want to help. Don't hesitate to reach out for assistance. \n\n\n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "do they have vegan options?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "You're in luck!  Hunter College is becoming increasingly mindful of dietary needs, and they do have vegan options available on campus:\n\n* **Roosevelt House Dining Hall:**  They offer a variety of vegan dishes in their main dining hall. You can check their menus online or ask the staff for their current vegan options.\n    * [http://roosevelthouse.hunter.cuny.edu/](http://roosevelthouse.hunter.cuny.edu/)\n\n* **The Student Center:** The cafe in the Student Center often has vegan sandwiches, salads, and other snacks.\n\n* **The Bookstore:** The bookstore cafe may have some vegan snacks, like fruit or granola bars.\n\n* **The Surrounding Neighborhood:**  As Hunter is in a great food area, you'll find many restaurants and cafes offering vegan options nearby.  \n\nIf you're not sure about a specific place, it's always best to ask the staff about their vegan options to make sure they're prepared properly. \n\nI hope you can find some delicious vegan meals on campus! 😊 \n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "when is the purple apron food pantry open in the summer?",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: 'I\'m unable to find specific information about the "Purple Apron Food Pantry" or its summer hours. \n\nThe data I have refers to food assistance programs that are *generally* offered by Hunter College, but not to a specific pantry with that name. \n\n**Here\'s what I can recommend:**\n\n* **Contact Raquel Torres:**  She oversees emergency support programs, including food assistance, and she would be the best person to ask about the "Purple Apron Food Pantry."\n    * **Email:** rt2049@hunter.cuny.edu\n\n* **Check the Emergency Support and Resources Page:** This page lists information about food assistance programs offered by Hunter College.  It may have information about specific pantry locations or schedules.\n    * **Link:** [https://hunter.cuny.edu/students/health-wellness/emergency-support-resources/](https://hunter.cuny.edu/students/health-wellness/emergency-support-resources/)\n\n* **Reach out to the Dean of Students:** They can also help direct you to the appropriate resources.\n    * **Email:** dean.of.students@hunter.cuny.edu\n\nI hope this helps you find the information you need! \n\n\n',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "what does hunter helpers do?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Hunter Helpers is a great resource for both students and the Hunter community! Here's how it works:\n\n**For Students:**\n\n* **Find Jobs:** Students can create profiles on the Hunter Helpers portal and apply for jobs posted by clients (employers). \n* **Earn Money:**  Jobs are often related to skills students have, like tutoring, editing, translating, or providing administrative assistance.\n* **Gain Experience:**  It's a great way to build your resume and gain valuable experience in a variety of fields.\n\n**For Clients (Employers):**\n\n* **Find Help:** Clients can post job requests on the Hunter Helpers portal and browse student profiles to find the right person for the job.\n* **Support Students:**  Hiring a Hunter student through Hunter Helpers helps them gain experience and earn money.\n* **Convenient:**  It's a convenient and efficient way to find help for tasks or projects you need assistance with.\n\n**How it Works:**\n\n1. **Registration:** Both students and clients register on the Hunter Helpers portal. Students use their Hunter NETID, and clients use their email address.\n2. **Job Posting:** Clients post their job requests on the portal.\n3. **Review and Approval:** The Hunter Helpers administration reviews the job request and approves it for posting.\n4. **Application:**  Students see approved job requests on their portal and can apply.\n5. **Client Review:**  Clients can review student applications and contact the students they're interested in for interviews.\n\n**More Information:**\n\n* **Website:** [https://url.hunter.cuny.edu/hunterhelpers](https://url.hunter.cuny.edu/hunterhelpers)\n* **Contact:** hunterhelpers@hunter.cuny.edu\n\nI hope this gives you a good understanding of Hunter Helpers! It's a valuable resource for both students and the community. \n\n\n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "what even is SPARC? i keep hearing about it" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "You're right, SPARC is a term you'll hear a lot at Hunter! It stands for the **Sexual Prevention and Response Center**. \n\n**Here's what SPARC does:**\n\n* **Supports Survivors:**  SPARC provides confidential support and resources to students who have experienced sexual harassment, assault, stalking, or other forms of gender-based violence.\n* **Provides Resources:** They offer a variety of resources, including:\n    * Counseling and advocacy\n    * Information about legal options\n    * Assistance with reporting incidents to the university\n    * Connections to community organizations\n* **Educates the Community:**  SPARC works to prevent gender-based violence through workshops, training sessions, and awareness campaigns.\n\n**Where to Find SPARC:**\n\nYou can find more information about SPARC and their services on the Office of Diversity and Compliance website: [https://hunter.cuny.edu/diversity-and-compliance/title-ix-and-sexual-misconduct/#sparc](https://hunter.cuny.edu/diversity-and-compliance/title-ix-and-sexual-misconduct/#sparc)\n\n**Important:**\n\n* **Confidentiality:**  SPARC is committed to providing confidential support. They will never share information about you without your consent.\n* **Safety:** If you are in immediate danger, call 911 or contact Public Safety at 212-772-4444. \n\nI hope this helps you understand what SPARC is and how it can support students at Hunter. It's an important resource for ensuring a safe and respectful environment for everyone. \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "thats so cool can i contribute in any way" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "It's awesome that you want to contribute to SPARC's mission of creating a safer and more respectful campus!  Here are a few ways you can get involved:\n\n* **Volunteer:**  Contact SPARC to inquire about volunteer opportunities. They may need help with outreach, events, or administrative tasks.\n* **Attend Workshops and Trainings:** SPARC offers workshops and training sessions for students to learn about gender-based violence and how to be an ally.\n* **Become a Peer Educator:**  SPARC may offer peer educator training programs where you can learn how to support others and raise awareness about sexual assault and harassment.\n* **Spread the Word:** Share information about SPARC's resources with your friends, classmates, and on social media. \n* **Speak Up:**  If you see or hear something that seems like harassment or assault, don't hesitate to speak up. You can report the incident to SPARC or Public Safety. \n\nEvery little bit helps to create a safer and more supportive environment for everyone.  SPARC appreciates your willingness to contribute! \n\n\n\n\n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "what are some nice places to get food?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Hunter College is in a fantastic location for food! Here are some of the best places to get a bite to eat nearby, based on the data I have:\n\n**Around Campus:**\n\n* **Roosevelt House Dining Hall:**  The main dining hall on campus offers a variety of meal plans and a la carte options. [http://roosevelthouse.hunter.cuny.edu/](http://roosevelthouse.hunter.cuny.edu/)\n* **The Student Center:**  The Student Center has a cafe and a few other food vendors. \n* **The Bookstore:** The bookstore also has a small cafe with snacks and drinks.\n\n**Within Walking Distance:**\n\n* **Lexington Avenue:**  Head east on 67th Street and you'll find a ton of restaurants on Lexington Avenue, including:\n    * **Shake Shack:**  A classic New York burger joint.\n    * **The Smith:**  A popular spot for brunch, lunch, and dinner.\n    * **Sushi Yasuda:**  A high-end sushi restaurant.\n    * **Xi'an Famous Foods:**  A great place for authentic Chinese food.\n* **Third Avenue:**  Walk south on Park Avenue and you'll find Third Avenue, with more restaurants like:\n    * **The East Pole:**  A gastropub with a great atmosphere.\n    * **Patsy's Italian Restaurant:**  A classic Italian restaurant.\n    * **The Grey Dog:**  A popular spot for brunch and coffee.\n* **York Avenue:**  Head east on 68th Street and you'll find York Avenue, with more options like:\n    * **The Upper East Side Grill:**  A casual American grill.\n    * **The Polo Bar:**  A high-end restaurant with a classic New York feel.\n\n**Tips:**\n\n* **Check Online Reviews:**  Before you go, check out online reviews on sites like Yelp or Google Maps to get an idea of what people think.\n* **Consider Your Budget:**  There are restaurants for every budget in the area.\n* **Explore Different Cuisines:**  The neighborhood has a wide variety of cuisines to choose from, so you're sure to find something you like.\n\nI hope this helps you find some delicious food near Hunter College! \n\n\n\n\n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "if the response is not directly in the data i sent you say that you cannot answer that",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "You got it! I will be sure to say \"I cannot answer that\" if the information is not directly provided in the data you gave me.  I'm still learning, and I want to be honest about what I know and don't know. 😊 \n\nAsk away! I'll do my best to help you with your Hunter College questions. \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "where is the moon?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "I cannot answer that. The data I have is about Hunter College resources, not the location of the moon.  \n\nTo find out where the moon is, you can check a stargazing app or website, or look up the moon's current position online. 🔭 \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "where can i get good food from hunter?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Here are some places you can get good food from Hunter, based on the data I have:\n\n* **Roosevelt House Dining Hall:** This is the main dining hall on campus. They offer a variety of meal plans, as well as a la carte options.  [http://roosevelthouse.hunter.cuny.edu/](http://roosevelthouse.hunter.cuny.edu/)\n* **The Student Center:**  The Student Center has a cafe and a few other food vendors. \n* **The Bookstore:** The bookstore also has a small cafe with snacks and drinks.\n\nI hope this helps! \n\n\n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "whats the bookstore?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "The Hunter College Bookstore is a place where you can buy:\n\n* **Textbooks:**  You can find the required textbooks for your classes there.\n* **School Supplies:**  They also sell pens, pencils, notebooks, and other school supplies.\n* **Hunter College Merchandise:**  You can find Hunter College t-shirts, sweatshirts, hats, and other merchandise to show your school spirit.\n* **Gifts:**  They also have a selection of gifts for students, faculty, and staff.\n* **Snacks and Drinks:**  The bookstore has a small cafe where you can grab a quick snack or drink.\n\nYou can find the bookstore on the Hunter College campus.  It's a convenient place to get everything you need for your classes and to show your Hunter pride! \n\n\n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          { text: "i lost my health insurance. can hunter help with that?" },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "I cannot answer that. The data I have does not mention any specific programs or resources that Hunter College offers to help students with lost health insurance. \n\nI recommend you contact the following offices for assistance:\n\n* **The Dean of Students Office:** They can direct you to other resources and support services on campus. \n    * **Email:** dean.of.students@hunter.cuny.edu\n* **Counseling & Wellness Services:** They may be able to provide guidance and connect you with community resources. \n    * **Website:** [https://hunter.cuny.edu/students/health-wellness/counseling-and-wellness-services/](https://hunter.cuny.edu/students/health-wellness/counseling-and-wellness-services/)\n\nYou can also explore these options:\n\n* **The Affordable Care Act Marketplace:**  You can find affordable health insurance plans through the ACA Marketplace. [https://www.healthcare.gov/](https://www.healthcare.gov/)\n* **Medicaid:**  If you meet certain income requirements, you may be eligible for Medicaid. [https://www.ny.gov/services/apply-medicaid](https://www.ny.gov/services/apply-medicaid)\n* **Community Health Centers:**  These centers offer affordable healthcare services to people in the community. You can find a list of community health centers in New York City on the NYC Health + Hospitals website. [https://www.nychealthandhospitals.org/](https://www.nychealthandhospitals.org/)\n\nI hope this helps you find the resources you need! \n\n\n",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
  return result.response.text();
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.post("/message", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  // console.log(message);
  // res.json("success");

  try {
    const responseText = await run(message);
    res.json({ response: responseText });
  } catch (error) {
    console.error("Error in chat session:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.get("/message", (req, res) => {
  res.send("Hello, world! The server is running.");
});

app.listen(port, () => {
  console.log("server is running!");
});