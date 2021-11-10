/**
 * Задание 4 - Гарантия доставки
 * Денюжки со счета на счет перевести легко, а вот дотащить 3 килограмма палладия, может быть затруднительно
 * Изучите интервейс IContract
 * Опищите и реализуйте функционал сущности Договора-контракта
 * BankingContract - банковский перевод, без задержки
 * SmartContract - перевод через блокчейн, задержка 3000мс
 * LogisticContract - перевозка металла, задержка 6000мс
 */
import { Currency } from "../task_1";
import { ISecureVaultRequisites, Vault } from "../task_3";
export abstract class BaseContract implements IContract{
    private readonly _id: number;
    private _state: ContractState;
    private readonly _value: Currency;
    private readonly _sender: ISecureVaultRequisites;
    private readonly _receiver: ISecureVaultRequisites;
    public readonly _delay: number;
    protected get delay(): number {
        return this._delay;
    }
    
    public get id(): number {
        return this._id;
    }
    
    public get state(): ContractState {
        return this._state;
    }
    
    public set state(value: ContractState) {
        this._state = value;
    }
    
    public get value(): Currency {
        return this._value;
    }

    public get sender(): ISecureVaultRequisites {
        return this._sender;
    }
       
    public get receiver(): ISecureVaultRequisites {
        return this._receiver;
    }


    constructor(id:number,value:Currency,sender:ISecureVaultRequisites,reciever:ISecureVaultRequisites,delay:number=0){
        this._id = id;
        this._value = value;
        this._sender = new Vault(sender.id);
        this._receiver = new Vault(reciever.id);
        this.state = ContractState.pending
        this._delay = delay
    }
    
    public signAndTransfer(isAsync = false):void{
        
        if(!isAsync){
            this.tryTransfer()
        }else{
            setTimeout(this.tryTransfer, this.delay);
        }

    }



    public closeTransfer(): void{
        this._state=ContractState.close
    }
    
    public rejectTransfer():void{
        this._state=ContractState.rejected

    }

    private tryTransfer():void{
        this._state = ContractState.transfer;
            try{
                (this.sender as Vault).transfer(this.value,(this.receiver as Vault))
                this.closeTransfer()
            }catch{
                this.rejectTransfer()
            }
    }
    
    
}
export class SmartContract extends BaseContract{
    constructor(args:[number,Currency,ISecureVaultRequisites,ISecureVaultRequisites,3000]){
        super(...args)
    }
}

export class BankingContract extends BaseContract{}

export class LogisticContract extends BaseContract{
    constructor(args:[number,Currency,ISecureVaultRequisites,ISecureVaultRequisites,6000]){
        super(...args)
    }

}

export interface IContract{
    /**
     * Уникальный номер контракта
     */
    id: number,
    /**
     * Текущее состояние контракта
     */
    state: ContractState,
    /**
     * Предмет контракта
     */
    value: Currency,
    /**
     * Реквизиты отправителя
     */
    sender: ISecureVaultRequisites,
    /**
     * Реквизиты получателя
     */
    receiver: ISecureVaultRequisites,
    /**
     * Начало исполнения контракта
     */
    signAndTransfer: () => void,
    /**
     * Успешное завершение контракта
     */
    closeTransfer: () => void,
    /**
     * Отмена исполнения контракта
     */
    rejectTransfer: () => void
}

export enum ContractState{
    /**
     * Контракт находится в ожидании исполнения
     */
    pending,
    /**
     * Контракт находится в исполнении
     */
    transfer,
    /**
     * Контракт исполнен успешно
     */
    close,
    /**
     * Контракт отменен, либо отклонен
     */
    rejected
}
