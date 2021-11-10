/**
 * Задание 5 - Власть банков
 * В этой задаче вам нужно реализовать класс контроллер
 * 1. registerVault(): ISecureVaultRequisites - регистрирует хранилище в банке
 * 2. proceedContract(IContract): void - проводит договор между счетами
 * 3. Класс контроллера должен быть реализацией паттерна Singleton
 *
 * Хранилища должны быть сохранены в массив vaultStore: Vault[]
 */
import { IContract, SmartContract } from "../task_4";
import { ISecureVaultRequisites, Vault } from "../task_3";
import { Currency, CurrencyType } from "../task_1";
import { Dollar } from "../task_2";

export class BankController{
    private static instance:BankController;
    private readonly _vaultCollection:Vault[];
    private constructor() {
        this._vaultCollection = new Array<Vault>()
      }

    public static getInstance():BankController{
        if(!BankController.instance){
            BankController.instance = new BankController()
        }
        return BankController.instance;
    }

    /**
     * Require Id of User
     */
    public registerVault(id?:number): ISecureVaultRequisites{
        const vault = new Vault(id);
        this._vaultCollection.push(vault)

        return vault;
    }

    public proceedContract(contract: IContract) {
        const sender = this._vaultCollection.find((sender:ISecureVaultRequisites)=>sender.id === contract.sender.id);
        const reciever = this._vaultCollection.find((reciever:ISecureVaultRequisites)=>reciever.id===contract.receiver.id);

        contract.signAndTransfer()
    }
}

