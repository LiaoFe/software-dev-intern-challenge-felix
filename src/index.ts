/***************************************************************************************
                   !!  DO NOT EDIT THIS TEMPLATE   !!
          !!  CLICK THE FORK OPTION ON THE TOP RIGHT TO CONTINUE !!
/***************************************************************************/

/*************  Frames provided to test out your algorithm   ***************/

import frames1 from "./frames/frames1.json";
import frames2 from "./frames/frames2.json";
import frames3 from "./frames/frames3.json";
import frames4 from "./frames/frames4.json";
import frames5 from "./frames/frames5.json";
import frames6 from "./frames/frames6.json";
import frames7 from "./frames/frames7.json";

/***************************************************************************/

interface Frame {
  // center
  x1: number;
  y1: number;
  // top
  x2: number;
  y2: number;
  // bottom
  x3: number;
  y3: number;
}

const THRESHOLD_CLOSED = Math.PI / 36; // 5 degrees
const THRESHOLD_OPEN = Math.PI / 4; // 45 degrees

// Helper function: to determine the distance of 2 points
// params:
// x1, y1, x2, y2: number inputs where (x1, y1) is a coordinates of 1 point and (x2, y2) is the coordinate
//                  of a second point
// return: non-negative integer distance of point (x1, y1) and (x2, y2)
const dist = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};

// Helper function: given triangle with side A, B, C, return the angle of ABC
//                  (returns the angle between side A, and B, with C as the side opposite to the interested angle)
// params:
// lenA, lenB, lenC: number inputs where lenA, lenB, lenC are the side lengths of the traingle
//                    of a second point
// return: non-negative integer representing the angle of ABC in **RADIANS**, the angle between side A and B,
//         with C as the opposite side length of the interested angle
const cosineLaw = (lenA: number, lenB: number, lenC: number): number => {
  return Math.acos((lenA ** 2 + lenB ** 2 - lenC ** 2) / (2 * lenA * lenB));
};

const calculateOpenings = (frames: Frame[]): number => {
  var openings = 0;
  var closings = 0;

  // Write your algorithm

  // determine start position (open or closed)?
  var isOpen: boolean = false;
  var firstIt: boolean = true;

  // iterate through frames array
  frames.forEach((frame) => {
    // initalize lengths, A side from center to top point, B wil be from center to bottom, C will be from top to bottom
    var lenA = dist(frame.x1, frame.y1, frame.x2, frame.y2);
    var lenB = dist(frame.x1, frame.y1, frame.x3, frame.y3);
    var lenC = dist(frame.x2, frame.y2, frame.x3, frame.y3);

    // determine angle in radians
    var angle = cosineLaw(lenA, lenB, lenC);

    if (firstIt) {
      if (angle <= THRESHOLD_CLOSED) isOpen = false;
      if (angle >= THRESHOLD_OPEN) isOpen = true;
      firstIt = false;
    } else if (isOpen && angle <= THRESHOLD_CLOSED) {
      isOpen = false;
      closings++;
    } else if (!isOpen && angle >= THRESHOLD_OPEN) {
      isOpen = true;
      openings++;
    }
  });

  console.log(`**** Openings: ${openings} ****`);
  return openings;
};

// Run the following with different frame JSON files
calculateOpenings(frames1);
calculateOpenings(frames2);
calculateOpenings(frames3);
calculateOpenings(frames4);
calculateOpenings(frames5);
calculateOpenings(frames6);
calculateOpenings(frames7);
