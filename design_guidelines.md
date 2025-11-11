# Mammoth Discord Bot - Web Admin Panel Design Guidelines

## Design Approach
**System-Based**: Material Design + Discord-inspired patterns for admin efficiency
**Key Principles**: Information hierarchy through card grouping, instant visual feedback, scan-friendly layouts, progressive disclosure for complex configurations

---

## Color System
**Primary Palette** (Discord Brand):
- Primary: #5865F2 (Discord Blurple) - Primary actions, active states, links
- Primary Hover: #4752C4 - Interactive hover states
- Primary Light: #7983F5 - Badges, highlights, accents

**Background Hierarchy** (Dark Theme):
- App Background: #1E1F22 - Main canvas
- Surface: #2B2D31 - Cards, panels, elevated surfaces
- Surface Elevated: #313338 - Modals, dropdowns, hover states
- Borders: #3F4147 - Dividers, input borders

**Semantic Colors**:
- Success: #3BA55D (Green) - Confirmations, positive states
- Warning: #FAA81A (Yellow) - Caution indicators
- Danger: #ED4245 (Red) - Destructive actions, errors
- Info: #00AFF4 (Blue) - Information, neutral notifications

**Text Hierarchy**:
- Primary Text: #F2F3F5 - Headings, important content
- Secondary Text: #B5BAC1 - Body text, descriptions
- Muted Text: #80848E - Captions, helper text, timestamps

---

## Typography System
**Font Stack**: Inter (UI), JetBrains Mono (code/commands)
- Display: text-3xl/4xl font-bold - Dashboard headers
- Headings: text-xl/2xl font-semibold - Card headers, modal titles
- Body: text-base font-normal - Settings, table content
- Labels: text-sm font-medium - Form labels, badges
- Caption: text-xs font-normal - Helper text, timestamps
- Monospace: text-sm font-mono - Commands, IDs, technical data

---

## Layout System
**Spacing Scale**: Tailwind units **2, 4, 6, 8, 12, 16**
- Component padding: p-4 to p-6
- Section spacing: gap-6 to gap-8
- Page margins: p-8 to p-12
- Card spacing: space-y-6

**Grid Structure**:
- Sidebar (w-64, fixed) + Main content (flex-1)
- Settings: Single column max-w-4xl
- Stats: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Lists: Full-width with max-w-6xl container

---

## Component Library

### Navigation
**Sidebar**: Fixed left, Surface background, logo top (h-16 p-4), grouped nav items with icons, active state uses Primary color, collapsible sub-sections

**Top Bar**: Server selector (left), search (center, max-w-md), user profile + notifications (right), Surface Elevated background, border-b with Borders color

### Cards & Surfaces
**Primary Cards**: Surface background, rounded-lg, shadow-lg, header with title + action button, content p-6, subtle border with Borders color

**Stat Cards**: Surface background, large metric (text-3xl Primary Text), label (Secondary Text), trend indicator with Success/Danger color

### Forms & Inputs
**Input Fields**: Surface Elevated background, Borders color border, h-10 px-4 rounded-md, Primary Text text, focus ring with Primary color

**Toggles/Switches**: Primary color when active, Surface Elevated when inactive, smooth transitions

**Specialized Inputs**: Channel selector with # prefix icon, role picker with colored dots, emoji picker integration, rich text editor for embeds

### Data Display
**Tables**: Surface background, alternating row (Surface Elevated on hover), sticky header, Borders color dividers, pagination centered bottom

**Message Preview**: Discord-style card with Surface Elevated background, embed color stripe (Primary), button layout preview with action indicators

**Moderation Logs**: Timeline view, user avatars, timestamps (Muted Text), expandable details, action type badges (Semantic colors)

### Buttons & Actions
**Primary**: Primary background, white text, px-6 h-10 rounded-md font-medium, Primary Hover on hover
**Secondary**: Surface Elevated background, Primary Text, Borders border, hover to Surface elevated
**Danger**: Danger background for destructive actions, clear confirmation dialogs
**Icon Buttons**: w-10 h-10 rounded-md, Surface Elevated background on hover

### Modals & Overlays
**Modal**: Centered, backdrop blur with dark overlay, Surface Elevated background, max-w-2xl (standard) or max-w-4xl (complex forms), header with close button, content p-6, footer with actions

**Toast Notifications**: Top-right corner, Surface Elevated background, Semantic color accent strip, icon + message + close button

### Special Components
**Button Message Creator**: Drag-and-drop arrangement, action type selector (role/DM/link), live Discord-style preview card, template gallery grid

**Command Manager**: Searchable list, toggle enable/disable with Primary color, slide-in edit panel from right, custom command builder

**Reaction Roles**: Emoji + role pairing interface, add/remove actions, preview message display

---

## Page Layouts

### Dashboard Home
Stats grid (4 columns), recent activity feed (2 columns: logs + new members), quick actions cards, welcome header with server icon

### Message Creator
Left panel: Form inputs (channel, content, embed builder), right panel: Live preview (Discord-style), bottom: Button designer with drag-drop arrangement

### Moderation Center
Filter bar top, expandable log table, sidebar with quick stats, bulk action toolbar

### Settings
Tabbed navigation (General/Moderation/Automation/Roles), single-column forms, save button fixed bottom-right, unsaved changes indicator

### Member Management
Member table with avatars/roles/join dates, search and role filters, bulk actions toolbar, detail slide-out panel from right

---

## Responsive Strategy
- Desktop (lg+): Full sidebar + content
- Tablet (md): Collapsible sidebar
- Mobile: Bottom nav bar, stacked layouts, drawer for settings

---

## Accessibility
Focus indicators (ring-2 with Primary color), keyboard navigation (Tab/Enter/Escape), screen reader labels for icon buttons, loading states (skeleton screens for tables, spinners for actions), clear success/error feedback