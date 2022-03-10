# !/usr/bin/env python3

import requests
import sys


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
    session.post(urlBook, data=payloadBook)


if __name__ == "__main__":

    dato = sys.argv[1]#'20220311'
    tidStart = sys.argv[2]#'20:00'
    tidSlutt = sys.argv[3]#'21:00'
    romID = sys.argv[4]#'4202'
    bruker = sys.argv[5]
    passord = sys.argv[6]

    Book(dato, tidStart, tidSlutt, romID, bruker, passord)
