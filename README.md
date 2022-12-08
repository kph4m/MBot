# MBot

## Table of Contents

1. [Overview](#overview)
2. [Inspiration](#inspiration)
3. [How it's made](#how-its-made)
4. [Challenges](#challenges)
5. [Set-up](#set-up)
6. [Commands](#commands)
7. [Demo](#demo)
8. [Future](#future)
9. [TODO](#todo)

## Overview

**MBot** is a multi-purpose discord bot with administrative commands, mini-games, currency system, and xp system that was created for entertainment purposes.

## Inspiration

As someone who uses Discord frequently, I wanted to create a bot that automated my tasks and could be used for entertainment purposes.

## How it's made

As this was just a bot within Discord, it was mostly backend work. After initially setting up the bot to accept commands using Discord.js (Node.js module) , I was ready to start
implementing features. I developed the features through an iterative process, where I would first brainstorm what the feature required (database, libraries, etc.), then implementing and coding
the feature, and then finally testing the feature thoroughly to make sure it worked properly and didn't have any bugs.

The database schema consisted of 5 main fields: userID, serverID, money, xp, and level. A schema gets created for each user upon typing something in the chat. The data can be read and updated depending on the command.

<p align="center">
  <img src="https://user-images.githubusercontent.com/76819117/155087980-8ab029a9-e62b-4c3d-b94b-02bab375df78.png" alt="Schema" />
</p>

After about 3 months of adding features, I deemed it to be sufficient to publish online so that other people could use it. Heroku was the perfect fit for all my needs and has
been hosting MBot to this day.

## Challenges

Figuring out the best way to implement features was the biggest challenge, especially the ones that required a database since I had no prior knowledge
of using databases. I eventually learned how to update and retrieve user data
from the database after researching. This knowledge helped me implement a ton of features, such as the xp and currency system, as well as user profiles.

## Set-up

1. Create a Discord account
2. Create a server
3. Click **[here](https://discord.com/api/oauth2/authorize?client_id=722306796483641366&permissions=8&scope=bot)** to invite MBot to your server
4. Check out the [commands](#commands) below and have fun!

## Commands

All commands that can be performed by MBot. Prefix is $. Simply type the command in the message box and press enter.

| Game Commands | Description              |
| ------------- | ------------------------ |
| `$rps`        | Play rock-paper-scissors |
| `$flip`       | Play heads-or-tails      |
| `$math`       | Answer math questions    |

| Administrative Commands       | Description                                           |
| ----------------------------- | ----------------------------------------------------- |
| `$kick @<username> <reason>`  | Kicks a user from the server and records the reason   |
| `$ban @<username> <reason>`   | Bans a user from the server and records the reason    |
| `$clear <amount of messages>` | Deletes the specified number of messages in a channel |

| Coin Commands                         | Description                                            |
| ------------------------------------- | ------------------------------------------------------ |
| `$coins`                              | Shows number of MCoins you have                        |
| `$coins @<username>`                  | Shows number of MCoins a user has                      |
| `$pay @<username> <amount of MCoins>` | Transfers specified amount of MCoins to specified user |
| (Admin)`$generate <amount of MCoins>` | Add a certain number of coins to your account          |
| `$reset`                              | Sets users MCoin balance to 0                          |

| Miscellaneous Commands         | Description                                                                |
| ------------------------------ | -------------------------------------------------------------------------- |
| `$userinfo`                    | Shows your stats                                                           |
| `$userinfo @<username>`        | Shows stats of specified user                                              |
| `$hello`                       | MBot greets you                                                            |
| `$tuturu`                      | Tuturu!                                                                    |
| `$report @<username> <reason>` | Reports a user with a reason                                               |
| `$lvl`                         | Shows your level card                                                      |
| `$lvl @<username>`             | Shows level card for specified user                                        |
| `$rating <attachment>`         | Adds 👍 and 👎 reactions to attachment                                     |
| `$poll <sentence>`             | Adds 👍 and 👎 reactions to poll                                           |
| `$remind <message>`            | Reminds the user of the specified message after a specified period of time |

## Demo

[Video](https://youtu.be/zGS_LJw7_HM)

## Future

I don't have any current plans to implement more features but maybe I'll be inspired in the future.

## TODO

-   [ ] Migrate to different host.
-   [ ] Publish code.

## Thanks for stopping by!

![Mayuri Wave](https://c.tenor.com/8-jJyFqnWxwAAAAC/steins-gate-wave.gif)
