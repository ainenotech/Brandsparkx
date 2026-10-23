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
      - link "BrandSparkX home" [ref=e5] [cursor=pointer]:
        - /url: /
        - img "BrandSparkX" [ref=e6]
      - button "Open menu" [ref=e7] [cursor=pointer]
  - main [ref=e9]:
    - generic [ref=e10]:
      - generic [ref=e11]:
        - generic [ref=e12]:
          - generic [ref=e13]:
            - link "New AI voice agents that answer, qualify and book, 24/7" [ref=e14] [cursor=pointer]:
              - /url: /ai-voice-calling
              - generic [ref=e15]: New
              - text: AI voice agents that answer, qualify and book, 24/7
            - heading "Build. Automate. Grow with AI." [level=1] [ref=e18]:
              - generic [ref=e19]: Build.
              - generic [ref=e21]: Automate.
              - generic [ref=e23]: Grow with AI.
            - paragraph [ref=e25]: Turn AI into a practical growth engine for your business — from strategy and sales to automation, engineering and intelligent customer experiences.
            - generic [ref=e26]:
              - link "Explore Solutions" [ref=e27] [cursor=pointer]:
                - /url: /solutions
              - link "Talk to Us" [ref=e30] [cursor=pointer]:
                - /url: /contact
            - generic [ref=e31]:
              - generic [ref=e32]: AI voice agents
              - generic [ref=e35]: Business automation
              - generic [ref=e38]: AI engineers
            - generic [ref=e41]:
              - generic [ref=e42]:
                - generic [ref=e43]: 7 AI capabilities
                - text: One connected growth system
              - generic [ref=e44]:
                - generic [ref=e45]: Prove it in 7 days
                - text: Start with one problem
              - generic [ref=e46]:
                - generic [ref=e47]: Dubai & Bengaluru
                - text: Serving businesses globally
          - generic [ref=e48]:
            - generic [aria-hidden] [ref=e49]:
              - generic [ref=e54]: brandsparkx · we make ai simple
              - generic [ref=e55]: LIVE
            - 'img "Sample walkthrough: an AI voice agent answers an inbound enquiry, qualifies the lead, updates the CRM and books a meeting" [ref=e57]':
              - generic [ref=e58]:
                - generic [ref=e59]:
                  - generic [ref=e60]: Inbound call
                  - generic [ref=e61]: 00:00
                - generic [ref=e62]:
                  - generic [ref=e63]: NE
                  - generic [ref=e64]:
                    - generic [ref=e65]: New enquiry
                    - text: Property viewing request
                - generic [ref=e67]:
                  - generic [ref=e68]: Caller
                  - text: Hi, I'd like to view an apartment this week.
                - generic [ref=e69]:
                  - generic [ref=e70]: AI agent
                  - text: Happy to help. What budget and area do you have in mind?
                - generic [ref=e71]:
                  - generic [ref=e72]: Caller
                  - text: Business Bay, ready to move soon.
              - generic [ref=e73]:
                - generic [ref=e74]: Lead qualification
                - generic [ref=e80]:
                  - generic [ref=e81]: "86"
                  - generic [ref=e82]: intent
                - generic [ref=e83]: Budget confirmed
                - generic [ref=e86]: Area matched
                - generic [ref=e89]: Ready this week
              - generic [ref=e92]:
                - generic [ref=e93]:
                  - generic [ref=e94]: Automated workflow
                  - generic [ref=e95]: agent.run()
                - generic [ref=e96]:
                  - generic [ref=e99]: Answer
                  - generic [ref=e103]: Qualify
                  - generic [ref=e107]: Update CRM
                  - generic [ref=e111]: Book
              - generic [ref=e118]:
                - generic [ref=e119]: Meeting booked
                - text: Thu · 11:00 · added to calendar
            - generic [ref=e120]:
              - button "Pause walkthrough" [ref=e121] [cursor=pointer]
              - generic [ref=e126]: 00:00 / 00:12
        - generic [ref=e128]:
          - generic [ref=e129]:
            - generic [ref=e130]: AI Voice Agents
            - generic [ref=e133]: 24/7 Call Answering
            - generic [ref=e136]: Lead Qualification
            - generic [ref=e139]: AI Calling
            - generic [ref=e142]: Appointment Booking
            - generic [ref=e145]: Multilingual Voice
            - generic [ref=e148]: AI Receptionist
            - generic [ref=e151]: Smart Follow-ups
            - generic [ref=e154]: WhatsApp Automation
            - generic [ref=e157]: AI Chatbots
            - generic [ref=e160]: CRM Integration
            - generic [ref=e163]: Workflow Automation
            - generic [ref=e166]: Agentic AI
            - generic [ref=e169]: Sales Pipelines
            - generic [ref=e172]: Growth Strategy
            - generic [ref=e175]: AI Engineers
            - generic [ref=e178]: Content at Scale
            - generic [ref=e181]: Performance Marketing
            - generic [ref=e184]: AI Voice Agents
            - generic [ref=e187]: 24/7 Call Answering
            - generic [ref=e190]: Lead Qualification
            - generic [ref=e193]: AI Calling
            - generic [ref=e196]: Appointment Booking
            - generic [ref=e199]: Multilingual Voice
            - generic [ref=e202]: AI Receptionist
            - generic [ref=e205]: Smart Follow-ups
            - generic [ref=e208]: WhatsApp Automation
            - generic [ref=e211]: AI Chatbots
            - generic [ref=e214]: CRM Integration
            - generic [ref=e217]: Workflow Automation
            - generic [ref=e220]: Agentic AI
            - generic [ref=e223]: Sales Pipelines
            - generic [ref=e226]: Growth Strategy
            - generic [ref=e229]: AI Engineers
            - generic [ref=e232]: Content at Scale
            - generic [ref=e235]: Performance Marketing
            - generic [ref=e238]: AI Voice Agents
            - generic [ref=e241]: 24/7 Call Answering
            - generic [ref=e244]: Lead Qualification
            - generic [ref=e247]: AI Calling
            - generic [ref=e250]: Appointment Booking
            - generic [ref=e253]: Multilingual Voice
            - generic [ref=e256]: AI Receptionist
            - generic [ref=e259]: Smart Follow-ups
            - generic [ref=e262]: WhatsApp Automation
            - generic [ref=e265]: AI Chatbots
            - generic [ref=e268]: CRM Integration
            - generic [ref=e271]: Workflow Automation
            - generic [ref=e274]: Agentic AI
            - generic [ref=e277]: Sales Pipelines
            - generic [ref=e280]: Growth Strategy
            - generic [ref=e283]: AI Engineers
            - generic [ref=e286]: Content at Scale
            - generic [ref=e289]: Performance Marketing
          - generic [aria-hidden] [ref=e292]:
            - generic [ref=e293]: AI Voice Agents
            - generic [ref=e296]: 24/7 Call Answering
            - generic [ref=e299]: Lead Qualification
            - generic [ref=e302]: AI Calling
            - generic [ref=e305]: Appointment Booking
            - generic [ref=e308]: Multilingual Voice
            - generic [ref=e311]: AI Receptionist
            - generic [ref=e314]: Smart Follow-ups
            - generic [ref=e317]: WhatsApp Automation
            - generic [ref=e320]: AI Chatbots
            - generic [ref=e323]: CRM Integration
            - generic [ref=e326]: Workflow Automation
            - generic [ref=e329]: Agentic AI
            - generic [ref=e332]: Sales Pipelines
            - generic [ref=e335]: Growth Strategy
            - generic [ref=e338]: AI Engineers
            - generic [ref=e341]: Content at Scale
            - generic [ref=e344]: Performance Marketing
            - generic [ref=e347]: AI Voice Agents
            - generic [ref=e350]: 24/7 Call Answering
            - generic [ref=e353]: Lead Qualification
            - generic [ref=e356]: AI Calling
            - generic [ref=e359]: Appointment Booking
            - generic [ref=e362]: Multilingual Voice
            - generic [ref=e365]: AI Receptionist
            - generic [ref=e368]: Smart Follow-ups
            - generic [ref=e371]: WhatsApp Automation
            - generic [ref=e374]: AI Chatbots
            - generic [ref=e377]: CRM Integration
            - generic [ref=e380]: Workflow Automation
            - generic [ref=e383]: Agentic AI
            - generic [ref=e386]: Sales Pipelines
            - generic [ref=e389]: Growth Strategy
            - generic [ref=e392]: AI Engineers
            - generic [ref=e395]: Content at Scale
            - generic [ref=e398]: Performance Marketing
            - generic [ref=e401]: AI Voice Agents
            - generic [ref=e404]: 24/7 Call Answering
            - generic [ref=e407]: Lead Qualification
            - generic [ref=e410]: AI Calling
            - generic [ref=e413]: Appointment Booking
            - generic [ref=e416]: Multilingual Voice
            - generic [ref=e419]: AI Receptionist
            - generic [ref=e422]: Smart Follow-ups
            - generic [ref=e425]: WhatsApp Automation
            - generic [ref=e428]: AI Chatbots
            - generic [ref=e431]: CRM Integration
            - generic [ref=e434]: Workflow Automation
            - generic [ref=e437]: Agentic AI
            - generic [ref=e440]: Sales Pipelines
            - generic [ref=e443]: Growth Strategy
            - generic [ref=e446]: AI Engineers
            - generic [ref=e449]: Content at Scale
            - generic [ref=e452]: Performance Marketing
      - generic [ref=e457]:
        - generic [ref=e458]:
          - generic [ref=e459]: Our clients
          - heading "Trusted by ambitious businesses." [level=2] [ref=e460]
          - paragraph [ref=e461]: Building intelligent solutions for businesses ready to grow.
        - generic [ref=e464]:
          - img "Aajpakao" [ref=e466]
          - img "Airroad" [ref=e468]
          - img "Bundee" [ref=e470]
          - img "Global Developers" [ref=e472]
          - img "HRopal" [ref=e474]
          - img "Insuremile" [ref=e476]
          - img "iRest" [ref=e478]
          - img "Nuttyfox Gourmet" [ref=e480]
          - img "Tenbroeck Academy" [ref=e482]
          - img "Univva Group" [ref=e484]
          - img "We Nurture Foundation" [ref=e486]
          - img "ZippSlip" [ref=e488]
      - generic [ref=e515]:
        - generic [ref=e516]:
          - generic [ref=e517]: AI that works for your business
          - heading "Stop experimenting. Start building with AI." [level=2] [ref=e518]
        - generic [ref=e519]:
          - paragraph [ref=e520]:
            - text: AI should do more than generate content or answer questions.
            - emphasis [ref=e521]: It should help your business attract customers, automate work, accelerate sales and build better systems.
          - paragraph [ref=e522]: BrandSparkX brings strategy, technology and execution together to make AI work inside your business.
          - generic [ref=e523]:
            - generic [ref=e524]: Automate repetitive processes
            - generic [ref=e527]: Build AI-powered customer experiences
            - generic [ref=e530]: Develop custom AI solutions
            - generic [ref=e533]: Add AI talent to your technology team
      - generic [ref=e537]:
        - generic [ref=e538]:
          - generic [ref=e539]: The AI growth system
          - heading "One connected AI ecosystem." [level=2] [ref=e540]
          - paragraph [ref=e541]: Website traffic, calls, WhatsApp and the tools you already use connect into one system.
          - link "Talk to Us" [ref=e542] [cursor=pointer]:
            - /url: /contact
        - figure "Website and ads, calls and WhatsApp, and your tools go to BrandSparkX AI, which handles every lead, then produces qualified leads, faster sales and less manual work." [ref=e545]:
          - generic [ref=e547]:
            - paragraph [ref=e559]:
              - generic [ref=e560]: Website & ads
              - generic [ref=e561]: traffic
            - paragraph [ref=e571]:
              - generic [ref=e572]: Calls & WhatsApp
              - generic [ref=e573]: conversations
            - paragraph [ref=e581]:
              - generic [ref=e582]: Your tools
              - generic [ref=e583]: CRM, sheets, apps
            - paragraph [ref=e595]:
              - generic [ref=e596]: BrandSparkX AI
              - generic [ref=e597]: connects, automates, follows up
            - paragraph [ref=e605]:
              - generic [ref=e606]: Nothing missed
              - generic [ref=e607]: every lead handled
            - paragraph [ref=e619]:
              - generic [ref=e620]: Qualified leads
              - generic [ref=e621]: captured
            - paragraph [ref=e633]:
              - generic [ref=e634]: Faster sales
              - generic [ref=e635]: followed up
            - paragraph [ref=e647]:
              - generic [ref=e648]: Less manual work
              - generic [ref=e649]: automated
          - list [ref=e650]:
            - listitem [ref=e651]: "Inputs: Website & ads, traffic; Calls & WhatsApp, conversations; Your tools, CRM, sheets, apps"
            - listitem [ref=e652]: BrandSparkX AI. connects, automates, follows up
            - listitem [ref=e653]: Nothing missed. every lead handled
            - listitem [ref=e654]: "Results: Qualified leads, captured; Faster sales, followed up; Less manual work, automated"
      - generic [ref=e656]:
        - generic [ref=e657]:
          - generic [ref=e658]:
            - generic [ref=e659]: Our solutions
            - heading "Seven ways we help businesses build with AI." [level=2] [ref=e660]
          - paragraph [ref=e661]: Each capability works on its own. Together they form one connected growth system.
        - generic [ref=e662]:
          - link "AI Voice & Calling Give your business a voice. AI voice agents that answer, qualify and book appointments for you, 24/7 — inbound and outbound." [ref=e663] [cursor=pointer]:
            - /url: /ai-voice-calling
            - heading "AI Voice & Calling" [level=3] [ref=e670]
            - generic [ref=e671]: Give your business a voice.
            - paragraph [ref=e672]: AI voice agents that answer, qualify and book appointments for you, 24/7 — inbound and outbound.
          - link "AI Sales Turn leads into conversations. Use AI to qualify leads, follow up, engage prospects and move every opportunity forward." [ref=e674] [cursor=pointer]:
            - /url: /solutions/ai-sales
            - heading "AI Sales" [level=3] [ref=e681]
            - generic [ref=e682]: Turn leads into conversations.
            - paragraph [ref=e683]: Use AI to qualify leads, follow up, engage prospects and move every opportunity forward.
          - link "AI Growth Turn AI into a growth strategy. Find where AI creates the greatest impact, then get a practical roadmap." [ref=e684] [cursor=pointer]:
            - /url: /solutions/ai-growth
            - heading "AI Growth" [level=3] [ref=e691]
            - generic [ref=e692]: Turn AI into a growth strategy.
            - paragraph [ref=e693]: Find where AI creates the greatest impact, then get a practical roadmap.
          - link "AI Content Create more. Work less. An AI-powered content engine for social, video, copy and campaigns." [ref=e694] [cursor=pointer]:
            - /url: /solutions/ai-content
            - heading "AI Content" [level=3] [ref=e701]
            - generic [ref=e702]: Create more. Work less.
            - paragraph [ref=e703]: An AI-powered content engine for social, video, copy and campaigns.
          - link "AI Marketing Make marketing more intelligent. Automate lead generation, nurturing, CRM and WhatsApp workflows." [ref=e704] [cursor=pointer]:
            - /url: /solutions/ai-marketing
            - heading "AI Marketing" [level=3] [ref=e711]
            - generic [ref=e712]: Make marketing more intelligent.
            - paragraph [ref=e713]: Automate lead generation, nurturing, CRM and WhatsApp workflows.
          - link "Business Automation Connect your business. Automate the work. Connect people, tools and data so repetitive work runs itself." [ref=e714] [cursor=pointer]:
            - /url: /solutions/business-automation
            - heading "Business Automation" [level=3] [ref=e721]
            - generic [ref=e722]: Connect your business. Automate the work.
            - paragraph [ref=e723]: Connect people, tools and data so repetitive work runs itself.
          - link "AI Engineers on Demand AI talent when you need it. AI engineers and developers by project, week or month." [ref=e724] [cursor=pointer]:
            - /url: /ai-engineers
            - heading "AI Engineers on Demand" [level=3] [ref=e731]
            - generic [ref=e732]: AI talent when you need it.
            - paragraph [ref=e733]: AI engineers and developers by project, week or month.
          - link [ref=e734] [cursor=pointer]:
            - /url: /contact
            - heading "Start with one problem." [level=3] [ref=e735]
            - paragraph [ref=e736]: Build from there. Prove it in 7 days.
            - generic [ref=e737]: Talk to Us
        - link "Explore all solutions" [ref=e741] [cursor=pointer]:
          - /url: /solutions
      - generic [ref=e745]:
        - generic [ref=e746]:
          - generic [ref=e747]:
            - generic [ref=e748]: How we work
            - heading "From idea to intelligent execution." [level=2] [ref=e749]
          - paragraph [ref=e750]: Five stages, one direction. Start small, prove value, then scale what works.
        - list [ref=e754]:
          - listitem [ref=e755]:
            - generic [ref=e756]: "01"
            - heading "Understand" [level=3] [ref=e757]
            - paragraph [ref=e758]: We understand your business, goals, processes and challenges.
          - listitem [ref=e759]:
            - generic [ref=e760]: "02"
            - heading "Strategize" [level=3] [ref=e761]
            - paragraph [ref=e762]: We identify where AI can create measurable value.
          - listitem [ref=e763]:
            - generic [ref=e764]: "03"
            - heading "Build" [level=3] [ref=e765]
            - paragraph [ref=e766]: We design and implement the right AI solution.
          - listitem [ref=e767]:
            - generic [ref=e768]: "04"
            - heading "Automate" [level=3] [ref=e769]
            - paragraph [ref=e770]: We connect systems, workflows, data and AI agents.
          - listitem [ref=e771]:
            - generic [ref=e772]: "05"
            - heading "Scale" [level=3] [ref=e773]
            - paragraph [ref=e774]: We keep improving what works and expand AI across your business.
      - generic [ref=e776]:
        - generic [ref=e777]:
          - generic [ref=e778]: Why BrandSparkX
          - heading "AI should create business value — not complexity." [level=2] [ref=e779]
          - paragraph [ref=e780]: Businesses don't need more disconnected tools. They need the right AI, connected to the way they already work.
        - generic [ref=e781]:
          - generic [ref=e782]:
            - heading "Strategy first." [level=3] [ref=e783]
            - paragraph [ref=e784]: We start with the business problem, not the technology.
          - generic [ref=e785]:
            - heading "Built for business." [level=3] [ref=e786]
            - paragraph [ref=e787]: Every solution is designed around practical outcomes.
          - generic [ref=e788]:
            - heading "Human + AI." [level=3] [ref=e789]
            - paragraph [ref=e790]: AI enhances your people and processes rather than simply replacing them.
          - generic [ref=e791]:
            - heading "Flexible technology." [level=3] [ref=e792]
            - paragraph [ref=e793]: We work with the right technologies and engineering capabilities for the requirement.
          - generic [ref=e794]:
            - heading "Built to scale." [level=3] [ref=e795]
            - paragraph [ref=e796]: Start with one workflow, one department or one problem — then expand.
      - generic [ref=e798]:
        - generic [ref=e799]:
          - generic [ref=e800]:
            - generic [ref=e801]: Meet our team
            - heading "People behind the intelligence." [level=2] [ref=e802]
          - paragraph [ref=e803]: Strategy, engineering and delivery — led by people who answer for the outcome.
        - generic [ref=e804]:
          - article [ref=e805]:
            - img "Krishna Patil" [ref=e808]
            - generic [ref=e809]: Leadership · Primary contact
            - heading "Krishna Patil" [level=3] [ref=e810]
            - paragraph [ref=e811]: Business vision, strategic partnerships, market expansion and commercial growth.
            - generic [ref=e812]:
              - link "Email Krishna Patil" [ref=e813] [cursor=pointer]:
                - /url: mailto:Krishna@brandsparkx.com
              - link "Call Krishna Patil" [ref=e816] [cursor=pointer]:
                - /url: tel:+971559963778
          - article [ref=e819]:
            - img "Tirth Patel" [ref=e822]
            - generic [ref=e823]: Leadership · Partner & CTO
            - heading "Tirth Patel" [level=3] [ref=e824]
            - paragraph [ref=e825]: AI technology, engineering, technical strategy and product development.
          - article [ref=e826]:
            - img "Ratnesh" [ref=e829]
            - generic [ref=e830]: Strategic Partner · Growth & Marketing
            - heading "Ratnesh" [level=3] [ref=e831]
            - paragraph [ref=e832]: Growth strategy, customer acquisition and marketing expertise.
          - article [ref=e833]:
            - img "Scott" [ref=e836]
            - generic [ref=e837]: Head of Paid Media
            - heading "Scott" [level=3] [ref=e838]
            - paragraph [ref=e839]: Leads paid media strategy and performance campaigns.
        - link "Learn about us" [ref=e841] [cursor=pointer]:
          - /url: /about
      - generic [ref=e845]:
        - generic [ref=e846]:
          - generic [ref=e847]:
            - generic [ref=e848]: Stories of success
            - heading "Real problems. Practical AI." [level=2] [ref=e849]
          - paragraph [ref=e850]: Explore how intelligent technology can create meaningful business impact.
        - generic [ref=e851]:
          - link "Demonstration project Demo · Real estate Inbound enquiries answered in seconds Challenge Enquiries arrived after hours and waited until morning. Solution AI voice agent for inbound calls with CRM sync and booking. Impact Verified results to be added Read case study" [ref=e852] [cursor=pointer]:
            - /url: /work
            - generic [ref=e853]: Demonstration project
            - generic [ref=e860]:
              - generic [ref=e861]: Demo · Real estate
              - heading "Inbound enquiries answered in seconds" [level=3] [ref=e862]
              - generic [ref=e863]:
                - term [ref=e864]: Challenge
                - definition [ref=e865]: Enquiries arrived after hours and waited until morning.
                - term [ref=e866]: Solution
                - definition [ref=e867]: AI voice agent for inbound calls with CRM sync and booking.
                - term [ref=e868]: Impact
                - definition [ref=e869]: Verified results to be added
              - generic [ref=e870]: Read case study
          - link "Demonstration project Demo · Professional services Follow-up that never goes cold Challenge Sales team couldn’t follow up every lead consistently. Solution AI sales follow-up across calls and WhatsApp. Impact Verified results to be added Read case study" [ref=e873] [cursor=pointer]:
            - /url: /work
            - generic [ref=e874]: Demonstration project
            - generic [ref=e886]:
              - generic [ref=e887]: Demo · Professional services
              - heading "Follow-up that never goes cold" [level=3] [ref=e888]
              - generic [ref=e889]:
                - term [ref=e890]: Challenge
                - definition [ref=e891]: Sales team couldn’t follow up every lead consistently.
                - term [ref=e892]: Solution
                - definition [ref=e893]: AI sales follow-up across calls and WhatsApp.
                - term [ref=e894]: Impact
                - definition [ref=e895]: Verified results to be added
              - generic [ref=e896]: Read case study
          - link "Demonstration project Demo · Operations Back-office workflows that run themselves Challenge Manual data entry between disconnected tools. Solution Business automation connecting forms, CRM and reporting. Impact Verified results to be added Read case study" [ref=e899] [cursor=pointer]:
            - /url: /work
            - generic [ref=e900]: Demonstration project
            - generic [ref=e919]:
              - generic [ref=e920]: Demo · Operations
              - heading "Back-office workflows that run themselves" [level=3] [ref=e921]
              - generic [ref=e922]:
                - term [ref=e923]: Challenge
                - definition [ref=e924]: Manual data entry between disconnected tools.
                - term [ref=e925]: Solution
                - definition [ref=e926]: Business automation connecting forms, CRM and reporting.
                - term [ref=e927]: Impact
                - definition [ref=e928]: Verified results to be added
              - generic [ref=e929]: Read case study
        - link "See all work" [ref=e933] [cursor=pointer]:
          - /url: /work
      - generic [ref=e937]:
        - generic [ref=e938]:
          - generic [ref=e939]: Client testimonials
          - heading "Hear what our clients have to say." [level=2] [ref=e940]
          - paragraph [ref=e941]: Only approved, attributed feedback appears here.
        - region "Client testimonials" [ref=e943]:
          - generic [aria-hidden] [ref=e944]: “
          - group "1 of 3" [ref=e946]:
            - paragraph [ref=e947]: Approved client testimonial will appear here. Add the quote exactly as the client provided it.
            - generic [ref=e950]:
              - generic [ref=e951]: Client name
              - generic [ref=e952]: Position, Company · placeholder
          - generic [ref=e953]:
            - button "Previous testimonial" [ref=e954] [cursor=pointer]
            - button "Next testimonial" [ref=e957] [cursor=pointer]
      - generic [ref=e966]:
        - generic [ref=e967]:
          - heading "Ready to build with AI?" [level=2] [ref=e968]
          - paragraph [ref=e969]: Tell us what you want to improve, automate or build. We'll help you identify where AI can create the most value.
        - generic [ref=e970]:
          - link "Start a Conversation" [ref=e971] [cursor=pointer]:
            - /url: /contact
          - link "WhatsApp us" [ref=e974] [cursor=pointer]:
            - /url: https://wa.me/971559963778
  - contentinfo [ref=e975]:
    - generic [ref=e976]:
      - generic [aria-hidden] [ref=e977]: B
      - generic [aria-hidden] [ref=e978]: R
      - generic [aria-hidden] [ref=e979]: A
      - generic [aria-hidden] [ref=e980]: "N"
      - generic [aria-hidden] [ref=e981]: D
      - generic [aria-hidden] [ref=e982]: S
      - generic [aria-hidden] [ref=e983]: P
      - generic [aria-hidden] [ref=e984]: A
      - generic [aria-hidden] [ref=e985]: R
      - generic [aria-hidden] [ref=e986]: K
      - generic [aria-hidden] [ref=e987]: X
    - generic:
      - generic [ref=e988]:
        - link "BrandSparkX home":
          - /url: /
          - img "BrandSparkX"
        - generic [ref=e989]: Build. Automate.Grow with AI.
        - paragraph [ref=e990]: AI growth & automation for ambitious businesses — strategy, automation, engineering and AI voice, connected into one growth system.
        - generic [ref=e991]:
          - link "WhatsApp" [ref=e992] [cursor=pointer]:
            - /url: https://wa.me/971559963778
          - link "Email" [ref=e995] [cursor=pointer]:
            - /url: mailto:business@brandsparkx.com
      - generic [ref=e998]:
        - heading "Contact us" [level=2] [ref=e999]
        - generic [ref=e1000]:
          - link "Phone / WhatsApp +971 55 996 3778" [ref=e1001] [cursor=pointer]:
            - /url: tel:+971559963778
            - generic [ref=e1004]:
              - generic [ref=e1005]: Phone / WhatsApp
              - text: +971 55 996 3778
          - link "Email business@brandsparkx.com" [ref=e1006] [cursor=pointer]:
            - /url: mailto:business@brandsparkx.com
            - generic [ref=e1009]:
              - generic [ref=e1010]: Email
              - text: business@brandsparkx.com
      - generic [ref=e1011]:
        - heading "Careers" [level=2] [ref=e1012]
        - generic [ref=e1013]:
          - link "Phone +971 52 564 8489" [ref=e1014] [cursor=pointer]:
            - /url: tel:+971525648489
            - generic [ref=e1017]:
              - generic [ref=e1018]: Phone
              - text: +971 52 564 8489
          - link "Email hr@brandsparkx.com" [ref=e1019] [cursor=pointer]:
            - /url: mailto:hr@brandsparkx.com
            - generic [ref=e1022]:
              - generic [ref=e1023]: Email
              - text: hr@brandsparkx.com
          - link "View careers" [ref=e1024] [cursor=pointer]:
            - /url: /careers
      - generic [ref=e1028]:
        - heading "Solutions" [level=2] [ref=e1029]
        - list [ref=e1030]:
          - listitem [ref=e1031]:
            - link "AI Voice & Calling" [ref=e1032] [cursor=pointer]:
              - /url: /ai-voice-calling
          - listitem [ref=e1033]:
            - link "AI Growth" [ref=e1034] [cursor=pointer]:
              - /url: /solutions/ai-growth
          - listitem [ref=e1035]:
            - link "AI Content" [ref=e1036] [cursor=pointer]:
              - /url: /solutions/ai-content
          - listitem [ref=e1037]:
            - link "AI Marketing" [ref=e1038] [cursor=pointer]:
              - /url: /solutions/ai-marketing
          - listitem [ref=e1039]:
            - link "AI Sales" [ref=e1040] [cursor=pointer]:
              - /url: /solutions/ai-sales
          - listitem [ref=e1041]:
            - link "AI Engineers" [ref=e1042] [cursor=pointer]:
              - /url: /ai-engineers
          - listitem [ref=e1043]:
            - link "Business Automation" [ref=e1044] [cursor=pointer]:
              - /url: /solutions/business-automation
      - generic [ref=e1045]:
        - heading "Our locations" [level=2] [ref=e1046]
        - generic [ref=e1047]:
          - generic [ref=e1051]:
            - strong [ref=e1052]: Dubai, UAE
            - text: 801–806, Office No. 5, Clover Bay Tower, Burj Khalifa Area, Business Bay, Dubai, UAE
          - generic [ref=e1056]:
            - strong [ref=e1057]: Bengaluru, India
            - text: World Trade Centre, Unit 2274A, 22nd Floor, Brigade Gateway, Bengaluru – 560055
          - generic [ref=e1061]:
            - strong [ref=e1062]: United States
            - text: 3838 Andrew Johnson Hwy, Limestone, TN 37681, United States
          - generic [ref=e1066]:
            - strong [ref=e1067]: Gandhinagar
            - text: 13th Floor, GIFT Tower One, GIFT City, Gandhinagar, Gujarat
    - generic [ref=e1068]:
      - paragraph [ref=e1069]: © 2026 BrandSparkX. All rights reserved.
      - navigation "Legal" [ref=e1070]:
        - link "Privacy Policy" [ref=e1071] [cursor=pointer]:
          - /url: /privacy
        - link "Terms & Conditions" [ref=e1072] [cursor=pointer]:
          - /url: /terms
  - generic [ref=e1073]:
    - button "Back to top"
  - alert [ref=e1074]
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