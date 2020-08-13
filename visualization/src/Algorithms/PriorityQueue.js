class QueueItem {
  constructor(item, priority) {
    this.item = item;
    this.priority = priority;
  }

  getPriority() {
    return this.priority;
  }

  getItem() {
    return this.item;
  }
}

class PriorityQueue {
  list = [];
  comparator = 0;
  constructor(comparator = (a, b) => a < b) {
    this.comparator = comparator;
  }

  pop() {
    return this.list.unshift();
  }

  push(item, cost) {
    myItem = new QueueItem(item, cost);
    size = this.list.push(myItem);
  }
  size() {
    return this.list.length;
  }
  peek() {
    return this.list[0];
  }

  isEmpty() {
    return this.list.length === 0;
  }
}
module.exports = { PriorityQueue };
