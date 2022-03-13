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

		String dir = System.getProperty("user.dir");
		ProcessBuilder pb = new ProcessBuilder("python", dir + "\\noe\\BookScript.py", "20220314", "20:00", "21:00", "4202", "591321", "Bergen2020");

		System.out.println("ROOMBOT TERMINATING ...");
	}

}