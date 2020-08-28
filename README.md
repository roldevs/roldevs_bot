# roldevs_bot

Este es un bot de discord diseñado para incluir consultas a tablas/oráculos aleatorios de manera sencilla.

Actualmente solo tiene implementado _Apocalypse Oracle_ como motor de consultas aleatorias, pero se ha tenido en cuenta que sea muy sencillo expandirlo a otros sistemas.

# Instalación

Se puede instalar este bot en cualquiera de nuestros canales de Discord, haciendo click en el siguiente enlace:

[Añadir bot a Discord](https://discordapp.com/oauth2/authorize?&client_id=713711004764340335&scope=bot&permissions=71680)

# Uso

Para ejecutar un comando del bot, dentro de Discord, se debe seguir el siguiente formato:

`+app cmd [texto]`

* _+_: El comando siempre debe empezar con el caracter `+`. Gracias este caracter el bot entiende que los mensajes van dirigidos a él.
* _app_: Es el código de la aplicación. Por ahora solo hay una soportada con código: `ao` para Apocalypse Oracle
* _cmd_: El comando específico dentro de la aplicación. Por ejemplo: `ls`
* _texto_: Un texto opcional. El resultado del bot lo va a incluir y ayuda en tener una vision directa de porque se solicitó la respuesta del bot

## Apocalypse Oracle

Actualmente esta es la única aplicación desarrollada en el bot. Su código es `ao`

Si se ejecuta el siguiente comando: `+ao ls` se obtiene una lista con todos los comandos disponibles en la aplicación:

| Descripción | comando
| ----------- | -------
| Adversaries | `ao ad​`
| Pregunta de Acción | `ao aq​`
| Attitude | `ao at​`
| Conversation Focus | `ao cf​`
| Pregunta de Descripción | `ao dq​`
| Foco del evento | `ao ef​`
| Movimiento Duro | `ao hm​`
| Notable Feature | `ao nf​`
| Movimiento de PNJ o de Enemigo | `ao nm​`
| PNJ | `ao npc​`
| Objective | `ao ob​`
| Plot Focus | `ao pf​`
| Plot | `ao plot​`
| Movimiento de Estimulación | `ao pm​`
| Pregunta probable | `ao ql​`
| Pregunta normal | `ao qn​`
| Pregunta improbable | `ao qu​`
| Evento aleatorio | `ao re​`
| Rewards | `ao rw​`
| Escena Alterada | `ao sa​`
| Complicación de Escena | `ao sc​`
| Movimiento Blando | `ao sm​`
| Social Position | `ao sp​`

De esta manera se podría obtener una propuesta de trama con el siguiente comando:

`+ao plot 'Trama inicial'`

O preguntar al oraculo por una pregunta probable:

`+ao ql 'Voy a generar una historia épica?'`





