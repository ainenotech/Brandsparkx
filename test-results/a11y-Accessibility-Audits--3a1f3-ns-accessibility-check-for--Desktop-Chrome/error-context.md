# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Accessibility Audits (serious / critical violations) >> accessibility check for /
- Location: tests\e2e\a11y.spec.ts:10:9

# Error details

```
Error: Page / has serious or critical a11y violations!

expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 213

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#d83232",
+               "contrastRatio": 3.96,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#fae6e6",
+               "fontSize": "11.4pt (15.2px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.96 (foreground color: #fae6e6, background color: #d83232, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a class=\"sol cta rv in\" href=\"/contact\"><h3>Start with one problem.</h3><p>Build from there. Prove it in 7 days.</p><span class=\"btn btn-white\" style=\"align-self:flex-start;margin-top:24px\">Talk to Us <svg aria-hidden=\"true\" focusable=\"false\"><use href=\"#i-arrow\"></use></svg></span></a>",
+                 "target": Array [
+                   ".cta",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.96 (foreground color: #fae6e6, background color: #d83232, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p>Build from there. Prove it in 7 days.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".cta > p",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f3f3f5",
+               "contrastRatio": 4.28,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#d83232",
+               "fontSize": "9.4pt (12.48px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.28 (foreground color: #d83232, background color: #f3f3f5, font size: 9.4pt (12.48px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a class=\"case wide rv in\" href=\"/work\">",
+                 "target": Array [
+                   ".wide",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.28 (foreground color: #d83232, background color: #f3f3f5, font size: 9.4pt (12.48px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"cat\">Demo · Real estate</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".wide > .case-body > .cat",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f3f3f5",
+               "contrastRatio": 4.28,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#d83232",
+               "fontSize": "9.4pt (12.48px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.28 (foreground color: #d83232, background color: #f3f3f5, font size: 9.4pt (12.48px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a class=\"case rv in\" href=\"/work\">",
+                 "target": Array [
+                   ".case.rv[href$=\"work\"]:nth-child(2)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.28 (foreground color: #d83232, background color: #f3f3f5, font size: 9.4pt (12.48px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"cat\">Demo · Professional services</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".case.rv[href$=\"work\"]:nth-child(2) > .case-body > .cat",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f3f3f5",
+               "contrastRatio": 4.28,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#d83232",
+               "fontSize": "9.4pt (12.48px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.28 (foreground color: #d83232, background color: #f3f3f5, font size: 9.4pt (12.48px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a class=\"case case-row rv in\" href=\"/work\">",
+                 "target": Array [
+                   ".case-row",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.28 (foreground color: #d83232, background color: #f3f3f5, font size: 9.4pt (12.48px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"cat\">Demo · Operations</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".case-row > .case-body > .cat",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+   Object {
+     "description": "Ensure elements that have scrollable content are accessible by keyboard in Safari",
+     "help": "Scrollable region must have keyboard access",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/scrollable-region-focusable?application=playwright",
+     "id": "scrollable-region-focusable",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "focusable-content",
+             "impact": "serious",
+             "message": "Element should have focusable content",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "focusable-element",
+             "impact": "serious",
+             "message": "Element should be focusable",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element should have focusable content
+   Element should be focusable",
+         "html": "<div class=\"trust-marquee rv in\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".trust-marquee",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.keyboard",
+       "wcag2a",
+       "wcag211",
+       "wcag213",
+       "TTv5",
+       "TT4.a",
+       "EN-301-549",
+       "EN-9.2.1.1",
+       "EN-9.2.1.3",
+       "RGAAv4",
+       "RGAA-7.3.2",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "BrandSparkX home":
        - /url: /
        - img "BrandSparkX"
      - navigation "Primary" [ref=e5]:
        - link "AI Voice & Calling" [ref=e6] [cursor=pointer]:
          - /url: /ai-voice-calling
        - link "AI Engineers" [ref=e7] [cursor=pointer]:
          - /url: /ai-engineers
        - link "Case Studies" [ref=e8] [cursor=pointer]:
          - /url: /work
        - link "Solutions" [ref=e9] [cursor=pointer]:
          - /url: /solutions
        - link "About Us" [ref=e10] [cursor=pointer]:
          - /url: /about
        - link "Contact Us" [ref=e11] [cursor=pointer]:
          - /url: /contact
  - main [ref=e12]:
    - generic [ref=e13]:
      - generic [ref=e14]:
        - generic [ref=e15]:
          - generic [ref=e16]:
            - link "New AI voice agents that answer, qualify and book, 24/7" [ref=e17] [cursor=pointer]:
              - /url: /ai-voice-calling
              - generic [ref=e18]: New
              - text: AI voice agents that answer, qualify and book, 24/7
            - heading "Build. Automate. Grow with AI." [level=1] [ref=e21]:
              - generic [ref=e22]: Build.
              - generic [ref=e24]: Automate.
              - generic [ref=e26]: Grow with AI.
            - paragraph [ref=e28]: Turn AI into a practical growth engine for your business — from strategy and sales to automation, engineering and intelligent customer experiences.
            - generic [ref=e29]:
              - link "Explore Solutions" [ref=e30] [cursor=pointer]:
                - /url: /solutions
              - link "Talk to Us" [ref=e33] [cursor=pointer]:
                - /url: /contact
            - generic [ref=e34]:
              - generic [ref=e35]: AI voice agents
              - generic [ref=e38]: Business automation
              - generic [ref=e41]: AI engineers
            - generic [ref=e44]:
              - generic [ref=e45]:
                - generic [ref=e46]: 7 AI capabilities
                - text: One connected growth system
              - generic [ref=e47]:
                - generic [ref=e48]: Prove it in 7 days
                - text: Start with one problem
              - generic [ref=e49]:
                - generic [ref=e50]: Dubai & Bengaluru
                - text: Serving businesses globally
          - generic [ref=e51]:
            - generic [aria-hidden] [ref=e52]:
              - generic [ref=e57]: brandsparkx · we make ai simple
              - generic [ref=e58]: LIVE
            - 'img "Sample walkthrough: an AI voice agent answers an inbound enquiry, qualifies the lead, updates the CRM and books a meeting" [ref=e60]':
              - generic [ref=e61]:
                - generic [ref=e62]:
                  - generic [ref=e63]: Inbound call
                  - generic [ref=e64]: 00:00
                - generic [ref=e65]:
                  - generic [ref=e66]: NE
                  - generic [ref=e67]:
                    - generic [ref=e68]: New enquiry
                    - text: Property viewing request
                - generic [ref=e70]:
                  - generic [ref=e71]: Caller
                  - text: Hi, I'd like to view an apartment this week.
                - generic [ref=e72]:
                  - generic [ref=e73]: AI agent
                  - text: Happy to help. What budget and area do you have in mind?
                - generic [ref=e74]:
                  - generic [ref=e75]: Caller
                  - text: Business Bay, ready to move soon.
              - generic [ref=e76]:
                - generic [ref=e77]: Lead qualification
                - generic [ref=e83]:
                  - generic [ref=e84]: "86"
                  - generic [ref=e85]: intent
                - generic [ref=e86]: Budget confirmed
                - generic [ref=e89]: Area matched
                - generic [ref=e92]: Ready this week
              - generic [ref=e95]:
                - generic [ref=e96]:
                  - generic [ref=e97]: Automated workflow
                  - generic [ref=e98]: agent.run()
                - generic [ref=e99]:
                  - generic [ref=e102]: Answer
                  - generic [ref=e106]: Qualify
                  - generic [ref=e110]: Update CRM
                  - generic [ref=e114]: Book
              - generic [ref=e121]:
                - generic [ref=e122]: Meeting booked
                - text: Thu · 11:00 · added to calendar
            - generic [ref=e123]:
              - button "Pause walkthrough" [ref=e124] [cursor=pointer]
              - generic [ref=e129]: 00:00 / 00:12
              - generic [ref=e130]: Sample walkthrough
        - generic [ref=e132]:
          - generic [ref=e133]:
            - generic [ref=e134]: AI Voice Agents
            - generic [ref=e137]: 24/7 Call Answering
            - generic [ref=e140]: Lead Qualification
            - generic [ref=e143]: AI Calling
            - generic [ref=e146]: Appointment Booking
            - generic [ref=e149]: Multilingual Voice
            - generic [ref=e152]: AI Receptionist
            - generic [ref=e155]: Smart Follow-ups
            - generic [ref=e158]: WhatsApp Automation
            - generic [ref=e161]: AI Chatbots
            - generic [ref=e164]: CRM Integration
            - generic [ref=e167]: Workflow Automation
            - generic [ref=e170]: Agentic AI
            - generic [ref=e173]: Sales Pipelines
            - generic [ref=e176]: Growth Strategy
            - generic [ref=e179]: AI Engineers
            - generic [ref=e182]: Content at Scale
            - generic [ref=e185]: Performance Marketing
            - generic [ref=e188]: AI Voice Agents
            - generic [ref=e191]: 24/7 Call Answering
            - generic [ref=e194]: Lead Qualification
            - generic [ref=e197]: AI Calling
            - generic [ref=e200]: Appointment Booking
            - generic [ref=e203]: Multilingual Voice
            - generic [ref=e206]: AI Receptionist
            - generic [ref=e209]: Smart Follow-ups
            - generic [ref=e212]: WhatsApp Automation
            - generic [ref=e215]: AI Chatbots
            - generic [ref=e218]: CRM Integration
            - generic [ref=e221]: Workflow Automation
            - generic [ref=e224]: Agentic AI
            - generic [ref=e227]: Sales Pipelines
            - generic [ref=e230]: Growth Strategy
            - generic [ref=e233]: AI Engineers
            - generic [ref=e236]: Content at Scale
            - generic [ref=e239]: Performance Marketing
            - generic [ref=e242]: AI Voice Agents
            - generic [ref=e245]: 24/7 Call Answering
            - generic [ref=e248]: Lead Qualification
            - generic [ref=e251]: AI Calling
            - generic [ref=e254]: Appointment Booking
            - generic [ref=e257]: Multilingual Voice
            - generic [ref=e260]: AI Receptionist
            - generic [ref=e263]: Smart Follow-ups
            - generic [ref=e266]: WhatsApp Automation
            - generic [ref=e269]: AI Chatbots
            - generic [ref=e272]: CRM Integration
            - generic [ref=e275]: Workflow Automation
            - generic [ref=e278]: Agentic AI
            - generic [ref=e281]: Sales Pipelines
            - generic [ref=e284]: Growth Strategy
            - generic [ref=e287]: AI Engineers
            - generic [ref=e290]: Content at Scale
            - generic [ref=e293]: Performance Marketing
          - generic [aria-hidden] [ref=e296]:
            - generic [ref=e297]: AI Voice Agents
            - generic [ref=e300]: 24/7 Call Answering
            - generic [ref=e303]: Lead Qualification
            - generic [ref=e306]: AI Calling
            - generic [ref=e309]: Appointment Booking
            - generic [ref=e312]: Multilingual Voice
            - generic [ref=e315]: AI Receptionist
            - generic [ref=e318]: Smart Follow-ups
            - generic [ref=e321]: WhatsApp Automation
            - generic [ref=e324]: AI Chatbots
            - generic [ref=e327]: CRM Integration
            - generic [ref=e330]: Workflow Automation
            - generic [ref=e333]: Agentic AI
            - generic [ref=e336]: Sales Pipelines
            - generic [ref=e339]: Growth Strategy
            - generic [ref=e342]: AI Engineers
            - generic [ref=e345]: Content at Scale
            - generic [ref=e348]: Performance Marketing
            - generic [ref=e351]: AI Voice Agents
            - generic [ref=e354]: 24/7 Call Answering
            - generic [ref=e357]: Lead Qualification
            - generic [ref=e360]: AI Calling
            - generic [ref=e363]: Appointment Booking
            - generic [ref=e366]: Multilingual Voice
            - generic [ref=e369]: AI Receptionist
            - generic [ref=e372]: Smart Follow-ups
            - generic [ref=e375]: WhatsApp Automation
            - generic [ref=e378]: AI Chatbots
            - generic [ref=e381]: CRM Integration
            - generic [ref=e384]: Workflow Automation
            - generic [ref=e387]: Agentic AI
            - generic [ref=e390]: Sales Pipelines
            - generic [ref=e393]: Growth Strategy
            - generic [ref=e396]: AI Engineers
            - generic [ref=e399]: Content at Scale
            - generic [ref=e402]: Performance Marketing
            - generic [ref=e405]: AI Voice Agents
            - generic [ref=e408]: 24/7 Call Answering
            - generic [ref=e411]: Lead Qualification
            - generic [ref=e414]: AI Calling
            - generic [ref=e417]: Appointment Booking
            - generic [ref=e420]: Multilingual Voice
            - generic [ref=e423]: AI Receptionist
            - generic [ref=e426]: Smart Follow-ups
            - generic [ref=e429]: WhatsApp Automation
            - generic [ref=e432]: AI Chatbots
            - generic [ref=e435]: CRM Integration
            - generic [ref=e438]: Workflow Automation
            - generic [ref=e441]: Agentic AI
            - generic [ref=e444]: Sales Pipelines
            - generic [ref=e447]: Growth Strategy
            - generic [ref=e450]: AI Engineers
            - generic [ref=e453]: Content at Scale
            - generic [ref=e456]: Performance Marketing
      - generic [ref=e461]:
        - generic [ref=e462]:
          - generic [ref=e463]: Our clients
          - heading "Trusted by ambitious businesses." [level=2] [ref=e464]
          - paragraph [ref=e465]: Building intelligent solutions for businesses ready to grow.
        - generic [ref=e468]:
          - img "Aajpakao" [ref=e470]
          - img "Airroad" [ref=e472]
          - img "Bundee" [ref=e474]
          - img "Global Developers" [ref=e476]
          - img "HRopal" [ref=e478]
          - img "Insuremile" [ref=e480]
          - img "iRest" [ref=e482]
          - img "Nuttyfox Gourmet" [ref=e484]
          - img "Tenbroeck Academy" [ref=e486]
          - img "Univva Group" [ref=e488]
          - img "We Nurture Foundation" [ref=e490]
          - img "ZippSlip" [ref=e492]
      - generic [ref=e519]:
        - generic [ref=e520]:
          - generic [ref=e521]: AI that works for your business
          - heading "Stop experimenting. Start building with AI." [level=2] [ref=e522]
        - generic [ref=e523]:
          - paragraph [ref=e524]:
            - text: AI should do more than generate content or answer questions.
            - emphasis [ref=e525]: It should help your business attract customers, automate work, accelerate sales and build better systems.
          - paragraph [ref=e526]: BrandSparkX brings strategy, technology and execution together to make AI work inside your business.
          - generic [ref=e527]:
            - generic [ref=e528]: Automate repetitive processes
            - generic [ref=e531]: Build AI-powered customer experiences
            - generic [ref=e534]: Develop custom AI solutions
            - generic [ref=e537]: Add AI talent to your technology team
      - generic [ref=e541]:
        - generic [ref=e542]:
          - generic [ref=e543]: The AI growth system
          - heading "One connected AI ecosystem." [level=2] [ref=e544]
          - paragraph [ref=e545]: Website traffic, calls, WhatsApp and the tools you already use connect into one system.
          - link "Talk to Us" [ref=e546] [cursor=pointer]:
            - /url: /contact
        - figure "Website and ads, calls and WhatsApp, and your tools go to BrandSparkX AI, which handles every lead, then produces qualified leads, faster sales and less manual work." [ref=e549]:
          - generic [ref=e551]:
            - paragraph [ref=e563]:
              - generic [ref=e564]: Website & ads
              - generic [ref=e565]: traffic
            - paragraph [ref=e575]:
              - generic [ref=e576]: Calls & WhatsApp
              - generic [ref=e577]: conversations
            - paragraph [ref=e585]:
              - generic [ref=e586]: Your tools
              - generic [ref=e587]: CRM, sheets, apps
            - paragraph [ref=e599]:
              - generic [ref=e600]: BrandSparkX AI
              - generic [ref=e601]: connects, automates, follows up
            - paragraph [ref=e609]:
              - generic [ref=e610]: Nothing missed
              - generic [ref=e611]: every lead handled
            - paragraph [ref=e623]:
              - generic [ref=e624]: Qualified leads
              - generic [ref=e625]: captured
            - paragraph [ref=e637]:
              - generic [ref=e638]: Faster sales
              - generic [ref=e639]: followed up
            - paragraph [ref=e651]:
              - generic [ref=e652]: Less manual work
              - generic [ref=e653]: automated
          - list [ref=e654]:
            - listitem [ref=e655]: "Inputs: Website & ads, traffic; Calls & WhatsApp, conversations; Your tools, CRM, sheets, apps"
            - listitem [ref=e656]: BrandSparkX AI. connects, automates, follows up
            - listitem [ref=e657]: Nothing missed. every lead handled
            - listitem [ref=e658]: "Results: Qualified leads, captured; Faster sales, followed up; Less manual work, automated"
      - generic [ref=e660]:
        - generic [ref=e661]:
          - generic [ref=e662]:
            - generic [ref=e663]: Our solutions
            - heading "Seven ways we help businesses build with AI." [level=2] [ref=e664]
          - paragraph [ref=e665]: Each capability works on its own. Together they form one connected growth system.
        - generic [ref=e666]:
          - link "AI Voice & Calling Give your business a voice. AI voice agents that answer, qualify and book appointments for you, 24/7 — inbound and outbound." [ref=e667] [cursor=pointer]:
            - /url: /ai-voice-calling
            - heading "AI Voice & Calling" [level=3] [ref=e674]
            - generic [ref=e675]: Give your business a voice.
            - paragraph [ref=e676]: AI voice agents that answer, qualify and book appointments for you, 24/7 — inbound and outbound.
          - link "AI Sales Turn leads into conversations. Use AI to qualify leads, follow up, engage prospects and move every opportunity forward." [ref=e678] [cursor=pointer]:
            - /url: /solutions/ai-sales
            - heading "AI Sales" [level=3] [ref=e685]
            - generic [ref=e686]: Turn leads into conversations.
            - paragraph [ref=e687]: Use AI to qualify leads, follow up, engage prospects and move every opportunity forward.
          - link "AI Growth Turn AI into a growth strategy. Find where AI creates the greatest impact, then get a practical roadmap." [ref=e688] [cursor=pointer]:
            - /url: /solutions/ai-growth
            - heading "AI Growth" [level=3] [ref=e695]
            - generic [ref=e696]: Turn AI into a growth strategy.
            - paragraph [ref=e697]: Find where AI creates the greatest impact, then get a practical roadmap.
          - link "AI Content Create more. Work less. An AI-powered content engine for social, video, copy and campaigns." [ref=e698] [cursor=pointer]:
            - /url: /solutions/ai-content
            - heading "AI Content" [level=3] [ref=e705]
            - generic [ref=e706]: Create more. Work less.
            - paragraph [ref=e707]: An AI-powered content engine for social, video, copy and campaigns.
          - link "AI Marketing Make marketing more intelligent. Automate lead generation, nurturing, CRM and WhatsApp workflows." [ref=e708] [cursor=pointer]:
            - /url: /solutions/ai-marketing
            - heading "AI Marketing" [level=3] [ref=e715]
            - generic [ref=e716]: Make marketing more intelligent.
            - paragraph [ref=e717]: Automate lead generation, nurturing, CRM and WhatsApp workflows.
          - link "Business Automation Connect your business. Automate the work. Connect people, tools and data so repetitive work runs itself." [ref=e718] [cursor=pointer]:
            - /url: /solutions/business-automation
            - heading "Business Automation" [level=3] [ref=e725]
            - generic [ref=e726]: Connect your business. Automate the work.
            - paragraph [ref=e727]: Connect people, tools and data so repetitive work runs itself.
          - link "AI Engineers on Demand AI talent when you need it. AI engineers and developers by project, week or month." [ref=e728] [cursor=pointer]:
            - /url: /ai-engineers
            - heading "AI Engineers on Demand" [level=3] [ref=e735]
            - generic [ref=e736]: AI talent when you need it.
            - paragraph [ref=e737]: AI engineers and developers by project, week or month.
          - link [ref=e738] [cursor=pointer]:
            - /url: /contact
            - heading "Start with one problem." [level=3] [ref=e739]
            - paragraph [ref=e740]: Build from there. Prove it in 7 days.
            - generic [ref=e741]: Talk to Us
        - link "Explore all solutions" [ref=e745] [cursor=pointer]:
          - /url: /solutions
      - generic [ref=e749]:
        - generic [ref=e750]:
          - generic [ref=e751]:
            - generic [ref=e752]: How we work
            - heading "From idea to intelligent execution." [level=2] [ref=e753]
          - paragraph [ref=e754]: Five stages, one direction. Start small, prove value, then scale what works.
        - list [ref=e758]:
          - listitem [ref=e759]:
            - generic [ref=e760]: "01"
            - heading "Understand" [level=3] [ref=e761]
            - paragraph [ref=e762]: We understand your business, goals, processes and challenges.
          - listitem [ref=e763]:
            - generic [ref=e764]: "02"
            - heading "Strategize" [level=3] [ref=e765]
            - paragraph [ref=e766]: We identify where AI can create measurable value.
          - listitem [ref=e767]:
            - generic [ref=e768]: "03"
            - heading "Build" [level=3] [ref=e769]
            - paragraph [ref=e770]: We design and implement the right AI solution.
          - listitem [ref=e771]:
            - generic [ref=e772]: "04"
            - heading "Automate" [level=3] [ref=e773]
            - paragraph [ref=e774]: We connect systems, workflows, data and AI agents.
          - listitem [ref=e775]:
            - generic [ref=e776]: "05"
            - heading "Scale" [level=3] [ref=e777]
            - paragraph [ref=e778]: We keep improving what works and expand AI across your business.
      - generic [ref=e780]:
        - generic [ref=e781]:
          - generic [ref=e782]: Why BrandSparkX
          - heading "AI should create business value — not complexity." [level=2] [ref=e783]
          - paragraph [ref=e784]: Businesses don't need more disconnected tools. They need the right AI, connected to the way they already work.
        - generic [ref=e785]:
          - generic [ref=e786]:
            - heading "Strategy first." [level=3] [ref=e787]
            - paragraph [ref=e788]: We start with the business problem, not the technology.
          - generic [ref=e789]:
            - heading "Built for business." [level=3] [ref=e790]
            - paragraph [ref=e791]: Every solution is designed around practical outcomes.
          - generic [ref=e792]:
            - heading "Human + AI." [level=3] [ref=e793]
            - paragraph [ref=e794]: AI enhances your people and processes rather than simply replacing them.
          - generic [ref=e795]:
            - heading "Flexible technology." [level=3] [ref=e796]
            - paragraph [ref=e797]: We work with the right technologies and engineering capabilities for the requirement.
          - generic [ref=e798]:
            - heading "Built to scale." [level=3] [ref=e799]
            - paragraph [ref=e800]: Start with one workflow, one department or one problem — then expand.
      - generic [ref=e802]:
        - generic [ref=e803]:
          - generic [ref=e804]:
            - generic [ref=e805]: Meet our team
            - heading "People behind the intelligence." [level=2] [ref=e806]
          - paragraph [ref=e807]: Strategy, engineering and delivery — led by people who answer for the outcome.
        - generic [ref=e808]:
          - article [ref=e809]:
            - img "Krishna Patil" [ref=e812]
            - generic [ref=e813]: Leadership · Primary contact
            - heading "Krishna Patil" [level=3] [ref=e814]
            - paragraph [ref=e815]: Business vision, strategic partnerships, market expansion and commercial growth.
            - generic [ref=e816]:
              - link "Email Krishna Patil" [ref=e817] [cursor=pointer]:
                - /url: mailto:Krishna@brandsparkx.com
              - link "Call Krishna Patil" [ref=e820] [cursor=pointer]:
                - /url: tel:+971559963778
          - article [ref=e823]:
            - img "Tirth Patel" [ref=e826]
            - generic [ref=e827]: Leadership · Partner & CTO
            - heading "Tirth Patel" [level=3] [ref=e828]
            - paragraph [ref=e829]: AI technology, engineering, technical strategy and product development.
          - article [ref=e830]:
            - img "Ratnesh" [ref=e833]
            - generic [ref=e834]: Strategic Partner · Growth & Marketing
            - heading "Ratnesh" [level=3] [ref=e835]
            - paragraph [ref=e836]: Growth strategy, customer acquisition and marketing expertise.
          - article [ref=e837]:
            - img "Scott" [ref=e840]
            - generic [ref=e841]: Head of Paid Media
            - heading "Scott" [level=3] [ref=e842]
            - paragraph [ref=e843]: Leads paid media strategy and performance campaigns.
        - link "Learn about us" [ref=e845] [cursor=pointer]:
          - /url: /about
      - generic [ref=e849]:
        - generic [ref=e850]:
          - generic [ref=e851]:
            - generic [ref=e852]: Stories of success
            - heading "Real problems. Practical AI." [level=2] [ref=e853]
          - paragraph [ref=e854]: Explore how intelligent technology can create meaningful business impact.
        - generic [ref=e855]:
          - link "Demonstration project Demo · Real estate Inbound enquiries answered in seconds Challenge Enquiries arrived after hours and waited until morning. Solution AI voice agent for inbound calls with CRM sync and booking. Impact Verified results to be added Read case study" [ref=e856] [cursor=pointer]:
            - /url: /work
            - generic [ref=e857]: Demonstration project
            - generic [ref=e864]:
              - generic [ref=e865]: Demo · Real estate
              - heading "Inbound enquiries answered in seconds" [level=3] [ref=e866]
              - generic [ref=e867]:
                - term [ref=e868]: Challenge
                - definition [ref=e869]: Enquiries arrived after hours and waited until morning.
                - term [ref=e870]: Solution
                - definition [ref=e871]: AI voice agent for inbound calls with CRM sync and booking.
                - term [ref=e872]: Impact
                - definition [ref=e873]: Verified results to be added
              - generic [ref=e874]: Read case study
          - link "Demonstration project Demo · Professional services Follow-up that never goes cold Challenge Sales team couldn’t follow up every lead consistently. Solution AI sales follow-up across calls and WhatsApp. Impact Verified results to be added Read case study" [ref=e877] [cursor=pointer]:
            - /url: /work
            - generic [ref=e878]: Demonstration project
            - generic [ref=e890]:
              - generic [ref=e891]: Demo · Professional services
              - heading "Follow-up that never goes cold" [level=3] [ref=e892]
              - generic [ref=e893]:
                - term [ref=e894]: Challenge
                - definition [ref=e895]: Sales team couldn’t follow up every lead consistently.
                - term [ref=e896]: Solution
                - definition [ref=e897]: AI sales follow-up across calls and WhatsApp.
                - term [ref=e898]: Impact
                - definition [ref=e899]: Verified results to be added
              - generic [ref=e900]: Read case study
          - link "Demonstration project Demo · Operations Back-office workflows that run themselves Challenge Manual data entry between disconnected tools. Solution Business automation connecting forms, CRM and reporting. Impact Verified results to be added Read case study" [ref=e903] [cursor=pointer]:
            - /url: /work
            - generic [ref=e904]: Demonstration project
            - generic [ref=e923]:
              - generic [ref=e924]: Demo · Operations
              - heading "Back-office workflows that run themselves" [level=3] [ref=e925]
              - generic [ref=e926]:
                - term [ref=e927]: Challenge
                - definition [ref=e928]: Manual data entry between disconnected tools.
                - term [ref=e929]: Solution
                - definition [ref=e930]: Business automation connecting forms, CRM and reporting.
                - term [ref=e931]: Impact
                - definition [ref=e932]: Verified results to be added
              - generic [ref=e933]: Read case study
        - link "See all work" [ref=e937] [cursor=pointer]:
          - /url: /work
      - generic [ref=e941]:
        - generic [ref=e942]:
          - generic [ref=e943]: Client testimonials
          - heading "Hear what our clients have to say." [level=2] [ref=e944]
          - paragraph [ref=e945]: Only approved, attributed feedback appears here.
        - region "Client testimonials" [ref=e947]:
          - generic [aria-hidden] [ref=e948]: “
          - group "1 of 3" [ref=e950]:
            - paragraph [ref=e951]: Approved client testimonial will appear here. Add the quote exactly as the client provided it.
            - generic [ref=e954]:
              - generic [ref=e955]: Client name
              - generic [ref=e956]: Position, Company · placeholder
          - generic [ref=e957]:
            - button "Previous testimonial" [ref=e958] [cursor=pointer]
            - button "Next testimonial" [ref=e961] [cursor=pointer]
      - generic [ref=e970]:
        - generic [ref=e971]:
          - heading "Ready to build with AI?" [level=2] [ref=e972]
          - paragraph [ref=e973]: Tell us what you want to improve, automate or build. We'll help you identify where AI can create the most value.
        - generic [ref=e974]:
          - link "Start a Conversation" [ref=e975] [cursor=pointer]:
            - /url: /contact
          - link "WhatsApp us" [ref=e978] [cursor=pointer]:
            - /url: https://wa.me/971559963778
  - contentinfo [ref=e979]:
    - generic [ref=e980]:
      - generic [aria-hidden] [ref=e981]: B
      - generic [aria-hidden] [ref=e982]: R
      - generic [aria-hidden] [ref=e983]: A
      - generic [aria-hidden] [ref=e984]: "N"
      - generic [aria-hidden] [ref=e985]: D
      - generic [aria-hidden] [ref=e986]: S
      - generic [aria-hidden] [ref=e987]: P
      - generic [aria-hidden] [ref=e988]: A
      - generic [aria-hidden] [ref=e989]: R
      - generic [aria-hidden] [ref=e990]: K
      - generic [aria-hidden] [ref=e991]: X
    - generic:
      - generic [ref=e992]:
        - link "BrandSparkX home":
          - /url: /
          - img "BrandSparkX"
        - generic [ref=e993]: Build. Automate.Grow with AI.
        - paragraph [ref=e994]: AI growth & automation for ambitious businesses — strategy, automation, engineering and AI voice, connected into one growth system.
        - generic [ref=e995]:
          - link "WhatsApp" [ref=e996] [cursor=pointer]:
            - /url: https://wa.me/971559963778
          - link "Email" [ref=e999] [cursor=pointer]:
            - /url: mailto:business@brandsparkx.com
      - generic [ref=e1002]:
        - heading "Contact us" [level=2] [ref=e1003]
        - generic [ref=e1004]:
          - link "Phone / WhatsApp +971 55 996 3778" [ref=e1005] [cursor=pointer]:
            - /url: tel:+971559963778
            - generic [ref=e1008]:
              - generic [ref=e1009]: Phone / WhatsApp
              - text: +971 55 996 3778
          - link "Email business@brandsparkx.com" [ref=e1010] [cursor=pointer]:
            - /url: mailto:business@brandsparkx.com
            - generic [ref=e1013]:
              - generic [ref=e1014]: Email
              - text: business@brandsparkx.com
      - generic [ref=e1015]:
        - heading "Careers" [level=2] [ref=e1016]
        - generic [ref=e1017]:
          - link "Phone +971 52 564 8489" [ref=e1018] [cursor=pointer]:
            - /url: tel:+971525648489
            - generic [ref=e1021]:
              - generic [ref=e1022]: Phone
              - text: +971 52 564 8489
          - link "Email hr@brandsparkx.com" [ref=e1023] [cursor=pointer]:
            - /url: mailto:hr@brandsparkx.com
            - generic [ref=e1026]:
              - generic [ref=e1027]: Email
              - text: hr@brandsparkx.com
          - link "View careers" [ref=e1028] [cursor=pointer]:
            - /url: /careers
      - generic [ref=e1032]:
        - heading "Solutions" [level=2] [ref=e1033]
        - list [ref=e1034]:
          - listitem [ref=e1035]:
            - link "AI Voice & Calling" [ref=e1036] [cursor=pointer]:
              - /url: /ai-voice-calling
          - listitem [ref=e1037]:
            - link "AI Growth" [ref=e1038] [cursor=pointer]:
              - /url: /solutions/ai-growth
          - listitem [ref=e1039]:
            - link "AI Content" [ref=e1040] [cursor=pointer]:
              - /url: /solutions/ai-content
          - listitem [ref=e1041]:
            - link "AI Marketing" [ref=e1042] [cursor=pointer]:
              - /url: /solutions/ai-marketing
          - listitem [ref=e1043]:
            - link "AI Sales" [ref=e1044] [cursor=pointer]:
              - /url: /solutions/ai-sales
          - listitem [ref=e1045]:
            - link "AI Engineers" [ref=e1046] [cursor=pointer]:
              - /url: /ai-engineers
          - listitem [ref=e1047]:
            - link "Business Automation" [ref=e1048] [cursor=pointer]:
              - /url: /solutions/business-automation
      - generic [ref=e1049]:
        - heading "Our locations" [level=2] [ref=e1050]
        - generic [ref=e1051]:
          - generic [ref=e1055]:
            - strong [ref=e1056]: Dubai, UAE
            - text: 801–806, Office No. 5, Clover Bay Tower, Burj Khalifa Area, Business Bay, Dubai, UAE
          - generic [ref=e1060]:
            - strong [ref=e1061]: Bengaluru, India
            - text: World Trade Centre, Unit 2274A, 22nd Floor, Brigade Gateway, Bengaluru – 560055
          - generic [ref=e1065]:
            - strong [ref=e1066]: United States
            - text: 3838 Andrew Johnson Hwy, Limestone, TN 37681, United States
          - generic [ref=e1070]:
            - strong [ref=e1071]: Gandhinagar
            - text: 13th Floor, GIFT Tower One, GIFT City, Gandhinagar, Gujarat
    - generic [ref=e1072]:
      - paragraph [ref=e1073]: © 2026 BrandSparkX. All rights reserved.
      - navigation "Legal" [ref=e1074]:
        - link "Privacy Policy" [ref=e1075] [cursor=pointer]:
          - /url: /privacy
        - link "Terms & Conditions" [ref=e1076] [cursor=pointer]:
          - /url: /terms
  - alert [ref=e1077]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import AxeBuilder from "@axe-core/playwright";
  3  | import sitemap from "@/app/sitemap";
  4  | 
  5  | const sitemapEntries = sitemap();
  6  | const routes = sitemapEntries.map((e) => new URL(e.url).pathname);
  7  | 
  8  | test.describe("Accessibility Audits (serious / critical violations)", () => {
  9  |   for (const route of routes) {
  10 |     test(`accessibility check for ${route}`, async ({ page }) => {
  11 |       // Use reduced motion so scroll-reveal (.rv) elements are immediately at 100% resting opacity
  12 |       await page.emulateMedia({ reducedMotion: "reduce" });
  13 |       await page.goto(route, { waitUntil: "domcontentloaded" });
  14 | 
  15 |       // Wait for entrance intro to clear
  16 |       await expect(page.locator("body")).not.toHaveClass(/brand-intro-active/, { timeout: 10000 });
  17 | 
  18 |       // Ensure all reveal elements are fully revealed
  19 |       await page.evaluate(() => {
  20 |         document.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));
  21 |       });
  22 | 
  23 |       const results = await new AxeBuilder({ page })
  24 |         .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  25 |         .analyze();
  26 | 
  27 |       const criticalViolations = results.violations.filter(
  28 |         (v) => v.impact === "serious" || v.impact === "critical",
  29 |       );
  30 | 
  31 |       if (criticalViolations.length > 0) {
  32 |         console.error(
  33 |           `[a11y violation on ${route}]`,
  34 |           JSON.stringify(
  35 |             criticalViolations.map((v) => ({
  36 |               id: v.id,
  37 |               impact: v.impact,
  38 |               description: v.description,
  39 |               nodes: v.nodes.map((n) => n.html),
  40 |             })),
  41 |             null,
  42 |             2,
  43 |           ),
  44 |         );
  45 |       }
  46 | 
  47 |       expect(
  48 |         criticalViolations,
  49 |         `Page ${route} has serious or critical a11y violations!`,
> 50 |       ).toEqual([]);
     |         ^ Error: Page / has serious or critical a11y violations!
  51 |     });
  52 |   }
  53 | });
  54 | 
```