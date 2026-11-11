---
layout: post
title: 'Harvard TECD Immersion Notes (2): Day 2'
date: '2026-11-10'
categories: cifellowship
lang: en
subtitle: What it takes for a good model to become good care
description: "What it takes for a good model to become good care"
tags:
- tecd
- digital-health
- clinical-ai
- conference
translation_id: tecd-immersion-2026-part-2
image: /assets/images/posts/opt-1d9e0f380850ddc437f0e017.avif
featured: false
toc: true
published: true
permalink: /en/cifellowship/tecd-immersion-2026-part-2/
---

This picks up from the [previous post](/en/cifellowship/tecd-immersion-2026-part-1/) with Day 2.

If Day 1 was mostly about technology and how it gets paid for, Day 2 was mostly about the technology itself.

There were four sessions.


### Session 1: Digital health applications and software as a medical device

The first session was taught by Professor Stern, co-director of the course (TECD). It covered digital health applications and Software as a Medical Device (SaMD).

Personally, this is a topic I like a lot.

I touched on it in older posts, but whenever people talk about digital health, digital therapeutics come up sooner or later. The same goes for SaMD, where the software itself is registered as a medical device.

It was already a hot topic when I first got interested in this field as a medical student, so I was curious how much had changed now that I have finished residency. The short answer: there is still a long way to go.

Treating software as a medical device and authorizing it comes with a built-in problem. Software gets updated regularly. And you can't really go back for a new authorization with every feature update, can you?

SaMD means software that performs a medical purpose on its own, without being part of a physical medical device. Software built into a device, like the software inside an insulin pump, is called SiMD (Software in a Medical Device). Going by the number of FDA authorizations, SiMD still outnumbers SaMD.

![Line charts of FDA-authorized digital medical devices by clinical specialty from 2005 to 2024. The top panel shows software built into devices and the bottom panel shows SaMD.](/assets/images/posts/opt-8bd527a0b43e0134eca5a697.webp)

*Yearly FDA authorizations of software built into devices (SiMD, top) and SaMD (bottom). Source: Everhart et al., [npj Digital Medicine 2026](https://doi.org/10.1038/s41746-026-02692-5), Fig. 3, CC BY 4.0.*

The lecture also pointed out that software keeps changing and its performance can change with it, that patients can be harmed when a service is discontinued, and that the first version of a product tells you little about what it will look like later.

The US did try to solve this once. It was the FDA's Pre-Cert pilot, which I mentioned briefly at the end of the last post. Instead of reviewing software version by version, the idea was to look at the development practices of the company that makes it and certify the company in advance. Nine companies took part, including Apple, Samsung and Fitbit, but the pilot ended in 2022. The conclusion was that it was hard to implement under the legal authority the FDA currently has.

There is another problem as big as regulation: reimbursement. None of this is sustainable without a clear answer to who pays.

The main example was Germany's DiGA. Apparently it stands for Digitale Gesundheitsanwendung.

It is a system that connects digital health products to prescribing and reimbursement. From what I found, Germany was one of the first countries to bring in regulation and reimbursement for digital health apps, through its Digital Healthcare Act of 2019.

DiGA links digital health apps to the prescription and reimbursement pathway. Clinical evidence normally matters a great deal for authorization, of course. But if a product meets the basic requirements, such as safety, data protection and interoperability, DiGA gives it a provisional listing even when the evidence of effect is still thin. During that period the app is covered by insurance while the company collects evidence. Show an effect within the period and you get a permanent listing; fail and you are out. (Higher-risk Class IIb devices are not eligible for provisional listing.)

By buying time to collect clinical evidence, it is a regulatory direction that is friendly to digital health apps.

It is also interesting that the effect you have to show does not have to be a medical benefit like symptom improvement. Improvements in the structure or process of care, such as better adherence or access, count too.

Looking at the sixty-odd listed apps by field, 30 are in mental health, 8 in musculoskeletal conditions and 5 in endocrinology, so for now the list leans heavily toward psychiatric conditions.

One more point I found interesting: when you evaluate a digital therapeutic, you have to separate the full content of the app (full dose), the part the patient actually opened (consumed dose), and the part that led to real behavior change (realized dose).


### Session 2: The digital transformation of pathology, and Test → Process → Service

This session was about the digital transformation of pathology.

The speaker was Dr. Jochen Lennerz, a medical director at Natera.

Natera is a US diagnostics company known for tests that analyze cell-free DNA in blood. Its best-known tests are for prenatal screening (Panorama), molecular residual disease in cancer (Signatera) and transplant rejection (Prospera).

He said these are the questions to ask when you look at a diagnostic technology.

1. Does it measure accurately? (analytical validity)
2. Is the measurement linked to the actual disease? (clinical validity)
3. Does it benefit the patient? (clinical utility)
4. Can the institution run it? (business value)

Questions along those lines.

Passing one step does not mean the next one follows. An algorithm that finds cancer well does not guarantee better treatment choices or outcomes.

The phrase that stuck with me was **Test → Process → Service**.

- Test: does the test or algorithm give the right result?
- Process: do specimen handling, reporting, delivery and review actually work?
- Service: does the patient go on to get the next test or treatment?

![A diagram of the three stages Test, Process and Service, with the point where care breaks down at each stage.](/assets/images/posts/tecd2-test-process-service-en.svg)

*My own diagram, based on the lecture and the Diagnostic Quality Model by Lennerz et al. ([Clin Chem Lab Med, 2023](https://doi.org/10.1515/cclm-2022-1151)).*

What good is an accurate test? It only means something once it is reflected in care.

Even with a good result, it ends there if the person responsible never sees it, the patient misses the next visit, or treatment is held up by prior authorization.

The second half of the lecture was about regulation.

He said technology, clinical medicine and regulation all move at different speeds, and introduced two approaches for safely handling products that keep changing.

One is the PCCP (Predetermined Change Control Plan), where you decide in advance how far the product may change and how each change will be validated. The other is shadow deployment, where the tool runs alongside real care on the same cases without affecting it, and you compare the results. (Of course, running well in shadow mode does not prove clinical benefit.)

There was some overlap with the last mile problem from Day 1.

### Session 3: If AI gets better, do we learn less?


The third session was also taught by Professor Stern.

It was a case on Aidoc, a radiology AI company. Rather than focusing only on the diagnostic performance of the model, we looked at the whole picture: how well the product integrated into the workflow, how it was distributed, what its customer relationships looked like, and how it handled regulation.

There were two main points.

- Innovation happens when regulatory and business-model barriers are low.
- Adoption succeeds only when the innovation fits into existing payment models and workflows.

Obvious, but important.

Aidoc was presented as a company that got both right. It has more FDA-cleared algorithms than any other company, its team spent a lot of time in hospitals from the early days, and it first sold to radiology departments before expanding to hospital executives.

A line from the CEO stayed with me: AI was never about the AI itself, it was about changing processes to help people. I agree with that.

There was also a discussion about whether the company should build more models itself or become a platform that also offers other companies' algorithms. If you run a platform and sell your own products on it, you end up competing with the companies that came onto it. This echoes the Day 1 discussion of Epic and the ambient scribe vendors.

After that, the conversation moved to how AI will affect the basic skills of physicians. We discussed scenarios of upskilling, where AI makes you better, deskilling, where existing skills fade, and never-skilling, where the basics are never learned in the first place.

Honestly, isn't it unavoidable that the more work we hand to AI, the less skill we build in some areas? Nobody takes the long way around when there is an easier path. On my team there is an ongoing debate about how much AI use we should allow for residents in training, and this connects to it. Learning to do the work properly and then using AI to make it easier is not the same as leaning on AI from the start without going through that.

### Session 4: AI Prompt-a-thon

The last session was a hands-on prompting workshop.

We tried several prompting techniques, including reverse prompting, where you first describe what you want to do and ask the AI to write a prompt for that task.

The basic framework was R-T-F: set the Role, the Task and the output Format.

I had played around with prompts before, so the material felt familiar. I also noticed what has changed since then. I used to put a lot of effort into structuring instructions in detail with formats like Markdown or HTML, but the models I use these days often understand the intent without that.

Still, assigning a role, describing the result and conditions you want, and asking the model what else you should be thinking about were all still useful.

We were also told to evaluate the answer, not the prompt. Can the evidence be checked, does it solve the actual problem, what is missing, whose perspective is missing, and can the reader act on it?


---

Day 3 will continue in the next post.
