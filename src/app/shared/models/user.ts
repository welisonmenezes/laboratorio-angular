import { ILanguage } from './language';

export interface IUser{
    name: string;
    email: string;
    telefone: string;
    arquivo1: string;
    arquivo2: string;
    linguagens: ILanguage[];
}