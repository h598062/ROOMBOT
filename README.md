# ROOMBOT


     ________  ________  ________  _____ ______   ________  ________  _________   
    |\   __  \|\   __  \|\   __  \|\   _ \  _   \|\   __  \|\   __  \|\___   ___\ 
    \ \  \|\  \ \  \|\  \ \  \|\  \ \  \\\__\ \  \ \  \|\ /\ \  \|\  \|___ \  \_| 
     \ \   _  _\ \  \\\  \ \  \\\  \ \  \\|__| \  \ \   __  \ \  \\\  \   \ \  \  
      \ \  \\  \\ \  \\\  \ \  \\\  \ \  \    \ \  \ \  \|\  \ \  \\\  \   \ \  \ 
       \ \__\\ _\\ \_______\ \_______\ \__\    \ \__\ \_______\ \_______\   \ \__\
        \|__|\|__|\|_______|\|_______|\|__|     \|__|\|_______|\|_______|    \|__|
                                                                              
                                                                              
                                                                              
     
       


En løsning på å automatisk booke grupperom på HVL!
   
                      Versjon: 
                     ___      ____ 
                   <  /     / __ \
                   / /     / / / /
                  / /   _ / /_/ / 
                 /_/   (_)\____/   


Det har vist seg at mange studenter på HVL løser grupperombookingen på HVL ved å ha alarm på klokka 22:00, da websiden åpner for booking 3 dager frem i tid. Dette for å raskest mulig å kunne booke seg et rom så man har et sted å arbeide med venner.



Som Dataingeniørstudent var det helt uaktuelt å synke så lavt å gjøre manuelt arbeid. Så da er løsningen et script som booker et rom jeg vil ha med maskinpresisjon før alle andre.



Denne løsningen har et Python script som tar av seg get/post requester på nettsiden ved bruk av requests objektet, så bruker legger inn data som argument i cmd/terminal. Se håndbok. (per Versjon 1.0)\
All kode er skrevet av meg uten inspirasjon fra andre kilder.


Litt etikk..

Har jeg lov til å gjøre dette?\
Per TimeEdit's regel om "manuiplering av bookingsystemet"? - Nei.\
Rent juridisk? - Ja. (Bruk på eget ansvar, du kan bli utestengt)

Er det taktisk riktig eller lurt, på kort eller lang sikt?\
Ja.

Kan jeg leve med meg selv etterpå?\
Ja.

Brukerhåndbok!\
1.Du trenger python med requests\
2.Bestem hvilket rom (du må se ROMKEY.txt) og tidspunkt (maks 3 timer)\
3.åpne terminal/CMD, naviger dit du lagret ROOMBOT prosjektet og lim inn:

     python BookScript.py tidStart tidSlutt romID feideBrukernavn feidePassord

et mer spesifikt eksempel:

     python BookScript.py 12:00 15:00 4202 123456 pass


Oppgradering av dette prosjektet ville vært å lage webtjener med tråder for multiclient handling, pålogging system for å begrense tilgang til scriptet og flytting av data til database. Dette for å så distribuere tilgang til mine venner.




Laget av Birk Johannessen.
