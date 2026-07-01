import { addPropertyControls, ControlType } from "framer"

interface ProcessStepProps {
    stepLabel: string
    heading: string
    body: string
    accentColor: string
    showDivider: boolean
    style?: React.CSSProperties
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 640
 * @framerIntrinsicHeight 110
 * @framerDisableUnlink
 */
export default function ProcessStep(props: ProcessStepProps) {
    const {
        stepLabel = "Step 1",
        heading = "Step heading",
        body = "Step description goes here.",
        accentColor = "#ff6a3d",
        showDivider = true,
        style,
    } = props

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "110px 1fr",
                gap: 20,
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
                padding: "22px 0",
                borderTop: showDivider ? "1px solid rgba(255,255,255,0.08)" : "none",
                fontFamily: "Manrope, sans-serif",
                color: "#f5f5f2",
                ...style,
            }}
        >
            <div
                style={{
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: accentColor,
                    paddingTop: 4,
                }}
            >
                {stepLabel}
            </div>
            <div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>
                    {heading}
                </div>
                <div
                    style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "rgba(245,245,242,0.72)",
                        whiteSpace: "pre-line",
                    }}
                >
                    {body}
                </div>
            </div>
        </div>
    )
}

ProcessStep.displayName = "Process Step"

addPropertyControls(ProcessStep, {
    stepLabel: {
        type: ControlType.String,
        title: "Step label",
        defaultValue: "Step 1",
    },
    heading: {
        type: ControlType.String,
        title: "Heading",
        defaultValue: "Step heading",
    },
    body: {
        type: ControlType.String,
        title: "Body",
        defaultValue: "Step description goes here.",
        displayTextArea: true,
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent color",
        defaultValue: "#ff6a3d",
    },
    showDivider: {
        type: ControlType.Boolean,
        title: "Top divider",
        defaultValue: true,
    },
})
