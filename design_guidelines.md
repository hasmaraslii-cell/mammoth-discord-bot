# Mammoth Discord Bot - Web Admin Panel Design Guidelines

## Design Approach

**Selected Approach**: Design System (Material Design + Discord-inspired patterns)

**Justification**: Admin dashboard for bot management requires clarity, efficiency, and familiar patterns. Drawing from Material Design's component library with Discord's approachable aesthetic (rounded corners, card-based layouts, modern typography).

**Key Principles**:
- Information hierarchy through card grouping and spacing
- Instant visual feedback for all actions
- Scan-friendly layouts for settings and data tables
- Progressive disclosure for complex configurations

---

## Typography System

**Font Stack**: Inter (primary UI), JetBrains Mono (code/command display)
- **Display**: text-3xl to text-4xl, font-bold (Dashboard headers, section titles)
- **Headings**: text-xl to text-2xl, font-semibold (Card headers, modal titles)
- **Body**: text-base, font-normal (Settings descriptions, table content)
- **Labels**: text-sm, font-medium (Form labels, badges)
- **Caption**: text-xs, font-normal (Helper text, timestamps)
- **Monospace**: Commands, IDs, technical data (text-sm, font-mono)

---

## Layout System

**Spacing Scale**: Use Tailwind units of **2, 4, 6, 8, 12, 16** consistently
- Component padding: p-4 to p-6
- Section spacing: gap-6 to gap-8
- Page margins: p-8 to p-12
- Card spacing: space-y-6

**Grid Structure**:
- Dashboard layout: Sidebar (w-64) + Main content (flex-1)
- Settings panels: Single column max-w-4xl for forms
- Stats overview: 2-4 column grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Command/message lists: Full-width with max-w-6xl container

---

## Component Library

### Navigation
**Sidebar Navigation** (Fixed, left-aligned):
- Logo + bot name at top (h-16, p-4)
- Navigation groups with section headers
- Icon + label for each item (h-10, px-4, rounded-lg)
- Active state: Distinct treatment with icon emphasis
- Collapsible sections for sub-navigation

**Top Bar**:
- Server selector dropdown (left)
- Search bar (center, max-w-md)
- User profile + notifications (right)

### Cards & Panels
**Primary Card Structure**:
- Rounded corners (rounded-lg)
- Shadow elevation (shadow-md)
- Header with title + action button
- Content area with consistent p-6
- Footer with secondary actions if needed

**Settings Cards**: 
- Switch/toggle controls aligned right
- Input fields with full-width design
- Help text below each setting (text-sm)

### Forms & Inputs
**Form Layout**:
- Vertical stacking with space-y-4
- Labels above inputs (text-sm, font-medium, mb-2)
- Full-width inputs (w-full, h-10, px-4, rounded-md)
- Inline validation messages below fields
- Action buttons right-aligned in footer

**Specialized Inputs**:
- Channel selector with icon prefix
- Role picker with color indicator dots
- Emoji picker button integration
- Rich text editor for embed messages

### Data Display
**Tables**:
- Full-width with alternating row treatment
- Sticky header for scrollable content
- Icon + text for actions column
- Pagination at bottom (centered)
- Quick filters above table

**Message Builder Preview**:
- Live preview card showing Discord-style message
- Button layout preview with action indicators
- Embed builder with color strip

**Moderation Logs**:
- Timeline view with timestamps
- User avatar + action description
- Expandable details for each entry
- Filter by action type, user, date

### Buttons & Actions
**Primary Actions**: px-6, h-10, rounded-md, font-medium
**Secondary Actions**: Outlined variant with hover states
**Danger Actions**: Distinct treatment for destructive operations
**Icon Buttons**: w-10, h-10, rounded-md for compact actions

### Modals & Overlays
**Modal Structure**:
- Centered overlay with backdrop blur
- max-w-2xl for standard modals
- max-w-4xl for complex forms (message builder)
- Header with title + close button
- Content area with p-6
- Footer with action buttons

**Confirmation Dialogs**: 
- Compact max-w-md size
- Clear danger indicators for destructive actions

### Special Components
**Button Message Creator**:
- Drag-and-drop button arrangement
- Action type selector (Role/DM/Link)
- Live Discord-style preview
- Template gallery view

**Dashboard Stats**:
- Metric cards with large numbers (text-3xl)
- Trend indicators with icons
- Mini charts for activity over time

**Command Manager**:
- Searchable command list
- Toggle to enable/disable commands
- Edit panel slides in from right
- Custom command builder form

---

## Page Layouts

### Dashboard Home
- Welcome header with server icon and name
- 4-column stats grid (members, commands used, moderation actions, uptime)
- Recent activity feed (2-column: logs + new members)
- Quick actions cards

### Message Creator
- Left panel: Form inputs (channel, content, embed builder)
- Right panel: Live preview
- Bottom: Button designer with action configuration

### Settings
- Tabbed navigation for categories (General, Moderation, Automation, Roles)
- Single-column form layout
- Save button fixed at bottom-right
- Changes indicator

### Moderation Center
- Filter bar at top
- Main log table with expandable rows
- Sidebar with quick stats and filters
- Action toolbar for bulk operations

### Member Management
- Member list with avatar, roles, join date
- Search and role filter
- Bulk actions toolbar
- Member detail slide-out panel

---

## Responsive Strategy
- **Desktop (lg+)**: Full sidebar + content layout
- **Tablet (md)**: Collapsible sidebar, full features maintained
- **Mobile**: Bottom nav bar, stacked layouts, drawer for settings

---

## Accessibility & Interactions
- Keyboard navigation for all actions (Tab, Enter, Escape)
- Focus indicators on all interactive elements (ring-2 treatment)
- Screen reader labels for icon-only buttons
- Success/error toast notifications (top-right corner)
- Loading states for async operations (skeleton screens for tables, spinners for actions)