"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGame, ConsoleBlueprint } from "@/context/GameContext";

const CPU_OPTIONS = [
  { id: "cpu_basic_8bit", name: "CPU 8-Bit Dasar", cost: 5000, time: 30, description: "Teknologi dasar, lambat tapi murah." },
  { id: "cpu_adv_8bit", name: "CPU 8-Bit Lanjutan", cost: 12000, time: 45, description: "Performa sedikit lebih baik untuk game sederhana." },
];

const GRAPHICS_OPTIONS = [
  { id: "gfx_bw", name: "Grafis Hitam Putih", cost: 3000, time: 20, description: "Hanya menampilkan warna hitam dan putih (Pong style)." },
  { id: "gfx_basic_color", name: "Grafis 4 Warna", cost: 15000, time: 40, description: "Menampilkan maksimal 4 warna sederhana di layar." },
];

const AUDIO_OPTIONS = [
  { id: "snd_none", name: "Tanpa Suara", cost: 0, time: 0, description: "Konsol bisu, menghemat biaya." },
  { id: "snd_beeps", name: "Speaker Bip", cost: 4000, time: 15, description: "Hanya bisa mengeluarkan bunyi 'bip' sederhana." },
];

export default function ResearchPage() {
  const router = useRouter();
  const { gameState, startResearch } = useGame();

  const [consoleName, setConsoleName] = useState("");
  const [cpu, setCpu] = useState(CPU_OPTIONS[0]);
  const [graphics, setGraphics] = useState(GRAPHICS_OPTIONS[0]);
  const [audio, setAudio] = useState(AUDIO_OPTIONS[0]);
  const [error, setError] = useState("");

  const isEngineering = gameState.ability === "engineering";
  const costMultiplier = isEngineering ? 0.85 : 1; // 15% discount for Engineering ability

  const baseCost = cpu.cost + graphics.cost + audio.cost;
  const totalCost = Math.floor(baseCost * costMultiplier);
  const totalTime = cpu.time + graphics.time + audio.time;

  const handleStartResearch = () => {
    if (!consoleName.trim()) {
      setError("Nama konsol harus diisi!");
      return;
    }

    if (gameState.activeResearch) {
      setError("Perusahaan Anda sedang meriset sesuatu. Tunggu sampai selesai.");
      return;
    }

    if (gameState.money < totalCost) {
      setError("Dana tidak cukup untuk memulai riset ini!");
      return;
    }

    const blueprint: ConsoleBlueprint = {
      id: `console_${Date.now()}`,
      name: consoleName,
      cpu: cpu.id,
      graphics: graphics.id,
      audio: audio.id,
      cost: totalCost,
      developmentTime: totalTime,
    };

    startResearch(blueprint);
    router.push("/dashboard");
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Riset & Pengembangan</h1>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-blue-100 hover:text-white transition-colors text-sm font-medium"
          >
            &larr; Kembali
          </button>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-100">
              {error}
            </div>
          )}

          {/* Console Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Nama Konsol
            </label>
            <input
              type="text"
              value={consoleName}
              onChange={(e) => setConsoleName(e.target.value)}
              placeholder="Contoh: Magnavox, Atari..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              disabled={!!gameState.activeResearch}
            />
          </div>

          {/* Component Selection */}
          <div className="space-y-4">

            {/* CPU */}
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Prosesor (CPU)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CPU_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setCpu(option)}
                    disabled={!!gameState.activeResearch}
                    className={`text-left p-3 border rounded-md transition-colors ${
                      cpu.id === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'
                    } ${gameState.activeResearch ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="font-medium text-sm text-gray-900">{option.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                    <div className="text-xs font-semibold text-blue-600 mt-2">{formatMoney(Math.floor(option.cost * costMultiplier))}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Graphics */}
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Grafis</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {GRAPHICS_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setGraphics(option)}
                    disabled={!!gameState.activeResearch}
                    className={`text-left p-3 border rounded-md transition-colors ${
                      graphics.id === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'
                    } ${gameState.activeResearch ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="font-medium text-sm text-gray-900">{option.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                    <div className="text-xs font-semibold text-blue-600 mt-2">{formatMoney(Math.floor(option.cost * costMultiplier))}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Audio */}
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Suara (Audio)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {AUDIO_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setAudio(option)}
                    disabled={!!gameState.activeResearch}
                    className={`text-left p-3 border rounded-md transition-colors ${
                      audio.id === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'
                    } ${gameState.activeResearch ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="font-medium text-sm text-gray-900">{option.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                    <div className="text-xs font-semibold text-blue-600 mt-2">{formatMoney(Math.floor(option.cost * costMultiplier))}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Summary & Action */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="block text-sm text-gray-500">Total Biaya Riset</span>
                <span className="block text-xl font-bold text-gray-900">
                  {formatMoney(totalCost)}
                  {isEngineering && <span className="ml-2 text-xs font-normal text-green-600 bg-green-100 px-2 py-0.5 rounded-full">-15% Ahli Teknik</span>}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-sm text-gray-500">Estimasi Waktu</span>
                <span className="block text-lg font-semibold text-gray-800">{totalTime} Hari</span>
              </div>
            </div>

            <button
              onClick={handleStartResearch}
              disabled={!!gameState.activeResearch || gameState.money < totalCost}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-sm transition-colors"
            >
              {gameState.activeResearch ? "Riset Sedang Berlangsung" : "Mulai Riset"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
