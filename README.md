# ROOMBOT




 ________      ________      ________      _____ ______       ________      ________      _________   
|\   __  \    |\   __  \    |\   __  \    |\   _ \  _   \    |\   __  \    |\   __  \    |\___   ___\ 
\ \  \|\  \   \ \  \|\  \   \ \  \|\  \   \ \  \\\__\ \  \   \ \  \|\ /_   \ \  \|\  \   \|___ \  \_| 
 \ \   _  _\   \ \  \\\  \   \ \  \\\  \   \ \  \\|__| \  \   \ \   __  \   \ \  \\\  \       \ \  \  
  \ \  \\  \|   \ \  \\\  \   \ \  \\\  \   \ \  \    \ \  \   \ \  \|\  \   \ \  \\\  \       \ \  \ 
   \ \__\\ _\    \ \_______\   \ \_______\   \ \__\    \ \__\   \ \_______\   \ \_______\       \ \__\
    \|__|\|__|    \|_______|    \|_______|    \|__|     \|__|    \|_______|    \|_______|        \|__|
    

  - En løsning på å automatisk booke grupperom på HVL.
  - 
                      Versjon: 
                     ___      ____ 
                   <  /     / __ \
                   / /     / / / /
                  / /   _ / /_/ / 
                 /_/   (_)\____/   


Det har vist seg at mange studenter på HVL løser grupperombookingen på HVL ved å ha alarm på klokka 22:00, da websiden åpner for booking 3 dager frem i tid. Dette for å raskest mulig å kunne booke seg et rom så man har et sted å arbeide med venner.

Som Dataingeniørstudent var det helt uaktuelt å synke så lavt å gjøre manuelt arbeid. Så da er løsningen et script som booker et rom jeg vil ha med maskinpresisjon før alle andre.

Denne løsningen har et Python script som tar av seg get/post requester på nettsiden ved bruk av requests objektet, og et overordnet java program som har en primitiv spørring og logikk ment for å kjøres i CMD/terminal vindu. (per Versjon 1.0) 
All kode er bygd av meg uten inspirasjon fra andre kilder.


Etikk
Har jeg lov til å gjøre dette?
 - Per TimeEdit's regel om "manuiplering av bookingsystemet" Nei. Rent juridisk? Ja. (Bruk på eget ansvar)
Er det taktisk riktig eller lurt, på kort eller lang sikt?
 - Ja.
Kan jeg leve med meg selv etterpå?
 - Ja.

Oppgradering av dette prosjektet ville vært å lage webtjener med tråder for multiclient handling, pålogging system for å begrense tilgang til scriptet og flytting av data til database. Dette for å så distribuere tilgang til mine venner.

Laget av Birk Johannessen.
