# plan it

[![Greenkeeper badge](https://badges.greenkeeper.io/corlaez/planit.svg)](https://greenkeeper.io/)

A tool for poker planning. Uses an static client and a socket server.

The paths of the url represent rooms, rooms share information about members and chosen cards.
When all members have a card selected any of them can reveal the cards.

In the future I could create more sets like tshirt or even make it configurable. But right now planning poker from 0 to 13 is enough.

# TODO

* Hide answers, make a button to display them. (probably only show them when they are pressed)
* Improve the way the responses are displayed (probably only show cards with votes and names)
* Be sure that the alert is not shown when it shouldn't, have client and server always in sync
* Responsive. The tool is so simple that, it should be pretty easy for the current elements at least.
* Replace alert with a cute popup
* Include different sets. Combobox? 
