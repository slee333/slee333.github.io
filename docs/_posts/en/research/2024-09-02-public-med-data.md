---
layout: post
permalink: /en/research/:title/
title: "Research life with open data"
date: 2024-09-02 00:00:00 -0400
tags: [clinical-informatics, medicine, public-data, research]
categories: research
categorydisplay: Research
lang: en
image: https://i.imgur.com/hxYmCyK.png
subtitle: In any research, the most crucial aspect is obtaining high-quality data. Public data somewhat helps solve this issue.
translation_id: "publicData"
---

I am currently working on abstracts to submit to several conferences. I have already submitted to a few places, and one has sent back revisions, while the others are either still in progress or awaiting feedback.

The hospital I am currently working at is a secondary hospital. Naturally, compared to tertiary hospitals, which have plenty of funding and emphasize research, our support is less. The most regrettable part is the data. We lack both the channels and methods to acquire data.

In such an environment, public data has been incredibly useful.

There are various types and categories of public data. The NIH has a [page](https://www.nlm.nih.gov/NIHbmic/domain_specific_repositories.html) where you can easily find these public datasets.

![](https://i.imgur.com/Ia4T6PR.png)
NIH Public Data Repository Page

---

Among the numerous public data repositories, the most representative one is the MIMIC dataset. It's the public data that I find most useful and frequently use.

![](https://i.imgur.com/G5URn9y.png)

The MIMIC dataset contains data collected from patients admitted to the Beth Israel Deaconess Medical Center in the United States from 2000 to 2019. The latest version, MIMIC-IV, includes information on approximately 200,000 patients. All data is thoroughly anonymized; personal identifiable information such as names, admission dates, and birth dates are randomized while preserving ages to protect patient privacy. It's akin to having the entire electronic health records (EHR). Understandably, it’s vast and consumes a lot of space! (A good excuse to buy an SSD 😊)

Thus, being able to analyze such a large anonymized dataset for free is a tremendous advantage for researchers. For example, I aimed to develop an algorithm for detecting fluid overload for an abstract submission to a conference. Fluid overload causes pulmonary edema, dyspnea, and pitting edema of the lower extremities and is usually diagnosed clinically, with diuretics commonly used for treatment. However, since fluid overload presents various clinical manifestations and isn't always included in diagnostic codes, identifying patients with fluid overload in databases is challenging.

One method I considered was utilizing medication records included in the MIMIC data. While fluid overload manifests in various clinical ways, the solution is clear. For end-stage renal disease (ESRD) patients, dialysis resolves it, and for those capable of urination, diuretics do. Thus, I categorized patients who received diuretics intravenously within a certain period after visiting the emergency room as being in a fluid overload state. If you ask, “Isn’t that an arbitrary criterion?” you’d be right. But if diuretics were administered promptly in the emergency room, it likely indicates a critical situation, implying fluid overload.

The detail in the MIMIC data greatly aided this process. As previously mentioned, each patient's admission time and related medication administration times are thoroughly documented. Although I eventually abandoned this approach due to various limitations and switched to another method, I couldn't help but be amazed by the MIMIC data’s quality. The detailed arrangement of admission times, medication records, dosages, and times evoked a sense of awe… I was nearly moved to tears.

---

In fact, since MIMIC data is what I actively used the most, I've ended up extensively introducing MIMIC data. However, there are many other public datasets available for use. Platforms like PhysioNet, which includes MIMIC, offer a variety of public datasets, allowing researchers to explore boundless possibilities.

![](https://i.imgur.com/zp0LiZC.png)

To give a few more examples...

![](https://i.imgur.com/zipZXqA.png)
**N3C (National COVID Cohort Collaborative)** is a database concerning COVID-19 related clinical data collected from across the United States. Although researchers can access it for free if they meet certain conditions, a Data Use Agreement (DUA) is required to protect personal information, and researchers must apply for access rights through their affiliated institution. This data is particularly valuable for COVID-19 research but seems vast enough to be used for other purposes as well. I haven't delved into it deeply, so I'm unsure how feasible it is.

![](https://i.imgur.com/BQHdrLq.png)

Another example is the **UK Biobank**, which offers a vast biomedical database containing genetic, health, and lifestyle data collected from 500,000 UK residents. To access this data, researchers must go through an application process and pay a fee based on the scope of their research projects. The UK Biobank plays a very crucial role in enabling researchers globally to conduct various disease studies. If you're a student, you can access the data for $500, but as a financially-strapped resident… I might consider it if I have a clear research topic and need external validation for the progress made with other datasets. Using the UK Biobank sounds kind of cool, doesn’t it?

Of course, aside from N3C and UK Biobank, there are many public datasets available where researchers need to obtain access rights or pay a fee. These datasets usually contain extensive clinical data, genetic information, or lifestyle data and are valuable resources for those of us in need of high-quality data. Public data represents a conduit for the democratization of research, and the door is open for more researchers to access it. I hope for the provision of more public datasets in the future, so we can have fun running all sorts of statistics!

