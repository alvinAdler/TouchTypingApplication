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
        keyClassName: "key size-sm little-finger-key"
    },
    "1": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key"
    },
    "2": {
        text: `${LH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key"
    },
    "3": {
        text: `${LH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key"
    },
    "4": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key"
    },
    "5": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key"
    },
    "6": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key"
    },
    "7": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key"
    },
    "8": {
        text: `${RH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key"
    },
    "9": {
        text: `${RH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key"
    },
    "0": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key"
    },
    "-": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key"
    },
    "=": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key"
    },
    "Backspace": {
        text: `${RH}, ${LF}`,
        keyClassName: "key little-finger-key"
    },
    "Tab": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-md little-finger-key"
    },
    "q": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key"
    },
    "w": {
        text: `${LH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key"
    },
    "e": {
        text: `${LH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key"
    },
    "r": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key"
    },
    "t": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key"
    },
    "y": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key"
    },
    "u": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key"
    },
    "i": {
        text: `${RH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key"
    },
    "o": {
        text: `${RH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key"
    },
    "p": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key"
    },
    "[": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key"
    },
    "]": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key"
    },
    "\\": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key"
    },
    "CAPS": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-lg little-finger-key"
    },
    "a": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key"
    },
    "s": {
        text: `${LH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key"
    },
    "d": {
        text: `${LH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key"
    },
    "f": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key"
    },
    "g": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key"
    },
    "h": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key"
    },
    "j": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key"
    },
    "k": {
        text: `${RH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key"
    },
    "l": {
        text: `${RH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key"
    },
    ";": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key"
    },
    "'": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key"
    },
    "Ent": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-lg little-finger-key"
    },
    "z": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key"
    },
    "x": {
        text: `${LH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key"
    },
    "c": {
        text: `${LH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key"
    },
    "v": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key"
    },
    "b": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key"
    },
    "n": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key"
    },
    "m": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key"
    },
    ",": {
        text: `${RH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key"
    },
    ".": {
        text: `${RH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key"
    },
    "/": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key"
    },
    "Shift": {
        text: `${LH}/${RH}, ${LF}`,
        keyClassName: "key size-exlg little-finger-key"
    },
    " ": {
        text: `${LH}/${RH}, ${TF}`,
        keyClassName: "key space util-key"
    },
    "Ctrl": {
        text: ``,
        keyClassName: "key size-util util-key"
    },
    "Fn": {
        text: ``,
        keyClassName: "key size-util util-key"
    },
    "Win": {
        text: ``,
        keyClassName: "key size-util util-key"
    },
    "Alt": {
        text: ``,
        keyClassName: "key size-util util-key"
    }
}

export default fingersMappingData