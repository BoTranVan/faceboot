module.exports.getDelay = function getDelay(min, max) {
    var min = min || 100
    var max = max || 480000
    return Math.floor(Math.random() * (max - min + 1)) + min;
}