package no.hvl.bruker;

import java.io.IOException;
import java.util.TimerTask;

public class TimedTask extends TimerTask {
	private String dateID;
	private String startTid;
	private String sluttTid;
	private String rom;
	private String user;
	private String passord;

	public TimedTask(String dateID, String startTid, String sluttTid, String rom, String user, String passord) {
		this.dateID = dateID;
		this.startTid = startTid;
		this.sluttTid = sluttTid;
		this.rom = rom;
		this.user = user;
		this.passord = passord;
	}

	@Override
	public void run() {

		try {
			Process p = Runtime.getRuntime().exec("BookScripty.py " + dateID + " " + startTid + " " + sluttTid + " "
					+ rom + " " + user + " " + passord);
		} catch (IOException e) {
			e.printStackTrace();
		}

		System.out.println("ROOMBOT TERMINATING ...");
	}

}
