package no.hvl.bruker;

import java.io.File;
import java.io.FileNotFoundException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.Scanner;
import java.util.Timer;

public class linuxmain {
	public static void main(String[] args) {
		Date date = null;
		Timer timer = new Timer();
		String dateString = formateDateString();
		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		// data fra bruker
		String user = loginBruker();
		String passord = loginPassord();
		String rom = rom(mapper());
		String startTid = tidStart();
		String sluttTid = tidSlutt();
		String dateID = getDateID();

		System.out.println("Starting ROOMBOT... ");

		System.out.println("Booking room for: " + dateID + "::" + startTid + "-" + sluttTid + " at " + rom + "for user "
				+ user + ":" + passord);
		try {
			date = dateFormatter.parse(dateString + " 22:00:" + ((int) (Math.random() * 5) + 10));
		} catch (ParseException e1) {
			e1.printStackTrace();
		}

		timer.schedule(new TimedTask(dateID, startTid, sluttTid, rom, user, passord), date);
	}

	public static HashMap<String, String> mapper() {
		HashMap<String, String> romToKey = new HashMap<>();
		File file = new File("ROMKEY");

		try {
			Scanner sc = new Scanner(file);
			while (sc.hasNextLine()) {
				romToKey.put(sc.nextLine(), sc.nextLine());
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		return romToKey;
	}

	public static String loginBruker() {
		Scanner sc = new Scanner(System.in);
		System.out.println("Brukernavn:");
		String bruker = sc.nextLine();
		sc.close();
		return bruker;
	}

	public static String loginPassord() {
		Scanner sc = new Scanner(System.in);
		System.out.println("Passord:");
		String passord = sc.nextLine();
		sc.close();
		return passord;
	}

	public static String tidStart() {
		Scanner sc = new Scanner(System.in);
		System.out.println("Klokka Start(xx:xx):");
		String start = sc.nextLine();
		sc.close();
		if (start.length() == 5) {
			return start;
		}
		System.out.println("give a valid time in the format (xx:xx)");
		return tidStart();
	}

	public static String tidSlutt() {
		Scanner sc = new Scanner(System.in);
		System.out.println("Klokka slutt(xx:xx):");
		String slutt = sc.nextLine();
		sc.close();
		if (slutt.length() == 5) {
			return slutt;
		}
		System.out.println("give a valid time in the format (xx:xx)");
		return tidSlutt();
	}

	public static String rom(HashMap<String, String> romMap) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Hvilket rom vil du ha?");
		String romID = sc.nextLine();
		sc.close();

		if (romMap.containsKey(romID))
			return romMap.get(romID);
		System.out.println("Gi et gyldig romnummer:");
		return rom(romMap);
	}

	public static String getDateID() {
		String dateID = "";
		LocalDate date = LocalDate.now();
		dateID += date.getYear();
		dateID += date.getMonthValue();
		dateID += date.getDayOfMonth() + 3;
		System.out.println("booking for value: " + dateID);
		return dateID;
	}

	public static String formateDateString() {
		String dateString = "";
		LocalDate currDate = LocalDate.now();
		dateString += currDate.getYear() + "-";
		dateString += currDate.getMonthValue() + "-";
		dateString += currDate.getDayOfMonth();
		return dateString;
	}

}