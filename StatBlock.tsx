import { addPropertyControls, ControlType } from "framer"

interface StatBlockProps {
    number: string
    label: string
    accentColor: string
    style?: React.CSSProperties
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 220
 * @framerIntrinsicHeight 90
 * @framerDisableUnlink
 */
export default function StatBlock(props: StatBlockProps) {
    const { number = "40%", label = "Stat description goes here.", accentColor = "#ff6a3d", style } = props

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                fontFamily: "Manrope, sans-serif",
                ...style,
            }}
        >
            <div
                style={{
                    fontWeight: 800,
                    fontSize: "clamp(28px, 3vw, 40px)",
                    color: accentColor,
                    lineHeight: 1,
                    marginBottom: 6,
                }}
            >
                {number}
            </div>
            <div
                style={{
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: "rgba(245,245,242,0.72)",
                    maxWidth: 220,
                }}
            >
                {label}
            </div>
        </div>
    )
}

StatBlock.displayName = "Stat Block"

addPropertyControls(StatBlock, {
    number: {
        type: ControlType.String,
        title: "Number",
        defaultValue: "40%",
    },
    label: {
        type: ControlType.String,
        title: "Label",
        defaultValue: "Stat description goes here.",
        displayTextArea: true,
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent color",
        defaultValue: "#ff6a3d",
    },
})
