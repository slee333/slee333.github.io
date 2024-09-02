---
layout: post
permalink: /es/research/:title/
title: "Vida de investigación junto con datos públicos."
date: 2024-09-02 00:00:00 -0400
tags: Clinical_Informatics Medicine Research Public_data
categories: research
categorydisplay: Investigación
lang: es
thumbnail: https://i.imgur.com/hxYmCyK.png
subtitle: Cualquiera que sea la investigación, el factor más importante es obtener datos de alta calidad. Los datos públicos en cierta medida ayudan a resolver este problema.
---

Recientemente, he estado trabajando en los resúmenes para algunas conferencias. Ya he enviado a algunos lugares, y en uno he recibido una revisión, mientras que los demás están en proceso o esperando revisiones.

El hospital en el que actualmente trabajo es de segundo nivel. En comparación con los hospitales de tercer nivel, que tienen más financiación y énfasis en la investigación, el apoyo aquí es limitado. Lo que más lamento es la falta de datos. Los recursos y métodos para obtener datos son, sin duda, insuficientes.

En este entorno, lo que más he utilizado son los datos públicos.

Hay muchos tipos y variedades de datos públicos. El NIH incluso ha recopilado estos datos en una [página](https://www.nlm.nih.gov/NIHbmic/domain_specific_repositories.html) para facilitar su acceso.

![](https://i.imgur.com/Ia4T6PR.png)
Página de repositorios de datos públicos del NIH

---

Aunque existen muchos repositorios de datos públicos, el conjunto de datos MIMIC es probablemente el más representativo. También es el conjunto de datos públicos que más he utilizado y encontrado útil.

![](https://i.imgur.com/G5URn9y.png)

El conjunto de datos MIMIC incluye datos de pacientes hospitalizados entre 2000 y 2019 en el Hospital Beth Israel Deaconess de Estados Unidos, con aproximadamente 200,000 registros en su versión más reciente, MIMIC-IV. Todos los datos están rigurosamente anonimizados; no sólo se omiten nombres y otra información identificativa, sino que también se mezclan aleatoriamente fechas de admisión y cumpleaños para conservar la edad del paciente. Es como tener todo el registro médico electrónico (EHR). ¡Naturalmente, es enorme y consume mucho espacio! (Fue una buena excusa para comprar un SSD 😊)

De cualquier manera, la posibilidad de analizar gratuitamente un gran volumen de datos anonimizados es una gran ventaja para los investigadores. Por ejemplo, quería desarrollar un algoritmo para detectar el exceso de líquidos en el cuerpo de los pacientes como resumen para una conferencia. El exceso de líquidos puede causar edema pulmonar, dificultad respiratoria y edema con fóvea en las extremidades, generalmente diagnosticado clínicamente y tratado con diuréticos. Sin embargo, el exceso de líquidos puede manifestarse de diversas formas clínicas, y no siempre está codificado en las bases de datos, haciendo difícil identificar a los pacientes afectados.

Una de las estrategias que consideré fue utilizar los registros de medicación del conjunto de datos MIMIC. Aunque el exceso de líquidos se manifiesta de diversas formas clínicas, su solución es clara: diálisis para pacientes con insuficiencia renal en etapa terminal (ESRD) y diuréticos para aquellos que pueden orinar. Así, clasifiqué a los pacientes que recibieron diuréticos por vía intravenosa después de una visita a emergencias dentro de un plazo específico como estando en estado de exceso de líquidos. Si te preguntas, “¿No es un criterio demasiado arbitrario?”, la respuesta es sí. Sin embargo, si un diurético se administró rápidamente en emergencias, se podría inferir que el paciente estaba en una situación urgente, es decir, con exceso de líquidos.

Aquí, el detalle en los datos de MIMIC fue crucial. Como mencioné, captura el tiempo de hospitalización de cada paciente y los horarios de administración de medicamentos. Aunque abandoné este enfoque debido a varias limitaciones, no pude evitar admirar la calidad de los datos de MIMIC. Ver la detallada organización de los horarios de hospitalización, la administración de medicamentos, dosis y tiempos fue tan impresionante que casi lloré 😭.

---

Dado que es el conjunto de datos que más utilizo, he hablado extensamente sobre MIMIC, pero hay muchos otros datos públicos disponibles. Platformas como PhysioNet, que incluye MIMIC, ofrecen diversos conjuntos de datos públicos para explorar un infinito abanico de posibilidades de investigación.

![](https://i.imgur.com/zp0LiZC.png)

Algunos otros ejemplos incluyen...

![](https://i.imgur.com/zipZXqA.png)
**N3C (National COVID Cohort Collaborative)** es una base de datos clínicos relacionada con COVID-19 recopilados en todo Estados Unidos. Los investigadores pueden acceder gratuitamente si cumplen ciertos requisitos, pero deben firmar un Acuerdo de Uso de Datos (Data Use Agreement, DUA) para proteger la privacidad de los datos, solicitando el acceso a través de su institución. Este conjunto de datos es un recurso valioso especialmente para la investigación sobre COVID-19. Dado su vasto volumen, también podría ser útil para otros propósitos, aunque no he explorado su potencial completo.

![](https://i.imgur.com/BQHdrLq.png)

Otro ejemplo sería el **UK Biobank**, que ofrece una vasta base de datos biomédica recopilada de 500,000 personas en Reino Unido, incluyendo información genética, de salud y hábitos de vida. Los investigadores deben pasar por un proceso de solicitud para accesar los datos y pagar una tarifa según el alcance del proyecto. UK Biobank es crucial para investigadores de todo el mundo que llevan a cabo estudios de diversas enfermedades. Estudiantes pueden acceder a los datos por 500 dólares, pero como soy un residente pobre... Consideraría utilizarlo si tuviera un tema de investigación claro y necesitara validación externa para un estudio avanzado con otros conjuntos de datos. ¡Usar el UK Biobank suena bastante increíble, no?

Claro, además de N3C y UK Biobank, hay muchos otros conjuntos de datos públicos a los que los investigadores pueden obtener acceso pagando. Estos conjuntos suelen incluir una gran cantidad de datos clínicos, genéticos o de hábitos de vida, convirtiéndose en importantes recursos para quienes necesitan datos de calidad. Los datos públicos son un recurso valioso que democratiza la investigación, permitiendo el acceso a más investigadores. Espero que en el futuro se disponga de más datos públicos. ¡Para que siempre sea fácil jugar con estadísticas!


