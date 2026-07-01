import { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion"

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
    const modelViewerUrl = "https://esm.sh/@google/model-viewer@4.3.1?external=react,react-dom"
    // @ts-ignore — remote URL import, resolved at runtime by the browser/bundler
    import(/* @vite-ignore */ modelViewerUrl).catch(() => {})
}

interface ServiceNode {
    label: string
    color: string
    url: string
}

interface HomeOrbitHeroProps {
    headline: string
    tagline: string
    modelUrl: string
    accentColor: string
    services: ServiceNode[]
    style?: React.CSSProperties
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 2200
 * @framerDisableUnlink
 */
export default function HomeOrbitHero(props: HomeOrbitHeroProps) {
    const {
        headline = "AI, guided by\nhuman intelligence.",
        tagline = "A modern AI consultancy built around one belief: technology moves fast, but people still need people. Scroll to meet the four ways we help.",
        modelUrl = "https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/home-brain.glb",
        accentColor = "#ff6a3d",
        services = [
            { label: "Foundation", color: "#c22c3e", url: "/foundation" },
            { label: "Aurora", color: "#d6247e", url: "/aurora" },
            { label: "Clarity", color: "#7c3aed", url: "/clarity" },
            { label: "Navigation", color: "#2e62d6", url: "/navigation" },
        ],
        style,
    } = props

    const [isClient, setIsClient] = useState(false)
    const trackRef = useRef<HTMLDivElement>(null)
    const isOnCanvas = RenderTarget.current() === RenderTarget.canvas

    useEffect(() => {
        setIsClient(true)
        loadModelViewer()
    }, [])

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start start", "end end"],
    })

    // circle grows from 18vmin to 62vmin over the first 70% of scroll
    const growProgress = useTransform(scrollYProgress, [0, 0.7], [0, 1])
    const circleSize = useTransform(growProgress, [0, 1], [18, 62])
    const circleSizeVmin = useTransform(circleSize, (v) => `${v}vmin`)

    // tagline fades out over the first 35% of scroll
    const taglineOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
    const taglineBlur = useTransform(scrollYProgress, [0, 0.35], [0, 10])
    const taglineFilter = useMotionTemplate`blur(${taglineBlur}px)`

    const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

    return (
        <div
            ref={trackRef}
            style={{
                position: "relative",
                width: "100%",
                height: isOnCanvas ? "100%" : "220vh",
                background: "#0a0a0a",
                ...style,
            }}
        >
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    width: "100%",
                    height: isOnCanvas ? "100%" : "100vh",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* ambient glow */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: `radial-gradient(55% 55% at 50% 45%, ${accentColor}48, transparent 70%)`,
                    }}
                />

                {/* tagline */}
                <motion.div
                    style={{
                        position: "relative",
                        zIndex: 4,
                        textAlign: "center",
                        padding: "0 24px",
                        opacity: taglineOpacity,
                        filter: taglineFilter,
                        maxWidth: 640,
                    }}
                >
                    <div
                        style={{
                            fontFamily: "Manrope, sans-serif",
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: accentColor,
                            marginBottom: 16,
                        }}
                    >
                        The Human AI Co
                    </div>
                    <h1
                        style={{
                            fontFamily: "Manrope, sans-serif",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "-0.01em",
                            fontSize: "clamp(34px, 6vw, 68px)",
                            lineHeight: 0.98,
                            color: "#f5f5f2",
                            margin: "0 0 14px",
                            whiteSpace: "pre-line",
                        }}
                    >
                        {headline}
                    </h1>
                    <p
                        style={{
                            fontFamily: "Manrope, sans-serif",
                            fontSize: 16,
                            lineHeight: 1.6,
                            color: "rgba(245,245,242,0.75)",
                            margin: "0 auto",
                            maxWidth: 480,
                        }}
                    >
                        {tagline}
                    </p>
                </motion.div>

                {/* circle reveal stage */}
                <motion.div
                    style={{
                        position: "absolute",
                        zIndex: 2,
                        width: circleSizeVmin,
                        height: circleSizeVmin,
                        borderRadius: "50%",
                        overflow: "hidden",
                        background: "#0a0a0a",
                    }}
                >
                    {isClient && modelUrl ? (
                        <model-viewer
                            src={modelUrl}
                            alt="The Human AI Co — glowing brain"
                            auto-rotate=""
                            auto-rotate-delay="0"
                            rotation-per-second="14deg"
                            camera-controls=""
                            disable-zoom=""
                            interaction-prompt="none"
                            shadow-intensity="0.6"
                            exposure="1.05"
                            environment-image="neutral"
                            style={{ width: "100%", height: "100%", display: "block" }}
                        />
                    ) : (
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                background: `radial-gradient(circle at 50% 40%, ${accentColor}44, #0a0a0a 70%)`,
                            }}
                        />
                    )}
                </motion.div>

                {/* orbiting service pills */}
                <style>{`
                    @keyframes hai-orbit-spin {
                        from { transform: rotate(0deg) translateX(26vmin) rotate(0deg); }
                        to { transform: rotate(360deg) translateX(26vmin) rotate(-360deg); }
                    }
                `}</style>
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 1,
                        height: 1,
                        zIndex: 3,
                    }}
                >
                    {services.map((service, i) => {
                        const orbitDelay = -(i * (26 / Math.max(services.length, 1)))
                        return (
                            <a
                                key={service.label + i}
                                href={service.url}
                                style={{
                                    position: "absolute",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    background: "rgba(10,10,10,0.7)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    borderRadius: 999,
                                    padding: "8px 16px 8px 8px",
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    color: "#f5f5f2",
                                    textDecoration: "none",
                                    backdropFilter: "blur(6px)",
                                    margin: "-18px 0 0 -70px",
                                    animation: "hai-orbit-spin 26s linear infinite",
                                    animationDelay: `${orbitDelay}s`,
                                }}
                            >
                                <span
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        background: service.color,
                                        flex: "none",
                                    }}
                                />
                                {service.label}
                            </a>
                        )
                    })}
                </div>

                {/* scroll hint */}
                <motion.div
                    style={{
                        position: "absolute",
                        bottom: 36,
                        left: "50%",
                        translateX: "-50%",
                        zIndex: 4,
                        color: "rgba(245,245,242,0.6)",
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 11,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        opacity: scrollHintOpacity,
                    }}
                >
                    Scroll ↓
                </motion.div>
            </div>
        </div>
    )
}

HomeOrbitHero.displayName = "Home Orbit Hero"

addPropertyControls(HomeOrbitHero, {
    headline: {
        type: ControlType.String,
        title: "Headline",
        defaultValue: "AI, guided by\nhuman intelligence.",
        displayTextArea: true,
    },
    tagline: {
        type: ControlType.String,
        title: "Tagline",
        defaultValue:
            "A modern AI consultancy built around one belief: technology moves fast, but people still need people. Scroll to meet the four ways we help.",
        displayTextArea: true,
    },
    modelUrl: {
        type: ControlType.String,
        title: "Brain model URL",
        defaultValue:
            "https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/home-brain.glb",
        placeholder: "https://.../home-brain.glb",
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent color",
        defaultValue: "#ff6a3d",
    },
    services: {
        type: ControlType.Array,
        title: "Orbit pills",
        control: {
            type: ControlType.Object,
            controls: {
                label: { type: ControlType.String, title: "Label", defaultValue: "Foundation" },
                color: { type: ControlType.Color, title: "Color", defaultValue: "#c22c3e" },
                url: { type: ControlType.Link, title: "Link", defaultValue: "/foundation" },
            },
        },
        defaultValue: [
            { label: "Foundation", color: "#c22c3e", url: "/foundation" },
            { label: "Aurora", color: "#d6247e", url: "/aurora" },
            { label: "Clarity", color: "#7c3aed", url: "/clarity" },
            { label: "Navigation", color: "#2e62d6", url: "/navigation" },
        ],
    },
})
