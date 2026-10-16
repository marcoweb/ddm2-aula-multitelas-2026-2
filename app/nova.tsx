import { Pressable, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { useTarefas } from "../src/contexts/TarefasContext";

export default function NovaTarefaScreen() {
    const [titulo, setTitulo] = useState('');
    const { adicionarTarefa } = useTarefas();

    function salvar() {
        if(!titulo.trim()) {
            return;
        }

        adicionarTarefa(titulo);
        router.back();
    }

    return (
        <View>
            <Text>Nova Tarefa</Text>

            <TextInput
                autoFocus
                placeholder="Ex: Estudar React Native"
                placeholderTextColor="#98a2b3"
                returnKeyType="done"
                onChangeText={(texto) => {
                    setTitulo(texto);
                }}
                onSubmitEditing={salvar}
                value={titulo}
            />

            <Pressable onPress={salvar}>
                <Text>Salvar Tarefa</Text>
            </Pressable>
            <Pressable onPress={() => router.back()}>
                <Text>Cancelar</Text>
            </Pressable>
        </View>
    );
}