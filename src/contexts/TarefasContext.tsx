import { createContext, PropsWithChildren } from "react";
import { Tarefa } from "../types/Tarefa"

type TarefasContextData = {
    tarefas: Tarefa[];
    carregando: boolean;
    erro: string;

    adicionarTarefa: (titulo: string) => void;
    alterarTarefa: (id: string) => void;
    removerTarefa: (id: string) => void;
    obterTarefa: (id: string) => Tarefa | undefined;
};

const TarefasContext = createContext<TarefasContextData | undefined>(undefined);

export function TarefasProvider({ children } : PropsWithChildren) {
    
};