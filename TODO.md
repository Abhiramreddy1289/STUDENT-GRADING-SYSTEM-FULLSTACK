# Student Grading System Frontend UX Improvements - TODO

## Status: In Progress

### Phase 1: Setup & Dependencies ✅
- [x] Install react-icons
- [ ] Test dev server: `npm run dev`

### Phase 2: Create Reusable Components (in `frontend/src/components/`)
- [x] Button.jsx (primary/secondary/danger/loading variants)
- [x] Input.jsx (w/ label, validation states: error/success)
- [x] Spinner.jsx (inline/overlay loader)
- [x] NotificationProvider.jsx + useNotification hook (toasts)
- [x] Table.jsx (responsive, search/sort/pagination)
- [x] Card.jsx (stat cards, results)
- [x] Header.jsx (responsive nav w/ hamburger mobile)
- [x] Modal.jsx (confirm dialogs)

### Phase 3: Global Enhancements ✅
- [x] Update AuthContext.jsx 
- [x] Update App.jsx → Header + NotificationProvider
- [x] Enhance App.css → responsive, CSS vars

### Phase 4: Page Refactors (replace inline/alert → components/notify)
- [x] Dashboard.jsx → Table + search
- [x] PublicStudentView.jsx → Spinner + notify
- [x] AddStudent.jsx, ManageGrades.jsx → Input/Button + validation
- [x] Login.jsx → Input/Button + remove hardcoded admin?
- [x] AdminView.jsx → responsive cards
- [x] StudentView.jsx → stats + Table

### Phase 5: Final Polish & Test
- [ ] Add icons (react-icons) everywhere
- [ ] Real-time form validation (regex/email/password match)
- [ ] Empty states w/ illustrations
- [ ] Test mobile/responsiveness
- [ ] Remove all alert/console.error → notify()
- [ ] attempt_completion

Updated on each step completion.
