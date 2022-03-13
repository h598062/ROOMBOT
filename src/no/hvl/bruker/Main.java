package no.hvl.bruker;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;
import java.util.Timer;
import java.util.TimerTask;
import java.time.LocalDate;

public class Main {
	public static void main(String[] args) {
		Date date=null;
	    Timer timer = new Timer();
		String dateString = Utils.formateDateString();
	    DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	    
	    //data fra bruker
		String user = Utils.loginBruker();
		String passord = Utils.loginPassord();
		String rom = Utils.rom(Utils.mapper());
		String startTid = Utils.tidStart();
		String sluttTid = Utils.tidSlutt();
		String dateID = Utils.getDateID();


		System.out.println("Starting ROOMBOT... ");
		
		System.out.println("Booking room for: "+dateID+"::"+startTid+"-"+sluttTid+" at "+rom+"for user "+user+":"+passord);
	    try {
			date = dateFormatter.parse(dateString+" 22:00:"+((int)(Math.random()*40)+15));
		} catch (ParseException e1) {
			e1.printStackTrace();
		}
	    
		timer.schedule(new TimedTask(dateID, startTid, sluttTid, rom, user, passord), date);
	}
}
