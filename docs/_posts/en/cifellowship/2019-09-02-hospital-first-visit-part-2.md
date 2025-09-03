---
layout: post
permalink: /en/cifellowship/:title/
title: Is this your first time at the hospital? Please fill out the paperwork (2)
date: 2019-09-02 00:00:00 -0400
tags: [clinical-informatics, it, medicine]
categories: cifellowship
categorydisplay: Clinical Informatics
lang: en
image: https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
subtitle: Apple Health Records. Google Cloud Services. Solutions from giant IT companies for medical records.
translation_id: "Paperworks2"

---
[Previous post](https://brunch.co.kr/@gazezaet/10) covered the necessity of sharing medical information and the efforts made at the data structure level to facilitate smoother sharing of medical records. In this post, we will look at exemplary cases of IT companies attempting to solve these interoperability issues, with Apple being a standout performer in this field.



# 4. Apple’s Health Records



When discussing Apple's moves in healthcare, aside from HealthKit, another indispensable part is Apple Health Records. In simple terms, Apple Health Records is an application that allows patients to view their own records from multiple healthcare providers on their iPhones. Additionally, it organizes and presents these consolidated medical records in a way that is easy to understand, making it convenient for users to check their information. This system that allows individuals to access their health information is called Personal Health Record service, abbreviated as PHR.



![Apple Health Records User Interface](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/NE7WVbac9C69yVg-0hc1fMQ9Ck8.png)

Apple Health Records user interface. Clean and easy to understand.



The above image is introduced on the [Apple Health Records page](http:///%20https//www.apple.com/healthcare/health-records/). It allows patients to see at a glance various information such as allergies, vital signs, vaccination records, and medications, and it also shows which hospital provided the data.



Dr. Sambul Desai, one of the executives in Apple's healthcare division, talked about the advantages of Apple Health Records in an [interview](https://www.mobihealthnews.com/news/north-america/apple-health-records-now-available-all-us-providers-compatible-ehrs) with MobiHealthNews this June, highlighting how it helps patients possess their medical information:



> "... as a physician I’ll see patients in the ER … and a lot of times the questions we ask are ‘What kind of medications are you on?’ … So now to have an area where I can look at all of that is very helpful."



Apple Health Records, when launched in January 2018, initially interfaced with 12 hospitals, including Johns Hopkins, UC San Diego, and University of Pennsylvania Hospital. ([Source](https://www.mobihealthnews.com/content/apple-will-launch-health-records-feature-12-hospitals-ios-113)) As of August 22, 2019, the number of healthcare institutions partnering with Apple Health Records has rapidly increased to 223. ([Source](https://support.apple.com/en-us/HT208647))



![Article by UC San Diego in January](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/d3AZ94jAW93uscH6ADQDLqu0OlE.png)

An article contributed by UC San Diego to JAMA in January.



Attempts to develop a system where patients manage their own EMR were made previously but did not achieve significant success. So, what made Apple Health Records different to succeed? UC San Diego, one of the first 12 hospitals to adopt Apple Health Records, conducted a survey on 425 patients using the service. The key advantages identified by 132 respondents are summarized as follows:



Patients' cited success factors of Apple Health Records:



First, let's examine accessibility. Apple Health Records is linked with the iPhone, making it easily accessible to existing iPhone users. As it is provided by default, there's no need to purchase separate devices or software. Indeed, 96% of respondents highlighted this point as an advantage of Apple Health Records. This may be the biggest contributor to the service’s success.



Its performance is also noteworthy. Apple Health Records satisfactorily fulfills its original role of allowing patients easy access to their medical information, with 78% of respondents being satisfied with its functionality.



But what does “improving health through sharing” mean as the third point? The survey respondents perceived the third advantage as being able to easily share their health information with others, such as family or doctors, and it also helped them better understand their own health status. Being able to see their data makes it easier to discuss their health with others, leading to a better understanding.



While it remains uncertain if this convenient platform can ultimately deliver better medical care or reduce healthcare costs, a high percentage of Apple Health Records users report finding the platform convenient.



![Heal home visit service using Health Records](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/KVLo0uPOph7Y2_y1qDpXZtGYA9c.png)

Heal home visit service using Health Records



Additionally, Apple Health Records has the potential to be integrated with various services, although this might face legal challenges domestically. Apple has already linked Health Records with a home visit service called [Heal](https://apps.apple.com/us/app/heal-house-calls-on-demand/id961252579). Previously, when a doctor made a home visit, their access to patient information was limited, restricting what they could do. Apple Health Records helps visiting doctors access a patient's past medical records, enabling more effective medical services. Thus, Apple Health Records also holds potential to create a variety of ancillary services within the healthcare field. ([Source](http://www.yoonsupchoi.com/2019/02/18/apple-health-record/))



Eric Topol, a cardiologist famous for sharing numerous latest medical news including digital health on Twitter, consistently [advocates](https://twitter.com/EricTopol/status/917038007139438592) for expanding patients' rights to their medical data. Reflecting such trends in the digital health field emphasizing patients' roles and rights regarding their medical data, Apple has created a platform enabling patients to easily manage their own medical records. We look forward to seeing more advancements.



---



# 5. Google Cloud Platform



[Google Cloud Platform](https://cloud.google.com/) is currently a data management platform used by many companies.



But before we delve deeper, what is a cloud platform? Simply put, a cloud platform is a service that stores a large amount of data in the cloud and provides means to easily utilize this data. Traditionally, many companies had their own servers, where they fetched, cleaned, and analyzed data from local servers. This required significant efforts to ensure the data was stored safely and could be fetched in a form suitable for quick and secure analysis.



![Cloud platform services also provide cloud computing services for data analysis](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/_0NK5fMsoWrlurKUrZVwa4RPSMs.jpg)

Cloud platform services also provide cloud computing services to analyze data.



Let’s use a (poor) analogy. Those who have lived alone will understand one of the most bothersome tasks is doing laundry. Wearing clothes is easy, but washing them, organizing them in the wardrobe, and ironing them if they get wrinkled is quite a hassle. But if someone else did this for you? Then all you have to do is wear the clothes and go out. Thanks, parents! Living alone made me realize how tough housework is.



Cloud platforms are much like this. Since the processes of storing and fetching data safely are already sorted, the user only needs to fetch the data and work with it. You can create graphs from data or use AI technologies to analyze it, or even embed this process within the cloud for easier use later.



Because of this convenience, many companies use cloud platforms. Examples include Google Cloud Platform, which is used by various companies such as HSBC, WeMakePrice, and Johnson & Johnson in diverse fields like finance, shopping, and biotechnology.



![Although not mentioned in this article, Amazon Web Services (AWS) also performs similar roles.](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/9daVSlIqZh1TxQZpvcOKA9SIZFg.jpg)

Although not mentioned in this article, Amazon Web Services (AWS) also performs similar roles.



Just as Google Cloud Platform is utilized in various fields, healthcare is no exception. As of August 22, 2019, 55 healthcare institutions or companies utilize Google Cloud Platform for medical purposes. ([Source](https://cloud.google.com/customers/#/industries=Healthcare)) For instance, Cleveland Clinic in the U.S. uses Google Cloud Platform to store existing electronic medical records more securely and accessibly. Research institutions such as the American Cancer Society also leverage Google Cloud's characteristics for AI-based data analysis.



So why is Google Cloud Platform a valuable tool in addressing the issues we've covered about electronic medical records? While it is certainly a beneficial platform from a company's perspective, can it also be a useful tool for patients to access their medical records? [Google says yes](https://cloud.google.com/solutions/healthcare/?tab=tab2).



![Google claims to provide better healthcare through Google Cloud Platform](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/N2Ac9kTaPgvXl7IzRfF-GwrFnzk.png)

Google claims to provide better healthcare through Google Cloud Platform.



Google Cloud Services create a HIPAA-compliant folder within the user's Google Drive to store patient information securely. Users can access their health information stored in this secure storage. They can view this personal health record stored in their Google Drive through computers, cloud, or mobile apps.



You might wonder how this differs from Apple's Health Records. Google Cloud Platform provides around 5TB of storage space for storing personal health records. Naturally, digital files like X-rays or CT scans can be shared as well. In my opinion, this characteristic differentiates Google Cloud Platform’s electronic medical records service from Apple's Health Records. If a patient carries around their X-ray data in their Google Drive, then like Ms. Jean Patterson mentioned in the previous post, they no longer need to burn their X-ray info onto a CD. ([Source](https://gsuite.google.com/industries/healthcare/?_ga=2.181678503.-1279171958.1566130985))



Google claims that using cloud services can help provide patients with more convenient healthcare. Starting from storing personal health records in Google Drive, it can simplify hospital registration processes or facilitate cooperation between medical institutions through sharing medical records via the cloud.



There are regulations, of course. I previously mentioned the term 'HIPAA-compliant.' HIPAA stands for Health Insurance Portability and Accountability Act, a U.S. law enacted to protect individuals' health information. Only the individual or their authorized representative has the right to view the health information, and only designated persons (e.g., doctors) can view this information under certain conditions.



![Health Insurance Portability and Accountability Act (HIPAA)](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/SUHhm1a0qTVlyLPnzm1fh61D30A.jpg)

HIPAA (Health Insurance Portability and Accountability Act)



Simply put, without the patient's consent, access to their health information is restricted. Furthermore, if their data is used for research, any data identifying the patient is entirely masked. This process is known as de-identification, which involves encrypting or removing all information that can identify an individual, such as names, emails, and phone numbers. (Specific elements to be removed are defined by law.) This ensures that personal health information is secure and is expressed as HIPAA-compliant. 



![All personal information must be de-identified. The data is mine but not traceable to me...](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/iSyHxa5BEH8Imfd3iLfZBi5XbSI.jpg)

All personal information must be de-identified. My data but not traceable to me...



Google Cloud Platform adheres to these regulations when storing and sharing medical information. This is so fundamental to handling health information in the U.S. that it may be more apt to call it a standard rather than a regulation.



Let's look at a real-world [example](https://cloud.google.com/customers/athena-breast-health-network/) of Google Cloud Platform in healthcare. The Athena Breast Health Network is a collaborative breast cancer research entity among California universities. According to them, 25% of U.S. women didn’t have access to their previous mammography, leading to 260% higher false positive rates and additional follow-ups compared to normal patients.



Naturally, researchers in the institution felt the need for a more convenient and secure means to share mammography information. Previously, mammography info was exchanged by fax. They also needed a method to share test results with patients for smoother communication between patients and doctors.



![Mammosphere, a site for female patients to access their breast-related medical information](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/LGGMmMYZp_TM54Ymfok8E-4q96U.png)

Mammosphere, a site for female patients to access their breast-related medical information.



Amid this need, the Athena Breast Health Network discovered Mammosphere. Mammosphere, hosted on Google Cloud Platform, assists patients in accessing their mammography online securely.



The researchers were also highly interested in Mammosphere, which made it convenient for patients to access their images online, and if the data needed to be sent to another hospital, they could schedule it for specific dates with just a few clicks.



They anticipated reducing higher risks of patients not getting access to previously taken mammograms and ultimately improving patients' prognoses. Participants’ satisfaction also increased as they found it easier to access their medical records.



---






