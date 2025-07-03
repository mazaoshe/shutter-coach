import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ShutterCoach – Weather-Based Camera Settings for Photographers",
    description: "Get AI-powered camera settings recommendations based on current weather, scene type, and light conditions. Perfect for beginner photographers. Monetized with Google AdSense.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <title>ShutterCoach – Weather-Based Camera Settings for Photographers</title>
                <meta name="keywords" content="camera settings, weather photography, aperture priority, ISO calculator, shutter speed tips, photography tools, beginner photography, sunlight portrait setup, SEO for photographers" />
                <meta name="description" content="Get AI-powered camera settings recommendations based on current weather, scene type, and light conditions. Perfect for beginner photographers." />
                <meta name="author" content="ShutterCoach Team" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="ShutterCoach – Weather-Based Camera Settings for Photographers" />
                <meta property="og:description" content="Get AI-powered camera setting suggestions based on current weather, time, and scene. Perfect for beginners and hobbyists." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://shuttercoach.example.com/" />
                <meta property="og:image" content="https://shuttercoach.example.com/og-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="ShutterCoach – Weather-Based Camera Settings" />
                <meta name="twitter:description" content="Instant camera settings based on weather, time, and scene. Shoot smarter with ShutterCoach." />
                <meta name="twitter:image" content="https://shuttercoach.example.com/og-image.jpg" />
                <link rel="icon" href="/favicon.ico" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?2cc9db8f3dd6dd2d1f31cdbbfd4cb45c";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        `,
                    }}
                />

            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>

            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5480343618506855"
                crossOrigin="anonymous"></script>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-KQGXMC724B"></script>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-KQGXMC724B');
                    `,
                }}
            />
        </html>
    );
}
