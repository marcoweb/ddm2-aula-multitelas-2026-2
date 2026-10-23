import { Text, View, Pressable, FlatList } from "react-native";
import { Link } from "expo-router";
import { useTarefas } from "../src/contexts/TarefasContext";

import { styles as commons } from "../src/styles/common";

import { StyleSheet } from "react-native";

export default function ListaScreen() {
    const { tarefas, carregando, erro } = useTarefas();

    return (
        <View style={commons.container}>
            <Text style={commons.title}>Lista de Tarefas</Text>
            <Link href="/nova" asChild>
                <Pressable style={commons.primaryButton}>
                    <Text style={commons.primaryColorText}>Adicionar Tarefa</Text>
                </Pressable>
            </Link>

            {erro ? <Text>{erro}</Text> : null}

            <FlatList
                contentContainerStyle={styles.list}
                data={tarefas}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <Text>Nenhuma Tarefa Encontrada</Text>
                }
                renderItem={({item}) => (
                    <Link href={{pathname: '/tarefas/[id]', params: {id : item.id}}} asChild>
                        <Pressable>
                            <View>
                                <Text style={styles.itemTitle}>{item.titulo}</Text>
                            </View>
                        </Pressable>
                    </Link>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        gap: 12,
        paddingTop: 24,
        marginBottom: 24
    },
    item: {
        minHeight: 72,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e4e7ec',
        borderRadius: 14,
        backgroundColor: '#fff',
        padding: 16
    },
    itemContent: { flex: 1},
    itemTitle: {
        color: '#172033',
        fontSize: 16,
        fontWeight: '700'
    }
});