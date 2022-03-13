package no.hvl.bruker;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Scanner;

public class test {

	public static void main(String[] args) {
		String dir = System.getProperty("user.dir");

		String command = "cmd.exe /c start python BookScript.py 20220312 20:00 21:00 4202 591321 Bergen2020";
		System.out.println(command);

		File file = new File("ROMKEY");

		try {
			Scanner sc = new Scanner(file);
			while (sc.hasNextLine()) {
			System.out.println(sc.nextLine());
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		try {
			
			Process p = Runtime.getRuntime().exec(command);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
