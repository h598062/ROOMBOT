package no.hvl.bruker;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Scanner;

public class test {

	public static void main(String[] args) throws IOException {
		String dir = System.getProperty("user.dir");
		ProcessBuilder pb = new ProcessBuilder("python", dir + "\\BookScript.py", "20220314", "20:00", "21:00", "4202", "591321", "Bergen2020");


		Process process = pb.start();
		
		BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
		BufferedReader readerError = new BufferedReader(new InputStreamReader(process.getErrorStream()));

		String lines=null;
		while((lines=reader.readLine())!=null) {
			System.out.println(": "+lines);
		}
		while((lines=readerError.readLine())!=null) {
			System.out.println("err: "+lines);
		}
		
		System.out.println(dir);

		
		
		
		
		
		
		
		File file = new File("ROMKEY");

		try {
			Scanner sc = new Scanner(file);
			while (sc.hasNextLine()) {
			System.out.println(sc.nextLine());
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}

			//pb.command("C:\\Users\\RetailAdmin\\Desktop\\java prosjekter\\ROOMBOT\\BookScript.py 20220313 20:00 21:00 4202 591321 Bergen2020");
			//Process p = Runtime.getRuntime().exec(command);

	}

}
