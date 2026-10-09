import { Text, View, Pressable, FlatList } from "react-native";
import { Link } from "expo-router";
import { useTarefas } from "../src/contexts/TarefasContext";

export default function ListaScreen() {
    const { tarefas, carregando, erro } = useTarefas();

    return (
        <View>
            <Text>Lista de Tarefas</Text>
            <Link href="/nova" asChild>
                <Pressable>
                    <Text>Adicionar Tarefa</Text>
                </Pressable>
            </Link>

            {erro ? <Text>{erro}</Text> : null}

            <FlatList
                data={tarefas}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <Text>Nenhuma Tarefa Encontrada</Text>
                }
                renderItem={({item}) => (
                    <View>
                        <Text>{item.titulo}</Text>
                    </View>
                )}
            />
        </View>
    );
}