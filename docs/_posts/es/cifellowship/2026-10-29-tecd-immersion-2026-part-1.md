---
layout: post
title: 'Notas de la Immersion de TECD en Harvard (1): presentación del curso y primer día'
date: '2026-10-29'
categories: cifellowship
lang: es
subtitle: Lo que hay que tener en cuenta para llevar la tecnología a la medicina
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
permalink: /es/cifellowship/tecd-immersion-2026-part-1/
---

Hace poco hice un curso.

Se llama TECD, por [Technology-Enabled Care Delivery: From Digital Medicine to AI](https://learn.hms.harvard.edu/programs/technology-enabled-care-delivery-digital-medicine-ai).

Básicamente trata de cómo incorporar la tecnología digital, sobre todo la IA, a la atención clínica real y cómo evaluarla.

En realidad, la mayor parte del curso se imparte en un seminario web semanal de septiembre a noviembre.

Durante esos dos meses, cada participante desarrolla un proyecto final (capstone) vinculado a su propia institución, y del 24 al 26 de octubre hubo tres días de clases presenciales (la llamada Immersion) en el campus de la Facultad de Medicina de Harvard.

Acabo de volver de la Immersion. El contenido fue interesante, y los participantes también. Además de clínicos, había directivos de hospitales, gente de la industria, ingenieros, investigadores y economistas de la salud, y venían de muchos países distintos.

En fin, quiero anotar brevemente lo que me llevé del curso.


## Primer día

El primer día fue de 8:30 a 5 con cuatro sesiones.

### Primera sesión: ¿cómo eligen tecnología los hospitales?

La primera sesión la dio el director digital y de información (CDIO) de Brown University Health, el sistema de salud vinculado a la Universidad Brown. Trató de cómo deciden los hospitales cuando buscan una solución tecnológica a un problema.

Lo primero, como es lógico, es ver si el problema se puede resolver dentro de la historia clínica electrónica (EHR) que ya usa el hospital. Si se resuelve ahí, no hace falta nada más.

¿Y si no? Se busca un producto especializado para ese problema. ¿Y si no existe? Se considera desarrollarlo internamente.

Si ya existe un producto que se pueda usar, utilizarlo es mucho más rápido y cómodo que crear uno nuevo, así que el orden tiene sentido.

Una idea curiosa: ¿podría el avance de los LLM cambiar este orden? La IA ha mejorado muchísimo últimamente.

Claro que crear y mantener un producto es más fácil de decir que de hacer. Exige muchísimo trabajo y la dificultad depende mucho del tamaño del hospital o la organización, así que, si hay un producto externo, usarlo probablemente siga siendo lo más eficiente.

Aun así, si los LLM siguen mejorando, ¿llegará un momento en que sea más eficiente que el hospital forme su propio equipo y cree productos adaptados a sus flujos de trabajo que usar productos externos? Vale la pena pensarlo.

Si eso se generaliza, me pregunto, por pura curiosidad, si podría funcionar algo como Steam Workshop: la EHR aporta la base, los hospitales o los usuarios crean y suben las funciones que necesitan en el día a día, y las más populares se incorporan como funciones oficiales. (Aunque instalar un mod en un juego y añadir una función que se usa en la atención al paciente implican responsabilidades muy distintas.)


#### Documentación ambiental (ambient documentation)


Un ambient scribe es, en pocas palabras, la redacción de notas clínicas hecha por IA. Se usa cada vez más en EE. UU.: dejas una aplicación abierta durante la consulta, la conversación se graba, el audio se convierte en texto y el texto se redacta automáticamente como nota clínica.

En EE. UU. se espera que las notas clínicas sean muy detalladas, así que no hace falta decir lo populares que se han vuelto las aplicaciones de ambient scribe.

Aun así, quedan varias preguntas: 1) ¿de verdad les gusta a los clínicos?, 2) ¿reduce el burnout?, 3) ¿de verdad reduce el tiempo de documentación?, 4) ¿qué tan precisas son las notas?, etc.

Puede que los clínicos se sientan más cómodos y que, aun así, el tiempo real de documentación no cambie (porque tienen que revisar y corregir lo que escribió la IA), y la calidad de la nota tampoco está garantizada.

Hay bastantes artículos sobre esto. Curiosamente, en uno que leí hace poco el tiempo total de documentación casi no cambió (se escribía menos durante la consulta, pero se tardaba más en corregir después, así que quedaba igual), pero la satisfacción de los clínicos aumentó. Bueno, corregir un borrador es más fácil que escribir una nota desde cero, así que quizá no sorprende.

Una cuestión para pensar: si una empresa de EHR integra esta función en su propio producto, ¿de dónde sale la ventaja competitiva de los proveedores externos?

Epic, el mayor proveedor de EHR de EE. UU., incorporó este año su propio ambient scribe, llamado Chart with Art. Eso significa que los productos que ofrecían ambient scribe integrado con Epic tienen ahora un gran competidor. ¿Tienen alguna posibilidad?


### Segunda sesión: el problema de la última milla


Disfruté mucho esta sesión, porque me interesan la telemedicina, la monitorización remota de pacientes y la hospitalización a domicilio.

El conocimiento médico ha avanzado, pero conectar el tratamiento con la vida diaria de los pacientes y hacerlo llegar ahí nunca es fácil.

La enfermedad crónica forma parte de la vida del paciente y cambia constantemente. Si la vida del paciente es un plano, la salud es una línea que lo recorre, y las consultas son los puntos que marcamos de vez en cuando para estimar esa línea.

Los intervalos entre puntos, entre una consulta y la siguiente, suelen ser largos, y los clínicos tienen que deducir el estado de salud del paciente y tratarlo a partir de estos encuentros escasos y breves.

La monitorización remota de pacientes (RPM) y la hospitalización a domicilio (hospital at home) son algunas de las herramientas que podrían ayudar a cubrir ese vacío. La hospitalización a domicilio intenta ofrecer en casa una atención de nivel hospitalario.

¿Parece difícil? Lo es. Cómo organizar al personal que hace las visitas, cómo hacer llegar los medicamentos y el equipo necesarios, cómo trasladar al paciente al hospital si empeora... hay muchísimo que tener en cuenta.

La idea tuvo su auge durante la COVID, cuando la atención virtual estaba en su punto máximo. Desde entonces ha sido inestable, con la exención de Medicare interrumpiéndose en algunos momentos (aunque a principios de este año se prorrogó cinco años, hasta 2030). Aun así, hay pacientes que claramente están en algún punto entre necesitar un ingreso y un seguimiento ambulatorio, así que sigue siendo una idea que merece la pena pensar.

La sesión también trató un [estudio observacional](https://pubmed.ncbi.nlm.nih.gov/37931262/) sobre RPM en hipertensión. En comparación con las consultas que apenas usaban RPM, las que la usaban mucho tuvieron más dispensaciones de medicamentos y más visitas de atención primaria, y menos atención aguda, como urgencias e ingresos, pero un mayor gasto relacionado con la hipertensión. (¿Quizá era de esperar?)

En fin, me interesan mucho la prevención y el manejo de enfermedades, así que esta sesión me resultó muy interesante.


### Tercera sesión: ¿y quién paga?

El reembolso, es decir, cómo se paga la atención, siempre es un tema interesante y difícil. En la facultad de medicina no se enseña a fondo, ¿verdad?

El problema es que en la práctica es imprescindible conocerlo. No puedo evitar pensar que estaría bien enseñarlo de forma más sistemática a estudiantes y residentes.

En fin, la sesión explicó las distintas vías por las que la tecnología médica puede recibir pago. Eran cuatro principales.

1. Fee-for-service: se factura un código CPT cada vez que se presta un servicio.
2. Absorbed into existing reimbursement: como en la cirugía robótica, el coste de la tecnología se cubre dentro del pago ya existente por la atención.
3. Capitation/value-based care: pago por paciente (capitación) o contratos basados en valor, en los que se asume la responsabilidad de la atención y el coste de una población de pacientes definida.
4. Outcome-based payment: pago según resultados. Para eso, claro, los resultados tienen que poder medirse de forma objetiva.

Aunque apliquemos la IA a la medicina, hay que pensar qué modelo de pago encaja con su forma de uso. Lo adecuado seguramente dependerá del tipo de producto, de cómo se implemente y del flujo de trabajo.

La sesión se centró en el modelo ACCESS de los CMS y en el piloto TEMPO de la FDA.

**ACCESS**, de los CMS, es un modelo de pago que comenzó en julio de 2026.

Hipertensión, diabetes, enfermedad renal crónica, dolor crónico, depresión, ansiedad... son enfermedades sin cura real con las que se convive mucho tiempo, ¿no? ACCESS da un pago periódico por paciente a las organizaciones que manejan estas enfermedades con tecnología. La condición es que, para recibir el pago completo, cierta proporción de sus pacientes debe alcanzar los objetivos de resultados (y el listón sube cada año).

Si los pagos actuales de RPM y dispositivos pagaban según cuántos días se usó el dispositivo o cuántos minutos se dedicaron al seguimiento, ACCESS parece centrarse en si el paciente realmente mejora. (Al parecer, el médico de atención primaria que deriva al paciente también puede facturar un pago de cogestión si ajusta la medicación según los informes de evolución.)

El piloto TEMPO de la FDA se entiende mejor como el complemento de ACCESS. Para dispositivos de salud digital de bajo riesgo que se pueden usar dentro de ACCESS, flexibiliza algunos requisitos incluso antes de la autorización formal de la FDA, permite su uso real y hace que los fabricantes usen esos datos para solicitar la autorización formal. Todavía es un piloto, así que no se sabe cuánto durará, pero la estructura es esta: los CMS pagan según los resultados de los pacientes y, sobre esa base, la FDA permite que los dispositivos de salud digital acumulen evidencia.

Entre esto y el piloto Pre-Cert para software como dispositivo médico (SaMD), la FDA parece lanzar bastante a menudo estos experimentos regulatorios, interesantes y que dan mucho que pensar.


---

Así que eso fue lo que vimos y, después de revisar los proyectos capstone de los demás, terminó el primer día.

Me ha salido más largo de lo que pensaba.
