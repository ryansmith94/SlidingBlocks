#[Sliding Blocks](http://ryansmith94.github.io/SlidingBlocks)
3x3 Sliding Blocks Puzzle. Created for HCI module at [Oxford Brookes University](brookes.ac.uk).

## Solution (Spolier Alert)
Imagine the blocks are numbered 1-9 (from left to right, up and down).

```
1    2    3
4    5    6
7    8    9
```

Once the blocks are shuffled, you want to put block nine (the empty block) in the middle.

Then you want to get the outer blocks (blocks 1-8) in the following clockwise order: 1, 2, 3, 5, 6, 8, 7, 4 (this is not the only order that works). You can achieve this by swapping a block in the wrong place with the middle block (which should be block nine - the empty block), and then moving the empty block around the middle one until you can swap it with the middle block to get the correct order (see example below).

```
2    7    6
4    9    8
1    5    3
```
In this example block 7 should be after the 8 or before the 4. Hence I shall swap the 7 and 9 (empty block) which gives me the state below.

```
2    9    6
4    7    8
1    5    3
```
Now I need to move the empty block (block 9) around the outside until I can move block 7 into the correct position (in this case I'll put it before the 4).

```
9    2    6
4    7    8
1    5    3
```

```
4    2    6
9    7    8
1    5    3
```
Now that block 9 is before the 4 (clockwise), I can swap it with the 7 to get it into the correct position.

```
4    2    6
7    9    8
1    5    3
```
I can now do the same again until all the blocks are in the correct clockwise order (see example below).

```
3    5    6
2    9    8
1    4    7
```
Next I need to swap the empty block (block 9) with the correct middle block (block 5), you can see this below.

```
3    9    6
2    5    8
1    4    7
```
Now I can rotate the outer blocks by moving the empty block around the middle block until they're in the correct order.

```
1    2    3
4    5    6
7    8    9
```
Problem solved.
