import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import { ThemeProvider } from "@/components/the-provider";
import Footer from "@/components/common/Footer";
import { Toaster } from "@/components/ui/toaster";
import { AuthContextProvider } from "@/context/AuthContext";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "DATA",
	description: "Detection and Treatment for Acne",
};

const RootLayout = ({ children }) => {
	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<AuthContextProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange>
						<Header />
						<main>{children}</main>
						<Toaster />
						<Footer />
					</ThemeProvider>
				</AuthContextProvider>
			</body>
		</html>
	);
};

export default RootLayout;
