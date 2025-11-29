import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarWidth } from './Sidebar';
import PixelFace from './PixelFace';

const MainHistory = () => {
    const navigate = useNavigate();
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/claims/claimsWithVerification');
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                setClaims(Array.isArray(json.claims) ? json.claims : []);
            } catch (err) {
                console.error("Error fetching claims:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClaims();
    }, []);

    const handleClaimClick = (claim) => {
        sessionStorage.setItem('selectedClaim', JSON.stringify(claim));
        navigate('/home');
    };

    return (
        <div style={{ marginLeft: SidebarWidth }} className="bg-black min-h-screen font-['Pixels'] text-orange-500 selection:bg-orange-500 selection:text-black">
            <div className='p-8 w-full'>

                {/* Header Section */}
                <div className='flex items-center mb-12 border-b-4 border-orange-900 pb-8'>
                    <div className="border-4 border-orange-500 p-2 bg-orange-900/20">
                        <PixelFace size={100} />
                    </div>
                    <div className='ml-8'>
                        <h1 className='text-6xl md:text-8xl font-bold text-orange-500 leading-none mb-2 drop-shadow-[4px_4px_0_rgba(60,20,0,1)]'>
                            TRUTH_SEEKER
                        </h1>
                        <div className="text-2xl text-orange-700 tracking-widest">
                            // DATABASE_ACCESS_TERMINAL
                        </div>
                    </div>
                </div>

                {/* Claims Feed Container */}
                <div className="border-4 border-orange-800 p-8 bg-orange-900/5 relative min-h-[600px]">
                    <div className="absolute -top-5 left-8 bg-black px-4 text-orange-500 border border-orange-800 text-xl font-bold tracking-wider">
                        ACTIVE_CLAIMS_FEED
                    </div>

                    <div className="mb-6 flex justify-between items-end border-b-2 border-orange-900/50 pb-2">
                        <h2 className="text-3xl text-orange-600 font-bold">DETECTED_CLAIMS</h2>
                        <div className="text-orange-800 text-xl">COUNT: {claims.length}</div>
                    </div>

                    {loading ? (
                        <div className="text-4xl text-orange-500 animate-pulse text-center mt-20">LOADING_DATA...</div>
                    ) : error ? (
                        <div className="text-2xl text-red-500 text-center mt-20 border-2 border-red-900 p-4 bg-red-900/10">
                            ERROR: {error}
                        </div>
                    ) : claims.length === 0 ? (
                        <div className="text-2xl text-orange-700 text-center mt-20">NO CLAIMS FOUND IN ARCHIVE</div>
                    ) : (
                        <div className="space-y-8">
                            {claims.map((claim) => (
                                <div
                                    key={claim._id}
                                    onClick={() => handleClaimClick(claim)}
                                    className="group relative border-4 border-orange-900/50 hover:border-orange-500 bg-black p-6 cursor-pointer transition-all duration-200 hover:bg-orange-900/10 hover:translate-x-2"
                                >
                                    {/* Corner Accents */}
                                    <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute top-0 right-0 w-2 h-2 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Main Content */}
                                        <div className="flex-grow">
                                            <div className="text-orange-800 text-xs mb-1 tracking-widest">RESOLVED CLAIM</div>
                                            <h3 className="text-xl md:text-2xl text-orange-100 leading-relaxed mb-4 font-bold line-clamp-2 group-hover:text-white">
                                                {claim.resolvedClaim || claim.resolved_claim || "Unknown Claim"}
                                            </h3>

                                            <div className="mt-4">
                                                <div className="text-orange-800 text-xs mb-1 tracking-widest">EXPLANATION SNIPPET</div>
                                                <p className="text-orange-400/80 text-sm leading-relaxed line-clamp-2 font-sans">
                                                    {claim.explanation_snippet || claim.explanation || "No details available."}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Stats Column */}
                                        <div className="md:w-48 flex-shrink-0 flex flex-col justify-between border-l-2 border-orange-900/30 pl-6 md:text-right">
                                            <div>
                                                <div className="text-orange-800 text-xs mb-1 tracking-widest">SCORE</div>
                                                <div className="text-4xl text-orange-500 font-bold mb-4">
                                                    {claim.score ?? claim.claim_score ?? 0}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-orange-800 text-xs mb-1 tracking-widest">VERDICT</div>
                                                <div className={`text-lg font-bold ${(claim.verdict?.toLowerCase().includes('true')) ? 'text-green-500' :
                                                    (claim.verdict?.toLowerCase().includes('false')) ? 'text-red-500' :
                                                        'text-yellow-500'
                                                    }`}>
                                                    {claim.verdict ?? 'UNKNOWN'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainHistory;
