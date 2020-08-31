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

    if (ip > jp) {
      return 1;
    }
    if (ip < jp) {
      return -1;
    }

    return 0;
  }
}
class Heap {
  constructor() {
    this.list = [];
  }

  parent(index) {
    return index <= 0 ? 0 : (index - 1) / 2;
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
    let swap = index;

    if (
      left < this.list.length &&
      Comparator.QueueItemComp(this.list[index], this.list[left]) > 0
    ) {
      swap = left;
      if (
        right < this.list.length &&
        Comparator.QueueItemComp(this.list[right], this.list[left]) >= 0
      ) {
        swap = right;
      }
    }
    if (
      right < this.list.length &&
      Comparator.QueueItemComp(this.list[index], this.list[right]) > 0
    ) {
      swap = right;
      if (
        left < this.list.length &&
        Comparator.QueueItemComp(this.list[right], this.list[left]) <= 0
      ) {
        swap = left;
      }
    }

    if (swap !== index) {
      swap(index, swap);
      this.sinkKey(swap);
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
  }
  peek() {
    return this.list[0];
  }
  minPop() {
    let item = this.list.shift();
    this.swap(0, this.list.length);
    this.sinkKey(0);
    return item;
  }
  contains(item) {
    for (let i = 0; this.heap.heapSize; i++) {
      if (this.list[i].getItem() === item) {
        return true;
      }
    }
  }
}
class MinPriorityQueue {
  heap = new Heap();
  isEmpty() {
    return this.heap.heapSize();
  }

  insert(item) {
    this.heap.insert(item);
    this.heap.raiseKey(this.heap.heapSize() - 1);
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
