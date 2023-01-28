let todoList = [];

const navMessage = () => {
  console.log(' ');
  console.log("What else do you want to accomplish?");
}
const showCommands = () => {
  const commands = "==== Use these commands to guide your activity ====:\nadd\nupdate\ndelete\nview\nexit\n================================================="
  console.log(commands);
}

function showItems(todoList) {
  console.log("     \n==========todo List Items==========");
  todoList.forEach((item) => {
    console.log(item);
  })
  console.log("===================================");
}

function addItem(item) {
  todoList.push(item);
}

function deleteItem(item) {
  let newList = todoList.filter((prop) => {
    if (prop === item) {
      return false;
    } else { return true; }
  });
  console.log(`----- deleted (${item}) -----`)
  return newList;
}

function checkItem(todoList, item) {
  if (todoList.includes(item)) {
    return true;
  } else if (item === null || item === 0 || item === '0' || item === "undefined" || item === " " || item === "") {
    return false;
  } else return false;
}

function isEmpty(todoList) {
  if (todoList.length === 0) {
    return true;
  }
  else {
    return false;
  }
}

function exit() {
  console.log(' \n--- We hope this application served you well ---\n--- Here is a final look at your Todo List: ---');
  console.log(' ');
  showItems(todoList);
}


console.log("This Application allows You to Add, update, delete or view todo list items\n");
showCommands();
commandProcessor:
while (true) {
  let command = prompt("Enter your command here: ");
  command = command.toLowerCase();
  switch (command) {
    case "add":
      addCase:
      while (true) {
        let item = prompt('Enter the task you want to add: ');
        item = item.toLowerCase();
        if (checkItem(todoList, item)) {
          console.log('Item already in List');
          continue addCase;
        } else {
          addItem(item);
          showItems(todoList);
          navMessage();
          continue commandProcessor;
        }
      }
    case "update":
      if (isEmpty(todoList)) {
        console.log("=================================================\nThe List is Currently Empty!\nThere is  nothing to update\n=================================================");
        navMessage();
        continue commandProcessor;
      }
      console.log("=================================================\nN:B=> Any task you enter below will be deleted permanently\nYou will get the option to replace it with a new task\n=================================================\n");
      updateCase:
      while (true) {
        showItems(todoList);
        item = prompt('Enter the task you want to update from the List above: ').toLowerCase();
        if (checkItem(todoList, item)) {
          todoList = deleteItem(item);

          updateHandler:
          while (true) {
            let task = prompt(`Enter a new task to replace (${item}): `, '0').toLowerCase();
            if (checkItem(todoList, task)) {
              console.log('Item already in List');
              continue updateHandler;
            } else if (task === null || task === 0 || task === '0' || task === "undefined" || task === " " || task === "") {
              console.log("invalid input, please use meanignful words");
              continue updateHandler;
            } else {
              addItem(task);
              showItems(todoList);
              navMessage();
              continue commandProcessor;
            }
          }
        }
        else {
          console.log('===================================\nCannot find the item you want to update in the List!!\nCheck your spelling and make the neccesary corrections. \nWhile you take a look at the list again below ');
          continue updateCase;
        }
      }
    case "delete":
      deleteCase:
      while (true) {
        if (isEmpty(todoList)) {
          console.log("=================================================\nThe List is Currently Empty!\nThere is  nothing to delete\n=================================================");
          navMessage();
          continue commandProcessor;
        }
        showItems(todoList);
        item = prompt('Enter the task you want to delete from the List above: ').toLowerCase();
        if (checkItem(todoList, item)) {
          todoList = deleteItem(item);
          showItems(todoList);
          navMessage();
          continue commandProcessor;
        } else {
          console.log('Cannot find the item in the List!! \nCheck your spelling and make the neccesary corrections. \nWhile you take a look at the list again below ');
          continue deleteCase;
        }
      }
    case "view":
      if (isEmpty(todoList)) {
        console.log("=================================================\nThe List is Currently Empty!\nThere is  nothing to View\n=================================================");
        navMessage();
        continue commandProcessor;
      }

      showItems(todoList);
      navMessage();
      continue commandProcessor;
    case "exit":
      if (isEmpty(todoList)) {
        console.log("=================================================\nThere is Nothing in your todoList!\nWe hope you get more out of the application next time, Goodbye\n=================================================\n");
        break commandProcessor;
      } else {
        exit()
        break commandProcessor;
      }
    default:
      console.log(' \nPlease Enter the right command');
      showCommands();
      continue commandProcessor;
  }
}

