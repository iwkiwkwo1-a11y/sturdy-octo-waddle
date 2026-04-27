"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";

export default function Dashboard() {
  const router = useRouter();
  const { gameState, resetGame } = useGame();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If user somehow gets here without starting a game, redirect back
    if (mounted && !gameState.hasStarted) {
      router.push("/");
    }
  }, [gameState.hasStarted, router, mounted]);

  // Don't render until client-side hydration is complete
  if (!mounted || !gameState.hasStarted) return null;

  // Format date helper
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Format currency helper
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Handle exiting the game (for testing / reset purposes)
  const handleExit = () => {
    if (confirm("Anda yakin ingin keluar dan menghapus save data ini?")) {
      resetGame();
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="font-bold text-lg text-blue-600 truncate max-w-[150px] sm:max-w-none">
              {gameState.companyName}
            </h1>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
              CEO: {gameState.playerName}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="font-mono font-semibold text-gray-900">
                {formatDate(gameState.gameDate)}
              </div>
              <div className="text-sm font-bold text-green-600">
                {formatMoney(gameState.money)}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-6">

        {/* Left Sidebar - Stats & Info */}
        <aside className="w-full md:w-1/3 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-800 border-b pb-2 mb-3">Profil Perusahaan</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Nama Perusahaan</span>
                <span className="font-medium text-gray-900">{gameState.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pendiri</span>
                <span className="font-medium text-gray-900">{gameState.playerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Kemampuan Khusus</span>
                <span className="font-medium text-blue-600">
                  {gameState.ability === 'marketing' ? 'Jenius Pemasaran' :
                   gameState.ability === 'engineering' ? 'Ahli Teknik' :
                   'Modal Besar'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-800 border-b pb-2 mb-3">Statistik (Segera)</h2>
            <div className="text-center py-4 text-gray-400 text-sm">
              Belum ada konsol yang dirilis.
            </div>
          </div>

          <button
            onClick={handleExit}
            className="w-full py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            Reset Game
          </button>
        </aside>

        {/* Right Content Area - Game Actions */}
        <div className="w-full md:w-2/3 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Card 1: Meja Rakit (Placeholder) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-blue-300 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Riset & Pengembangan</h3>
              <p className="text-sm text-gray-500">Buat komponen dan rancang arsitektur konsol barumu.</p>
            </div>

            {/* Card 2: Gudang (Placeholder) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-blue-300 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Gudang & Produksi</h3>
              <p className="text-sm text-gray-500">Kelola stok komponen dan hasilkan unit konsol masal.</p>
            </div>

            {/* Card 3: Pemasaran (Placeholder) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-blue-300 transition-colors cursor-pointer group sm:col-span-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Pemasaran & Penjualan</h3>
              <p className="text-sm text-gray-500">Pantau performa penjualan konsol di pasar dan atur strategi iklan.</p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
