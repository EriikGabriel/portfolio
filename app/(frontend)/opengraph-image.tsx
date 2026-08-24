import { siteMetadata, siteUrl } from "@utils/site";
import { ImageResponse } from "next/og";

export const alt = siteMetadata.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: 24,
					background: "linear-gradient(135deg, #0d0b08 0%, #1c150b 100%)",
					borderTop: "8px solid #f97316",
				}}
			>
				<div
					style={{
						display: "flex",
						fontSize: 88,
						fontWeight: 700,
						color: "#fafaf9",
						letterSpacing: -2,
					}}
				>
					{siteMetadata.name}
				</div>
				<div
					style={{
						display: "flex",
						fontSize: 44,
						color: "#f97316",
					}}
				>
					{siteMetadata.role}
				</div>
				<div
					style={{
						display: "flex",
						fontSize: 28,
						color: "#78716c",
						marginTop: 24,
					}}
				>
					{siteUrl.replace(/^https?:\/\//, "")}
				</div>
			</div>
		),
		size,
	);
}
