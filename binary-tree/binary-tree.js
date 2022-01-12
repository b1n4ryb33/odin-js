class BinaryNode {
    
    constructor(value, parent) {
        this.value = value;
        this.parent = parent;
        this.left_child = null;
        this.right_child = null;
    }

    set_child = function(value){
        if(this.left_child != null && value < this.value){
            this.left_child.set_child(value);
        }
        if(this.left_child == null && value < this.value){
            this.left_child = new BinaryNode(value, this);
            console.log(`Set ${value} as left child of ${this.value}`); 
        }
        if(this.right_child != null && value >= this.value){
            this.right_child.set_child(value);
        }
        if(this.right_child == null && value >= this.value){
            this.right_child = new BinaryNode(value, this); 
            console.log(`Set ${value} as  rigth child of ${this.value}`);
        }
    }
}

class BinarySearchTree {
    constructor(list) {
        this.root_node = new BinaryNode(list[0], null);
        list.splice(1).forEach(element => {
            console.log(`Processing ${element}...`);
            this.root_node.set_child(element);
        });
    }    
}

const unsorted_list = [5, 2, 3, 1, 78, 12, 125, 457, 234, 234, 9644, 34, 12];

let binary_search_tree = new BinarySearchTree(unsorted_list);