import { PocketProvider } from "@/contexts/PocketContext";
import SideBar from "@/components/layout/SideBar";
import "./globals.css"
import { AuthCheck } from "@/components/AuthCheck";
import { MainElement } from "@/components/Main";

export const metadata = {
    title: "Findit",
    description: "Manage your home inventory",
    generator: "Next.js",
    manifest: "/manifest.json",
    keywords: ["findit"],
    themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
    authors: [
      {
        name: "Edward Blewitt",
        url: "https://edward-blewitt.uk",
      },
    ],
    viewport:
      "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
    icons: [
      { rel: "apple-touch-icon", url: "icons/findit.png" },
      { rel: "icon", url: "icons/findit.png" },
    ],
  };

export default function HomeLayout({ children }) {

    return (
        <html>
            <body>
                <PocketProvider>
                        <AuthCheck>

                            <SideBar />

                            <MainElement>
                                {children}
                            </MainElement>

                        </AuthCheck>
                </PocketProvider>
            </body>
        </html>
    )
}