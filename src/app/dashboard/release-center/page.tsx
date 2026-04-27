"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGame, ActiveTask } from "@/context/GameContext";
import { TECHNOLOGIES, TechCategory } from "@/data/technologies";

type Tab = "parts" | "develop" | "produce";

export default function ReleaseCenter() {
  const router = useRouter();
  const { gameState, startTask } = useGame();
  const [activeTab, setActiveTab] = useState<Tab>("parts");

  const [customCpuName, setCustomCpuName] = useState("");
  const [cpuArch, setCpuArch] = useState<"TTL" | "8-bit">("TTL");
  const [cpuClock, setCpuClock] = useState(1);
  const [cpuInstruction, setCpuInstruction] = useState<"Efisien" | "Seimbang" | "Performa">("Seimbang");
  const [cpuFab, setCpuFab] = useState<string>("");

  // Tab 2 State
  const [consoleName, setConsoleName] = useState("");
  const [selectedCpu, setSelectedCpu] = useState("");
  const [selectedFf, setSelectedFf] = useState("");
  const [selectedCol, setSelectedCol] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [selectedStor, setSelectedStor] = useState("");
  const [selectedAud, setSelectedAud] = useState("");
  const [selectedCtrl, setSelectedCtrl] = useState("");
  const [selectedMed, setSelectedMed] = useState("");

  // Tab 3 State
  const [productionUnits, setProductionUnits] = useState(1000);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
  };

  const handleResearchPart = (partId: string, cost: number, timeInDays: number, name: string) => {
    if (gameState.activeTask) return;
    const task: ActiveTask = {
      id: `task_${Date.now()}`,
      type: "research_part",
      name: `Riset: ${name}`,
      startDate: gameState.gameDate,
      endDate: gameState.gameDate + (timeInDays * 24 * 60 * 60 * 1000),
      payload: { partId }
    };
    startTask(task, cost);
  };

  const handleDevelopCustomCpu = () => {
    if (gameState.activeTask) return;
    if (!customCpuName.trim() || !cpuFab) return;

    const fabTech = TECHNOLOGIES.find(t => t.id === cpuFab);
    if (!fabTech) return;

    // Calculate complex logic
    let baseCost = cpuArch === "TTL" ? 5000 : 15000;
    let baseTime = cpuArch === "TTL" ? 20 : 40;

    // Instruction set modifiers
    if (cpuInstruction === "Efisien") {
       baseCost *= 0.8;
       baseTime *= 0.9;
    } else if (cpuInstruction === "Performa") {
       baseCost *= 1.5;
       baseTime *= 1.3;
    }

    // Fab modifier
    const fabModifier = fabTech.id === "fab_10um" ? 1 : fabTech.id === "fab_6um" ? 1.5 : 2.5;

    const costPerMHz = (cpuArch === "TTL" ? 500 : 2000) * fabModifier;
    const totalCost = Math.floor(baseCost + (cpuClock * costPerMHz));
    const timeInDays = Math.floor(baseTime + (cpuClock * (cpuArch === "TTL" ? 1 : 2)));

    // Bug logic: pushing clockspeed high on older architecture/fab increases bug chance
    const maxSafeClock = cpuArch === "TTL" ? 2 : (fabTech.id === "fab_10um" ? 3 : fabTech.id === "fab_6um" ? 5 : 8);
    const isPushingLimits = cpuClock > maxSafeClock;
    const bugChance = isPushingLimits ? 0.25 : 0.05; // 25% if pushed, 5% normally
    const willBeBuggy = Math.random() < bugChance;

    let techScore = (cpuArch === "TTL" ? 2 : 5) + cpuClock + fabTech.techScore;
    if (cpuInstruction === "Performa") techScore += 2;
    if (cpuInstruction === "Efisien") techScore -= 1;

    const cpu = {
      id: `cpu_${Date.now()}`,
      name: customCpuName,
      architecture: cpuArch,
      instructionSet: cpuInstruction,
      fabricationId: cpuFab,
      clockSpeed: cpuClock,
      costToDevelop: totalCost,
      timeToDevelop: timeInDays,
      techScore: techScore,
      isBuggy: willBeBuggy
    };

    const task: ActiveTask = {
      id: `task_${Date.now()}`,
      type: "develop_cpu",
      name: `Desain CPU: ${customCpuName}`,
      startDate: gameState.gameDate,
      endDate: gameState.gameDate + (timeInDays * 24 * 60 * 60 * 1000),
      payload: { cpu }
    };
    startTask(task, totalCost);
    setCustomCpuName("");
  };

  const handleFixCpuBug = (cpuId: string, name: string) => {
    if (gameState.activeTask) return;

    const cost = 5000;
    const timeInDays = 15;

    const task: ActiveTask = {
      id: `task_${Date.now()}`,
      type: "fix_cpu_bug",
      name: `Revisi Bug: ${name}`,
      startDate: gameState.gameDate,
      endDate: gameState.gameDate + (timeInDays * 24 * 60 * 60 * 1000),
      payload: { cpuId }
    };
    startTask(task, cost);
  }

  const handleDevelopConsole = () => {
    if (gameState.activeTask) return;
    if (!consoleName.trim() || !selectedCpu || !selectedFf || !selectedCol || !selectedRam || !selectedStor || !selectedAud || !selectedCtrl || !selectedMed) return;

    const cpu = gameState.customCPUs.find(c => c.id === selectedCpu);
    if (cpu?.isBuggy) return; // double check

    const ff = TECHNOLOGIES.find(t => t.id === selectedFf);
    const col = TECHNOLOGIES.find(t => t.id === selectedCol);
    const ram = TECHNOLOGIES.find(t => t.id === selectedRam);
    const stor = TECHNOLOGIES.find(t => t.id === selectedStor);
    const aud = TECHNOLOGIES.find(t => t.id === selectedAud);
    const ctrl = TECHNOLOGIES.find(t => t.id === selectedCtrl);
    const med = TECHNOLOGIES.find(t => t.id === selectedMed);

    if (!cpu || !ff || !col || !ram || !stor || !aud || !ctrl || !med) return;

    const baseCost = 25000; // Base cost for prototyping and ecosystem development
    const baseTime = 60; // 60 days to develop ecosystem

    // Total tech score is sum of parts
    const totalTechScore = cpu.techScore + ff.techScore + col.techScore + ram.techScore + stor.techScore + aud.techScore + ctrl.techScore + med.techScore;

    const consoleDraft = {
      id: `draft_${Date.now()}`,
      name: consoleName,
      components: { cpu: cpu.name, ff: ff.name, col: col.name, ram: ram.name, stor: stor.name, aud: aud.name, ctrl: ctrl.name, med: med.name },
      techScore: totalTechScore,
      durabilityTested: false
    };

    const task: ActiveTask = {
      id: `task_${Date.now()}`,
      type: "develop_console",
      name: `Pengembangan Konsol: ${consoleName}`,
      startDate: gameState.gameDate,
      endDate: gameState.gameDate + (baseTime * 24 * 60 * 60 * 1000),
      payload: { consoleDraft }
    };
    startTask(task, baseCost);
    setActiveTab("produce");
  };

  const handleDurabilityTest = () => {
    if (gameState.activeTask || !gameState.draftConsole || gameState.draftConsole.durabilityTested) return;

    const cost = 10000;
    const timeInDays = 30;

    const improvedDraft = {
      ...gameState.draftConsole,
      durabilityTested: true,
      techScore: gameState.draftConsole.techScore + 5 // Boost score for good durability
    };

    const task: ActiveTask = {
      id: `task_${Date.now()}`,
      type: "develop_console",
      name: `Uji Ketahanan: ${gameState.draftConsole.name}`,
      startDate: gameState.gameDate,
      endDate: gameState.gameDate + (timeInDays * 24 * 60 * 60 * 1000),
      payload: { consoleDraft: improvedDraft }
    };

    startTask(task, cost);
  };

  const handleProduceAndRelease = () => {
    if (gameState.activeTask || !gameState.draftConsole) return;

    const costPerUnit = 20; // Simplified cost
    const totalCost = productionUnits * costPerUnit;

    if (gameState.money < totalCost) return;

    // Calculate Star Rating
    // Baseline tech score expected per year
    // 1970: expected ~5
    // 1975: expected ~15
    // 1980: expected ~25
    const currentYear = new Date(gameState.gameDate).getFullYear();
    const expectedScore = 5 + ((currentYear - 1970) * 2);
    const scoreRatio = gameState.draftConsole.techScore / expectedScore;

    let stars = 3;
    let reviewerMessage = "Konsol ini standar untuk standar saat ini.";

    if (scoreRatio >= 1.5) {
      stars = 5;
      reviewerMessage = "Luar biasa! Teknologi ini jauh melampaui zamannya. Sebuah mahakarya!";
    } else if (scoreRatio >= 1.2) {
      stars = 4;
      reviewerMessage = "Sangat bagus. Punya fitur canggih yang pasti disukai gamer.";
    } else if (scoreRatio >= 0.8) {
      stars = 3;
      reviewerMessage = "Cukup layak. Tidak ada yang istimewa tapi berfungsi dengan baik.";
    } else if (scoreRatio >= 0.5) {
      stars = 2;
      reviewerMessage = "Mengecewakan. Teknologinya terasa usang.";
    } else {
      stars = 1;
      reviewerMessage = "Sangat buruk. Jangan harap laku di pasaran dengan spek purba seperti ini.";
    }

    const release = {
      id: `release_${Date.now()}`,
      name: gameState.draftConsole.name,
      releaseDate: gameState.gameDate + (30 * 24 * 60 * 60 * 1000), // 30 days to produce and distribute
      unitsProduced: productionUnits,
      starRating: stars,
      reviewerMessage
    };

    const task: ActiveTask = {
      id: `task_${Date.now()}`,
      type: "production",
      name: `Produksi Massal: ${gameState.draftConsole.name}`,
      startDate: gameState.gameDate,
      endDate: release.releaseDate,
      payload: { release }
    };

    startTask(task, totalCost);
    setActiveTab("parts"); // Reset back to start
    router.push("/dashboard"); // Auto redirect to dashboard on release
  };

  const currentYear = new Date(gameState.gameDate).getFullYear();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Pusat Rilis & Pengembangan</h1>
          <button onClick={() => router.push("/dashboard")} className="text-blue-100 hover:text-white transition-colors text-sm font-medium">
            &larr; Kembali ke Dashboard
          </button>
        </div>

        {/* Task Indicator */}
        {gameState.activeTask && (
          <div className="bg-blue-50 border-b border-blue-100 p-3 px-6 flex items-center justify-between">
            <span className="text-sm font-semibold text-blue-800">Sedang Berjalan: {gameState.activeTask.name}</span>
            <div className="flex-1 max-w-xs mx-4 bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, Math.max(0, ((gameState.gameDate - gameState.activeTask.startDate) / (gameState.activeTask.endDate - gameState.activeTask.startDate)) * 100))}%` }}
              ></div>
            </div>
            <svg className="w-4 h-4 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button onClick={() => setActiveTab("parts")} className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === "parts" ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>
            1. Suku Cadang & Chipset
          </button>
          <button onClick={() => setActiveTab("develop")} className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === "develop" ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>
            2. Pengembangan Konsol
          </button>
          <button onClick={() => setActiveTab("produce")} className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === "produce" ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>
            3. Produksi & Rilis
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 bg-white flex-1">
          {activeTab === "parts" && (
            <div className="space-y-8">

              <section>
                <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Riset Komponen Standar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TECHNOLOGIES.filter(t => t.yearAvailable <= currentYear).map(tech => {
                    const isUnlocked = gameState.unlockedParts.includes(tech.id);
                    return (
                      <div key={tech.id} className={`p-4 border rounded-xl flex items-center justify-between ${isUnlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div>
                          <p className={`font-semibold ${isUnlocked ? 'text-green-800' : 'text-gray-800'}`}>{tech.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{tech.category} • Buka {tech.yearAvailable}</p>
                        </div>
                        {isUnlocked ? (
                          <span className="text-xs font-bold text-green-600 px-2 py-1 bg-green-100 rounded-md">Terbuka</span>
                        ) : (
                          <button
                            disabled={!!gameState.activeTask || gameState.money < tech.cost}
                            onClick={() => handleResearchPart(tech.id, tech.cost, tech.time, tech.name)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            Riset ({formatMoney(tech.cost)})
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Desain Chipset (CPU) Kustom</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Chipset</label>
                        <input type="text" value={customCpuName} onChange={(e) => setCustomCpuName(e.target.value)} disabled={!!gameState.activeTask} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500" placeholder="Cth: Z-80 Custom" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Arsitektur Dasar</label>
                        <select value={cpuArch} onChange={(e) => setCpuArch(e.target.value as any)} disabled={!!gameState.activeTask} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500">
                          <option value="TTL">Custom TTL Logic (Murah, Kuno)</option>
                          {currentYear >= 1974 && <option value="8-bit">Mikroprosesor 8-bit (Mahal, Modern)</option>}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Ukuran Fabrikasi</label>
                        <select value={cpuFab} onChange={(e) => setCpuFab(e.target.value)} disabled={!!gameState.activeTask} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500">
                          <option value="">-- Pilih Teknologi Fabrikasi --</option>
                          {TECHNOLOGIES.filter(t => t.category === "fabrication" && gameState.unlockedParts.includes(t.id)).map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Fokus Set Instruksi</label>
                        <select value={cpuInstruction} onChange={(e) => setCpuInstruction(e.target.value as any)} disabled={!!gameState.activeTask} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500">
                          <option value="Seimbang">Seimbang (Standar)</option>
                          <option value="Efisien">Efisien (Biaya & Waktu -10%, Skor -1)</option>
                          <option value="Performa">Performa (Biaya & Waktu +50%, Skor +2)</option>
                        </select>
                      </div>
                    </div>
                    <div className="md:col-span-2 pt-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Kecepatan Clock (MHz): {cpuClock} MHz</label>
                      <input type="range" min="1" max={cpuArch === "TTL" ? 4 : 10} value={cpuClock} onChange={(e) => setCpuClock(parseInt(e.target.value))} disabled={!!gameState.activeTask} className="w-full mt-1" />
                      <p className="text-xs text-orange-600 mt-1 italic">*Hati-hati: Kecepatan terlalu tinggi untuk teknologi lawas dapat menyebabkan bug sirkuit (hingga 25% peluang gagal).</p>
                    </div>
                  </div>

                  <button
                    disabled={!!gameState.activeTask || !customCpuName.trim() || !cpuFab}
                    onClick={handleDevelopCustomCpu}
                    className="w-full py-3 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white font-bold text-sm rounded-lg transition-colors shadow-sm"
                  >
                    Mulai Desain Chipset (Akan Mengkalkulasi Biaya)
                  </button>

                  {gameState.customCPUs.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <p className="text-sm font-bold text-gray-800 mb-3">Inventaris Chipset Anda:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {gameState.customCPUs.map(cpu => (
                          <div key={cpu.id} className={`p-3 border rounded-lg ${cpu.isBuggy ? 'bg-red-50 border-red-300' : 'bg-gray-100 border-gray-300'}`}>
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-sm text-gray-900">{cpu.name}</span>
                              {cpu.isBuggy && <span className="text-xs font-bold text-white bg-red-500 px-1.5 py-0.5 rounded">BUGGY</span>}
                            </div>
                            <div className="text-xs text-gray-600">
                              {cpu.architecture} • {cpu.clockSpeed}MHz • {cpu.instructionSet}
                            </div>
                            {cpu.isBuggy && (
                              <button
                                onClick={() => handleFixCpuBug(cpu.id, cpu.name)}
                                disabled={!!gameState.activeTask || gameState.money < 5000}
                                className="mt-2 w-full text-xs font-semibold bg-red-100 hover:bg-red-200 text-red-700 py-1.5 rounded border border-red-200 transition-colors"
                              >
                                Revisi Bug ($5,000 / 15 Hari)
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>

            </div>
          )}

          {activeTab === "develop" && (
            <div className="space-y-6">

              {!gameState.draftConsole && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Mulai Proyek Konsol Baru</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Konsol Baru</label>
                      <input type="text" value={consoleName} onChange={(e) => setConsoleName(e.target.value)} disabled={!!gameState.activeTask} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" placeholder="Cth: Nusantara 64" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Chipset / CPU (Kustom)</label>
                        <select value={selectedCpu} onChange={(e) => setSelectedCpu(e.target.value)} disabled={!!gameState.activeTask} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none">
                          <option value="">-- Pilih CPU Kustom --</option>
                          {gameState.customCPUs.filter(c => !c.isBuggy).map(c => <option key={c.id} value={c.id}>{c.name} ({c.clockSpeed}MHz)</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Bentuk & Material</label>
                        <select value={selectedFf} onChange={(e) => setSelectedFf(e.target.value)} disabled={!!gameState.activeTask} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none">
                          <option value="">-- Pilih Material --</option>
                          {TECHNOLOGIES.filter(t => t.category === "formFactor" && gameState.unlockedParts.includes(t.id)).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Kemampuan Grafis</label>
                        <select value={selectedCol} onChange={(e) => setSelectedCol(e.target.value)} disabled={!!gameState.activeTask} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none">
                          <option value="">-- Pilih Grafis --</option>
                          {TECHNOLOGIES.filter(t => t.category === "color" && gameState.unlockedParts.includes(t.id)).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Kapasitas RAM</label>
                        <select value={selectedRam} onChange={(e) => setSelectedRam(e.target.value)} disabled={!!gameState.activeTask} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none">
                          <option value="">-- Pilih RAM --</option>
                          {TECHNOLOGIES.filter(t => t.category === "ram" && gameState.unlockedParts.includes(t.id)).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Media Penyimpanan</label>
                        <select value={selectedStor} onChange={(e) => setSelectedStor(e.target.value)} disabled={!!gameState.activeTask} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none">
                          <option value="">-- Pilih Penyimpanan --</option>
                          {TECHNOLOGIES.filter(t => t.category === "storage" && gameState.unlockedParts.includes(t.id)).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Sistem Audio</label>
                        <select value={selectedAud} onChange={(e) => setSelectedAud(e.target.value)} disabled={!!gameState.activeTask} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none">
                          <option value="">-- Pilih Audio --</option>
                          {TECHNOLOGIES.filter(t => t.category === "audio" && gameState.unlockedParts.includes(t.id)).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Input / Kontroler</label>
                        <select value={selectedCtrl} onChange={(e) => setSelectedCtrl(e.target.value)} disabled={!!gameState.activeTask} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none">
                          <option value="">-- Pilih Kontroler --</option>
                          {TECHNOLOGIES.filter(t => t.category === "controller" && gameState.unlockedParts.includes(t.id)).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Bonus Paket Rilis</label>
                        <select value={selectedMed} onChange={(e) => setSelectedMed(e.target.value)} disabled={!!gameState.activeTask} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none">
                          <option value="">-- Pilih Ekstra --</option>
                          {TECHNOLOGIES.filter(t => t.category === "media" && gameState.unlockedParts.includes(t.id)).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                      <div className="text-sm text-gray-600">Biaya Pengembangan Ekosistem: <span className="font-bold text-gray-900">$25,000</span> (60 Hari)</div>
                      <button
                        onClick={handleDevelopConsole}
                        disabled={!!gameState.activeTask || !consoleName || !selectedCpu || !selectedFf || !selectedCol || !selectedRam || !selectedStor || !selectedAud || !selectedCtrl || !selectedMed || gameState.money < 25000}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
                      >
                        Mulai Pengembangan Ekosistem
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {gameState.draftConsole && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h2 className="text-lg font-bold text-yellow-800 mb-2">Prototipe Saat Ini: {gameState.draftConsole.name}</h2>
                  <p className="text-sm text-yellow-700 mb-4">Konsol Anda sedang dalam tahap penyempurnaan sebelum diproduksi masal.</p>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div><span className="font-semibold">CPU:</span> {gameState.draftConsole.components.cpu}</div>
                    <div><span className="font-semibold">Bentuk:</span> {gameState.draftConsole.components.ff}</div>
                    <div><span className="font-semibold">Grafis:</span> {gameState.draftConsole.components.col}</div>
                    <div><span className="font-semibold">RAM:</span> {gameState.draftConsole.components.ram}</div>
                    <div><span className="font-semibold">Penyimpanan:</span> {gameState.draftConsole.components.stor}</div>
                    <div><span className="font-semibold">Audio:</span> {gameState.draftConsole.components.aud}</div>
                    <div><span className="font-semibold">Kontroler:</span> {gameState.draftConsole.components.ctrl}</div>
                    <div><span className="font-semibold">Media Ekstra:</span> {gameState.draftConsole.components.med}</div>
                  </div>

                  <div className="flex gap-4">
                    {!gameState.draftConsole.durabilityTested ? (
                      <button
                        onClick={handleDurabilityTest}
                        disabled={!!gameState.activeTask || gameState.money < 10000}
                        className="flex-1 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
                      >
                        Lakukan Uji Ketahanan ($10,000 - 30 Hari)
                      </button>
                    ) : (
                      <div className="flex-1 py-2 text-center bg-green-100 text-green-800 font-bold rounded-lg border border-green-300">
                        ✓ Uji Ketahanan Selesai
                      </div>
                    )}
                    <button onClick={() => setActiveTab("produce")} className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
                      Lanjut ke Produksi &rarr;
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {activeTab === "produce" && (
            <div className="space-y-6">
              {!gameState.draftConsole ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">Belum Ada Prototipe</h2>
                  <p className="text-gray-500 mb-4">Selesaikan pengembangan konsol di Tab 2 terlebih dahulu.</p>
                  <button onClick={() => setActiveTab("develop")} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Ke Tab Pengembangan</button>
                </div>
              ) : (
                <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm">

                  <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-900">{gameState.draftConsole.name}</h2>
                      <p className="text-sm text-blue-600 font-medium mt-1">Siap untuk diproduksi masal</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-bold">Skor Teknologi</div>
                      <div className="text-3xl font-black text-gray-800">{gameState.draftConsole.techScore}</div>
                      {gameState.draftConsole.durabilityTested && <div className="text-xs text-green-600 font-bold mt-1">+ Uji Ketahanan</div>}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-6">
                    <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                      Review Pra-Rilis
                    </h3>
                    <p className="text-blue-800 italic text-sm">
                      {/* Calculate temporary rating for UI display without committing */}
                      {(() => {
                        const expectedScore = 5 + ((currentYear - 1970) * 2);
                        const scoreRatio = gameState.draftConsole.techScore / expectedScore;
                        if (scoreRatio >= 1.5) return "Luar biasa! Teknologi ini jauh melampaui zamannya. Sebuah mahakarya!";
                        if (scoreRatio >= 1.2) return "Sangat bagus. Punya fitur canggih yang pasti disukai gamer.";
                        if (scoreRatio >= 0.8) return "Cukup layak. Tidak ada yang istimewa tapi berfungsi dengan baik.";
                        if (scoreRatio >= 0.5) return "Mengecewakan. Teknologinya terasa usang.";
                        return "Sangat buruk. Jangan harap laku di pasaran dengan spek purba seperti ini.";
                      })()}
                    </p>
                    <div className="flex mt-3 text-yellow-500">
                      {/* Show stars visually */}
                      {(() => {
                        const expectedScore = 5 + ((currentYear - 1970) * 2);
                        const scoreRatio = gameState.draftConsole.techScore / expectedScore;
                        const stars = scoreRatio >= 1.5 ? 5 : scoreRatio >= 1.2 ? 4 : scoreRatio >= 0.8 ? 3 : scoreRatio >= 0.5 ? 2 : 1;
                        return Array(5).fill(0).map((_, i) => (
                          <svg key={i} className={`w-6 h-6 ${i < stars ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        ));
                      })()}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Tentukan Produksi Awal</h3>
                    <div className="flex gap-4 items-end mb-6">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Jumlah Unit: {productionUnits.toLocaleString()}</label>
                        <input
                          type="range"
                          min="1000"
                          max="100000"
                          step="1000"
                          value={productionUnits}
                          onChange={(e) => setProductionUnits(parseInt(e.target.value))}
                          className="w-full"
                          disabled={!!gameState.activeTask}
                        />
                      </div>
                      <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-500 uppercase font-bold">Biaya Produksi</div>
                        <div className="text-lg font-bold text-red-600">{formatMoney(productionUnits * 20)}</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleProduceAndRelease}
                    disabled={!!gameState.activeTask || gameState.money < (productionUnits * 20)}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-black text-lg rounded-xl shadow-md transition-colors flex items-center justify-center"
                  >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path></svg>
                    Mulai Produksi & Rilis Ke Pasar
                  </button>

                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
