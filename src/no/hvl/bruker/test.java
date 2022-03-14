package no.hvl.bruker;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;
import java.util.Timer;

public class test {

	public static void main(String[] args) throws IOException, InterruptedException {
		String dir = System.getProperty("user.dir");
		ProcessBuilder pb = new ProcessBuilder("python", dir + "\\BookScript.py", "20220314", "20:00", "21:00", "4202", "591321", "Bergen2020");

		Process process = pb.start();
		
		BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
		BufferedReader readerError = new BufferedReader(new InputStreamReader(process.getErrorStream()));

		String lines=null;
		while((lines=reader.readLine())!=null) {
			System.out.println("$ "+lines);
		}
		while((lines=readerError.readLine())!=null) {
			System.out.println("err$ "+lines);
		}
		
		System.out.println(dir);

//		
//		
//		
//		
//		
//		
//		
//		File file = new File("ROMKEY");
//
//		try {
//			Scanner sc = new Scanner(file);
//			while (sc.hasNextLine()) {
//			System.out.println(sc.nextLine());
//			sc.close();
//			}
//		} catch (FileNotFoundException e) {
//			e.printStackTrace();
//		}
//		
//		
//		Date date=null;
//	    DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//	    Timer timer = new Timer();
//		String dateString = Utils.formateDateString();
//
//
//	    try {
//			date = dateFormatter.parse(dateString+" 22:43:00");
//		} catch (ParseException e1) {
//			e1.printStackTrace();
//		}
//	    
//		timer.schedule(new TTTEST(), date);
//		Thread.sleep(3000);
//		timer.cancel();
	}

}
