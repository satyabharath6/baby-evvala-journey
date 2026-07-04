# Firestore Schema

## Purpose

This document defines the Firestore database structure for Baby Evvala Journey.

Every collection, document and field should be documented here before implementation.

---

# Collections

## gallery

Stores journey photographs.

Fields

- imageUrl
- caption
- createdAt

---

## timeline

Stores milestones.

Fields

- emoji
- title
- date
- description
- imageUrl (planned)
- location (planned)

---

## blessings

Stores family blessings.

Fields

- name
- city
- message
- submittedAt

---

## predictions

Stores gender predictions.

Fields

- name
- relationship
- city
- gender
- birthDate
- babyName
- message
- submittedAt

---

## settings

Document: reveal

Fields

- enabled
- revealDate
- gender

---

# Planned Collections

## memoryCapsule

Letters to Baby Evvala.

Locked until a future date.

---

## familyMap

Stores blessing locations.

---

## notifications

Future push notifications.

---

## analytics

Website statistics.

---

# Rules

Never change a collection structure without updating this document first.

Schema changes are architectural decisions.