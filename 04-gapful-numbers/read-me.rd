Description
In this stage, we are going to add one more property — Gapful numbers. It is a number that contains at least 3 digits and is divisible by the concatenation of its first and last digit without a remainder. 12 is not a Gapful number, as it has only two digits. 132 is a Gapful number, as 132 % 12 == 0. Another good example of a Gapful number is 7881, as 7881 % 71 == 0.

Until this stage, the program could process only one number at a time. Now, a user should be able to enter two numbers to obtain the properties of a list of numbers. Separate the numbers with one space. Space separates the first number in the list and the length of the list. For, example. 100 2 tells the program to process two numbers: 100 and 101. 1 100 means that the program is about to process 100 numbers, starting from 1. If a user enters one number, the program should work the same as in the previous stages. The program should analyze a number and print its properties. As before, if a user enters a single 0 (zero), terminate the program. Information about each number should be printed in one line in the following format:

             140 is even, buzz, duck, gapful
             141 is odd, palindromic

So, the format is {number} is {property}, {property}, ... {property}

Objectives
Your program should process various user requests. In this stage, your program should:

Welcome users;
Display the instructions;
Ask for a request;
If a user enters zero, terminate the program;
If a user enters an empty request, print the instructions;
If numbers are not natural, print an error message;
If one number is entered, calculate and print the properties of this number;
For two numbers, print the list of numbers with properties;
Once the request is processed, continue execution from step 3.
In the current stage, the property names include even, odd, buzz , duck, palindromic and gapful. The test won't check the order of properties, their indentation, and spaces. You may format numbers as you like. Please, add the information below:

Instructions

Supported requests:
- enter a natural number to know its properties;
- enter two natural numbers to obtain the properties of the list:
  * the first parameter represents a starting number;
  * the second parameter shows how many consecutive numbers are to be printed;
- separate the parameters with one space;
- enter 0 to exit.

Error messages

The first parameter should be a natural number or zero.

The second parameter should be a natural number.

Examples
The greater-than symbol followed by a space (> ) represents the user input. Note that it's not part of the input.

Example 1:

Welcome to Amazing Numbers!

Supported requests:
- enter a natural number to know its properties;
- enter two natural numbers to obtain the properties of the list:
  * the first parameter represents a starting number;
  * the second parameter shows how many consecutive numbers are to be processed;
- separate the parameters with one space;
- enter 0 to exit.

Enter a request: > 7881

Properties of 7,881
        buzz: false
        duck: false
 palindromic: false
      gapful: true
        even: false
         odd: true

Enter a request: > 7880

Properties of 7,880
        buzz: false
        duck: true
 palindromic: false
      gapful: false
        even: true
         odd: false

Enter a request: > 105 5

             105 is buzz, duck, gapful, odd
             106 is duck, even
             107 is buzz, duck, odd
             108 is duck, gapful, even
             109 is duck, odd

Enter a request: > exit

The first parameter should be a natural number or zero.

Enter a request: >

Supported requests:
- enter a natural number to know its properties;
- enter two natural numbers to obtain the properties of the list:
  * the first parameter represents a starting number;
  * the second parameter shows how many consecutive numbers are to be processed;
- separate the parameters with one space;
- enter 0 to exit.

Enter a request: > 0

Goodbye!