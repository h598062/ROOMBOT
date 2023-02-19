# ROOMBOT #

     ________  ________  ________  _____ ______   ________  ________  _________   
    |\   __  \|\   __  \|\   __  \|\   _ \  _   \|\   __  \|\   __  \|\___   ___\ 
    \ \  \|\  \ \  \|\  \ \  \|\  \ \  \\\__\ \  \ \  \|\ /\ \  \|\  \|___ \  \_| 
     \ \   _  _\ \  \\\  \ \  \\\  \ \  \\|__| \  \ \   __  \ \  \\\  \   \ \  \  
      \ \  \\  \\ \  \\\  \ \  \\\  \ \  \    \ \  \ \  \|\  \ \  \\\  \   \ \  \ 
       \ \__\\ _\\ \_______\ \_______\ \__\    \ \__\ \_______\ \_______\   \ \__\
        \|__|\|__|\|_______|\|_______|\|__|     \|__|\|_______|\|_______|    \|__|

En løsning på å automatisk booke grupperom på HVL!

Denne løsningen har et Python script som tar av seg get/post requester på nettsiden ved bruk av requests objektet, så bruker legger inn data som argument i cmd/terminal.

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

    python BookScript.py -h

Skriptet vil så printe ut i terminal info og eksempler for bruk


Orginalt laget av Birk Johannessen, omskrevet av Bjørnar
