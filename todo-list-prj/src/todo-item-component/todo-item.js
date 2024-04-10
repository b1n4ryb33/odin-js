function todoItemData(todoItemJSON) {
    if(!todoItemJSON.title || !todoItemJSON.description || !todoItemJSON.dueDate || !todoItemJSON.priority){
        throw new Error('Required property missing.');
    }
    const _todoItem = {
        'title': todoItemJSON.title,
        'description': todoItemJSON.description,
        'dueDate':  todoItemJSON.dueDate,
        'priority': todoItemJSON.priority,
        'notes': todoItemJSON.notes,
        'checklist': todoItemJSON.checklist
    }
    return Object.assign({}, _todoItem);
}

function todoItem(title, description, dueDate, priority, notes = '', checklist = []){
    const _todoItem = { title, description, dueDate, priority, notes, checklist };

    const toHTML = () => {
        const _issueTemplate = `
                <div class='issue'>
                    <h3>${_todoItem.title}</h3>
                    <p>Description:${_todoItem.description}</p>
                    <p>Due Date: ${_todoItem.dueDate}</p>
                    <p>Priority: ${_todoItem.priority}</p>
                    <p>Notes: ${_todoItem.notes}</p>
                    <p><ul>Checklist:
                    </ul></p>
                </div>
            `;
        return _issueTemplate;
    }

    const updateProperty = (propertyName, newValue) => {
        if(!(propertyName in _todoItem)){
            throw new Error('Cant update non existing property.');
        }
        _todoItem[propertyName] = newValue;
        return Object.assign(todoItemData(_todoItem), {updateProperty, toHTML});
    }
    
    return Object.assign(todoItemData(_todoItem), {updateProperty, toHTML});
}

export {todoItem};