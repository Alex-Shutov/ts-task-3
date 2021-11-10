/** Задача 3 - Моё хранилище
 *	Напишите класс хранилища(Vault)
 *	Из хранилища можно снимать валюту с помощью withdraw(Currency)
 *	В хранилище можно вкладывать валюту через deposit(Currency)
 *	Из хранлилища, можно переводить валюту через transfer(Currency, Vault)
*/
import { Currency, CurrencyType } from "../task_1";

export class Vault implements ISecureVaultRequisites{
	public id: number;
	public store: Set<Currency> = new Set<Currency>()

	public constructor(id?:number) {
		this.id = id ?? 0;
	}
	public withdraw(currency:Currency):void{
		const result = Array.from(this.store).find((x:Currency)=>
		(()=>{
			if(x.name===currency.name && x.value>=currency.value){
				x.value-=currency.value

				return true
			}

			return false;
		})())
		if(!result){
			throw new Error("Withdraw is not allowed")
		}
	}

	public deposit(currency:Currency):void{
		const findDeopsit = Array.from(this.store).find((x:Currency)=>
			(()=>{
				if(x.name===currency.name){
					x.value+=currency.value;

					return true
				}

				return false
			})())

		if(!findDeopsit){
			this.store.add(currency);
		}
		else{
			throw new Error("Deposit is not allowed")
		}
	}
	public transfer(curr:Currency,recieverVault:Vault):void{
		this.withdraw(curr);
		recieverVault.deposit(curr);
	}
}


export interface ISecureVaultRequisites{
	id: number
}
