# Tik Tak Toe
Ziel ist es ein Tik Tak Toe Spiel zu entwickeln.

## Problemverständnis
- Es gibt zwei Spieler
- Jeder Spieler hat einen Namen und einen Maker(x oder o)
- Es gibt ein Spielbrett mit 3x3 Feldern
- Die Spieler setzten abwechselnd ihre Marker auf das Brett
- Wenn das Brett voll ist, ist das Spiel vorbei
- Wenn ein Spieler drei Marker in einer Reihe, Spalte, Diagonalen hat, hat dieser gewonnen
- Wenn kein Spieler drei Marker in einer Reihe, Spalte, Diagonalen hat, ist das Spiel Patt
- Vor jedem Spiel werden die Spieler erfasst und ausgemacht, wer beginnt
- Das Spielbrett wird auf der Seite angezeigt
- Es wird angezeigt wer aktuell am Zug ist
- Es wird angezeigt, wenn das Spiel vorbei ist und wenn jemand gewonnen hat
- Man kann auf das Spielbrett klicken um Maker zu setzten

Spielablauf
- Spieler bestimmen oder übernehmen (Namen auswählen, Marker setzten)
- Neues Spiel starten (Startspieler wird zufällig gesetzt, alternativ rundenweise getoggelt)
- Jeder Spieler setzt abwechselnd solange Marker bis gameOver => true
- Neues Spiel mit selben Spielern oder neuen 

## Problem Planen
- Inputs: 
  - Namen
  - PvP, PvAI
  - Maker setzten
  - Neues Spiel starten
- Outputs
  - Darstellung des Spielbretts
  - Darstellung des Spielstands

Namen werden nach Abfrage vergeben. Marker werden automatisch vergeben.
Bei Neustart mit gleicher Konfiguration werden Startspieler alterniert.


## Problem lösen
- player Objekt (name, marker, play(), opt. score)
- gameBoard Modul (gameBoard, setMarker(maker), gameOver()->x,o,p, newGame())
- game ->  (player[], playRound())
- displayController Modul (displayGameboard())
- gameController Modul

- opt. Computer Player Objekt (erbt von Player und hat eigene play() Methode)

EventListener Möglichkeiten
- Nur der HumanPlayer braucht EventListener
- Man könnte pro Zug die EventListener auf die (freien) Felder legen

- Die EventListener könnten eine globale Funktion aufrufen, die die Gamelogik aufruft

# Todos
- Spielerauswahl
- Ergebnisanzeige
- AI Gegner
