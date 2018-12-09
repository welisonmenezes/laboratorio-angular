import { ILanguage } from './language';

export interface IUser{
    nome: string;
    email: string;
    telefone: string;
    linguagens: ILanguage[];
}