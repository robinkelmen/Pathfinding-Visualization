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
class Comparator {
  static QueueItemComp(i, j) {
    let ip = i.getPriority();
    let jp = j.getPriority();

    return ip - jp;
  }
}
class Heap {
  constructor() {
    this.list = [];
  }

  parent(index) {
    return index <= 0 ? 0 : Math.floor((index - 1) / 2);
  }

  left(index) {
    return 2 * index + 1;
  }

  right(index) {
    return 2 * index + 2;
  }
  swap(i, j) {
    if (i >= 0 && j >= 0 && j < this.list.length && i < this.list.length) {
      let temp = this.list[i];
      this.list[i] = this.list[j];
      this.list[j] = temp;
    }
  }

  sinkKey(index) {
    let left = this.left(index);
    let right = this.right(index);
    let toswap = index;

    if (
      left < this.list.length &&
      Comparator.QueueItemComp(this.list[index], this.list[left]) > 0
    ) {
      toswap = left;
      if (
        right < this.list.length &&
        Comparator.QueueItemComp(this.list[right], this.list[left]) >= 0
      ) {
        toswap = right;
      }
    }
    if (
      right < this.list.length &&
      Comparator.QueueItemComp(this.list[index], this.list[right]) > 0
    ) {
      toswap = right;
      if (
        left < this.list.length &&
        Comparator.QueueItemComp(this.list[right], this.list[left]) <= 0
      ) {
        toswap = left;
      }
    }

    if (toswap !== index) {
      this.swap(index, toswap);
      this.sinkKey(toswap);
    }
  }
  raiseKey(index) {
    let comp = Comparator.QueueItemComp(
      this.list[index],
      this.list[this.parent(index)]
    );

    if (index === 0) return;
    if (comp < 0) {
      this.swap(index, this.parent(index));
      this.raiseKey(this.parent(index));
    }
  }
  heapSize() {
    return this.list.length;
  }
  insert(item) {
    this.list.push(item);
    this.raiseKey(this.list.length - 1);
  }
  peek() {
    return this.list[0];
  }
  minPop() {
    let item = this.list.shift();

    this.swap(0, this.list.length - 1);
    this.sinkKey(0);
    return item;
  }
  getList() {
    return this.list;
  }
  contains(item) {
    for (let i = 0; i < this.heapSize(); i++) {
      let current = this.list[i].getItem();

      if (current.col === item.col && current.row === item.row) {
        return current;
      }
    }
    return null;
  }
}
class MinPriorityQueue {
  constructor() {
    this.heap = new Heap();
  }
  isEmpty() {
    return this.heap.heapSize() === 0;
  }

  insert(item) {
    this.heap.insert(item);
  }
  peekMin() {
    return this.heap.peek();
  }
  pop() {
    return this.heap.minPop();
  }
  contains(item) {
    return this.heap.contains(item);
  }
}
module.exports = { MinPriorityQueue, QueueItem };
