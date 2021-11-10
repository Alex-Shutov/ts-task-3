    /** Задача 1 - Сущность любой монетки
 * Опишите класс валюты
 * Он должен определять имя(name) валюты, String
 * Содержать количество(value) валюты, Number
 * Содержать количественный тип(unit), в котором исчисляется валюта, String
 * Класс должен предоставлять информацию о типе валюты: Материальная, криптовалюта или металл-депозит
 * Example new Currency("DOGE", 12.5, "satoshi")
 */

export class Currency{
    private readonly _name: string;
    public get name(): string {
        return this._name;
    }
    private _value: number;
    public get value(): number {
        return this._value;
    }
    public set value(value: number) {

        if(value < 0 || value ===undefined ){
            throw new Error(`${value} is not right`)
        }
        this._value = value;
    }
    private readonly _unit: string;
    public get unit(): string {
        return this._unit;
    }
    private _type: CurrencyType;
    public get type(): CurrencyType {
        return this._type;
    }
    public set type(value: CurrencyType) {
        this._type = value;
    }

    constructor(name:string|keyof typeof CurrencyType,value:number,unit:string){
        if(!name || !unit || value < 0 || value===undefined){
            throw new Error(`${arguments} is not right`)
        }
        this._name = name;
        this._value=value;
        this._unit=unit;
        this._type = name as CurrencyType;


    }

}

export enum CurrencyType {
    Dollar="Material",
    ru="Material",
    Gold="Metal",
    BTC="Crypto",
    XRP="Crypto",
    Etherium = "Crypto",
    Ruble = "Material"
}
