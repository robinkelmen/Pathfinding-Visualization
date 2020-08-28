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
  list = [];

  parent(index) {
    return (index - 1) / 2;
  }

  left(index) {
    return 2 * index + 1;
  }

  right(index) {
    return 2 * index + 2;
  }
  swap(i, j) {
    if (i >= 0 && j >= 0 && j < this.list.length && i < this.list.length) {
      let temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }
  }

  sinkKey(index) {
    let left = left(index);
    let right = right(index);
    let swap = i;

    if (
      left < this.list.length &&
      Comparator.QueueItemComp(list[i], list[left]) > 0
    ) {
      swap = left;
      if (
        right < this.list.length &&
        Comparator.QueueItemComp(list[right], this.list[left]) >= 0
      ) {
        swap = right;
      }
    }
    if (
      right < this.list.length &&
      Comparator.QueueItemComp(list[index], list[right]) > 0
    ) {
      swap = right;
      if (
        left < this.list.length &&
        Comparator.QueueItemComp(list[right], this.list[left]) <= 0
      ) {
        swap = left;
      }
    }

    if (swap != i) {
      swap(index, swap);
      this.sinkKey(swap);
    }
  }
  raiseKey(index) {
    let comp = Comparator.QueueItemComp(list[i], this.list[parent(index)]);
    if (index == 0) return;
    if (comp < 0) {
      this.swap(index, parent(index));
      this.raiseKey(parent(index));
    }
  }
  heapSize() {
    return this.list.length;
  }
  insert(item) {
    this.list.push(item);
  }
  peek() {
    return list[0];
  }
  minPop() {
    let item = this.list.shift();
    this.swap(0, this.list.length);
    this.sinkKey(0);
    return item;
  }
}
class MinPriorityQueue {
  heap = new Heap();
  isEmpty() {
    return this.heap.heapSize();
  }

  insert(item) {
    this.heap.insert(item);
    this.heap.raiseKey(heapSize - 1);
  }
  peekMin() {
    return this.heap.peek();
  }
  pop() {
    return this.heap.pop();
  }
}
module.exports = MinPriorityQueue;
