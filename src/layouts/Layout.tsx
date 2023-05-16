import { useAccount } from "wagmi";
import Footer from "../components/footer";
import Header from "../components/header";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full">
      <Header />
      <div className="relative flex place-items-center">
        {isConnected ? children : <ConnectButton showBalance={false} />}
      </div>
      <Footer />
    </main>
  );
}
