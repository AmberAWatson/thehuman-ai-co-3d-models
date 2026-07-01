import { addPropertyControls, ControlType } from "framer"

type ItemState = "Before" | "After"

interface BeforeAfterItemProps {
    state: ItemState
    text: string
    style?: React.CSSProperties
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 320
 * @framerIntrinsicHeight 56
 * @framerDisableUnlink
 */
export default function BeforeAfterItem(props: BeforeAfterItemProps) {
    const { state = "Before", text = "Description goes here", style } = props

    const isBefore = state === "Before"
    const background = isBefore ? "rgba(255,60,60,0.08)" : "rgba(90,200,140,0.08)"
    const border = isBefore ? "rgba(255,60,60,0.25)" : "rgba(90,200,140,0.25)"

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                borderRadius: 14,
                padding: "16px 18px",
                background,
                border: `1px solid ${border}`,
                fontFamily: "Manrope, sans-serif",
                fontSize: 14,
                lineHeight: 1.5,
                color: "#f5f5f2",
                ...style,
            }}
        >
            {text}
        </div>
    )
}

BeforeAfterItem.displayName = "Before / After Item"

addPropertyControls(BeforeAfterItem, {
    state: {
        type: ControlType.Enum,
        title: "State",
        options: ["Before", "After"],
        optionTitles: ["Before", "After"],
        defaultValue: "Before",
    },
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue: "Description goes here",
        displayTextArea: true,
    },
})
