import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarWidth } from "./Sidebar";

const MainDashboard = (props) => {
  const navigate = useNavigate();
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve claim from sessionStorage
    const storedClaim = sessionStorage.getItem('selectedClaim');
    if (storedClaim) {
      try {
        const claimData = JSON.parse(storedClaim);
        setClaim(claimData);
      } catch (err) {
        console.error('Error parsing claim data:', err);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="bg-black min-h-screen p-8 w-full flex items-center justify-center">
        <div className="text-4xl text-orange-500 font-['Pixels'] animate-pulse">LOADING DATA...</div>
      </div>
    );
  }

  if (!claim) {
    return (
      <div style={{ marginLeft: SidebarWidth }} className="bg-black min-h-screen p-8 w-full font-['Pixels']">
        <div className="text-4xl text-orange-500 mb-6 text-center mt-20">NO CLAIM SELECTED</div>
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/history')}
            className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-black text-2xl hover:text-white transition-colors border-4 border-orange-800 hover:border-orange-400 shadow-[4px_4px_0px_0px_rgba(160,82,45,1)]"
          >
            ← RETURN TO ARCHIVES
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginLeft: SidebarWidth }} className="bg-black min-h-screen p-8 text-orange-500 font-['Pixels'] selection:bg-orange-500 selection:text-black">
      <div className="w-full">
        {/* Top Bar */}
        {/* Top Bar */}
        <div className="relative mb-12 border-b-4 border-orange-900/50 pb-6 pt-2">

          {/* Decorative Top Border with Scanner Effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-orange-900/30 overflow-hidden">
            <div className="h-full w-1/3 bg-orange-500/50 blur-sm animate-[loading_2s_ease-in-out_infinite]"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Left: Back Button & Status */}
            <div className="flex items-center gap-6 w-full md:w-auto">
              <button
                onClick={() => navigate('/history')}
                className="group relative px-6 py-2 bg-black border-2 border-orange-600 hover:bg-orange-900/20 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-orange-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                <span className="relative text-orange-500 font-bold tracking-widest group-hover:text-orange-400">
                  &lt; RETURN_ROOT
                </span>
              </button>

              <div className="flex items-center gap-2 border-l-2 border-orange-900 pl-6">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                <span className="text-xs text-orange-700 tracking-[0.2em]">SYSTEM_ONLINE</span>
              </div>
            </div>

            {/* Center: Scrolling Ticker */}
            <div className="hidden md:flex flex-1 mx-8 overflow-hidden border-x-2 border-orange-900/30 bg-orange-900/5 h-8 items-center relative">
              <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] text-xs text-orange-800 font-mono">
                Scanning database... Verifying checksums... Connection secure... Node 8472 active... Uplink established... Decrypting payload...
              </div>
              {/* Vignette for ticker */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none"></div>
            </div>

            {/* Right: System Info */}
            <div className="text-right">
              <div className="text-xl text-orange-500 font-bold tracking-widest drop-shadow-[2px_2px_0_rgba(60,20,0,0.8)]">
                ATLAS_CORE
              </div>
              <div className="text-xs text-orange-800 flex justify-end gap-2">
                <span>SYS.VER.0.04</span>
                <span>::</span>
                <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Claim Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl text-orange-500 mb-4 uppercase tracking-widest drop-shadow-[4px_4px_0_rgba(60,20,0,1)]">
            {claim.resolvedClaim || claim.resolved_claim || 'CLAIM DETAILS'}
          </h1>
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

          {/* Left Column: Stats */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-black border-4 border-orange-800 p-6 relative overflow-hidden group hover:border-orange-500 transition-colors">
              <div className="absolute top-0 right-0 p-2 text-xs text-orange-900">ID_REF</div>
              <div className="text-orange-600 text-sm mb-1">CLAIM ID</div>
              <div className="text-2xl text-orange-400 break-all">{claim._id?.substring(0, 8)}...</div>
            </div>

            <div className="bg-black border-4 border-orange-800 p-6 relative overflow-hidden group hover:border-orange-500 transition-colors">
              <div className="absolute top-0 right-0 p-2 text-xs text-orange-900">ID_REF</div>
              <div className="text-orange-600 text-sm mb-1">CLAIM SCORE</div>
              <div className="text-3xl font-bold text-orange-400 break-all">{claim.claim_score ?? '0'}</div>
            </div>


            <div className="bg-black border-4 border-orange-800 p-6 relative group hover:border-orange-500 transition-colors">
              <div className="text-orange-600 text-sm mb-1">VERDICT</div>
              <div className="text-4xl text-orange-400 uppercase">{claim.verdict ?? 'UNKNOWN'}</div>
            </div>

            <div className="bg-black border-4 border-orange-800 p-6 relative group hover:border-orange-500 transition-colors">
              <div className="text-orange-600 text-sm mb-1">CONFIDENCE SCORE</div>
              <div className="text-6xl text-orange-400">{claim.score ?? claim.claim_score ?? '0'}%</div>
              <div className="w-full bg-orange-900/30 h-4 mt-2 border border-orange-900">
                <div className="h-full bg-orange-500" style={{ width: `${claim.score ?? 0}%` }}></div>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 space-y-8">

            {/* Original vs Resolved */}
            <div className="bg-orange-900/10 border-4 border-orange-600 p-8 relative">
              <div className="absolute -top-4 left-4 bg-black px-2 text-orange-500 border border-orange-600">ANALYSIS</div>

              <div className="mb-6">
                <div className="text-orange-700 mb-2 text-sm">EXPLANATION SNIPPET</div>
                <div className="text-2xl text-orange-300 leading-relaxed border-l-4 border-orange-800 pl-4">
                  "{claim.explanation_snipper || '—'}"
                </div>
              </div>

            </div>

            {/* Explanation */}
            <div className="bg-black border-4 border-orange-600 p-8 relative">
              <h2 className="text-3xl text-orange-500 mb-6 border-b-2 border-orange-800 pb-2 inline-block">EXPLANATION</h2>
              <div className="text-xl text-orange-200 leading-loose whitespace-pre-wrap font-sans">
                {claim.explanation ?? 'No detailed explanation available.'}
              </div>
            </div>

          </div>
        </div>

        {/* Sources Section */}
        {Array.isArray(claim.sources) && claim.sources.length > 0 && (
          <div className="border-t-4 border-orange-900 pt-12">
            <h2 className="text-4xl text-orange-500 mb-8 text-center">EVIDENCE_LOGS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {claim.sources.map((source, idx) => (
                <div key={source._id || idx} className="bg-black border-2 border-orange-800 p-6 hover:bg-orange-900/10 transition-colors">
                  <div className="text-orange-400 text-xl mb-2 truncate">{source.title ?? 'Unknown Source'}</div>
                  <div className="text-orange-700 text-sm mb-4 truncate">{source.link}</div>
                  <div className="text-orange-300 text-sm leading-relaxed line-clamp-3">
                    {source.snippet ?? 'No snippet available.'}
                  </div>
                  {source.link && (
                    <a href={source.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-orange-500 hover:text-white border border-orange-500 px-3 py-1 text-sm hover:bg-orange-600 transition-colors">
                      ACCESS_LINK
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainDashboard;
