# AI-Powered Travel Recommendation MVP - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from Airbnb's aspirational travel aesthetic, Pinterest's discovery patterns, and Booking.com's trustworthy UI. This creates a visually rich, engagement-focused experience where AI recommendations feel personalized and exciting.

**Core Principle**: Make AI visible and human - the interface should feel intelligent yet approachable, with visual hierarchy that guides users through discovery to booking.

---

## Color Palette

### Light Mode
- **Primary Brand**: 16 85% 50% (vibrant travel blue - trust & adventure)
- **Primary Hover**: 16 85% 45%
- **Background**: 0 0% 100% (pure white for content clarity)
- **Surface**: 210 20% 98% (subtle gray for cards)
- **Border**: 220 13% 91%
- **Text Primary**: 222 47% 11%
- **Text Secondary**: 215 16% 47%
- **AI Accent**: 280 65% 60% (purple for AI reasoning - distinct from booking actions)
- **Success/Like**: 142 76% 36%
- **Warning/Skip**: 25 95% 53%

### Dark Mode
- **Primary Brand**: 16 85% 55%
- **Background**: 222 47% 11%
- **Surface**: 217 33% 17%
- **Border**: 217 33% 24%
- **Text Primary**: 210 20% 98%
- **Text Secondary**: 215 20% 65%
- **AI Accent**: 280 65% 65%

---

## Typography

**Font Families** (Google Fonts):
- **Primary (UI)**: 'Inter' - clean, modern, excellent readability
- **Display (Headlines)**: 'Cal Sans' or 'Inter' at heavier weights (600-700)

**Scale**:
- Hero Headlines: text-4xl lg:text-5xl font-bold
- Section Headers: text-2xl lg:text-3xl font-semibold
- Card Titles: text-lg font-semibold
- AI Reasoning Text: text-sm font-medium (slightly emphasized)
- Body Text: text-base
- Meta Info: text-sm text-secondary

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16 consistently
- Micro spacing (card internals): p-4, gap-2
- Component spacing: p-6, gap-4
- Section spacing: py-12 lg:py-16, px-4 lg:px-8
- Container max-width: max-w-7xl mx-auto

**Grid System**:
- Masonry Feed: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Responsive breakpoints: Mobile-first, tablet at md:, desktop at lg:

---

## Component Library

### Navigation (Existing App Integration)
- Sticky header with subtle shadow on scroll
- Search bar prominence with AI tab highlighted
- "✨ Discover with AI" as accent-colored CTA button
- Height: h-16, backdrop-blur for overlay effect

### AI Context Bar
- Background: gradient from primary/10 to transparent
- Rounded container: rounded-2xl with p-6
- Filter chips: inline-flex items with rounded-full, px-4 py-2
- Chip states: outline default, filled when active (primary color)

### Destination Cards (Core Component)
- Structure: Stacked image → content → actions
- Image: aspect-[4/3] with rounded-t-xl, hover scale-105 transition
- Content padding: p-5
- AI Reasoning: bg-purple/10 rounded-lg px-3 py-1.5 with icon
- Reason format: Icon + "Because you loved [X] and [Y]"
- Shadow: shadow-md hover:shadow-xl transition-shadow
- Border: border border-border (subtle)

### Action Buttons on Cards
- Icon buttons: Like (heart), Skip (x), View Stays (arrow)
- Layout: flex justify-between items-center
- Size: h-10 w-10 rounded-full
- Like active state: filled heart with success color
- Primary CTA: "View Stays" as full-width button at card bottom

### Regenerate Section
- Centered layout with icon animation
- Button: Large (px-8 py-4), rounded-full, with loading spinner
- Text: "🔁 Generate New Recommendations" 
- Loading state: Shimmer effect with "AI is thinking..." text

### Feedback Overlay (Micro-interaction)
- Modal: max-w-md, centered, backdrop-blur-sm
- Card: rounded-2xl with shadow-2xl
- Quick actions: Large touch targets (min-h-12)
- Slider: Custom styled with AI accent color
- Dismissible with subtle close button

### Destination Detail Modal (Optional)
- Full-screen on mobile, max-w-4xl centered on desktop
- Hero image: h-64 lg:h-96 with gradient overlay for text
- AI Summary: Highlighted box with purple accent border
- Stays grid: 3-column on desktop, scroll on mobile
- CTA: Sticky bottom bar on mobile, inline on desktop

---

## Images

**Image Strategy**: Critical for travel discovery - images are the primary engagement driver

### Image Specifications:
1. **Hero Sections**: 
   - Large format: min-h-screen/2 with gradient overlay
   - Aspirational travel photography showing destinations
   - Position: Use as background with text overlay

2. **Destination Cards**:
   - High-quality photos: 1200x900px minimum
   - Focus: Iconic views, experiences, local culture
   - Treatment: Subtle filter for consistency, rounded corners

3. **Feed Grid Images**:
   - Variety: Mix landscapes, cultural moments, accommodations
   - Aspect ratio: Consistent 4:3 for grid harmony
   - Loading: Progressive with blur-up placeholder

4. **Detail Page**:
   - Hero banner: Wide panoramic shot of destination
   - Stay thumbnails: 3-4 property photos
   - Gallery: Swipeable carousel for mobile

**Image Placement**:
- Homepage: Background hero with search overlay
- AI Recommendations Page: Grid of destination cards (each with featured image)
- Detail Modal: Hero image + gallery grid
- No large hero on AI feed page - lead directly with content and cards

---

## Animations & Interactions

**Minimal, Purposeful Motion**:
- Card hover: Scale 1.02, shadow elevation (200ms ease)
- Like interaction: Heart fills with success color + scale bounce
- Regenerate: Shimmer loading effect, cards fade-in stagger (100ms delay each)
- Page transitions: Subtle fade, no slides
- Filter chips: Background color transition (150ms)

**AI Thinking State**:
- Pulsing icon during regeneration
- Skeleton cards with gradient animation
- "Generating..." text with ellipsis animation

---

## AI-Specific Design Elements

### Reasoning Display
- **Visual treatment**: Subtle background (purple/10), rounded corners
- **Icon**: Sparkle/star to indicate AI insight
- **Typography**: Medium weight, slightly smaller than title
- **Format**: "Because you [pattern 1] and [pattern 2]"
- **Placement**: Between destination info and CTA

### Personalization Indicators
- Badge: "Recommended for you" with gradient background
- Confidence score: Star rating or percentage (subtle, optional)
- Match reasons: Up to 2 key factors displayed

### Feedback UI
- Thumbs up/down: Large touch targets, immediate visual feedback
- Relevance slider: Track shows gradient, thumb is prominent
- Confirmation: Toast notification "Thanks! This helps us improve"

---

## Responsive Behavior

**Mobile (< 768px)**:
- Single column feed
- Full-width cards with vertical image
- Sticky regenerate button at bottom
- Collapsible filters (drawer pattern)

**Tablet (768px - 1024px)**:
- 2-column masonry grid
- Expanded filter chips inline
- Modal dialogs at 90% width

**Desktop (> 1024px)**:
- 3-column masonry grid
- Hover states active
- Side-by-side detail layouts
- Larger imagery showcase

---

## Accessibility & Quality Standards

- Color contrast: WCAG AA minimum (4.5:1 text, 3:1 UI)
- Focus states: Prominent outline (ring-2 ring-primary ring-offset-2)
- Dark mode: Full consistency including form inputs
- Touch targets: Minimum 44x44px on mobile
- Alt text: Descriptive for all destination images
- Keyboard navigation: Full support with visible focus
- Screen reader: ARIA labels for AI reasoning and actions

---

## Key Differentiators

1. **AI Visibility**: Purple accent consistently marks AI-generated content
2. **Visual Hierarchy**: Images lead, AI reasoning supports, CTAs are clear
3. **Trust Building**: Show why recommendations matter through transparent reasoning
4. **Engagement Loop**: Like/Skip feedback feels natural, not forced
5. **Aspiration**: Photography and spacing create desire to explore and book