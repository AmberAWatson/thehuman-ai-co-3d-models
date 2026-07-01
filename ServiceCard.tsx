import { addPropertyControls, ControlType } from "framer"

interface ServiceCardProps {
    eyebrow: string
    heading: string
    body: string
    accentColor: string
    url: string
    showAccentBorder: boolean
    style?: React.CSSProperties
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 340
 * @framerIntrinsicHeight 220
 * @framerDisableUnlink
 */
export default function ServiceCard(props: ServiceCardProps) {
    const {
        eyebrow = "",
        heading = "Card heading",
        body = "Card body copy goes here.",
        accentColor = "#ff6a3d",
        url = "",
        showAccentBorder = true,
        style,
    } = props

    const Wrapper = url ? "a" : "div"

    return (
        <Wrapper
            href={url || undefined}
            style={{
                position: "relative",
                display: "block",
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
                background: "#141417",
                border: "1px solid rgba(255,255,255,0.08)",
                borderLeft: showAccentBorder
                    ? `3px solid ${accentColor}`
                    : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 18,
                padding: 28,
                textDecoration: "none",
                color: "#f5f5f2",
                fontFamily: "Manrope, sans-serif",
                ...style,
            }}
        >
            {eyebrow && (
                <div
                    style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: accentColor,
                        marginBottom: 12,
                    }}
                >
                    {eyebrow}
                </div>
            )}
            <div
                style={{
                    fontSize: 19,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    marginBottom: 10,
                }}
            >
                {heading}
            </div>
            <div
                style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "rgba(245,245,242,0.72)",
                }}
            >
                {body}
            </div>
        </Wrapper>
    )
}

ServiceCard.displayName = "Service Card"

addPropertyControls(ServiceCard, {
    eyebrow: {
        type: ControlType.String,
        title: "Eyebrow",
        defaultValue: "",
    },
    heading: {
        type: ControlType.String,
        title: "Heading",
        defaultValue: "Card heading",
        displayTextArea: true,
    },
    body: {
        type: ControlType.String,
        title: "Body",
        defaultValue: "Card body copy goes here.",
        displayTextArea: true,
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent color",
        defaultValue: "#ff6a3d",
    },
    url: {
        type: ControlType.Link,
        title: "Link",
        defaultValue: "",
    },
    showAccentBorder: {
        type: ControlType.Boolean,
        title: "Accent border",
        defaultValue: true,
    },
})
