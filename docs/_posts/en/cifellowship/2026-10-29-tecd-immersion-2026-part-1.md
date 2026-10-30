---
layout: post
title: 'Harvard TECD Immersion Notes (1): Course Overview and Day 1'
date: '2026-10-29'
categories: cifellowship
lang: en
subtitle: What it takes to bring technology into medicine
description: "What it takes to bring technology into medicine"
tags:
- tecd
- digital-health
- clinical-ai
- conference
translation_id: tecd-immersion-2026-part-1
image: /assets/images/posts/opt-1d9e0f380850ddc437f0e017.avif
featured: false
toc: true
published: true
permalink: /en/cifellowship/tecd-immersion-2026-part-1/
---

I recently took a course.

It's called TECD, short for [Technology-Enabled Care Delivery: From Digital Medicine to AI](https://learn.hms.harvard.edu/programs/technology-enabled-care-delivery-digital-medicine-ai).

Think of it as a course on how to bring digital technology, AI in particular, into real clinical care and how to evaluate it.

Most of the course actually runs as a weekly online webinar from September to November.

Over those two months, each participant runs a capstone project tied to their own institution, and from October 24 to 26 there was a three-day in-person session (called the Immersion) on the Harvard Medical School campus.

I just got back from the Immersion. The content was fun, and the people in the room were just as interesting. Alongside clinicians there were hospital executives, people from industry, engineers, researchers, and health economists, and they came from many different countries.

Anyway, I'd like to briefly write down what I took away from the course.


## Day 1

Day 1 ran from 8:30 to 5 with four sessions.

### Session 1: How do hospitals choose technology?

The first session was led by the Chief Digital and Information Officer (CDIO) of Brown University Health, the health system affiliated with Brown University. It was about how hospitals make decisions when they look for a technical solution to a problem.

Naturally, the first step is to check whether the problem can be solved within the electronic health record (EHR) the hospital already uses. If it can, no further solution is needed.

If not? Look for a specialized product built for that problem. If there's no such product? Consider building it in-house.

If a usable product already exists, using it is much faster and easier than building a new one, so the order makes sense.

One fun question: could advances in LLMs change this order? AI has gotten that good lately.

Of course, building and maintaining a product is easier said than done. It takes a huge amount of work, and the difficulty varies a lot with the size of the hospital or organization, so using an outside product, when there is one, is probably still the most efficient choice.

Still, if LLMs keep improving, could there come a point where it's more efficient for a hospital to build its own team and make products fitted to its workflows than to use outside products? It's worth thinking about.

If that becomes common, I idly wonder whether something like the Steam Workshop could work: the EHR provides the foundation, hospitals or individual users build and upload the features they need on the ground, and the popular ones get folded in as official features. (Installing a game mod and adding a feature used in patient care do come with very different levels of responsibility, though.)


#### Ambient documentation


An ambient scribe is, in a word, AI-powered charting. It's increasingly common in the US: you leave an app running during the visit, the conversation is recorded, the audio is turned into text, and the text is written up automatically as a chart note.

US practice expects very detailed charting, so it goes without saying how popular ambient scribe apps have become.

That said, several questions remain: 1) do clinicians really like it, 2) does it reduce burnout, 3) does it really cut documentation time, 4) how accurate are the notes, and so on.

Clinicians may find it more comfortable while their actual documentation time stays the same (since they have to review and edit what the AI wrote), and the quality of the chart isn't guaranteed either.

There are quite a few papers on this. Interestingly, one I read recently found no real difference in total charting time (less charting during the visit, but more time editing afterward, so it was a wash), yet clinician satisfaction went up. Then again, editing a draft is easier than writing a note from scratch, so maybe that's no surprise?

One thing to think about: if an EHR company builds this feature into its own product, where does the competitive edge of third-party vendors come from?

Epic, the largest EHR vendor in the US, added its own ambient scribe this year, called Chart with Art. That means products that offered ambient scribing through Epic integration now face a big competitor. Do they stand a chance?


### Session 2: The last mile problem


I really enjoyed this session, since I'm interested in telehealth, remote patient monitoring, and hospital at home.

Medical knowledge has advanced, but connecting treatment to patients' daily lives and delivering it there is never easy.

Chronic disease is woven into a patient's life and keeps changing. If a patient's life is a plane, health is a line running across it, and clinic visits are the scattered points we take now and then to estimate that line.

The gaps between points, between one visit and the next, are often long, and clinicians have to infer a patient's health and treat them based on these rare, short encounters.

Remote patient monitoring (RPM) and hospital at home are among the things that might help fill that gap. Hospital at home is an attempt to provide inpatient-level care in the home.

Sounds hard? It is. How do you staff home visits, how do you get the needed drugs and equipment there, how do you move the patient to the hospital if they get worse... there is so much to consider.

The idea took off during COVID, when virtual care was at its peak. Since then it has been on shaky ground, with the Medicare waiver lapsing at times (though early this year it was extended for five years, through 2030). Still, some patients clearly sit somewhere between needing admission and outpatient follow-up, so it remains an idea worth thinking about.

The session also covered an [observational study](https://pubmed.ncbi.nlm.nih.gov/37931262/) of RPM for hypertension. Compared with practices that used RPM little, practices that used it heavily saw more medication fills and primary care visits and fewer acute care encounters such as ED visits and admissions, but higher spending related to hypertension care. (Maybe that's to be expected?)

Anyway, I care a lot about disease prevention and management, so I found this session very interesting.


### Session 3: So who pays?

Reimbursement, meaning how care gets paid for, is always an interesting and difficult topic. Medical school doesn't teach it in much depth, right?

The problem is that you absolutely need to know it in practice. I can't help thinking it would be good to teach it more systematically to students and residents.

Anyway, the lecture walked through the ways medical technology can get paid for. There were four main ones.

1. Fee-for-service: billing a CPT code each time a service is provided.
2. Absorbed into existing reimbursement: as with robotic surgery, the technology's cost is covered within existing payment for care.
3. Capitation/value-based care: per-patient payment or value-based contracts, where you take responsibility for the care and costs of a defined patient population.
4. Outcome-based payment: payment based on results. Which, of course, requires that results can be measured objectively.

Even when AI is applied to medicine, we have to think about which payment model fits how it's used. The right one will likely depend on the nature of the product, how it's deployed, and the workflow.

The session focused on CMS's ACCESS model and FDA's TEMPO pilot.

CMS's **ACCESS** is a payment model launched in July 2026.

Hypertension, diabetes, chronic kidney disease, chronic pain, depression, anxiety... these are conditions with no real cure that people live with for a long time, right? ACCESS gives organizations that manage these conditions with technology a recurring per-patient payment. The catch is that to receive the full payment, a certain share of their patients must reach outcome targets (and the bar rises every year).

If existing RPM and device-related payments paid for how many days a device was used or how many minutes were spent on management, ACCESS seems focused on whether patients actually get better. (Apparently the referring primary care physician can also bill a co-management payment for adjusting medications based on progress updates.)

FDA's TEMPO is best understood as ACCESS's partner. For low-risk digital health devices that can be used under ACCESS, it relaxes some requirements even before formal FDA authorization, allows real-world use, and has manufacturers use that data to seek formal authorization. It's still a pilot, so who knows how long it will last, but the structure is this: CMS pays based on patient outcomes, and on that basis FDA lets digital health devices build evidence.

Between this and the Pre-Cert pilot for software as a medical device (SaMD), FDA seems to put out these fun, thought-provoking regulatory experiments fairly often.


---

So that's what we talked about, and after reviewing each other's capstone projects, Day 1 came to an end.

This got longer than I expected.
