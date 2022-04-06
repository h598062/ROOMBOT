
import pip._vendor.requests as requests
import sys
import datetime
import sched, time


def login(urlLogin, session, bruker, passord):

    urlSSO = "https://cloud.timeedit.net/hvl/web/timeedit/ssoResponse"
    payload = {
        'has_js': '0',
        'inside_iframe': '0',
        'feidename':  bruker,
        'password': passord
    }

    responseTE = session.post(urlLogin, data=payload)

    SAMLResponse = responseTE.text
    payloadSSOResponse = {
        'SAMLResponse': SAMLResponse[681:13329],
        'RelayState': ''
    }

    session.post(urlSSO, data=payloadSSOResponse)


def Book(date, tidStart, tidSlutt, romID, bruker, passord):
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

    session = requests.Session()
    responseFEIDE = session.get(urlLoginMedFeide)
    login(responseFEIDE.url, session, bruker, passord)
    response = session.post(urlBook, data=payloadBook)

    print("SUCCESSFULLY EXECUTED ROOMBOT")
    if len(response.text)<100:
        print(response.text)

def BookAt22(dato, tidStart, tidSlutt, romID, bruker, passord):
    print("SCHEDULING ROOMBOT TO EXECUTE AT",datetime.date.today().strftime("%d-%m-%Y"),"22:00:01!")
    s = sched.scheduler(time.time, time.sleep)
    t = time.strptime(time.strftime("%Y-%m-%d")+' 22:00:01', '%Y-%m-%d %H:%M:%S')
    t = time.mktime(t)
    print("PLEASE WAIT.. YOU CAN MINIMIZE WINDOW")
    s.enterabs(t, 1, Book, (dato, tidStart, tidSlutt, romID, bruker, passord))
    s.run()

def makeDate():
    today = datetime.date.today()
    omTreDager = today + datetime.timedelta(days=3)
    return omTreDager.strftime("%Y%m%d")

if __name__ == "__main__":
    print("STARTING ROOMBOT!")
    dato = makeDate() #'20220311'
    tidStart = sys.argv[1]#'20:00'
    tidSlutt = sys.argv[2]#'21:00'
    romID = sys.argv[3]#'4202'
    bruker = sys.argv[4]
    passord = sys.argv[5]
    BookAt22(dato, tidStart, tidSlutt, romID, bruker, passord)