import React, {Component} from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';


class App extends Component{

    id = 3

    state = {
        input : '',
        todos: [
            { id: 0, text: ' 리액트 소개', checked: false },
            { id: 1, text: ' 리액트 소개', checked: true },
            { id: 2, text: ' 리액트 소개', checked: false }
        ]

    }
    render() {
        const {input , todos} = this.state;
        const {
            handleChange,
            handleCreate,
            handleKeyPress,
            handleToggle,
            handleRemove
        } = this;
        return (
            <TodoListTemplate form={
                <Form
                    value = {input}
                    onKeyPress={handleKeyPress}
                    onChange={handleChange}
                    onCreate={handleCreate}
                />}>
                <TodoItemList
                    todos={todos}
                    onToggle={handleToggle}
                    onRemove={handleRemove}
                />
            </TodoListTemplate>
        );
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        });
    }

    handleCreate = () => {
        const { input, todos } = this.state;
        this.setState({
            todos: todos.concat({
                id : this.id++,
                text: input,
                checked : false
            })
        });

    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleCreate();
        }
    }

    handleToggle = (id) => {

        const { todos } = this.state;
        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index];

        this.setState({
            todos: [
                ...todos.slice(0, index),
                {
                    ...selected,
                    checked: !selected.checked
                },
                ...todos.slice(index + 1, todos.length)
            ]
        });


    }

    handleRemove = (id) => {
        const { todos } = this.state;
        this.setState({
            todos: todos.filter(todo => todo.id !== id)
        });
    }
}

export default App;
