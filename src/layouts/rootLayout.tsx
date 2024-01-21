import { Footer } from "@/components";
import { Mulish } from "next/font/google";

interface Props {
    children: React.ReactNode;
}

const mainFont = Mulish({ subsets: ["latin"] });

export function RootLayout({ children }: Props) {
    return (
        <>
            <main className={`${mainFont.className}`}>{children}</main>
            <Footer />
        </>
    );
}
