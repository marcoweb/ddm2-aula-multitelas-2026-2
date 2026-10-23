import {router, useLocalSearchParams} from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTarefas } from "../../src/contexts/TarefasContext";
import {styles as comuns} from '../../src/styles/common'

export default function DetalhesTarefaScreen() {
    const {id} = useLocalSearchParams<{id: string}>();
    const {carregando, obterTarefa, alterarTarefa, removerTarefa} = useTarefas();
    const tarefa = obterTarefa(id);

    if(carregando) {
        return (
            <View style={comuns.container}>
                <Text>Carregando Tarefa...</Text>
            </View>
        );
    }

    if(!tarefa) {
        return (
            <View style={comuns.container}>
                <Text>Tarefa Não Encontrada</Text>

                <Pressable onPress={() => router.replace('/')} style={comuns.primaryButton}>
                    <Text style={comuns.primaryColorText}>Voltar para lista</Text>
                </Pressable>
            </View>
        );
    }

    function remover() {
        removerTarefa(id);
        router.replace('/');
    }

    return (
        <View style={comuns.container}>
            <Text style={comuns.title}>DETALHES</Text>
            <Text style={comuns.title}>{tarefa.titulo}</Text>
            <View>
                <Text>Situação</Text>
                <Text>
                    {tarefa.concluida ? 'Concluída' : 'Pendente'}
                </Text>
            </View>

            <Pressable onPress={() => alterarTarefa(id)} style={comuns.primaryButton}>
                <Text style={comuns.primaryColorText}>
                    { tarefa.concluida ?
                        'Marcar como pendente' :
                        'Marcar como concluida' }
                </Text>
            </Pressable>

            <Pressable onPress={remover} style={comuns.dangerButton}>
                <Text style={comuns.primaryColorText}>Remover Tarefa</Text>
            </Pressable>
        </View>
    );
}