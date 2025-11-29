import React, { useEffect, useState } from "react";

const ReadResultJson = ({ url = "/api/results" }) => {
	const [results, setResults] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;
		setLoading(true);
		setError(null);

		fetch(url)
			.then((res) => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return res.json();
			})
			.then((data) => {
				if (!mounted) return;
				setResults(Array.isArray(data) ? data : [data]);
			})
			.catch((err) => {
				if (!mounted) return;
				setError(err.message);
			})
			.finally(() => {
				if (mounted) setLoading(false);
			});

		return () => {
			mounted = false;
		};
	}, [url]);

	return (
		<div className="read-results-container">
			{loading && <div>Loading results...</div>}
			{error && <div style={{ color: "#b00020" }}>Error loading results: {error}</div>}

			{!loading && !error && (!results || results.length === 0) && <div>No results found.</div>}

			{!loading && !error && results && results.length > 0 && (
				<div>
					{results.map((r, idx) => (
						<div
							key={idx}
							style={{
								border: "1px solid #e0e0e0",
								padding: 12,
								marginBottom: 12,
								borderRadius: 6,
								background: "#fff",
							}}
						>
							<div style={{ marginBottom: 6 }}>
								<strong>Verdict:</strong> {String(r.verdict)}
							</div>
							<div style={{ marginBottom: 6 }}>
								<strong>Confidence:</strong> {String(r.confidence)}
							</div>
							{r.summary && (
								<div style={{ marginBottom: 6 }}>
									<strong>Summary:</strong> {r.summary}
								</div>
							)}
							{r.claim && (
								<div style={{ marginBottom: 6 }}>
									<strong>Claim:</strong>
									<div style={{ whiteSpace: "pre-wrap" }}>{r.claim}</div>
								</div>
							)}

							{r.sources && Array.isArray(r.sources) && (
								<div>
									<strong>Sources ({r.sources.length}):</strong>
									<ul style={{ marginTop: 6 }}>
										{r.sources.map((s, i) => (
											<li key={i}>
												<a href={s.url} target="_blank" rel="noreferrer">
													{s.title || s.url}
												</a>
												{s.trust ? ` (${s.trust})` : ""}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ReadResultJson;
