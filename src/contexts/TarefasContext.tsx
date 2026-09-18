import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Tarefa } from "../types/Tarefa"
import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_TAREFAS = '@minha-lista:tarefas';

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
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('')

    useEffect(() => {
        async function carregarTarefas() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(CHAVE_TAREFAS);
        if(dadosSalvos)
          setTarefas(JSON.parse(dadosSalvos) as Tarefa[]);
      } catch {
        setErro('Não foi possível carregar as tarefas salvas')
      } finally {
        setCarregando(false);
      }
    }
    carregarTarefas();
    }, []);

    useEffect(() => {
    if (carregando) {
      return;
    }

    async function salvarTarefas() {
      try {
        await AsyncStorage.setItem(
          CHAVE_TAREFAS, JSON.stringify(tarefas));
        setErro('');
      } catch {
        setErro('Não foi possível salvar as alterações');
      }
    }
    salvarTarefas()
  }, [carregando, tarefas]);

  function adicionarTarefa(titulo: string) {
    const tituloLimpo = titulo.trim();

    if(!tituloLimpo) {
        return;
    }

    setTarefas((tarefasAtuais) => [
        ...tarefasAtuais,
        {
            id: Date.now.toString(),
            titulo: tituloLimpo,
            concluida: false
        }
    ]);
  }

  function alterarTarefa(id: string) {
    setTarefas((tarefasAtuais) => 
        tarefasAtuais.map((tarefa) =>
            tarefa.id === id
            ? {...tarefa, concluida: !tarefa.concluida}
            : tarefa
        )
    );
  }

  function removerTarefa(id: string) {
    setTarefas((tarefasAtuais) =>
        tarefasAtuais.filter((tarefa) => tarefa.id !== id) 
    );
  }

  function obterTarefa(id: string) {
    return tarefas.find((tarefa) => tarefa.id === id);
  }

  return(
    <TarefasContext.Provider
        value={{
            tarefas,
            carregando,
            erro,
            adicionarTarefa,
            alterarTarefa,
            removerTarefa,
            obterTarefa
        }}>
        {children}
    </TarefasContext.Provider>
  );
};


export function useTarefas() {
    const contexto = useContext(TarefasContext);

    if (!contexto) {
        throw new Error('useTarefas deve ser usado dentro de TarefasProvider')
    }

    return contexto;
}