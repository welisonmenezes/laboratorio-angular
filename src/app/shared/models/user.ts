import { ILanguage } from './language';

export interface IUser{
    nome: string;
    email: string;
    telefone: string;
    arquivo: string;
    linguagens: ILanguage[];
}