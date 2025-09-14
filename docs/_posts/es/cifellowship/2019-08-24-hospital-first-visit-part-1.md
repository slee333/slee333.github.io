---
layout: post
permalink: /es/cifellowship/:title/
title: "¿Primera vez en este hospital? Rellene estos formularios, por favor (Parte 1)"
date: 2019-08-24 00:00:00 -0400
tags: [clinical-informatics, it, medicine]
categories: cifellowship
categorydisplay: Informática Clínica
lang: es
image: https://cdn.pixabay.com/photo/2018/11/16/14/29/papers-3819540_960_720.jpg
subtitle: "El Proyecto Argonauta: ¿Y si pudiéramos olvidarnos del papeleo?"
translation_id: "Paperworks1"
slug: hospital-first-visit-part-1
---
# 0. La odisea de una paciente con cáncer de mama

Jean Patterson, una mujer que lleva mucho tiempo luchando contra el cáncer de mama, carga con una bolsa cada vez que va a un hospital nuevo. No es una bolsa cualquiera: está repleta de sus historiales médicos, documentos, CDs y DVDs. En su larga batalla, sus datos médicos han quedado esparcidos por más de veinte hospitales. Y aquí empieza el problema: era imposible consultar todo su historial en un solo lugar.

El cáncer se le había extendido de los senos a los huesos y al cerebro. Cada vez que pisaba un hospital nuevo, tenía que volver a llenar formularios y repetir pruebas. Una pérdida de tiempo y recursos tremenda. Por eso, decidió convertirse en su propia mensajera, cargando con decenas de carpetas y CDs. [1]

![Jean Patterson](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/RUYYaG6Ufw7ThrKvN6BI6dfF94g.jpg)

*Figura 1. Con los análisis del año pasado, los del anterior, los de ayer... ¡Qué pesadilla!* 

Aunque esta historia ocurrió en el extranjero, seguro que nos suena familiar. Como pacientes, tenemos un acceso muy limitado a nuestros propios datos médicos, y la información no fluye fácilmente entre hospitales. ¿A quién no le han dicho en un hospital nuevo que hay que repetir una prueba porque no pueden ver los resultados anteriores? Suena increíblemente ineficiente, ¿verdad? ¿No sería todo más fácil si los historiales de un hospital se pudieran consultar en cualquier otro? Si los hospitales ya guardan todo en computadoras, ¿por qué sigue siendo tan difícil compartir la información?

---

# 1. El historial clínico electrónico (EMR)

La mayoría recordamos la época de las carpetas de papel en los hospitales (que, por cierto, no han desaparecido del todo). Pero todos estamos de acuerdo en que guardar la información en formato digital es mucho más práctico. Por eso, en los años 90, nació el Historial Clínico Electrónico (EMR, por sus siglas en inglés).

![Registros Médicos Electrónicos](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/U2o8JFwwe3_2OjTL2bMscIj_xXg.jpg)

*Figura 2. Algo así. Como ver las estadísticas de un jugador en el Football Manager.*

El EMR es, sin duda, una forma mucho más cómoda de gestionar la información. Al estar todo digitalizado, acceder a los historiales es más fácil, ya no se necesitan archivadores gigantes y es más sencillo planificar tratamientos o hacer investigación con datos organizados.

Sin embargo, el sistema actual de EMR recibe muchas críticas. Hay dos quejas principales: la primera es que, aunque se prometía un intercambio de información fácil, la realidad es que los datos siguen sin moverse bien entre hospitales, o entre el hospital y el paciente, provocando casos como el de Jean Patterson. La segunda es que el EMR actual le roba tiempo al médico que podría dedicar a sus pacientes, contribuyendo al famoso *burnout* o desgaste profesional. En este artículo, nos vamos a centrar en la primera queja y en los esfuerzos que se están haciendo para solucionarla.

---

# 2. El Proyecto Argonauta

¿Has oído hablar de "**HL7**"? A primera vista, podría sonar a grupo de K-Pop o al último modelo de un coche. Pero en realidad, HL7 (Health Level Seven International) es una organización internacional sin ánimo de lucro que nació en 1987 para crear estándares que permitan que la información médica se pueda compartir sin problemas entre diferentes sistemas. También es el nombre del propio estándar que crearon. [2]

La necesidad de un estándar como HL7 surgió con la unión de la informática y la medicina. Con el boom de la tecnología, aparecieron muchas empresas de software médico, y cada hospital acabó usando un sistema diferente. El resultado: un caos de datos incompatibles. Hacía falta un lenguaje común, y para eso se creó HL7, que ha ido evolucionando con la tecnología. [3]

Y en 2014, HL7 lanzó el **Proyecto Argonauta**. ¿Te suena la historia de los Argonautas de la mitología griega? Es la aventura del héroe Jasón, que se embarcó con un grupo de valientes para conseguir el Vellocino de Oro.

![Expedición del Argonauta](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/30zdwf6ZKlJqg5w-sduY8bKUUcg.jpg)

*Figura 3. El embarque de los Argonautas. Lorenzo Costa. Siglo XVI.*

El nombre del proyecto no es casualidad. Vino inspirado por un informe de JASON, un grupo de científicos que asesora al gobierno de EE.UU. En su informe, JASON señaló sin rodeos que el mayor obstáculo para el intercambio de información sanitaria era la **baja interoperabilidad** de los datos. Es decir, los sistemas no hablaban el mismo idioma.

Influenciado por este tirón de orejas, HL7, con JASON a la cabeza, se puso manos a la obra para crear un sistema mejor. Y como Jasón es *Jason* en inglés, el proyecto acabó llamándose **Proyecto Argonauta**.

Si los Argonautas de la mitología buscaban el Vellocino de Oro, los Argonautas de HL7 buscan algo igual de valioso: un sistema de datos de salud que sea simple, compatible y que funcione en el entorno tecnológico actual. Con la nube, el Internet de las Cosas (IoT) y las apps móviles, los sistemas antiguos se quedaron obsoletos. Hacía falta una renovación total. [4]

![John Halamka](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/DHbYI3JlxY2mWpSFxpXtbsHhK9Y.jpg)

*Figura 4. John Halamka, el líder del Proyecto Argonauta de HL7. (https://twitter.com/jhalamka)*

John Halamka, una figura con un currículum impresionante (profesor de Harvard, médico de urgencias y presidente de varias redes de salud), lidera el proyecto. En una entrevista en 2015, explicó su objetivo: [5]

> "Tenemos dos metas principales. (...) La primera es hacer que compartir la información clínica esencial sea mucho más fácil y práctico en el día a día."

Más en concreto, el plan era reemplazar el antiguo estándar CDA (Clinical Document Architecture) por uno nuevo llamado **FHIR** (Fast Healthcare Interoperability Resources), diseñado para funcionar bien con la tecnología moderna como las apps móviles y la nube. [6]

![CDA vs FHIR](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/6KRi7D2GnRnASUIR98stx5rdxt4.gif)

*Figura 5. Un momento... ¿qué es eso de CDA y FHIR?*

Para que nos entendamos, CDA era la forma tradicional de intercambiar documentos clínicos. Funcionaba bien para mandar un historial completo de un hospital a otro, pero era rígido y poco práctico para el mundo de las apps y la nube. [7]

# 3. ¿Y por qué FHIR es mejor?

FHIR tiene tres grandes ventajas sobre el sistema antiguo. [8]

Primero, en lugar de manejar un único documento gigante con toda la información, FHIR la organiza en "recursos" o categorías más pequeñas: datos del paciente, resultados de laboratorio, medicamentos, etc. Esto hace que sea mucho más ágil consultar solo lo que necesitas, aunque sigue siendo fácil juntarlo todo si hace falta.

Segundo, FHIR es mucho más fácil de entender para los desarrolladores. Usa tecnologías web estándar como JSON y REST, que son el pan de cada día para cualquier programador, a diferencia de los formatos complejos y antiguos de CDA. Está diseñado para ser legible por humanos, lo que facilita enormemente el trabajo.

Estas dos ventajas se traducen en la tercera: se pueden crear sistemas y aplicaciones de salud mucho más rápido. Con FHIR, los desarrolladores no pierden tanto tiempo descifrando sistemas antiguos y pueden centrarse en crear funcionalidades nuevas e innovadoras. John Halamka lo ve como un puente hacia la innovación en salud. Si se lo pones fácil a los desarrolladores, más gente talentosa querrá entrar en el sector, creando un círculo virtuoso de ideas. [9]

![Empresas FHIR](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/798p/image/VIPsF-n1k-dLXGGYjRlIIkBozvU.png)

*Figura 6. Las grandes empresas de historiales clínicos en EE.UU., que desarrollan el software que usan los hospitales.*

El Proyecto Argonauta cuenta con el apoyo de gigantes de la salud en EE.UU. como la Clínica Mayo, y de las grandes empresas de software médico como Epic, Cerner y McKesson. Parece que hay un consenso claro: para mejorar la sanidad, los sistemas tienen que poder hablar entre sí. [10]

Sin embargo, todavía hay escépticos. El estándar antiguo (CDA) tenía el respaldo legal del gobierno de EE.UU., pero FHIR aún no. Además, como FHIR sigue evolucionando, algunas empresas usan la versión 2, otras la 3 y otras esperan la 4. Esta falta de unificación genera inestabilidad. Para una empresa, es arriesgado apostar por una versión si una actualización futura puede obligarles a cambiarlo todo.

Con suerte, FHIR pronto llegará a una versión estable que todos puedan adoptar. [11]

A pesar de estos baches, FHIR se perfila como el futuro. Y una de sus grandes ventajas es que permite crear aplicaciones de forma rápida. Quizás por eso, en 2018, Apple anunció que usaría FHIR para su servicio de Registros de Salud, permitiendo a los usuarios consultar su historial médico desde el iPhone.

En el próximo artículo, veremos más de cerca cómo Apple, Google y otras tecnológicas están usando estas herramientas para intentar solucionar, de una vez por todas, el caos de los historiales médicos.

---

<ins>**Referencias:**</ins>

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
[Figura 1]:[https://www.zdnet.co.kr/view/?no=20171030145055&re=R_2018102919185](https://www.zdnet.co.kr/view/?no=20171030145055&re=R_2018102919185)  
[Figura 6]:[https://www.healthcareitnews.com/news/look-inside-epic-cerner-and-allscripts-app-store-programs](https://www.healthcareitnews.com/news/look-inside-epic-cerner-and-allscripts-app-store-programs)