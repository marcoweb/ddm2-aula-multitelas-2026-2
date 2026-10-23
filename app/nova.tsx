import { Pressable, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { useTarefas } from "../src/contexts/TarefasContext";
import { styles } from "../src/styles/common";

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
        <View style={styles.container}>
            <Text style={styles.title}>Nova Tarefa</Text>

            <TextInput
                style={styles.input}
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

            <Pressable
                style={styles.primaryButton}
                onPress={salvar}>
                <Text style={styles.primaryColorText}>Salvar Tarefa</Text>
            </Pressable>
            <Pressable
                style={styles.secondaryButton}
                onPress={() => router.back()}>
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
            </Pressable>
        </View>
    );
}