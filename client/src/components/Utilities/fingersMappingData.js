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
        highlighted: "highlighted-little-finger"
    },
    "1": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "2": {
        text: `${LH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger"
    },
    "3": {
        text: `${LH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger"
    },
    "4": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left"
    },
    "5": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left"
    },
    "6": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right"
    },
    "7": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right"
    },
    "8": {
        text: `${RH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger"
    },
    "9": {
        text: `${RH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger"
    },
    "0": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "-": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "=": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "Backspace": {
        text: `${RH}, ${LF}`,
        keyClassName: "key little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "Tab": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-md little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "q": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "w": {
        text: `${LH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger"
    },
    "e": {
        text: `${LH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger"
    },
    "r": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-inde-left"
    },
    "t": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left"
    },
    "y": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right"
    },
    "u": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right"
    },
    "i": {
        text: `${RH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger"
    },
    "o": {
        text: `${RH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger"
    },
    "p": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "[": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "]": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "\\": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "CAPS": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-lg little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "a": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "s": {
        text: `${LH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger"
    },
    "d": {
        text: `${LH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger"
    },
    "f": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left"
    },
    "g": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left"
    },
    "h": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right"
    },
    "j": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right"
    },
    "k": {
        text: `${RH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger"
    },
    "l": {
        text: `${RH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger"
    },
    ";": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "'": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "Ent": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-lg little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "z": {
        text: `${LH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "x": {
        text: `${LH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger"
    },
    "c": {
        text: `${LH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger"
    },
    "v": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left"
    },
    "b": {
        text: `${LH}, ${IF}`,
        keyClassName: "key size-sm index-left-key",
        highlighted: "highlighted-index-left"
    },
    "n": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right"
    },
    "m": {
        text: `${RH}, ${IF}`,
        keyClassName: "key size-sm index-right-key",
        highlighted: "highlighted-index-right"
    },
    ",": {
        text: `${RH}, ${MF}`,
        keyClassName: "key size-sm middle-finger-key",
        highlighted: "highlighted-middle-finger"
    },
    ".": {
        text: `${RH}, ${RF}`,
        keyClassName: "key size-sm ring-finger-key",
        highlighted: "highlighted-ring-finger"
    },
    "/": {
        text: `${RH}, ${LF}`,
        keyClassName: "key size-sm little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    "Shift": {
        text: `${LH}/${RH}, ${LF}`,
        keyClassName: "key size-exlg little-finger-key",
        highlighted: "highlighted-little-finger"
    },
    " ": {
        text: `${LH}/${RH}, ${TF}`,
        keyClassName: "key space util-key",
        highlighted: "highlighted-util"
    },
    "Ctrl": {
        text: ``,
        keyClassName: "key size-util util-key",
        highlighted: "highlighted-util"
    },
    "Fn": {
        text: ``,
        keyClassName: "key size-util util-key",
        highlighted: "highlighted-util"
    },
    "Win": {
        text: ``,
        keyClassName: "key size-util util-key",
        highlighted: "highlighted-util"
    },
    "Alt": {
        text: ``,
        keyClassName: "key size-util util-key",
        highlighted: "highlighted-util"
    }
}

export default fingersMappingData