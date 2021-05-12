# roldevs_bot

Este es un bot de discord diseñado para incluir consultas a tablas/oráculos aleatorios de manera sencilla.

Actualmente solo tiene implementado _Apocalypse Oracle_ como motor de consultas aleatorias, pero se ha tenido en cuenta que sea muy sencillo expandirlo a otros sistemas.

# Instalación

Se puede instalar este bot en cualquiera de nuestros canales de Discord, haciendo click en el siguiente enlace:

[Añadir bot a Discord](https://discordapp.com/oauth2/authorize?&client_id=713711004764340335&scope=bot&permissions=71680)

# Arranque local

Tambien se puede arrancar en local configurando un archivo de entorno (_.env_) en el raiz del proyecto con el siguiente contenido:

```
DISCORD_CLIENT_ID=
DISCORD_TOKEN=
DISCORD_PREFIX=+
TELEGRAM_TOKEN=
LOCALE=es
ENVIRONMENT=
```

`DISCORD_CLIENT_ID`, `DISCORD_TOKEN` y `DISCORD_PREFIX` pueden ser configurados con los datos del bot de Discord
`TELEGRAM_TOKEN` si se quiere usar como un bot de Telegram
`ENVIRONMENT` puede ser: _development_ o _environment_

Y, por último, ejecutar:

`npm run discord`

# Uso

Para ejecutar un comando del bot, dentro de Discord, se debe seguir el siguiente formato:

`+app cmd [texto]`

* _+_: El comando siempre debe empezar con el caracter `+`. Gracias este caracter el bot entiende que los mensajes van dirigidos a él.
* _app_: Es el código de la aplicación. Por ahora solo hay una soportada con código: `ao` para Apocalypse Oracle
* _cmd_: El comando específico dentro de la aplicación. Por ejemplo: `ls`
* _texto_: Un texto opcional. El resultado del bot lo va a incluir y ayuda en tener una vision directa de porque se solicitó la respuesta del bot

## Apocalypse Oracle

Su código es `ao`

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

## Cuento de Ánimas

Se puede utilizar el bot para generar cartas para jugar al juego: 'Cuento de Ánimas'.

Para obtener una carta nueva solo hay que ejecutar el siguiente comando:

`+ca pc`

El bot devolverá algo por el estilo (_bot-name_ es el nombre que se le ha dado al instalar el bot en Discord, por lo que puede ser distinto en otros servidores de Discord):

```
bot-name: +ca pc p
Obtener Carta: Pista​
```

Dado que el bot no guarda las cartas que han salido previemante, hay que pasarle la lista anterior para que las excluya (el siguiente comando excluye una pista: _p_).

`+ca pc p`

```
bot-name: +ca pc p,o7
Obtener Carta: Obstáculo de personaje, 7​
```

Date cuenta que lo que hay a continuación de _bot-name:_ es lo que tienes que lanzar para pedir la siguiente carta:

`+ca pc p,o7`

```
bot-name: +ca pc p,o7,r
Obtener Carta: Percance de personaje​
```

Y así sucesivamente hasta acabar la partida...


