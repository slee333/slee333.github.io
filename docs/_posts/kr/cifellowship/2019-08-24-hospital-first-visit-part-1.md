---
layout: post
permalink: /cifellowship/:title/
title: 병원 처음 오셨어요? 서류 작성 부탁드려요. (1)
date: 2019-08-24 00:00:00 -0400
tags: [clinical-informatics, it, medicine]
categories: cifellowship
categorydisplay: 의료정보학
lang: kr
thumbnail: https://cdn.pixabay.com/photo/2018/11/16/14/29/papers-3819540_960_720.jpg
subtitle: 아르고 프로젝트 - 이런 말을 더 듣지 않아도 된다면?
translation_id: "Paperworks1"

---
# 0. 한 유방암 환자의 이야기  

  

오랫동안 유방암을 앓은 진 패터슨 씨가 새 병원을 들를 때마다 들고 다니는 가방이 있습니다. 그녀의 의료기록을 담은 서류, CD, DVD 등이 가득 들어있는 가방입니다. 긴 투병 생활을 거치며 여러 병원들을 전전하다 보니 그녀의 의료기록은 본의 아니게 스무 개가 넘는 병원들에 분산되어 있게 되었는데요. 여기서 한 가지 문제가 생깁니다. 스무 개가 넘는 병원들 사이 분산되어 있는 가록들을 한데 모아 볼 수가 없다는 점이었습니다.  

  

암은 유방에서부터 뼈, 뇌까지 각종 부위를 돌아다니는데 새 병원을 들르면 서류부터 쓰고 검사부터 다시 한다니, 실로 엄청난 비효율이 아닐 수 없습니다. 따라서 그녀는 그녀의 의료정보가 담긴 십여 개의 종이 파일이며 영상정보가 담긴 CD 등을 스스로 들고 다니는 길을 택했습니다. [1]  

  

![](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/RUYYaG6Ufw7ThrKvN6BI6dfF94g.jpg)  

그림 1. 작년 검사지도 가져가고 재작년 것도 가져가고 어제 했던 것도... 아이고 무거워라!  

  

위의 이야기는 해외 기사에 소개된 사례이지만 우리에게도 낯설지만은 않습니다. 환자가 스스로의 의료기록에 접근할 수 있는 방도는 매우 한정적이며, 의료기록은 쉽사리 공유되지 않는데요. 새롭게 들른 병원에서 이전에 받았던 검사 결과를 알 수 없으니 새로 검사를 받아보자 하는 이야기는 한번쯤 들어 보셨을 겁니다. 하지만 얼핏 들어도 이는 매우 비효율적이지 않나요? 한 병원에서 받은 진료 기록을 새로 들른 병원에서 다시 받아 볼 수 있다면 이런 상황이 개선되지 않을까요? 병원에서 옛날처럼 종이 차트에다만 환자 정보를 보관하는 것도 아니고 다 컴퓨터에다 저장하는데 왜 병원끼리 환자 정보를 받아보는 일이 잘 되지 않을까요?  

  

  

---

# 1. 전자 의무기록  

컴퓨터가 발달하기 이전엔 병원에서 종이 차트를 썼다는 사실은 다들 잘 기억하실 겁니다. (요즘도 아예 안 쓰진 않지만요.) 하지만 종이 차트보다 전산화된 데이터가 정보 보관에도, 새로 차트를 작성하는데도 훨씬 편리하다는 사실에는 이견이 없을 겁니다. 전자 의무기록(Electronic Medical Record, **EMR**)은 1990년대에 이런 이유로 등장하게 되었는데요.  

  

![](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/U2o8JFwwe3_2OjTL2bMscIj_xXg.jpg)  

그림 2. 그러니까 이런 느낌입니다. 풋볼 매니저 게임에서 선수 능력치 보듯 하네요.  

  

전자 의무기록은 분명 종이 차트보다 훨씬 편리한 정보 관리 방식입니다. 디지털화되어 있으니 진료 기록을 조회하기에도 편했고, 서랍 한가득 종이 차트를 쌓아두어야 할 일도 더 이상 없었고, 정리된 정보를 바탕으로 치료 계획을 세우거나 연구를 하기에도 수월했습니다.  

  

하지만 현 전자 의무기록 시스템은 현재 상당한 비판을 마주하고 있습니다. 현 시스템을 비판하는 방향에는 크게 두 가지가 있는데요. 하나는 (당초 기대됐던 바와는 달리) EMR 시스템 하 의료정보가 전자화되어 있음에도 병원 간 정보 교류, 혹은 환자와 병원 사이의 정보 교류가 활발하지 않아 앞서 언급한 진 패터슨 씨와 같은 상황이 생긴다는 점이고, 두 번째는 현 EMR 시스템이 의사가 환자와 나눌 시간을 부족하게 하여 많은 의사들이 호소하는 번아웃에 기여한다는 것인데요. 이번 글에서는 첫 번째 비판, 즉 전자 의무기록의 제한적인 공유로 인한 문제점을 타파하기 위한 노력에는 어떤 것들이 있는지 차근차근 알아보도록 하겠습니다.  

  

---

# 2. Argonaut project (아르고 프로젝트)  

  

"**HL7**"이란 단어를 보신 적 있나요? 이름만 들으면 무슨 아이돌 그룹이나 자동차 모델명인가 하는 생각이 먼저 드는데요. HL7은 사실 Health Level Seven International의 약자로, 미국 미시간 앤아버에 본부를 두고 있는 비영리 국제단체로 의료기관 간 정보 호환이 가능하도록 표준을 제정하기 위해 1987년 조직되었습니다. 또 동시에 해당 기관에서 제정한 의료기간 관 의료정보의 전자적 교환을 위한 국제 표준을 의미하기도 하는데요. [2]  

  

이렇게 HL7과 같은 국제 기준이 만들어진 배경에는 IT와 의료의 결합이 있었습니다. IT 기술의 발달에 힘입어 의료 소프트웨어 기업들이 생겨나게 되었는데, 의료기관끼리 서로 다른 의료 소프트웨어를 사용하게 되자 각 병원이 보관하는 의료 데이터가 잘 호환되지 않는 상황이 일어난 것이죠. 따라서 의료 소프트웨어 간 호환성의 필요성이 대두되었고 HL7은 이러한 필요성에 의해 생겨난 샘이죠. IT 기술 발전에 발맞추어 HL7 역시 개정에 개정을 거듭해 왔습니다. [3]  

  

그리고 2014년경 HL7은 '**아르고 프로젝트**'를 출범시킵니다. 혹시 그리스 로마 신화에 나오는 아르고 호 원정대 이야기를 다들 기억하시나요? 영웅 이아손이 여러 영웅들과 신들의 도움을 받아 용이 지키는 황금 양털을 가져오기 위해 콜키스로 원정을 떠나는 이야기입니다.  

  

![](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/30zdwf6ZKlJqg5w-sduY8bKUUcg.jpg)  

그림 3. 아르고 호 탐험대의 승선. 로렌조 코스타. 16세기.  

  

프로젝트 이름이 '아르고'가 된 경위는 이 프로젝트가 **JASON **에서 펴낸 "건실한(?) 의료 데이터 인프라" (A Robust Health Data Infrastructure)라는 리포트의 영향을 받았기 때문입니다. 어쩌다보니 리포트 제목을 좀 쌈마이하게 번역했네요. 아무튼 과학자들로 이루어진 미 정부 자문 단체인 JASON은 이 리포트에서 의료정보의 교환 효율을 저해하는 가장 큰 요인은 **의료정보 상호운용성**(interoperability)이 낮기 때문이라 강하게 지적하였습니다.  

  

HL7이 해당 리포트의 영향으로 보다 나은 상호운용성을 지닌 의료 데이터 프레임워크를 계획하게 되었으니 JASON이 HL7을 선도하는 역할을 했다고 볼 수도 있겠습니다. 그리도 다들 아시겠지만 Jason은 이아손의 영문명이죠. 그리하여 짠, JASON이 시작했다고 볼 수 있는 해당 프로젝트 이름도 **아르고 프로젝트**가 되었습니다.  

  

신화 속 아르고 호 원정대의 목적이 황금 양털이었다면 HL7이 출범시킨 아르고 프로젝트의 목적은 다양화된 정보통신 환경에 걸맞게 복잡하지 않고 높은 호환성을 가진 의료 데이터 프레임워크 제작에 있었습니다. 최근 들어 클라우드 기술, 사물 인터넷, 모바일 애플리케이션 등 정보통신 환경이 눈에 띄게 다양해졌는데요. 의료 데이터를 다루던 기존 방식으로는 이런 다양한 정보 환경에서의 호환성을 보장하기가 어려웠습니다. 때문에 정보의 상호운용성이 낮다고 지적받았던 것이구요. 따라서 변화하는 환경과 잘 호환되는 새로운 데이터 프레임워크가 필요한 실정이었습니다. [4]  

  

![](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/DHbYI3JlxY2mWpSFxpXtbsHhK9Y.jpg)  

그림 4. HL7의 아르고 프로젝트의 책임자 존 하말카. (https://twitter.com/jhalamka)  

  

하버드 의과대학 교수이자 응급의학의, 뉴잉글랜드 전자 의료 데이터 교환 네트워크 회장 등 화려한 이력을 지닌 아르고 프로젝트의 책임자 존 하말카John Hamalka 씨는 2015년 Informationweeks와의 인터뷰에서 아르고 프로젝트의 목적이 무엇이냐는 질문에 다음과 같이 말했습니다. [5]  

  

> 두 가지 중요한 목적이 있습니다. (...) 첫째 목적은 임상적 상황에서 흔히 필요한 중요 임상정보들을 공유하는 보다 쉽고 편리한 방법을 제공하기 위함입니다.  

  

보다 구체적으로, 아르고 프로젝트는 기존에 의료기관 간 의료정보 교환을 위해 사용하던 프레임워크인 CDA (Clinical Document Architecture) 대신 다양한 IT 환경에서의 의료정보 상호운용성(interoperability)에 초점을 맞춘 **FHIR **(Fast Healthcare interoperability Resource)을 이용함으로써 의료정보를 모바일 애플리케이션, 데이터 클라우드 등 다양한 환경에서 이용할 수 있도록 만들었습니다.  

  

![](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/6KRi7D2GnRnASUIR98stx5rdxt4.gif)  

그림 5. 잠깐. CDA는 뭐고 FHIR은 뭐고... 대체 무슨 소리죠?  

  

쉽게 풀어 설명하자면 CDA는 의료정보를 저장하고 교환하는 기존 방식입니다. CDA의 용도는 의료기관 간 의료 데이터의 교환에 있었는데요. 환자와 관련 임상정보를 통째로 담은 문서를 교환하는 방식이라 병원들 사이에서 정보를 교환하기엔 용이했으나 앞서 언급했듯 모바일, 클라우드 등 다양한 플랫폼으로 확장하고 있는 정보통신 분야에 유연하게 적용하기에는 한계가 있었습니다. [6]  

  

# 3. 왜 FHIR인가?  

  

FHIR이 CDA와 비교하여 가지는 강점은 크게 세 가지입니다. [7]  

  

첫째로, FHIR은 CDA와는 달리 다르게 정보를 하나의 문서에 담아두지 않고 정보를 분산하여 보관합니다. 피검사 결과, 인적 정보, 복용하고 있는 약제 등의 정보를 종류별로 나누어서 보관하는데, 이는 정보를 불러올 때 불필요한 정보를 따라 불러올 필요가 없는 강점을 가집니다. 물론 해당 환자와 관련된 정보를 모두 모아야 할 땐 쉽게 모을 수 있고요.  

  

FHIR의 두 번째 장점은 사람(주로 개발자)이 이해하기 편하다는 점입니다. 복잡한 데이터 형식을 지닌 CDA와는 달리 FHIR은 웹 기반 기술을 이용하여 JSON, REST와 같이 사람이 쉽게 해석할 수 있는 데이터 형식을 사용합니다. 여기에 더해 FHIR은 통신 형식과 데이터 유형 모두 사용자가 읽을 수 있는 형식으로 만들어져 있기에 개발자들이 이용하기 매우 편리합니다.  

  

FHIR의 이러한 장점은 모두 어우러져 쉽고 빠른 의료시스템 구현을 가능하게 한다는 장점을 지닙니다. FHIR을 이용하면 다양한 전자 의무기록 플랫폼을 합치고 해독하는데 걸리는 시간을 단축되기에 개발자들이 기능성에 집중할 수 있는 환경이 조성됩니다. 존 하말카 씨는 FHIR을 이용한 의료 데이터 구조 개선이 의료혁신을 위한 중요한 교두보라 여깁니다. 개발자들에게 친숙한 환경이 조성되면서 의료분야에 보다 많은 개발자들이 뛰어들고 그럼으로서 더 창의적인 아이디어들이 샘솟는 선순환을 기대하는 거죠. [8]  

  

![](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/VIPsF-n1k-dLXGGYjRlIIkBozvU.png)  

그림 6. 미국의 대표적인 전자의무기록 업체들. 이 업체들이 EMR을 기록하는 소프트웨어를 만든다.  

  

아르고 프로젝트는 미국 메이요 클리닉, 베스 이스라엘 디코네스 병원 등과 같은 미국 내 유수의 의료기관들부터 멕케슨McKesson, 서너Cerner, 에픽Epic과 같은 의료기록 업체들과도 협력 중인데요. 의료기관 간의 상호운용성을 향상하는 것이 보다 나은 의료서비스를 제공하는데 필요하다는 범사회적 공감대가 형성되었다 볼 수 있겠습니다. [9]  

  

다만 아르고 프로젝트가 의료정보 상호운용성 문제를 잘 해결할 수 있을지는 아직 더 지켜보아야 한다는 의견이 있습니다. HL7의 예전 방식인 CDA는 미 정부에서 건강정보의 유의미한 활용을 위해 법적으로 권장되는 전자 의무기록 기준이었지만 FHIR 사용을 권장하는 법적 동인은 아직 없는 상황입니다. 또한, FHIR은 계속해서 개선된 버전들을 내놓고 있는데 덕분에 어떤 업체들은 FHIR 버전 2를 사용하고 어떤 업체들은 버전 3을 사용하며 어떤 업체들은 추후 나올 버전 4를 기다리는 등 아직 통일된 규격이 부재한 실정입니다.  

  

빠른 업데이트 자체는 HL7 측에서 FHIR에 대한 피드백을 잘 받아들이고 지속적으로 FHIR을 개선하는데 신경 쓰고 있다는 점에서 고무적입니다만, 동시에 업체들 입장에서 사용하기엔 불안정 요소입니다. 언제 또 새로운 업데이트가 나와 기존에 하던 걸 갈아엎어야 할지 모르니까요. FHIR이 안정적인 하나의 버전으로 수렴한다면 이런 문제점은 개선되지 않을까 싶습니다. [10]  

  

앞서 언급한 몇몇 장애물에도 불구하고 FHIR은 의료정보의 상호운용성 문제를 해결할 차세대 데이터 형식으로 각광받고 있는데요. 앞서 FHIR이란 데이터 형식의 큰 장점이 쉽고 빠른 의료시스템 구현이 가능하단 점임을 말씀드린 바 있습니다. 그래서일까요, 지난 2018년, 애플은 FHIR을 이용해 사용자들이 아이폰을 통해 자신의 의료 기록을 확인할 수 있도록 하는 서비스를 제공하겠다 발표하였습니다. 모바일 헬스 레코드Mobile Health Records라는 이름으로 말이죠.  

  

다음 글에선 애플의 모바일 헬스 레코드, 구글 클라우드 플랫폼 등 IT 업체들이 어떻게 의료정보 상호운용성 문제를 해결하려 하는지 알아보도록 하겠습니다.  

  

---

<ins>**참조:**</ins>  

  

[1] [https://www.kqed.org/futureofyou/209/critical-condition-how-a-broken-medical-records-system-is-endangering-americas-health](https://www.kqed.org/futureofyou/209/critical-condition-how-a-broken-medical-records-system-is-endangering-americas-health)  

[2] [http://www.hl7.org/about/index.cfm?ref=nav](http://www.hl7.org/about/index.cfm?ref=nav)  

[3] [https://blog.naver.com/webtplus/221017785199](https://blog.naver.com/webtplus/221017785199)  

[4] [https://argonautwiki.hl7.org/Main_Page](https://argonautwiki.hl7.org/Main_Page)  

[5] [https://www.kqed.org/futureofyou/321/startups-entrepreneurs-try-to-solve-medical-records-debacle](https://www.kqed.org/futureofyou/321/startups-entrepreneurs-try-to-solve-medical-records-debacle)  

[6] [https://www.allscripts.com/2016/02/preparing-for-interoperability-more-information-you-need-to-know-about-fhir/](https://www.allscripts.com/2016/02/preparing-for-interoperability-more-information-you-need-to-know-about-fhir/)  

[7] [http://blog.naver.com/PostView.nhn?blogId=webtplus&logNo=221022096612&parentCategoryNo=&categoryNo=36&viewDate=&isShowPopularPosts=true&from=search](http://blog.naver.com/PostView.nhn?blogId=webtplus&logNo=221022096612&parentCategoryNo=&categoryNo=36&viewDate=&isShowPopularPosts=true&from=search)  

[8] [https://www.informationweek.com/strategic-cio/can-argonaut-project-make-exchanging-health-data-easier/a/d-id/1318774](https://www.informationweek.com/strategic-cio/can-argonaut-project-make-exchanging-health-data-easier/a/d-id/1318774)  

[9] [https://www.hl7.org/implement/standards/fhir/2015Jan/argonauts.html](https://www.hl7.org/implement/standards/fhir/2015Jan/argonauts.html)  

[10] [https://www.medicaleconomics.com/technology/interoperability-fhir-standard-not-panacea](https://www.medicaleconomics.com/technology/interoperability-fhir-standard-not-panacea)  

[그림 1] ttps://www.zdnet.co.kr/view/?no=20171030145055&re=R_2018102919185  

[그림 6] [https://www.healthcareitnews.com/news/look-inside-epic-cerner-and-allscripts-app-store-programs](https://www.healthcareitnews.com/news/look-inside-epic-cerner-and-allscripts-app-store-programs)  

