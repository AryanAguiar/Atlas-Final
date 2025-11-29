import React, { useState, useEffect } from 'react';

// Retro brown/amber theme with pixelated font and green accents
const Claim = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchClaim = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/claims/claimsWithVerification');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (mounted) setClaims(Array.isArray(json.claims) ? json.claims : []);
      } catch (err) {
        if (mounted) setError(err.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchClaim();

    return () => { mounted = false; };
  }, []);

  // Loading state with pixel font
  if (loading) return <div className="text-lg text-orange-500 bg-gray-900 bg-opacity-80 p-4" style={{fontFamily: 'Courier New, monospace', letterSpacing: '3px', fontWeight: 'bold'}}>Loading claims...</div>;
  // Error state with red accent
  if (error) return <div className="text-base text-red-500 bg-gray-900 bg-opacity-80 p-4" style={{fontFamily: 'Courier New, monospace', letterSpacing: '3px', fontWeight: 'bold'}}>Error: {error}</div>;

  // Detailed view for selected claim - full screen overlay
  if (selectedClaim) {
    return (
      <div className="fixed inset-0 bg-black overflow-y-auto z-50 text-orange-100" >
        <div className="max-w-6xl mx-auto p-6">
          {/* Back button with orange accent on hover */}
          <button 
            onClick={() => setSelectedClaim(null)} 
            className="mb-6 px-6 py-3 bg-orange-800 hover:bg-orange-600 text-orange-50 rounded-lg font-bold transition" style={{letterSpacing: '1px'}}
          >
            ← Back to List
          </button>

          {/* Detail card with dark gray gradient and orange border accent */}
          <div className="bg-gray-900 p-8 rounded-lg border-4 border-orange-700 shadow-2xl" style={{borderLeft: '8px solid #fb923c'}}>
            <h2 className="text-4xl font-black text-orange-400 mb-6" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.9)', letterSpacing: '2px'}}>{selectedClaim.resolvedClaim || selectedClaim.resolved_claim || 'Claim'}</h2>

            {/* Field list with orange label accents */}
            <div className="space-y-4 text-gray-100 leading-relaxed">
              <div><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>_id:</span> <span className="text-gray-200">{selectedClaim._id}</span></div>
              <div><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>originalClaim:</span> <span className="text-gray-200">{selectedClaim.originalClaim || selectedClaim.original_claim || '—'}</span></div>
              <div><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>resolvedClaim:</span> <span className="text-gray-200">{selectedClaim.resolvedClaim || selectedClaim.resolved_claim || '—'}</span></div>
              <div><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>label:</span> <span className="text-gray-200">{selectedClaim.label ?? '—'}</span></div>
              <div><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>claim_score:</span> <span className="text-gray-200">{selectedClaim.claim_score ?? selectedClaim.claimScore ?? '—'}</span></div>
              <div><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>verified:</span> <span className="text-gray-200">{typeof selectedClaim.verified !== 'undefined' ? String(selectedClaim.verified) : '—'}</span></div>
              <div><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>createdAt:</span> <span className="text-gray-200">{selectedClaim.createdAt ?? '—'}</span></div>
              <div><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>verdict:</span> <span className="text-gray-200">{selectedClaim.verdict ?? '—'}</span></div>
              <div><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>explanation_snippet:</span> <span className="text-gray-200">{selectedClaim.explanation_snippet ?? '—'}</span></div>
              <div><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>score:</span> <span className="text-gray-200">{typeof selectedClaim.score !== 'undefined' ? String(selectedClaim.score) : '—'}</span></div>

              {/* Explanation section with orange border */}
              <div className="mt-8 pt-6 border-t border-orange-700">
                <span className="text-orange-400 font-bold block mb-3" style={{letterSpacing: '1px'}}>explanation:</span>
                <div className="bg-black bg-opacity-50 p-4 rounded-lg border-2 border-orange-600 text-gray-200 whitespace-pre-wrap">{selectedClaim.explanation ?? '—'}</div>
              </div>

              {/* Sources section with orange accent border */}
              <div className="mt-8 pt-6 border-t border-orange-700">
                <span className="text-orange-400 font-bold block mb-4" style={{letterSpacing: '1px'}}>sources:</span>
                {Array.isArray(selectedClaim.sources) && selectedClaim.sources.length > 0 ? (
                  <ul className="space-y-4">
                    {selectedClaim.sources.map((s) => (
                      <li key={s._id || s.link} className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border-l-4 border-orange-500">
                        <div className="text-gray-200 mb-2"><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>title:</span> {s.title ?? '—'}</div>
                        <div className="text-gray-200 mb-2"><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>link:</span> {s.link ? (<a href={s.link} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">{s.link}</a>) : '—'}</div>
                        <div className="text-gray-200"><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>snippet:</span> {s.snippet ?? '—'}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-200">None</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main list view of claims
  return (
    <div className="bg-black min-h-screen p-6 text-gray-100" style={{fontFamily: 'Courier New, monospace', letterSpacing: '2px', fontWeight: 'bold'}}>
      {claims.length === 0 ? (
        <div className="text-orange-500 text-lg">No claims returned.</div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Header with orange accent */}
          <h2 className="text-5xl font-black text-orange-400 mb-8" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.9)', letterSpacing: '3px'}}>Total Claims: {claims.length}</h2>
          {/* List of claim cards */}
          <div className="space-y-4">
            {claims.map((c) => (
              <div
                key={c._id}
                onClick={() => setSelectedClaim(c)}
                className="bg-gray-800 hover:bg-gray-700 border-2 border-orange-700 hover:border-orange-500 p-5 rounded-lg cursor-pointer transition transform hover:scale-105 hover:shadow-lg shadow-black/50" style={{borderTop: '4px solid #fb923c'}}
              >
                <div className="mb-3"><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>resolvedClaim:</span> <span className="text-gray-100">{c.resolvedClaim ?? c.resolved_claim ?? 'N/A'}</span></div>
                <div className="mb-3"><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>Claim Score:</span> <span className="text-gray-100">{c.claim_score ?? c.claim_score ?? 'N/A'}</span></div>
                <div className="mb-3"><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>Score:</span> <span className="text-gray-100">{c.score ?? c.score ?? 'N/A'}</span></div>
                <div className="mb-3"><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>Verdict:</span> <span className="text-gray-100">{c.verdict ?? c.verdict ?? 'N/A'}</span></div>
                <div className="mb-4"><span className="text-orange-400 font-bold" style={{letterSpacing: '1px'}}>Explanation:</span> <span className="text-gray-100">{c.explanation ?? c.explanation ?? 'N/A'}</span></div>
                <div className="text-sm text-orange-500" style={{letterSpacing: '1px'}}>→ Click to view details</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Claim;
