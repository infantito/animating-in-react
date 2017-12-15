import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Motion, spring, presets } from 'react-motion';
const uuid = require('uuid/v4');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTodo: '',
      todos: [
        {
          id: uuid(),
          text: 'Buy milk',
        },
        {
          id: uuid(),
          text: 'Return library book',
        },
        {
          id: uuid(),
          text: 'Go to post office',
        },
        {
          id: uuid(),
          text: 'Think about life',
        },
        {
          id: uuid(),
          text: 'Lie down',
        },
      ],
    };

    this.handleAddTodoChange = this.handleAddTodoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  getTodos() {
    const todos = this.state.todos;

    return todos.map((todo, index) => (
      <Motion
        defaultStyle={{ left: -1000 }}
        key={todo.id}
        style={{ left: spring(0, presets.stiff) }}
      >
        {interpolatingStyle => (
          <li
            className="todo-list__item"
            key={todo.id}
            style={interpolatingStyle}
          >
            {todo.text}
            <input
              type="checkbox"
              className="todo-list__checkbox"
              onClick={ () => this.handleRemove(todo.id) }
            />
          </li>
        )}
      </Motion>
    ));
  }

  handleAddTodoChange(e) {
    const target = e.target;
    const value = target.value;

    this.setState({ newTodo: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const todos = this.state.todos;

    todos.push({
      id: uuid(),
      text: this.state.newTodo
    });

    this.setState({
      newTodo: '',
      todos
    });
  }

  handleRemove(id) {
    const items = this.state.todos;
    const newItems = items.filter(todo => todo.id !== id);

    this.setState({
      todos: newItems
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="todo-heading">To-dos</h1>
        <CSSTransitionGroup
          component="ul"
          className="todo-list"
          transitionName="new-todo"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.getTodos()}
        </CSSTransitionGroup>
        <div className="todo-controls">
          <form onSubmit={this.handleSubmit}>
            <input
              className="todo-controls__input"
              onChange={this.handleAddTodoChange}
              placeholder="Add a todo"
              type="text"
              value={this.state.newTodo}
            />
          </form>
          <button className="todo-controls__button">Add</button>
        </div>
      </div>
    );
  }
}

export default App;
