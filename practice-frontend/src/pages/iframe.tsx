import { useEffect, useRef } from "react";

function Iframe() {
    const iframeRef = useRef<HTMLIFrameElement>(null); // ✅ Type the ref


    useEffect(() => {
        const user = {
            id: "1",
        };

        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === "READY") {
                // Iframe is ready — send user data
                iframeRef.current?.contentWindow?.postMessage(
                    {
                        type: "USER_INFO",
                        payload: user,
                    },
                    "http://localhost:3000" // Match the iframe origin
                );
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    return (
        <>
            <iframe
                ref={iframeRef}
                src="http://localhost:3000"
                style={{ width: "100%", height:"90vh" }}
                title="Embedded Next.js App"
            />
        </>
    );
}

export default Iframe;
