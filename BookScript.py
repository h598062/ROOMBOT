import pip._vendor.requests as requests
import sys, getopt, re, os
import datetime, sched, time
from dotenv import load_dotenv

# TODO omskriv funksjoner slik at de bruker date, time og datetime objekter for å forenkle kode og unngå altfor mye konvertering

def login(urlLogin, session:requests.Session, bruker, passord):

    urlSSO = "https://cloud.timeedit.net/hvl/web/timeedit/ssoResponse"
    payload = {
        'has_js': '0',
        'inside_iframe': '0',
        'feidename':  bruker,
        'password': passord
    }

    responseTE = session.post(urlLogin, data=payload)
    #print("#### Login connect Response")
    #print(responseTE.request)
    #print(responseTE.text)
    SAMLResponse = responseTE.text
    regex_pattern = r'name="SAMLResponse" value="([A-Za-z0-9+]+)"'
    matchedSAMLResponse = re.search(regex_pattern, SAMLResponse)
    payloadSSOResponse = {
        'SAMLResponse': matchedSAMLResponse.group(1), # [681:13329],
        'RelayState': ''
    }

    res = session.post(urlSSO, data=payloadSSOResponse)
    print("#### Login attempt response")
    #print(res.request)
    #print(res.text)
    print(res)


def BookRom(date, tidStart, tidSlutt, romID, bruker, passord, email):
    urlLoginMedFeide = "https://cloud.timeedit.net/hvl/web/timeedit/sso/feide?back=https%3A%2F%2Fcloud.timeedit.net%2Fhvl%2Fweb%2Fstudbergen%2F"
    urlBook = "https://cloud.timeedit.net/hvl/web/studbergen/ri1Q9.html"
    payloadBook = {
        'kind': 'reserve',
        'nocache': '4',
        'l': 'nb_NO',
        'o': romID + '.22',
        'aos': '',
        'dates': date,
        'starttime': tidStart,
        'endtime': tidSlutt,
        'url': 'https://cloud.timeedit.net/hvl/web/studbergen/ri1Q9.html#00' + romID,
        'fe3': ''
    }
    #print("#### Payload book")
    #print(payloadBook)

    session = requests.Session()
    responseFEIDE = session.get(urlLoginMedFeide)
    login(responseFEIDE.url, session, bruker, passord)
    response = session.post(urlBook, data=payloadBook)

    print("#### Booking response")
    print(response)

    if email is not None and response.status_code == 200:
        match = re.search(r"id=(\d+)", response.url)
        if match:
            bookingID = match.group(1)
            print(bookingID)
        
        payloadEmail = {
            'id': bookingID,
            'mailto': email,
            'dt': 't',
            'sid': 5,
            'subject': "TimeEdit - Ny reservasjon",
            'msg': "Følgende reservasjon ble gjort i TimeEdit"
        }
        responseEmail = session.post(response.url, data=payloadEmail)
        print(responseEmail.status_code)

    
    #print(response.text)

# TODO kombiner begge booking funksjonene
def BookIdagAt22(romDato:str, tidStart:str, tidSlutt:str, romID:int, bruker:str, passord:str, email:str):
    """Setter en timeout til oppgitt dato, og booker et rom kl 22:00:01 den datoen

    Args:
        romDato (str): dato formatert som %Y%m%d
        tidStart (str): tidspunkt på format HH:MM (10:15)
        tidSlutt (str): tidspunkt på formay HH:MM (11:30)
        romID (int): rom id, se ROMKEY.csv. Første kolonne er romnavn, andre kolonne er romID
        bruker (str): Brukernavn til person som skal booke rom
        passord (str): Passordet til person som skal booke rom
        email (str): Eposten til person som skal booke rom
    """    
    print("Booker oppgitt rom: ",datetime.date.today().strftime("%d-%m-%Y"),"22:00:01!")
    s = sched.scheduler(time.time, time.sleep)
    
    # venter til kl er 22:00:01 samme dag. time.strftime() girr tilbake dato og resten legger til tidspunktet
    t = time.strptime(time.strftime("%Y-%m-%d")+' 22:00:01', '%Y-%m-%d %H:%M:%S')
    t = time.mktime(t)
    print(t)
    #s.enterabs(t, 1, BookRom, (romDato, tidStart, tidSlutt, romID, bruker, passord, email))
    #s.run()

# TODO kombiner begge booking funksjonene
def BookAtDateAt22(romDato:str, tidStart:str, tidSlutt:str, romID:int, bruker:str, passord:str, email:str, bookingDato:datetime.date):
    """booker rom på en spesifikk dato. sjekker også om det går an å booke med en gang eller om den andre bookign funksjonen kan brukes

    Args:
        romDato (str): dato formatert som %Y%m%d
        tidStart (str): tidspunkt på format HH:MM (10:15)
        tidSlutt (str): tidspunkt på formay HH:MM (11:30)
        romID (int): rom id, se ROMKEY.csv. Første kolonne er romnavn, andre kolonne er romID
        bruker (str): Brukernavn til person som skal booke rom
        passord (str): Passordet til person som skal booke rom
        email (str): Eposten til person som skal booke rom
        bookingDato (datetime.date): dato objekt for datoen når bookingen må utføres
    """    
    print(bookingDato.ctime())
    today_obj = datetime.date.today()
    delta = bookingDato - today_obj
    print(delta.days)
    if delta.days == 0:
        #BookIdagAt22(romDato, tidStart, tidSlutt, romID, bruker, passord, email)
        print()
    elif delta.days < 0:
        #BookRom(romDato, tidStart, tidSlutt, romID, bruker, passord, email)
        print()
    else:
        s = sched.scheduler(time.time, time.sleep)
        dt = datetime.datetime.combine(bookingDato, datetime.time(hour=22, minute=0, second=1))
        print(time.mktime(dt.timetuple()))
        #s.enterabs(t, 1, BookRom, (romDato, tidStart, tidSlutt, romID, bruker, passord, email))
        #s.run()

def makeDate() -> str:
    """lager en dato 3 dager fram i tid

    #TODO kombiner funksjonalitet fra denne inn i makeBookingDate

    Returns:
        str: dato formatert som %Y%m%d (YYYYMMDD - 20230120)
    """    
    today = datetime.date.today()
    bestillingsdato = today + datetime.timedelta(days=3)
    return bestillingsdato.strftime("%Y%m%d")


def makeBookingDate(romDato:str) -> datetime.date:
    """regner ut når en tidligst kan booke rommet på romDato

    #TODO Denne kan lage et fullstendig datetime objekt med tidspunktet 22:00:01 med en gang

    Args:
        romDato (str): dato en ønsker rommet

    Returns:
        datetime.date: et dato objekt som holder datoen en tidligst kan booke rommet
    """    
    romDato_obj = datetime.datetime.strptime(romDato, '%Y%m%d').date()
    print(romDato_obj.ctime())
    bookingDate = datetime.date(romDato_obj.year, romDato_obj.month, romDato_obj.day-3)
    return bookingDate

def convertRomnr(rom:str) -> int:
    """konverterer rom navn gitt som argument til romid

    Args:
        rom (str): rom navn

    Returns:
        int: romID fra ROMKEY.csv, kolonne 2
    """

    with open("./ROMKEY.csv", "r") as f:
        romdata = {}
        for line in f:
            key, value = line.strip().split(',')
            romdata[key] = value
    
    if rom.isnumeric():
        if rom in romdata.values():
            return int(rom)
    else:
        if rom in romdata:
            return int(romdata[rom])

    print(f"Oppgitt rom navn eller romID {rom} finnes ikke i ROMKEY.csv. Dobbeltsjekk input som ble brukt med scriptet")
    sys.exit(1)


def usage():
    """Printer ut til stdout hvordan man bruker scriptet
    """

    print("Bruk:")
    print("    python BookScript.py [OPTIONS]")
    print("Options, linjer markert med * MÅ oppgis:")
    print("  -h, --help                     Print ut hjelp")
    print("* -r, --rom=ROM_NR               Rom nummer som skal bookes")
    print("* -s, --start=START_TIDSPUNKT    Start tidspunkt. Format: HH:MM")
    print("* -e, --slutt=SLUTT_TIDSPUNKT    Slutt tidspunkt. Format: HH:MM")
    print("  -d, --dato                     En spesifikk dato det skal bookes, bestillingstidspunkt kalkuleres automatisk. Format: YYYYMMDD")
    print("      --env=ENV_FILEPATH         Hvilken .env fil som skal brukes, default er bare standard .env som scriptet oppretter for deg")
    print()
    print("Beskrivelse:")
    print("Dette python scriptet lar deg sette opp automatisk booking av rom på HVL")
    print("Det har noen forskjellige måter en kan gi data for å bestemme hva og hvor ting skal bestilles,")
    print("og er også satt opp til å enkelt kunne brukes sammen med andre programmer som f.eks en discord bot eller automatisk task scheduling")
    print()
    print("Eksempel kommandoer:")
    print("  Booker rommet B210 fra kl 11:00 til 12:00 3 dager fram i tid, neste gang kl blir 22:00")
    print("  Rommet blir altså booket med en gang det er mulig å booke den dagen")
    print("  eks: booker mandag kl 22:00, det er den første muligheten for å booke for torsdag samme uke")
    print("¤   BookScript.py -r B210 -s 11:00 -e 12:00")
    print()
    print("  Booker rom B210 fra kl 11:00 til 12:30 på dato 28.02.23")
    print("  Med dato vil scriptet automatisk velge riktig dag for å bestille ved første mulighet")
    print("¤   BookScript.py -r B210 -s 11:00 -e 12:00 --dato=20230219")

def main(argv):
    """main funksjon

    Args:
        argv (List[str]): Argumenter gitt til script
    """

    try:
        opts, args = getopt.getopt(argv, "hr:s:e:d:", ["help", "rom=", "start=", "slutt=", "dato=", "env="])
    except getopt.GetoptError:
        usage()
        sys.exit(2)

    rom = tidStart = tidSlutt = inputDato = envpath = None

    for opt, arg in opts:
        if opt in ("-h", "--help"):
            usage()
            sys.exit()
        elif opt in ("-r", "--rom"):
            rom = arg # eks: 4198 eller B210
        elif opt in ("-s", "--start"):
            tidStart = arg # eks: 20:00
        elif opt in ("-e", "--slutt"):
            tidSlutt = arg # eks: 21:00
        elif opt in ("-d", "--dato"):
            inputDato = arg # eks: 20230220
        elif opt == "--env":
            envpath = arg

    # TODO legg inn logikk for å sjekke at det ikke forsøkes å booke mer enn 3 timer, som er det meste en kan booke

    if not rom or not tidStart or not tidSlutt:
        print("Mangler rom nummer, start tidspunkt og/eller slutt tidspunkt\n")
        usage()
        sys.exit(2)
    romID = convertRomnr(rom)
    if envpath:
        # TODO bekreft om env fil bytte funker
        isDotenv = load_dotenv(envpath)
    else:
        isDotenv = load_dotenv()
    if not isDotenv:
        print("Fant ikke .env fil, opprettet filen")
        print("Fyll ut .env fil med data som trengs")
        str = "USERNAME=\nPASS=\nEMAIL=\n"
        with open(".env", "w", encoding="utf-8") as f:
            f.write(str)
        sys.exit("ERROR: Fant ikke .env fil")

    email = os.environ.get("EMAIL")
    bruker = os.environ.get("BRUKERNAVN")
    passord = os.environ.get("PASSORD")
    if bruker is None or passord is None:
        sys.exit("ERROR: Brukernavn eller passord er ikke fylt ut i .env fil")

    # print(bruker, passord, email)

    if inputDato is None:
        dato = makeDate() # 20220311
        BookIdagAt22(dato, tidStart, tidSlutt, romID, bruker, passord, email)
    elif inputDato.isnumeric() and len(inputDato) == 8: # verifiser at dato er riktig format
        # TODO bytte format på dato fra argument til YYYY/MM/DD eller YYYY.MM.DD
        bookingdato = makeBookingDate(inputDato)
        BookAtDateAt22(inputDato, tidStart, tidSlutt, romID, bruker, passord, email, bookingdato)
    else:
        print(f"Feil format på dato: {inputDato}\n")
        usage()
        sys.exit(2)

if __name__ == "__main__":
    main(sys.argv[1:])