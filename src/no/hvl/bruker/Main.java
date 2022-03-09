package no.hvl.bruker;

import java.util.Scanner;

import no.hvl.bruker.*;

public class Main {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String user = Utils.loginBruker();
		String passord = Utils.loginPassord();
		String rom = Utils.rom(Utils.mapper());
		String startTid = Utils.tidStart();
		String sluttTid = Utils.tidSlutt();
		String dato = Utils.getNextDate();
		
		System.out.print("Starter ROOMBOT... \n type 'exit' to terminate");
		boolean exit = false;
		while(!exit) {
			if() {//når klokka er 22:00
				//kjør python program
			}
			if(sc.nextLine().equals("exit")) {
				break;
			}
			Thread.sleep(10*1000);
			
		}
		System.out.println("ROOMBOT SUCECCFULLY TERMINATED");
		sc.close();
	}

}
