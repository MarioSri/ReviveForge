"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";
import { useChecklist } from "@/lib/api";
import { useRouter, usePathname } from "next/navigation";

const STEPS = [
	{ key: "profile", label: "Complete your profile", href: "/profile" },
	{ key: "browse", label: "Browse a project", href: "/marketplace" },
	{ key: "valuation", label: "Run AI valuation", href: "/marketplace" },
	{ key: "offer", label: "Make or accept an offer", href: "/dashboard?tab=offers-sent" },
] as const;

type StepKey = typeof STEPS[number]["key"];

export default function OnboardingChecklist() {
	const { data: completed = [] } = useChecklist();
	const [dismissed, setDismissed] = useState(false);
	const [fade, setFade] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (typeof window !== "undefined") {
			setDismissed(localStorage.getItem("onboardingChecklistDismissed") === "1");
		}
	}, []);

	useEffect(() => {
		if (completed.length === STEPS.length && !dismissed) {
			setTimeout(() => setFade(true), 2000);
			setTimeout(() => {
				setDismissed(true);
				localStorage.setItem("onboardingChecklistDismissed", "1");
			}, 2400);
		}
	}, [completed, dismissed]);

	// Hide on admin pages
	if (pathname?.startsWith("/admin") || dismissed) return null;

	const handleStepClick = (step: typeof STEPS[number]) => {
		if (step.key === "valuation") {
			// Go to first project detail if possible
			router.push("/marketplace");
			// Optionally, could auto-open first project if available
		} else {
			router.push(step.href);
		}
	};

	return (
		<div
			data-testid="onboarding-widget"
			className={`fixed z-50 left-4 bottom-4 md:left-4 md:bottom-4 w-[320px] max-w-full md:w-[320px] transition-opacity duration-400 ${
				fade ? "opacity-0 pointer-events-none" : "opacity-100"
			}`}
		>
			<Card className="p-4 shadow-lg border-2 border-primary bg-gray-950">
				<div className="font-semibold mb-2">Getting Started</div>
				<div className="w-full bg-gray-800 rounded h-2 mb-4">
					<div
						className="bg-green-500 h-2 rounded"
						style={{ width: `${(completed.length / STEPS.length) * 100}%` }}
					/>
				</div>
				<ul className="space-y-2 mb-4">
					{STEPS.map((step) => (
						<li key={step.key}>
							<button
								className="flex items-center gap-2 text-left w-full hover:bg-gray-900 rounded px-2 py-1 focus:outline-none"
								onClick={() => handleStepClick(step)}
								disabled={completed.includes(step.key)}
								aria-label={step.label}
							>
								{completed.includes(step.key as StepKey) ? (
									<CheckCircle className="text-green-500 w-4 h-4" aria-hidden />
								) : (
									<Circle className="text-gray-500 w-4 h-4" aria-hidden />
								)}
								<span
									className={
										completed.includes(step.key as StepKey) ? "line-through text-gray-400" : ""
									}
								>
									{step.label}
								</span>
							</button>
						</li>
					))}
				</ul>
				<Button
					variant="ghost"
					className="w-full text-xs"
					onClick={() => {
						setDismissed(true);
						localStorage.setItem("onboardingChecklistDismissed", "1");
					}}
					disabled={completed.length !== STEPS.length}
				>
					{completed.length === STEPS.length
						? "Dismiss"
						: "Dismiss (after completing all)"}
				</Button>
			</Card>
		</div>
	);
}
