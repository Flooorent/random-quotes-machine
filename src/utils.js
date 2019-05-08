/**
 * Pick an element from an array at random.
 * 
 * @param {Array} arr array from which to pick
 * @returns an element at random
 */
function pickElemAtRandom(arr) {
    if (arr && arr.length > 0) {
        return arr[Math.floor(Math.random() * arr.length)]
    }
}

export default pickElemAtRandom;
