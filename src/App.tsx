import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, Circle, Trash2, Tag, AlertCircle, Pencil, X, Save } from 'lucide-react';

type Priority = 'low' | 'medium' | 'high';
type Category = '個人用' | '仕事' | '買い物' | '健康';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  category: Category;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('個人用');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editPriority, setEditPriority] = useState<Priority>('medium');
  const [editCategory, setEditCategory] = useState<Category>('個人用');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: crypto.randomUUID(),
          text: newTodo,
          completed: false,
          priority,
          category,
        },
      ]);
      setNewTodo('');
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditCategory(todo.category);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = (id: string) => {
    if (editText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id
          ? { ...todo, text: editText, priority: editPriority, category: editCategory }
          : todo
      ));
      setEditingId(null);
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getCategoryColor = (category: Category) => {
    const colors = {
      個人用: 'bg-blue-100 text-blue-800',
      仕事: 'bg-purple-100 text-purple-800',
      買い物: 'bg-green-100 text-green-800',
      健康: 'bg-red-100 text-red-800',
    };
    return colors[category];
  };

  const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <AlertCircle className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-blue-200 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Tasks</h1>

          <form onSubmit={addTodo} className="mb-8">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="さぁ、なにをする?"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
              />

              <div className="flex flex-wrap gap-4">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
                >
                  <option value="個人用">個人用</option>
                  <option value="仕事">仕事</option>
                  <option value="買い物">買い物</option>
                  <option value="健康">健康</option>
                </select>

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
                >
                  <option value="low">優先度 低</option>
                  <option value="medium">優先度 中</option>
                  <option value="high">優先度 高</option>
                </select>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <PlusCircle className="w-5 h-5" />
                  タスクを追加
                </button>
              </div>
            </div>
          </form>

          <div className="space-y-3">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors ${
                  todo.completed ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="flex-shrink-0"
                >
                  {todo.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </button>

                <div className="flex-grow">
                  {editingId === todo.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
                      />
                      <div className="flex gap-2">
                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value as Category)}
                          className="px-3 py-1 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
                        >
                          <option value="個人用">個人用</option>
                          <option value="仕事">仕事</option>
                          <option value="買い物">買い物</option>
                          <option value="健康">健康</option>
                        </select>
                        <select
                          value={editPriority}
                          onChange={(e) => setEditPriority(e.target.value as Priority)}
                          className="px-3 py-1 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
                        >
                          <option value="low">優先度 低</option>
                          <option value="medium">優先度 中</option>
                          <option value="high">優先度 高</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className={`text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                        {todo.text}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(todo.category)}`}>
                          <Tag className="w-3 h-3 inline mr-1" />
                          {todo.category}
                        </span>
                        {getPriorityIcon(todo.priority)}
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {editingId === todo.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className="p-2 text-green-600 hover:text-green-700 transition-colors"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(todo)}
                        className="p-2 text-gray-400 hover:text-indigo-500 transition-colors"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}

            {todos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">タスクがありません!早速追加しましょう😊</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
