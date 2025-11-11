import { AppHeaderItem, AppNavItem } from '../../../types';
// FIX: Added CubeIcon to imports to resolve missing component error.
import {
    ClipboardListIcon, SparklesIcon, DocumentReportIcon, FilmIcon,
    WandIcon, PaintBrushIcon, UserGroupIcon, ArrowRightCircleIcon,
    MusicalNoteIcon, DocumentTextIcon, CpuChipIcon, ShareIcon,
    CodeBracketIcon, BugAntIcon, PuzzlePieceIcon, CommandLineIcon,
    TableCellsIcon, PresentationChartLineIcon, DocumentPlusIcon,
    PencilIcon, PhotoIcon, ArrowUpTrayIcon, CalculatorIcon, ChartBarIcon,
    CogIcon, AcademicCapIcon, RectangleStackIcon, PresentationChartBarIcon,
    CursorArrowRaysIcon, BriefcaseIcon, CubeIcon,
} from '../../../icons';

export const CREATIVE_STUDIO_HEADER_ITEMS: AppHeaderItem[] = [
    { id: 'designer', label: 'Designer' },
    { id: 'video', label: 'Video' },
    { id: 'coder', label: 'Coder' },
    { id: 'office', label: 'Office' },
];

export const DESIGNER_NAV: AppNavItem[] = [
    { id: 'canvas', label: 'Canvas & Templates', icon: ClipboardListIcon, children: [
        { id: 'blank_canvas', label: 'Blank Canvas', icon: DocumentPlusIcon },
        { id: 'social_media', label: 'Social Media', icon: ShareIcon },
        { id: 'print', label: 'Print Templates', icon: DocumentTextIcon },
    ]},
    { id: 'elements', label: 'Design Elements', icon: SparklesIcon, children: [
        { id: 'photos', label: 'Photos', icon: PhotoIcon },
        { id: 'graphics', label: 'Graphics', icon: SparklesIcon },
        { id: 'shapes', label: 'Shapes', icon: RectangleStackIcon },
    ]},
    { id: 'text', label: 'Text & Typography', icon: DocumentReportIcon, children: [
        { id: 'text_styles', label: 'Text Styles', icon: PencilIcon },
        { id: 'font_combos', label: 'Font Combinations', icon: PencilIcon },
    ]},
    { id: 'brand', label: 'Brand & Style', icon: PaintBrushIcon, children: [
        { id: 'brand_colors', label: 'Brand Colors', icon: PaintBrushIcon },
        { id: 'logo_maker', label: 'Logo Maker', icon: SparklesIcon },
    ]},
    { id: 'collab', label: 'Collaboration', icon: UserGroupIcon, children: [
        { id: 'share_comment', label: 'Share & Comment', icon: ShareIcon },
        { id: 'real_time', label: 'Real-time Editing', icon: UserGroupIcon },
    ]},
];

export const VIDEO_NAV: AppNavItem[] = [
    { id: 'timeline', label: 'Timeline & Editing', icon: FilmIcon, children: [
        { id: 'multi_track', label: 'Multi-track Timeline', icon: FilmIcon },
        { id: 'cut_trim', label: 'Cut & Trim', icon: PencilIcon },
    ]},
    { id: 'effects', label: 'Effects & Filters', icon: SparklesIcon, children: [
        { id: 'video_filters', label: 'Video Filters', icon: SparklesIcon },
        { id: 'color_grading', label: 'Color Grading', icon: PaintBrushIcon },
    ]},
    { id: 'transitions', label: 'Transitions', icon: ArrowRightCircleIcon, children: [
        { id: 'smooth', label: 'Smooth Transitions', icon: ArrowRightCircleIcon },
        { id: '3d', label: '3D Transitions', icon: CubeIcon },
    ]},
    { id: 'audio', label: 'Audio & Music', icon: MusicalNoteIcon, children: [
        { id: 'bg_music', label: 'Background Music', icon: MusicalNoteIcon },
        { id: 'sfx', label: 'Sound Effects', icon: MusicalNoteIcon },
    ]},
    { id: 'ai-video', label: 'AI Video Tools', icon: CpuChipIcon, children: [
        { id: 'auto_cut', label: 'Auto Cut', icon: CpuChipIcon },
        { id: 'scene_detection', label: 'Scene Detection', icon: CpuChipIcon },
    ]},
];

export const CODER_NAV: AppNavItem[] = [
    { id: 'editor', label: 'Code Editor', icon: CodeBracketIcon, children: [
        { id: 'intellisense', label: 'IntelliSense', icon: CodeBracketIcon },
        { id: 'multi_cursor', label: 'Multi-cursor', icon: PencilIcon },
    ]},
    { id: 'ai-assistant', label: 'AI Coding Assistant', icon: SparklesIcon, children: [
        { id: 'code_gen', label: 'Code Generation', icon: SparklesIcon },
        { id: 'bug_detection', label: 'Bug Detection', icon: BugAntIcon },
    ]},
    { id: 'debug', label: 'Debugging & Testing', icon: BugAntIcon, children: [
        { id: 'breakpoints', label: 'Breakpoints', icon: BugAntIcon },
        { id: 'console', label: 'Debug Console', icon: CommandLineIcon },
    ]},
    { id: 'extensions', label: 'Extensions & Tools', icon: PuzzlePieceIcon, children: [
        { id: 'marketplace', label: 'Marketplace', icon: PuzzlePieceIcon },
        { id: 'themes', label: 'Themes', icon: PaintBrushIcon },
    ]},
];

export const OFFICE_NAV: AppNavItem[] = [
    { id: 'word', label: 'Word', icon: DocumentReportIcon, children: [
        { id: 'doc_creation', label: 'Document Creation', icon: DocumentPlusIcon },
        { id: 'text_editing', label: 'Text Editing', icon: PencilIcon },
        { id: 'formatting', label: 'Formatting & Design', icon: PaintBrushIcon },
        { id: 'ai_writing', label: 'AI Writing Tools', icon: SparklesIcon },
    ]},
    { id: 'excel', label: 'Excel', icon: TableCellsIcon, children: [
        { id: 'data_management', label: 'Data Management', icon: TableCellsIcon },
        { id: 'formulas', label: 'Formulas & Functions', icon: CalculatorIcon },
        { id: 'charts', label: 'Charts & Visualization', icon: ChartBarIcon },
        { id: 'ai_analytics', label: 'AI Analytics', icon: CpuChipIcon },
    ]},
    { id: 'powerpoint', label: 'PowerPoint', icon: PresentationChartLineIcon, children: [
        { id: 'slide_design', label: 'Slide Design', icon: RectangleStackIcon },
        { id: 'content_creation', label: 'Content Creation', icon: DocumentPlusIcon },
        { id: 'presentation_tools', label: 'Presentation Tools', icon: PresentationChartBarIcon },
        { id: 'ai_presentation', label: 'AI Presentation', icon: SparklesIcon },
    ]},
];

export const CREATIVE_STUDIO_NAV_MAP: { [key: string]: AppNavItem[] } = {
    designer: DESIGNER_NAV,
    video: VIDEO_NAV,
    coder: CODER_NAV,
    office: OFFICE_NAV,
};