import { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType } from "framer"

// model-viewer registers itself as a custom element; declare it for TS/JSX.
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": any
        }
    }
}

let modelViewerLoadAttempted = false
function loadModelViewer() {
    if (modelViewerLoadAttempted) return
    modelViewerLoadAttempted = true
    // Dynamic import, client-only — keeps this component SSR-safe.
    const modelViewerUrl = "https://esm.sh/@google/model-viewer@4.3.1?external=react,react-dom"
    // @ts-ignore — remote URL import, resolved at runtime by the browser/bundler
    import(/* @vite-ignore */ modelViewerUrl).catch(() => {
        // silently fail — the poster/fallback background still renders
    })
}

interface Hero3DProps {
    modelUrl: string
    altText: string
    accentColor: string
    autoRotateSpeed: number
    exposure: number
    showGlow: boolean
    style?: React.CSSProperties
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 400
 * @framerIntrinsicHeight 400
 * @framerDisableUnlink
 */
export default function Hero3D(props: Hero3DProps) {
    const {
        modelUrl = "https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/home-brain.glb",
        altText = "The Human AI Co — interactive 3D object",
        accentColor = "#ff6a3d",
        autoRotateSpeed = 12,
        exposure = 1.05,
        showGlow = true,
        style,
    } = props

    const isPlaceholderUrl = !modelUrl || modelUrl.includes("YOUR-USERNAME")

    const [isClient, setIsClient] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setIsClient(true)
        loadModelViewer()
    }, [])

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "visible",
                ...style,
            }}
        >
            {showGlow && (
                <div
                    style={{
                        position: "absolute",
                        inset: "-12%",
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${accentColor}55, transparent 70%)`,
                        filter: "blur(30px)",
                        zIndex: 0,
                    }}
                />
            )}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "#0a0a0a",
                }}
            >
                {isClient && !isPlaceholderUrl ? (
                    <model-viewer
                        src={modelUrl}
                        alt={altText}
                        auto-rotate=""
                        auto-rotate-delay="0"
                        rotation-per-second={`${autoRotateSpeed}deg`}
                        camera-controls=""
                        disable-zoom=""
                        interaction-prompt="none"
                        shadow-intensity="0.6"
                        exposure={String(exposure)}
                        environment-image="neutral"
                        style={{
                            width: "100%",
                            height: "100%",
                            background: "transparent",
                            display: "block",
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: 16,
                            boxSizing: "border-box",
                            background: `radial-gradient(circle at 50% 40%, ${accentColor}33, #0a0a0a 70%)`,
                            color: "rgba(245,245,242,0.65)",
                            fontFamily: "Manrope, sans-serif",
                            fontSize: 12,
                            lineHeight: 1.5,
                        }}
                    >
                        {isPlaceholderUrl
                            ? "Add a hosted .glb URL in the Model URL property →"
                            : "Loading 3D model…"}
                    </div>
                )}
            </div>
        </div>
    )
}

Hero3D.displayName = "Hero3D"

addPropertyControls(Hero3D, {
    modelUrl: {
        type: ControlType.String,
        title: "Model URL",
        defaultValue:
            "https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/home-brain.glb",
        placeholder: "https://.../model.glb",
    },
    altText: {
        type: ControlType.String,
        title: "Alt text",
        defaultValue: "The Human AI Co — interactive 3D object",
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent color",
        defaultValue: "#ff6a3d",
    },
    autoRotateSpeed: {
        type: ControlType.Number,
        title: "Rotate speed (deg/s)",
        defaultValue: 12,
        min: 0,
        max: 60,
        step: 1,
    },
    exposure: {
        type: ControlType.Number,
        title: "Exposure",
        defaultValue: 1.05,
        min: 0.2,
        max: 2,
        step: 0.05,
    },
    showGlow: {
        type: ControlType.Boolean,
        title: "Show glow",
        defaultValue: true,
    },
})
