# 🏛 Project Starlight Architecture

## Philosophy

The project is built using a layered architecture.

Pages never talk directly to Firebase when reusable logic exists.

The flow is:

```
Firebase
     ↓
Services
     ↓
Hooks
     ↓
Widgets / Features
     ↓
Pages
```

---

# Folder Structure

```
src/

components/
    ui/
    widgets/

hooks/

pages/

services/

styles/

types/

firebase.ts
```

---

# UI Layer

Reusable UI building blocks.

Examples:

- GlassCard
- Section
- PrimaryButton
- PageHeader
- Modal (future)

UI components contain no business logic.

---

# Widgets

Reusable feature blocks.

Examples:

- HomeLetter
- LatestGallery
- LatestBlessing
- PredictionStats
- CountdownWidget

Widgets may use hooks.

Widgets should not communicate directly with Firestore.

---

# Hooks

Hooks contain business logic.

Examples:

- useHomeLetter
- usePredictionStats
- useRandomBlessing
- useRevealSettings

Hooks should not contain presentation.

---

# Services

Services communicate with Firebase.

Examples:

- homeLetterService
- predictionService
- uploadService
- revealService

All Firestore queries belong here whenever possible.

---

# Types

Shared TypeScript models.

Examples:

- Prediction
- Blessing
- TimelineEvent
- RevealSettings

---

# Public Website

Purpose:

Tell Baby ఇవ్వల's story.

Primary audience:

Family and friends.

---

# CMS

Purpose:

Allow Honey and Satya to manage content.

Primary audience:

Administrators.

---

# Design Rules

- Mobile first
- Reusable UI
- No duplicated Firebase logic
- No duplicated upload logic
- No business logic inside UI components
- Prefer hooks over inline calculations
- Keep pages thin

---

# Motto

"Components display.
Hooks think.
Services fetch."