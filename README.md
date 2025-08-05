# 📝 Projeto: Lista de Tarefas com LocalStorage

Este é um projeto simples de **lista de tarefas (To-Do List)** implementado com HTML, CSS e JavaScript puro (Vanilla JS), que utiliza o `localStorage` do navegador para armazenar os dados de forma persistente, mesmo após o fechamento da página.

## 🚀 Funcionalidades

- ✅ Adicionar nova tarefa
- 🧾 Visualizar lista de tarefas
- 🔁 Marcar tarefas como concluídas
- ❌ Remover tarefas individualmente
- 🧹 Remover todas as tarefas concluídas
- 📊 Exibir progresso de tarefas concluídas (ex: `3/5 Concluídas`)
- 💾 Armazenamento local com `localStorage`

## 📂 Estrutura

O código principal está contido em um arquivo JS, com funções organizadas para:

- **Manipulação do DOM**: criação de elementos HTML como `li`, `input`, `label`, `button`, etc.
- **Gerenciamento de tarefas**: adição, remoção, atualização e persistência.
- **Atualização de progresso**: exibição da contagem de tarefas concluídas.
- **Persistência de dados**: através do `window.localStorage`.

## 🧠 Principais Funções

| Função                          | Descrição |
|-------------------------------|-----------|
| `getTasksFromLocalStorage()`  | Retorna as tarefas salvas no `localStorage`. |
| `setTasksLocalStorage(tarefas)` | Salva a lista atualizada de tarefas no `localStorage`. |
| `renderAllTasks()`            | Renderiza todas as tarefas na interface. |
| `renderTasksProgresData()`    | Atualiza o texto de progresso (`x/y Concluídas`). |
| `createTask()`                | Cria uma nova tarefa a partir do formulário. |
| `removeTarefa(id)`            | Remove uma tarefa específica. |
| `removeDoneTasks()`           | Remove todas as tarefas concluídas. |
| `onCheckboxClick()`           | Atualiza o status de uma tarefa (concluída ou não). |

## 🖼️ Exemplo de Uso

1. Digite a descrição da tarefa no campo de entrada.
2. Clique em **Salvar**.
3. A tarefa será exibida com um checkbox e botão de exclusão.
4. Marque a checkbox para indicar que foi concluída.
5. Clique no `x` para remover uma tarefa ou use a opção de limpar tarefas concluídas.

## 🛠️ Tecnologias Utilizadas

- JavaScript (ES6+)
- HTML5
- CSS3 (pode ser adicionado para melhor visual)

## 💡 Sugestões de Melhorias

- Adicionar filtros (Todas / Concluídas / Ativas)
- Implementar animações ou transições
- Adicionar prioridade ou categorias às tarefas
- Criar versão com backend (Node.js + MongoDB, por exemplo)

## 📌 Requisitos

- Navegador moderno com suporte a `localStorage`
- Nenhuma dependência externa necessária

## 👨‍💻 Como Executar

1. Clone este repositório:
   
   git clone https://github.com/nelsonlima1989/todo-list-javascript.git

2. Abra o arquivo index.html no navegador.

Não é necessário servidor local ou build – o projeto é 100% frontend.

🧑‍🎓 Autor
Desenvolvido por [Nelson Lima]
🔗 [https://github.com/nelsonlima1989]