import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View ,
  FlatList,
  Pressable,
  TextInput } from 'react-native';

type Tarefa = {
  id: string,
  titulo: string,
  concluida: boolean
}

const CHAVE_TAREFAS = '@minha-lista:tarefas';

export default function App() {
  const [titulo, setTitulo] = useState('');
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const [carregouDados, setCarregouDados] = useState(false);
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
        setCarregouDados(true);
      }
    }
    carregarTarefas();
  }, []);

  useEffect(() => {
    if (!carregouDados) {
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
  }, [carregouDados, tarefas]);

  function adicionarTarefa() {
    setTarefas((tarefasAtuais) =>  [
      ...tarefasAtuais,
      {
        id: Date.now().toString(),
        titulo: titulo,
        concluida: false
      }
    ]);
    setTitulo('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>ASSINC STORAGE</Text>
        <Text style={styles.title}>Minha Lista</Text>
        <Text>Adicione, conclua ou remova tarefas.</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder='Ex: Estudar React Native'
            placeholderTextColor='#98a2b3'
            value={titulo}
            onChangeText={setTitulo} />
          
          <Pressable
            onPress={adicionarTarefa}
            style={styles.addButton}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </Pressable>
        </View>

        <FlatList
          keyExtractor={(item) => item.id}
          data={tarefas}
          renderItem={({item}) => (
            <View>
              <Text>{item.titulo}</Text>
            </View>
          )} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    padding: 24
  },
  title: {
    marginTop:6,
    color: '#5b5bd6',
    fontSize: 12,
    fontWeight: '800'
  },
  subtitle: {
    marginTop: 8,
    color: '#172033',
    fontSize: 16
  },
  form : {
    flexDirection: 'row',
    gap: 10,
    marginTop: 28
  },
  addButton : {
    minHeight: 52,
    justifyContent: 'center',
    backgroundColor: '#5b5bd6',
    borderRadius: 12
  },
  addButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: '700'
  },
  input: {
    flex: 1,
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 12,
    fontSize: 16
  }
});
