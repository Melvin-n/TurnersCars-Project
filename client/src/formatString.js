//remove punctuation function imported to Search component, used before search query is sent
const removePunctuation = (string) => {
    const regex = /\W/gm
    return string.replace(regex, ' ')
}

module.exports = removePunctuation