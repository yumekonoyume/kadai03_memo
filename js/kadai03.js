// １．Todoリスト作成：ローカルストレージからToDoリストを取得して表示する関数
function loadTodos() {
    const todoList = document.getElementById('todo-list');
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    // 既存のToDoをリストに追加
    todos.forEach(todo => {
        const todoItem = createTodoItem(todo.text, todo.isOnHold);
        if (todo.isOnHold) {
            todoList.appendChild(todoItem);
        } else {
            todoList.insertBefore(todoItem, todoList.firstChild); // ToDo項目をリストの一番上に追加
        }
    });
}

// ToDoを作成する関数
function createTodoItem(todoText, isOnHold = false) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (isOnHold) {
        li.style.backgroundColor = '#808080';
        li.style.color = '#ffffff';
    }

    li.appendChild(document.createTextNode(todoText));

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.appendChild(document.createTextNode('削除'));
    removeBtn.onclick = function() {
        removeTodoItem(li, todoText);
    };

    const holdBtn = document.createElement('button');
    holdBtn.className = 'hold-btn';
    holdBtn.appendChild(document.createTextNode(isOnHold ? 'ToDoへ' : '保留'));
    holdBtn.onclick = function() {
        toggleHoldTodoItem(li, todoText, holdBtn);
    };

    buttonContainer.appendChild(holdBtn);
    buttonContainer.appendChild(removeBtn);

    li.appendChild(buttonContainer);

    return li;
}


// ToDoリストに新しいToDoを追加する関数
function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        const todoList = document.getElementById('todo-list');

        // ToDoをリストに表示
        const todoItem = createTodoItem(todoText);
        todoList.insertBefore(todoItem, todoList.firstChild); // 一番上に追加

        // ローカルストレージに保存
        saveTodoToLocalStorage(todoText, false);

        // 入力フィールドをクリア
        todoInput.value = '';
    }
}

// ローカルストレージにToDoを保存する関数
function saveTodoToLocalStorage(todoText, isOnHold) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({ text: todoText, isOnHold: isOnHold });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// ToDoを削除する関数
function removeTodoItem(li, todoText) {
    const todoList = document.getElementById('todo-list');
    todoList.removeChild(li);

    // ローカルストレージから削除
    removeTodoFromLocalStorage(todoText);
}

// ローカルストレージからToDoを削除する関数
function removeTodoFromLocalStorage(todoText) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo.text !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// ToDoを保留にする関数
function toggleHoldTodoItem(li, todoText, holdBtn) {
    const todoList = document.getElementById('todo-list');
    const isOnHold = li.style.backgroundColor === 'rgb(128, 128, 128)'; // グレーなら保留中
    li.style.backgroundColor = isOnHold ? '' : '#808080';
    li.style.color = isOnHold ? '' : '#ffffff';

    // ボタンテキストを切り替え
    holdBtn.textContent = isOnHold ? '保留' : 'ToDoへ';

    // リストの位置を変更
    todoList.removeChild(li);
    if (isOnHold) {
        todoList.insertBefore(li, todoList.firstChild); // 保留解除された項目はリストの一番上に移動
    } else {
        todoList.appendChild(li); // 保留状態の項目はリストの一番下に移動
    }

    // ローカルストレージを更新
    toggleHoldTodoInLocalStorage(todoText, !isOnHold);
}

// ローカルストレージのToDoを保留にする関数
function toggleHoldTodoInLocalStorage(todoText, isOnHold) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.map(todo => {
        if (todo.text === todoText) {
            todo.isOnHold = isOnHold;
        }
        return todo;
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// イベントリスナーの追加
document.getElementById('add-todo-btn').addEventListener('click', addTodo);

// ページロード時にToDoリストを表示
document.addEventListener('DOMContentLoaded', loadTodos);


//２．背景テーマ設定
const colorThemeDisplay = document.querySelector("span");
const darkBtn = document.querySelector("#dark_btn");
const lightBtn = document.querySelector("#light_btn");
const coolBtn = document.querySelector("#cool_btn");

function colorThemeSet(){
    let bgColor;
    //ローカルストレージに既に値があればそれを取得、初めてだったらデフォルトでlightを設定
    if(localStorage.getItem("colorTheme")){
        bgColor = localStorage.getItem("colorTheme")
    } else {
        bgColor = "light";
    }
    //値に応じてスタイルを適用
    if(bgColor === "light"){
        document.body.classList.add("light");
        document.body.classList.remove("cool","dark");
    } else if(bgColor === "dark"){
        document.body.classList.add("dark");
        document.body.classList.remove("light","cool");
    } else if(bgColor === "cool"){
        document.body.classList.add("cool");
        document.body.classList.remove("light","dark");
    }     
}

colorThemeSet();

lightBtn.addEventListener("click",()=>{
    localStorage.setItem("colorTheme","light")
    colorThemeDisplay.textContent = localStorage.getItem("colorTheme");
    colorThemeSet();
});

darkBtn.addEventListener("click",()=>{
    localStorage.setItem("colorTheme","dark")
    colorThemeDisplay.textContent = localStorage.getItem("colorTheme");
    colorThemeSet();
});

coolBtn.addEventListener("click",()=>{
    localStorage.setItem("colorTheme","cool")
    colorThemeDisplay.textContent = localStorage.getItem("colorTheme");
    colorThemeSet();
});
