// Import all the icons from react-icons libraries
import { ImTextColor } from 'react-icons/im';
import { FiBold, FiItalic, FiUnderline, FiImage, FiVideo, FiLink, FiCode, FiSave, FiEye, FiDelete, FiSmile } from 'react-icons/fi';
import { CiTextAlignCenter, CiTextAlignLeft, CiTextAlignRight, CiImageOn, CiVideoOn } from 'react-icons/ci';
import { RiCloseFill } from 'react-icons/ri';
import { MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";

// Export all icons as reusable components
export const CloseIcon = (props) => <RiCloseFill {...props} />;
export const TextColorIcon = (props) => <ImTextColor {...props} />;
export const BoldIcon = (props) => <FiBold {...props} />;
export const ItalicIcon = (props) => <FiItalic {...props} />;
export const UnderlineIcon = (props) => <FiUnderline {...props} />;
export const ImageIcon = (props) => <FiImage {...props} />;
export const VideoIcon = (props) => <FiVideo {...props} />;
export const LinkIcon = (props) => <FiLink {...props} />;
export const CodeIcon = (props) => <FiCode {...props} />;
export const SaveIcon = (props) => <FiSave {...props} />;
export const EyeIcon = (props) => <FiEye {...props} />;
export const DeleteIcon = (props) => <FiDelete {...props} />;
export const SmileIcon = (props) => <FiSmile {...props} />;
export const calender = (props) => <FiCalendar {...props} />;
export const User = (props) => <FiUser {...props} />;
export const Category = (props) => <BiCategory {...props} />;

// Text alignment and media icons
export const AlignCenterIcon = (props) => <CiTextAlignCenter {...props} />;
export const Bulletpoint = (props) => <MdFormatListBulleted {...props} />;
export const Numbering = (props) => <MdFormatListNumbered {...props} />;
export const AlignLeftIcon = (props) => <CiTextAlignLeft {...props} />;
export const AlignRightIcon = (props) => <CiTextAlignRight {...props} />;
export const ImageOnIcon = (props) => <CiImageOn {...props} />;
export const VideoOnIcon = (props) => <CiVideoOn {...props} />;
