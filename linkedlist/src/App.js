class Node {
  constructor(data) {
      this.data = data;
      this.next = null;
  }
}

function reverseLinkedList(head) {
  let prev = null;
  let current = head;
  let reversedArray = [];

  while (current !== null) {
      let nextNode = current.next;
      current.next = prev;
      prev = current;
      current = nextNode;
  }

  // Build the reversed array
  let reversedHead = prev;
  while (reversedHead !== null) {
      reversedArray.push(reversedHead.data);
      reversedHead = reversedHead.next;
  }

  return reversedArray;
}

function findSecondLargest(arr) {
  if (arr.length < 2) {
      return null;
  }

  let firstMax = secondMax = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < arr.length; i++) {
      if (arr[i] > firstMax) {
          secondMax = firstMax;
          firstMax = arr[i];
      } else if (arr[i] > secondMax && arr[i] < firstMax) {
          secondMax = arr[i];
      }
  }

  return secondMax;
}

// Predefined input array
let numbersArray = [5, 3, 8, 2, 7];

if (numbersArray.length === 0) {
  console.log("List is empty.");
} else {
  // Find the second largest number in the original array
  let secondLargestOriginal = findSecondLargest(numbersArray);

  // Print the second largest number in the original array
  console.log("Second Largest Number in Original Array:", secondLargestOriginal);

  // Create the linked list
  let head = new Node(numbersArray[0]);
  let current = head;

  for (let i = 1; i < numbersArray.length; i++) {
      current.next = new Node(numbersArray[i]);
      current = current.next;
  }

  // Reverse the linked list and get the reversed array
  let reversedArray = reverseLinkedList(head);

  // Print reversed array
  console.log("Reversed Array:", reversedArray);
}
