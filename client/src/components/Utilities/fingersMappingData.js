const LH = "Left Hand"
const RH = "Right Hand"

const TF = "Thumb Finger"
const IF = "Index Finger"
const MF = "Middle Finger"
const RF = "Ring Finger"
const LF = "Little Finger"

const fingersMappingData = {
    "`": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: true
    },
    "~": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: true
    },
    "1": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    "!": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: true
    },
    "2": {
        text: `${LH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger",
        isRequireShift: false
    },
    "@": {
        text: `${LH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger",
        isRequireShift: true
    },    
    "3": {
        text: `${LH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger",
        isRequireShift: false
    },
    "#": {
        text: `${LH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger",
        isRequireShift: true
    },    
    "4": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left",
        isRequireShift: false
    },
    "$": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left",
        isRequireShift: true
    },
    "5": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left",
        isRequireShift: false
    },
    "%": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left",
        isRequireShift: true
    },
    "6": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right",
        isRequireShift: false
    },
    "^": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right",
        isRequireShift: true
    },
    "7": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right",
        isRequireShift: false
    },
    "&": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right",
        isRequireShift: true
    },
    "8": {
        text: `${RH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger",
        isRequireShift: false
    },
    "*": {
        text: `${RH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger",
        isRequireShift: true
    },
    "9": {
        text: `${RH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger",
        isRequireShift: false
    },
    "(": {
        text: `${RH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger",
        isRequireShift: true
    },
    "0": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    ")": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: true
    },
    "-": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    "_": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: true
    },
    "=": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    "+": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: true
    },
    "Backspace": {
        text: `${RH}, ${LF}`,
        keyClassName: "key little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    "Tab": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-md little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    "q": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    "Q": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: true
    },
    "w": {
        text: `${LH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger",
        isRequireShift: false
    },
    "W": {
        text: `${LH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger",
        isRequireShift: true
    },
    "e": {
        text: `${LH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger",
        isRequireShift: false
    },
    "E": {
        text: `${LH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger",
        isRequireShift: true
    },
    "r": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left",
        isRequireShift: false
    },
    "R": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left",
        isRequireShift: true
    },
    "t": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left",
        isRequireShift: false
    },
    "T": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left",
        isRequireShift: true
    },
    "y": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right",
        isRequireShift: false
    },
    "Y": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right",
        isRequireShift: true
    },
    "u": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right",
        isRequireShift: false
    },
    "U": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right",
        isRequireShift: true
    },
    "i": {
        text: `${RH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger",
        isRequireShift: false
    },
    "I": {
        text: `${RH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger",
        isRequireShift: true
    },
    "o": {
        text: `${RH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger",
        isRequireShift: false
    },
    "O": {
        text: `${RH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger",
        isRequireShift: true
    },
    "p": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    "P": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: true
    },
    "[": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    "{": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: true
    },
    "]": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    "}": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: true
    },
    "\\": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    "|": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: true
    },
    "CAPS": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-lg little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    "a": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    "A": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: true
    },
    "s": {
        text: `${LH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger",
        isRequireShift: false
    },
    "S": {
        text: `${LH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger",
        isRequireShift: true
    },
    "d": {
        text: `${LH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger",
        isRequireShift: false
    },
    "D": {
        text: `${LH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger",
        isRequireShift: true
    },
    "f": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left",
        isRequireShift: false
    },
    "F": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left",
        isRequireShift: true
    },
    "g": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left",
        isRequireShift: false
    },
    "G": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left",
        isRequireShift: true
    },
    "h": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right",
        isRequireShift: false
    },
    "H": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right",
        isRequireShift: true
    },
    "j": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right",
        isRequireShift: false
    },
    "J": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right",
        isRequireShift: true
    },
    "k": {
        text: `${RH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger",
        isRequireShift: false
    },
    "K": {
        text: `${RH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger",
        isRequireShift: true
    },
    "l": {
        text: `${RH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger",
        isRequireShift: false
    },
    "L": {
        text: `${RH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger",
        isRequireShift: true
    },
    ";": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    ":": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: true
    },
    "'": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    "\"": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: true
    },
    "Ent": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-lg little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    "z": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    "Z": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: true
    },
    "x": {
        text: `${LH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger",
        isRequireShift: false
    },
    "X": {
        text: `${LH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger",
        isRequireShift: true
    },
    "c": {
        text: `${LH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger",
        isRequireShift: false
    },
    "C": {
        text: `${LH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger",
        isRequireShift: true
    },
    "v": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left",
        isRequireShift: false
    },
    "V": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left",
        isRequireShift: true
    },
    "b": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left",
        isRequireShift: false
    },
    "B": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left",
        isRequireShift: true
    },
    "n": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right",
        isRequireShift: false
    },
    "N": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right",
        isRequireShift: true
    },
    "m": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right",
        isRequireShift: false
    },
    "M": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right",
        isRequireShift: true
    },
    ",": {
        text: `${RH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger",
        isRequireShift: false
    },
    "<": {
        text: `${RH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger",
        isRequireShift: true
    },
    ".": {
        text: `${RH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger",
        isRequireShift: false
    },
    ">": {
        text: `${RH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger",
        isRequireShift: true
    },
    "/": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    "?": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: true
    },
    "Shift": {
        text: `${LH}/${RH}, ${LF}`,
        keyClassName: "key size-exlg little-finger-key",
        highlighted: "highlighted-little-finger",
        isRequireShift: false
    },
    " ": {
        text: `${LH}/${RH}, ${TF}`,
        keyClassName: "key space util-key",
        highlighted: "highlighted-util",
        isRequireShift: false
    },
    "Ctrl": {
        text: ``,
        keyClassName: "key size-util util-key",
        highlighted: "highlighted-util",
        isRequireShift: false
    },
    "Fn": {
        text: ``,
        keyClassName: "key size-util util-key",
        highlighted: "highlighted-util",
        isRequireShift: false
    },
    "Win": {
        text: ``,
        keyClassName: "key size-util util-key",
        highlighted: "highlighted-util",
        isRequireShift: false
    },
    "Alt": {
        text: ``,
        keyClassName: "key size-util util-key",
        highlighted: "highlighted-util",
        isRequireShift: false
    }
}

export default fingersMappingData