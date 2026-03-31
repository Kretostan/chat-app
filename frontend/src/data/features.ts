import ChatBubbleIcon from "@/assets/chat-bubble.svg?react";
import FolderIcon from "@/assets/folder.svg?react";
import LightningIcon from "@/assets/lightning.svg?react";
import LockIcon from "@/assets/lock.svg?react";
import VideoCameraIcon from "@/assets/video-camera.svg?react";
import WebIcon from "@/assets/web.svg?react";
import type { Feature } from "@/types";

export const FEATURES: Feature[] = [
	{
		id: "messaging",
		title: "Real-time Messaging",
		text: "Instant messaging with typing indicators, read receipts, and seamless synchronization across all devices.",
		Icon: ChatBubbleIcon,
		iconSize: 48,
	},
	{
		id: "file sharing",
		title: "File Sharing",
		text: "Share documents, images, and files effortlessly with drag-and-drop functionality and preview support.",
		Icon: FolderIcon,
		iconSize: 40,
	},
	{
		id: "video calls",
		title: "Video Calls",
		text: "High-quality video conferencing with screen sharing, recording, and up to 100 participants.",
		Icon: VideoCameraIcon,
		iconSize: 48,
	},
	{
		id: "security",
		title: "Enterprise security",
		text: "End-to-end encryption, SSO integration, and compliance with industry security standards.",
		Icon: LockIcon,
		iconSize: 38,
	},
	{
		id: "cross platform",
		title: "Cross-platform",
		text: "Available on desktop, mobile, and web with seamless synchronization and offline support.",
		Icon: WebIcon,
		iconSize: 40,
	},
	{
		id: "integrations",
		title: "Integrations",
		text: "Connect with your favorite tools and services to streamline your workflow and boost productivity.",
		Icon: LightningIcon,
		iconSize: 38,
	},
];
