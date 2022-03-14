package no.hvl.bruker;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
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
		ProcessBuilder pb = new ProcessBuilder("python3", dir + "/BookScript.py", dateID, startTid, sluttTid, rom, user, passord);
		
		try {
			Process process = pb.start();
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
			BufferedReader readerError = new BufferedReader(new InputStreamReader(process.getErrorStream()));

			String lines=null;
			while((lines=reader.readLine())!=null) {
				System.out.println("ROOMBOT$ "+lines);
			}
			while((lines=readerError.readLine())!=null) {
				System.out.println("err$ "+lines);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		System.out.println("ROOMBOT TERMINATING ...");
	}

}