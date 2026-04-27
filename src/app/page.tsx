"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";

const ABILITIES = [
  { id: "marketing", name: "Jenius Pemasaran", description: "Mendapatkan bonus penjualan di awal perilisan." },
  { id: "engineering", name: "Ahli Teknik", description: "Biaya riset dan produksi lebih murah 15%." },
  { id: "capital", name: "Modal Besar", description: "Memulai permainan dengan dana tambahan $25,000." },
];

export default function Home() {
  const router = useRouter();
  const { gameState, startGame } = useGame();

  const [playerName, setPlayerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [ability, setAbility] = useState(ABILITIES[0].id);
  const [error, setError] = useState("");

  // Redirect to dashboard if game has already started
  useEffect(() => {
    if (gameState.hasStarted) {
      router.push("/dashboard");
    }
  }, [gameState.hasStarted, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || !companyName.trim()) {
      setError("Nama Pemain dan Nama Perusahaan harus diisi!");
      return;
    }

    startGame(playerName, companyName, ability);
    router.push("/dashboard");
  };

  if (gameState.hasStarted) {
    return null; // Don't render start page if they already have a game
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Console Tycoon</h1>
          <p className="text-gray-500 text-sm">Mulai perjalananmu di tahun 1972</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Pemain
            </label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Masukkan nama Anda"
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Perusahaan
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Contoh: Nintendo, Sega..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ability Unik (Keahlian)
            </label>
            <div className="space-y-3">
              {ABILITIES.map((ab) => (
                <label
                  key={ab.id}
                  className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${
                    ability === ab.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="ability"
                    value={ab.id}
                    checked={ability === ab.id}
                    onChange={() => setAbility(ab.id)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-900">{ab.name}</span>
                    <span className="block text-xs text-gray-500 mt-0.5">{ab.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Mulai Perjalanan
          </button>
        </form>
      </div>
    </main>
  );
}
