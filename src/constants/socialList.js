import { FaGithub, FaTelegramPlane } from "react-icons/fa";
import { Mail } from "lucide-react"

export const SOCIAL_LIST = [
	{ path: "https://github.com", iconComponent: FaGithub, isExternal: true },
	{ path: "https://telegram.org", iconComponent: FaTelegramPlane, isExternal: true },
	{ path: "/contact", iconComponent: Mail, isExternal: false }
]