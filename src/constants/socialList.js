import { FaGithub, FaTelegramPlane } from "react-icons/fa";
import { Mail } from "lucide-react"

export const SOCIAL_LIST = [
	{ path: "https://github.com", iconComponent: FaGithub, isExternal: true, size: 20 },
	{ path: "https://telegram.org", iconComponent: FaTelegramPlane, isExternal: true, size: 20 },
	{ path: "/contact", iconComponent: Mail, isExternal: false, size: 20 }
]