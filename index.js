// Q1 - Leetcode 419 - Battleships in a Board
var countBattleships = function (board) {
  let count = 0;
  let isDuplicate; // initiating boolean
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "X") {
        isDuplicate = false; // we start by setting isDuplicate to false
        if (i !== 0) {
          isDuplicate = board[i - 1][j] === "X"; // checking above current cell
        }

        if (!isDuplicate && j !== 0) {
          isDuplicate = board[i][j - 1] === "X"; // checking left of current cell
        }

        if (!isDuplicate) {
          // if no match until now, update counter
          count++;
        }
      }
    }
  }

  return count;
};
board1 = [
  ["X", ".", ".", "X"],
  [".", ".", ".", "X"],
  [".", ".", ".", "X"],
];
board2 = [["."]];
board3 = [
  [".", "."],
  ["X", "X"],
];
console.log(countBattleships(board3));

// Q2 - Leetcode 451 - Sort Characters By Frequency (Daily LeetCoding Challenge December, Day 3)
var frequencySort = function (s) {
  // We create the array to store frequency of letters/digits with their ascii code...
  // ...being the index.
  // Lowest ascii code for this problem is 48 (number 0) and highest is 122 (letter "z")
  // This means we only need array of 75 length, with 0 index actually meaning 48, and 74 => 122
  let freq = [];
  freq.length = 75;
  freq.fill(0);

  // Fill the frequency array with number of occurences
  for (let i = 0; i < s.length; i++) {
    freq[s.charCodeAt(i) - 48]++;
  }

  // Find which one is repeated most, and start constructing our "ans" with it.
  x = Math.max(...freq);
  let ans = "";
  while (x > 0) {
    ans += String.fromCharCode(freq.indexOf(x) + 48).repeat(x); // we need to repeat it x times

    // this character is used now, we set it to 0 and look for the next most used character.
    freq[freq.indexOf(x)] = 0;
    x = Math.max(...freq);
  }

  return ans;
};

const string1 = "tree";
const string2 = "aaabbcdkleee";
const string3 = "AAbaa";
const string4 = "2a554442f544asfasssffffasss";
console.log(frequencySort(string4));

// Q3 - Leetcode 215 - Kth Largest Element in an Array
var findKthLargest = function (nums, k) {
  nums.sort((a, b) => b - a); // We sort array from largest to smallest
  return nums[k - 1]; // since k=1 means the largest (k<=1 is given in restrictions) we deduct 1
};

nums1 = [3, 2, 1, 5, 6, 4];
k1 = 2;

nums2 = [3, 2, 3, 1, 2, 4, 5, 5, 6];
k2 = 4;
console.log(findKthLargest(nums2, k2));

// Q4 - Leetcode 2 - Add Two Numbers
var addTwoNumbers = function (l1, l2) {
  // Convert a ListNode to an array of its digits in reverse order
  function ConvertReverseListNodeToArray(listNode) {
    // Initialise an array to return
    let returnedArray = [];

    // Check if there is another level to the ListNode
    if (listNode.next != null) {
      // Merge the current array with the result of calling the function again on the next level
      returnedArray = returnedArray.concat(
        ConvertReverseListNodeToArray(listNode.next)
      );
    }

    // Add the current node's value to the returned array
    returnedArray.push(listNode.val);

    // Return the constructed array
    return returnedArray;
  }

  // Convert the ListNodes to Arrays
  const l1Array = ConvertReverseListNodeToArray(l1);
  const l2Array = ConvertReverseListNodeToArray(l2);

  // Add the numbers (after merging them), using BigInt due to LeetCode's edge cases
  let newTotal = BigInt(l1Array.join("")) + BigInt(l2Array.join(""));

  // Split the total back into an array
  splitNewTotal = newTotal.toString().split("");

  // Initialise an empty ListNode
  let returnedListNode = null;

  // Loop through the total value's array
  for (let i = 0; i < splitNewTotal.length; i++) {
    // Add this digit to the ListNode
    returnedListNode = {
      val: splitNewTotal[i],
      next: returnedListNode,
    };
  }

  // Return the constructed ListNode
  return returnedListNode;
};
console.log(addTwoNumbers([1, 2, 3], [4, 6, 5]));

// Q5 - Leetcode 29 - Divide Two Integers
var divide = function (dividend, divisor) {
  if (divisor === 0) {
    return Infinity;
  }
  if (dividend === 0) {
    return 0;
  }

  //working only with positives and restore the negatives later
  var answerIsNegative =
    (dividend < 0 && divisor > 0) || (dividend > 0 && divisor < 0);
  positiveDividend = Math.abs(dividend);
  positiveDivisor = Math.abs(divisor);

  // storing output
  var answer = 0;

  if (positiveDivisor === 1) {
    answer = positiveDividend;
  } else {
    //  keep adding divisors together to see how many fit in dividend
    // sum will track how close we've gotten to dividend
    var sum = 0;
    // progressing, we'll need to count how many multiples of the divisor we've used
    var multiples = 0;
    // if condition is true, add at least one more divisor
    while (sum + positiveDivisor <= positiveDividend) {
      // maybe we can add more than one divisor so let's find the largest multiple of the divisor we can add
      // we'll start with the divisor itself, then try multiples via while loop
      var maxMultiple = positiveDivisor;
      // while at it, we can track the number of multiples of the divisor we added
      var numOfMultiplesused = 1;
      // keep doubling maxMultiple(to get the multiples of the divisor) while it fits between sum and dividend
      while (sum + maxMultiple + maxMultiple < positiveDividend) {
        maxMultiple += maxMultiple;
        // when we double maxMultiple, we double the number of multiples
        numOfMultiplesused += numOfMultiplesused;
      }
      // update our sum with the max multiple of divisor we could use
      sum += maxMultiple;
      // update our count of how many multiples of divisor fit in dividend
      multiples += numOfMultiplesused;
      // we might still be able to add some multiples - start loop over!
    }
    // our output will be the resulting count
    answer = multiples;
  }

  return answerIsNegative
    ? // -2147483648 is the smallest allowed integer
      Math.max(0 - answer, -2147483648)
    : // 2147483647 is the largest allowed integer
      // the pos/neg difference is feature of 32-bit representation
      Math.min(answer, 2147483647);
};

// Q6 - Leetcode 19 - Remove Nth Node From End of List
// To solve this efficiently, we use concept of two pointers. The idea is really simple and intuitive.
// Algorithm :
var removeNthFromEnd = function (head, n) {
  // Step 1> Create two pointers slow and fast,
  let fast = head;
  let slow = head;
  let len = 0;
  while (n-- > 0) {
    // Step 2> first move the fast pointer to the nth node.
    fast = fast.next;
  }
  let prev = null;
  while (fast != null) {
    // Step 3> now move the fast (at nth) and slow (at head) pointers one node at a time.
    fast = fast.next;
    prev = slow;
    slow = slow.next;
  }
  if (prev == null) {
    return head.next; // slow node
  }
  // Step 4> when the fast pointer reaches the end, slow pointer is at the nth node.
  prev.next = slow.next;
  slow.next = null;
  return head;
};

// Q7 - Leetcode 17 - Letter Combinations of a Phone Number
// Here I try to break down and simplify an algorithm that can be solved iteratively with a queue (BFS) or recursively (DFS).
// The quick overview of the algorithm is to consider every number in the digits array
//  e.g. '23' and for each number combine the corresponding letters each keypad (abc and def) in this case would result in:
// ad, ae, af, bd, be, bf, cd, ce, cf.
//     The most challenging part of this algorithm is that it has three nested loops,
//      but the first one
//      the second one makes sure that all pending combinations in the queue are made,
//      and the third one
const letterCombinations = (digits) => {
  // iteration  over the digits,
  if (digits.length == 0) return [];
  let queue = [];
  queue.push("");
  // A mapping of digit to letters (just like on the telephone buttons) is given below.
  // Note that 1 does not map to any letters
  let mapping = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  // iterates over the letters of each number in the phone keypads.
  for (let i = 0; i < digits.length; i++) {
    // digits 23
    let currQL = queue.length;
    while (currQL > 0) {
      // consider all elements in the queue
      console.log(currQL);
      //stay in the while loop until all pending items in the queue have been processed
      console.log(i, queue[0]);
      let next = queue.shift();
      console.log("next:", next);
      for (let char of mapping[digits[i]]) {
        // specific letter on phone  keypad
        console.log("char:", char);
        queue.push(next + char);
        // concatenate strings
      }
      currQL--;
    }
  }
  return queue;
};
