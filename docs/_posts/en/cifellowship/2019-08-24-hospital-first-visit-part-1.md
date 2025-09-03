---
layout: post
permalink: /en/cifellowship/:title/
title: Is this your first time at the hospital? Please fill out the paperwork (1)
date: 2019-08-24 00:00:00 -0400
tags: [clinical-informatics, it, medicine]
categories: cifellowship
categorydisplay: Clinical Informatics
lang: en
thumbnail: https://cdn.pixabay.com/photo/2018/11/16/14/29/papers-3819540_960_720.jpg
subtitle: Argo Project - What if we don't have to listen to these words anymore?
translation_id: "Paperworks1"
slug: hospital-first-visit-part-1
---
# 0. A Story of a Breast Cancer Patient



Jean Patterson, who has been battling breast cancer for a long time, carries a bag every time she goes to a new hospital. It's a bag full of documents, CDs, DVDs, etc., containing her medical records. Over her long battle with the disease, her medical records have inadvertently been dispersed to over twenty hospitals. Here, a problem arises: it was impossible to view the records that were scattered across more than twenty hospitals in one place.



The cancer spreads from the breast to various parts such as the bones and brain, and with each new hospital visit, she has to fill out paperwork and take tests again, which is incredibly inefficient. Therefore, she chose to carry her medical records herself, including tens of paper files and CDs that contain video information. [1]



![](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/RUYYaG6Ufw7ThrKvN6BI6dfF94g.jpg)

Figure 1. Carrying tests from last year, the year before that, and even yesterday's... Oh, it's heavy!



Although the above story is an example from an overseas article, it isn't entirely unfamiliar to us. There are very limited ways for patients to access their own medical records, and medical records are not easily shared. You've probably heard the story where at a new hospital visit, they suggest redoing the tests because they can’t access the previous results. Isn't this highly inefficient? Wouldn't this situation improve if records from one hospital could be accessed at another? Hospitals no longer store patient information solely on paper charts but save it digitally on computers. So why isn't the exchange of patient information between hospitals happening smoothly?



---



# 1. Electronic Medical Records



Most of us remember the days before computers when hospitals used paper charts. (Nowadays, they aren’t completely obsolete.) However, everyone will agree that computerized data is far more convenient for information storage and creating new charts than paper charts. For these reasons, the Electronic Medical Record (EMR) emerged in the 1990s.



![](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/U2o8JFwwe3_2OjTL2bMscIj_xXg.jpg) 

Figure 2. It’s like this. Like viewing player stats in a Football Manager game.



Electronic medical records are definitely a much more convenient way to manage information than paper charts. Being digitized, accessing patient records was easy, no more full drawers of paper charts, and it was easier to plan treatments or conduct research based on organized information.



However, the current EMR system faces considerable criticism. The criticisms are broadly of two kinds: one, despite the expectation of easy information exchange, the exchange of medical information between hospitals or between patients and hospitals is not active, leading to situations like Jean Patterson’s; and two, the current EMR system reduces the time doctors have to interact with patients, contributing to burnout among many physicians. This article will carefully examine the efforts made to overcome the first criticism, that is, the limited sharing of electronic medical records.



---



# 2. Argonaut Project



Have you ever seen the term "**HL7**"? At first glance, it might sound like an idol group or a car model. However, HL7 stands for Health Level Seven International, a non-profit international organization based in Ann Arbor, Michigan, USA, established in 1987 to set standards for the interoperability of health information among medical institutions. It also refers to the international standard for the electronic exchange of health information between medical facilities created by that organization. [2]



The creation of international standards like HL7 came from the integration of IT and healthcare. As medical software companies emerged with IT advancements, different hospitals ended up using different medical software, leading to poor interoperability of medical data. Thus, the need for compatibility between medical software was recognized, and HL7 emerged to meet that need. HL7 has continually revised its standards in line with IT advancements. [3]



Around 2014, HL7 launched the **Argonaut Project**. Do you remember the story of the Argonauts from Greek mythology? It’s the story of the hero Jason's expedition to Colchis to retrieve the Golden Fleece, helped by various heroes and gods.



![](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/30zdwf6ZKlJqg5w-sduY8bKUUcg.jpg) 

Figure 3. Embarkation of the Argonauts. Lorenzo Costa. 16th century.



The project was named 'Argonaut' due to the influence of the "A Robust Health Data Infrastructure" report published by JASON, a US government advisory group of scientists. They strongly pointed out that the biggest barrier to effective health information exchange was the **low interoperability** of health data. 



Thus, influenced by this report, HL7 planned a better interoperable health data framework, with JASON playing a leading role. And as you may know, Jason is the English form of Iason. So, that's how the project, likely started by JASON, became known as the **Argonaut Project**.



If the goal of the mythic Argonauts was the Golden Fleece, the purpose of HL7's Argonaut Project is to create a straightforward, highly interoperable health data framework suitable for the diversified information technology environment. With the rise of cloud technology, the Internet of Things, and mobile applications, the traditional methods of handling health data struggle to ensure compatibility across the various information environments. This is why it was criticized for low interoperability. Therefore, a new data framework compatible with the changing environment was needed. [4]



![](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/DHbYI3JlxY2mWpSFxpXtbsHhK9Y.jpg) 

Figure 4. John Halamka, the head of HL7's Argonaut Project. (https://twitter.com/jhalamka)



John Halamka, head of the Argonaut Project, a prominent figure with titles such as Harvard Medical School professor, emergency medicine physician, and chairman of the New England Healthcare Information Network, commented on the project's purpose in a 2015 interview with InformationWeek. [5]



> "There are two main objectives. (...) The first purpose is to make sharing essential clinical information commonly needed in clinical settings easier and more convenient."



More specifically, the Argonaut Project aimed to replace the Clinical Document Architecture (CDA) framework used for health information exchange with **FHIR** (Fast Healthcare Interoperability Resources), focusing on interoperability with various IT environments. This would enable the use of health information in mobile applications, data clouds, and other platforms.



![](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/6KRi7D2GnRnASUIR98stx5rdxt4.gif) 

Figure 5. Hold on a second. What is CDA and what is FHIR?



Simply put, CDA was the traditional method of storing and exchanging health information. The purpose of CDA was to facilitate the exchange of health data between medical facilities. It was convenient for hospitals to exchange information but had limitations when it came to various platforms like mobile and cloud, which have been expanding in the information technology field. [6]



# 3. Why FHIR?



FHIR has three major strengths compared to CDA. [7]



First, unlike CDA, which stores information in a single document, FHIR disseminates information. It categorizes information such as lab results, personal details, and medications into different categories, reducing the need to pull unnecessary information together. Of course, it's easy to gather all related information when necessary.



The second strength of FHIR is that it is easy for people (mainly developers) to understand. FHIR uses web-based technology to represent data formats such as JSON and REST, which are easily interpreted by humans, unlike the complex data formats of CDA. Furthermore, since FHIR's communication format and data types are designed to be human-readable, it is very convenient for developers to use.



These advantages of FHIR combine to enable quick and easy implementation of healthcare systems. By using FHIR, the time taken to integrate and decode various EMR platforms is reduced, creating an environment where developers can focus on functionality. John Halamka regards healthcare data structure improvement using FHIR as a crucial bridge for medical innovation. With an environment friendly to developers, more developers can enter the healthcare field, fostering creative ideas in a virtuous cycle. [8]



![](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/VIPsF-n1k-dLXGGYjRlIIkBozvU.png) 

Figure 6. Major EMR companies in the United States. These companies create software for recording EMRs.



The Argonaut Project collaborates with major US medical institutions such as Mayo Clinic and Beth Israel Deaconess Hospital, as well as EMR companies like McKesson, Cerner, and Epic. There seems to be a societal consensus that enhancing interoperability between medical institutions is essential for providing better healthcare services. [9]



However, there are still opinions that we need to wait and see if the Argonaut Project can solve the interoperability issue effectively. While CDA was legally recommended as a standard for meaningful use of health information by the US government, there is no such legal impetus for FHIR usage yet. Moreover, since FHIR continues to release updated versions, some companies use FHIR version 2, others version 3, and some are waiting for the upcoming version 4, leaving the standards not yet unified.



While rapid updates are a positive indicator that HL7 is responsive to feedback and constantly improving FHIR, these frequent changes present instability for companies. They face uncertainty about when the next update will require them to overhaul their existing systems. Hopefully, FHIR will converge into a stable version, resolving these issues. [10]



Despite some of these obstacles, FHIR is spotlighted as the next-generation data format poised to solve the health information interoperability problem. As mentioned earlier, one of FHIR's significant strengths is enabling quick and easy healthcare system implementation. Perhaps for this reason, Apple announced in 2018 it would offer a service using FHIR for users to check their medical records via their iPhone, called Mobile Health Records.



In the next article, we will look into how IT companies, like Apple’s Mobile Health Records and Google Cloud Platform, are working to address health information interoperability issues.



---



<ins>**References:**</ins>



[1]:[https://www.kqed.org/futureofyou/209/critical-condition-how-a-broken-medical-records-system-is-endangering-americas-health](https://www.kqed.org/futureofyou/209/critical-condition-how-a-broken-medical-records-system-is-endangering-americas-health)  

[2]:[http://www.hl7.org/about/index.cfm?ref=nav](http://www.hl7.org/about/index.cfm?ref=nav)  

[3]:[https://blog.naver.com/webtplus/221017785199](https://blog.naver.com/webtplus/221017785199)  

[4]:[https://argonautwiki.hl7.org/Main_Page](https://argonautwiki.hl7.org/Main_Page)  

[5]:[https://www.kqed.org/futureofyou/321/startups-entrepreneurs-try-to-solve-medical-records-debacle](https://www.kqed.org/futureofyou/321/startups-entrepreneurs-try-to-solve-medical-records-debacle)  

[6]:[https://www.allscripts.com/2016/02/preparing-for-interoperability-more-information-you-need-to-know-about-fhir/](https://www.allscripts.com/2016/02/preparing-for-interoperability-more-information-you-need-to-know-about-fhir/)  

[7]:[http://blog.naver.com/PostView.nhn?blogId=webtplus&logNo=221022096612&parentCategoryNo=&categoryNo=36&viewDate=&isShowPopularPosts=true&from=search](http://blog.naver.com/PostView.nhn?blogId=webtplus&logNo=221022096612&parentCategoryNo=&categoryNo=36&viewDate=&isShowPopularPosts=true&from=search)  

[8]:[https://www.informationweek.com/strategic-cio/can-argonaut-project-make-exchanging-health-data-easier/a/d-id/1318774](https://www.informationweek.com/strategic-cio/can-argonaut-project-make-exchanging-health-data-easier/a/d-id/1318774)  

[9]:[https://www.hl7.org/implement/standards/fhir/2015Jan/argonauts.html](https://www.hl7.org/implement/standards/fhir/2015Jan/argonauts.html)  

[10]:[https://www.medicaleconomics.com/technology/interoperability-fhir-standard-not-panacea](https://www.medicaleconomics.com/technology/interoperability-fhir-standard-not-panacea)  

[Figure 1]:[https://www.zdnet.co.kr/view/?no=20171030145055&re=R_2018102919185](https://www.zdnet.co.kr/view/?no=20171030145055&re=R_2018102919185)  

[Figure 6]:[https://www.healthcareitnews.com/news/look-inside-epic-cerner-and-allscripts-app-store-programs](https://www.healthcareitnews.com/news/look-inside-epic-cerner-and-allscripts-app-store-programs)

