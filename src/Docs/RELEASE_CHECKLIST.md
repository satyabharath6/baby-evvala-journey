# Baby Evvala Journey — Release Checklist

Last updated: July 2026  
Project: Baby Evvala Journey / Project Starlight  
Live URL: https://baby-evvala-journey.web.app

---

## 1. Public Website QA

### Home Page `/`

- [ ] Page loads without errors
- [ ] Desktop layout looks good
- [ ] Mobile layout looks good on real phone
- [ ] “Baby Evvala Journey” hero eyebrow is visible on phone
- [ ] English/Telugu language button appears
- [ ] English mode text looks correct
- [ ] Telugu mode text looks correct
- [ ] Navbar switches English/Telugu
- [ ] Hero section switches English/Telugu
- [ ] Home Letter switches English/Telugu
- [ ] Latest Journey switches English/Telugu
- [ ] Latest Gallery switches English/Telugu
- [ ] Latest Blessing switches English/Telugu
- [ ] Prediction Stats switches English/Telugu
- [ ] Countdown Widget switches English/Telugu

---

## 2. Story / Journey Page `/story`

- [ ] Page loads
- [ ] Journey memories appear in correct order
- [ ] Photos display correctly
- [ ] Videos play correctly
- [ ] English labels display correctly
- [ ] Telugu labels display correctly
- [ ] English memory content appears in English mode
- [ ] Telugu memory content appears in Telugu mode when available
- [ ] English fallback works when Telugu content is missing
- [ ] “Why this moment mattered” works in both languages
- [ ] Mobile timeline layout looks good

---

## 3. Gallery Page `/gallery`

- [ ] Page loads
- [ ] Gallery photos appear
- [ ] Lightbox opens on tap/click
- [ ] Lightbox closes correctly
- [ ] English captions appear in English mode
- [ ] Telugu captions appear in Telugu mode when available
- [ ] English fallback works when Telugu caption is missing
- [ ] Mobile layout looks good

---

## 4. Blessings Page `/blessings`

- [ ] Page loads
- [ ] English form labels display correctly
- [ ] Telugu form labels display correctly
- [ ] User can submit a blessing
- [ ] Required-field alert works
- [ ] Success message appears after submission
- [ ] Submitted blessing appears on blessings wall
- [ ] Blessings wall looks good on mobile
- [ ] Admin can later delete test blessing

---

## 5. Prediction Page `/prediction`

- [ ] Page loads
- [ ] English form labels display correctly
- [ ] Telugu form labels display correctly
- [ ] Boy/Girl buttons work
- [ ] User can submit prediction
- [ ] Required-field alert works
- [ ] Success message appears after submission
- [ ] Prediction stats update on homepage
- [ ] Admin can later delete test prediction

---

## 6. Reveal Page `/reveal`

### Reveal Disabled

- [ ] Disabled reveal screen appears when reveal is off
- [ ] English disabled message works
- [ ] Telugu disabled message works

### Countdown Mode

- [ ] Countdown appears when reveal date is in future
- [ ] Days/hours/minutes/seconds update correctly
- [ ] Countdown labels switch English/Telugu
- [ ] Mobile countdown layout looks good

### Suspense + Celebration Mode

- [ ] Suspense heartbeat stage appears after countdown completes
- [ ] Suspense text switches English/Telugu
- [ ] Celebration starts after suspense stage
- [ ] Final reveal has no glass card
- [ ] Confetti appears in foreground
- [ ] Girl reveal colors look good
- [ ] Boy reveal colors look good
- [ ] Final reveal text is readable on mobile

---

## 7. Admin Login `/admin/login`

- [ ] Login page loads
- [ ] Page design matches product style
- [ ] Google login works
- [ ] Unauthorized account shows access denied
- [ ] Approved account reaches dashboard
- [ ] Back to Website link works

Approved admin emails:

- `satyabharath6@gmail.com`
- `honeysrievvala@gmail.com`
- `satyaevvala2023@u.northwestern.edu`

---

## 8. CMS Dashboard `/admin`

- [ ] Dashboard loads
- [ ] User greeting is dynamic
- [ ] Sidebar shows logged-in user name/email
- [ ] Sign Out button works
- [ ] Stats load correctly:
  - [ ] Journey Memories
  - [ ] Gallery Photos
  - [ ] Videos
  - [ ] Blessings
  - [ ] Predictions
- [ ] Recent Activity cards show latest data
- [ ] Quick Actions links work

---

## 9. CMS Home Letter `/admin/home-letter`

- [ ] English title saves
- [ ] English body saves
- [ ] English signature saves
- [ ] Telugu title saves
- [ ] Telugu body saves
- [ ] Telugu signature saves
- [ ] Homepage displays correct language
- [ ] Fallback content works if Firestore document is missing

---

## 10. CMS Journey `/admin/timeline`

- [ ] New memory can be created
- [ ] English fields save
- [ ] Telugu fields save
- [ ] Photo upload works
- [ ] Video upload works
- [ ] Existing memory can be edited
- [ ] Existing media remains if no replacement selected
- [ ] Media can be replaced
- [ ] Old media deletes after replacement
- [ ] Memory can be deleted
- [ ] Public `/story` reflects changes

---

## 11. CMS Gallery `/admin/gallery`

- [ ] New photo can be uploaded
- [ ] English caption saves
- [ ] Telugu caption saves
- [ ] Existing photo can be edited
- [ ] Existing photo remains if no replacement selected
- [ ] Photo can be replaced
- [ ] Old photo deletes after replacement
- [ ] Photo can be deleted
- [ ] Public `/gallery` reflects changes
- [ ] Homepage Latest Gallery reflects changes

---

## 12. CMS Reveal `/admin/reveal`

- [ ] Gender setting saves
- [ ] Reveal date/time saves
- [ ] Enable Reveal works
- [ ] Disable Reveal works
- [ ] Public `/reveal` reflects settings
- [ ] Countdown works after setting future date
- [ ] Celebration works after setting past date

---

## 13. CMS Predictions `/admin/predictions`

- [ ] Predictions load
- [ ] Total count is correct
- [ ] Boy count is correct
- [ ] Girl count is correct
- [ ] Search works
- [ ] Prediction delete works
- [ ] Homepage stats update after delete

---

## 14. CMS Blessings `/admin/blessings`

- [ ] Blessings load
- [ ] Total count is correct
- [ ] Search works
- [ ] Blessing delete works
- [ ] Public blessings wall updates after delete

---

## 15. Mobile QA

Test on real phone, not only Chrome inspect.

- [ ] Home mobile layout
- [ ] Story mobile layout
- [ ] Gallery mobile layout
- [ ] Blessings mobile layout
- [ ] Prediction mobile layout
- [ ] Reveal mobile layout
- [ ] Language toggle does not cover important content
- [ ] Navbar drawer works
- [ ] Admin CMS works acceptably on mobile

---

## 16. Deployment QA

Before deploy:

```bash
npm run build
---

## 17. Security QA

### Firestore Rules

- [ ] Public users can read homepage letter
- [ ] Public users can read timeline memories
- [ ] Public users can read gallery photos metadata
- [ ] Public users can read blessings
- [ ] Public users can submit blessings
- [ ] Public users can read predictions
- [ ] Public users can submit predictions
- [ ] Public users can read `settings/revealPublic`
- [ ] Public users cannot read `settings/reveal`
- [ ] Public users cannot edit/delete timeline memories
- [ ] Public users cannot edit/delete gallery photos
- [ ] Public users cannot edit/delete blessings
- [ ] Public users cannot edit/delete predictions
- [ ] Only approved admins can access private reveal settings
- [ ] Only approved admins can publish reveal result

### Storage Rules

- [ ] Public users can view gallery images
- [ ] Public users can view timeline images
- [ ] Public users can view timeline videos
- [ ] Public users cannot upload files
- [ ] Public users cannot delete files
- [ ] Only approved admins can upload images/videos
- [ ] Only approved admins can replace images/videos
- [ ] Only approved admins can delete images/videos

### Reveal Secrecy

- [ ] Private gender is stored only in `settings/reveal`
- [ ] Public reveal page reads only `settings/revealPublic`
- [ ] Before publishing result, public document has `gender: ""`
- [ ] After publishing result, public document receives gender
- [ ] Late visitors still see suspense before final reveal
- [ ] Hide Result Again removes public gender