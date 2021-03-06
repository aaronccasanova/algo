function MeanMedianMode({ inputArray, children }) {
  return children({
    mean: getMean(inputArray),
    median: getMedian(inputArray),
    mode: getMode(inputArray)
  });
}

function getMean(array) {
  let sum = array.reduce((acc, val) => {
    acc += val;
    return acc;
  }, 0);
  let mean = sum / array.length;
  return mean;
}

function getMedian(array) {
  let median;

  array.sort((a, b) => a - b);
  if (array.length % 2 !== 0) {
    // Math.floor to round down
    median = array[Math.floor(array.length / 2)];
  } else {
    let mid1 = array[array.length / 2 - 1];
    let mid2 = array[array.length / 2];
    median = (mid1 + mid2) / 2;
  }

  return median;
}

function getMode(array) {
  let modeObj = array.reduce((tally, val) => {
    tally[val] = (tally[val] || 0) + 1;
    return tally;
  }, {});

  let maxFrequency = 0;
  let modes = [];
  for (let num in modeObj) {
    if (modeObj[num] > maxFrequency) {
      modes = [num];
      maxFrequency = modeObj[num];
    } else if (modeObj[num] === maxFrequency) {
      modes.push(num);
    }
    if (modes.length === Object.keys(modeObj).length) {
      modes = [];
    }
  }

  return modes;
}

export default MeanMedianMode;

//* ------ Usage ------ *//
/*
<MeanMedianMode inputArray={[1, 2, 3, 4, 5, 4, 6, 1]}>
  {({ mean, median, mode }) => (
    <div>
      <p>
        <strong>Mean</strong>: {mean}
      </p>
      <p>
        <strong>Median</strong>: {median}
      </p>
      <p>
        <strong>Mode</strong>: \
        {mode.map((el, i) => (
          <span key={i}>\ {el} \</span>
        ))}
        \
      </p>
    </div>
  )}
</MeanMedianMode>
*/

// Stephen Grider
