import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TarefasProvider } from "../src/contexts/TarefasContext";


export default function RootLayout() {
    return(
        <TarefasProvider>
            <Stack>
                <Stack.Screen name="index" options={{title: "Lista"}} />
                <Stack.Screen name="nova" options={{title: "Nova Tarefa"}} />
                <Stack.Screen name="tarefas/[id]"
                    options={{title: "Detalhes da Tarefa"}}  />
            </Stack>
            <StatusBar style="auto" />
        </TarefasProvider>
    );
}