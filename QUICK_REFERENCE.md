# Form Builder - Quick Reference

## Control Types Reference

### 1. Text Input 📝
**Use for**: Single line text (names, emails, etc.)
```typescript
{
  id: 1,
  type: "text",
  name: "firstName",
  label: "First Name",
  placeholder: "Write First Name",
  isRequired: true
}
```

### 2. Date Picker 📅
**Use for**: Single date selection
```typescript
{
  id: 2,
  type: "date",
  name: "birthDate",
  label: "Birth Date",
  placeholder: "",
  isRequired: true
}
```

### 3. Date Range 📆
**Use for**: Date range with start and end
```typescript
{
  id: 3,
  type: "dateRange",
  name: "projectDuration",
  label: "Project Duration",
  placeholder: "",
  isRequired: false
}
```
*Note: Creates two date inputs (start_date and end_date)*

### 4. Text Area 📄
**Use for**: Multi-line text (comments, descriptions)
```typescript
{
  id: 4,
  type: "textarea",
  name: "description",
  label: "Description",
  placeholder: "Write Description",
  isRequired: false
}
```

### 5. Dropdown List 📋
**Use for**: Single selection from multiple options
```typescript
{
  id: 5,
  type: "dropdown",
  name: "department",
  label: "Department",
  placeholder: "Select Department",
  options: [
    { label: "IT", value: "it" },
    { label: "HR", value: "hr" },
    { label: "Sales", value: "sales" }
  ],
  isRequired: true
}
```

### 6. Radio Button 🔘
**Use for**: Single selection (visible options)
```typescript
{
  id: 6,
  type: "radio",
  name: "gender",
  label: "Gender",
  placeholder: "",
  options: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ],
  isRequired: true
}
```

### 7. Checkbox ☑️
**Use for**: Multiple selection
```typescript
{
  id: 7,
  type: "checkbox",
  name: "skills",
  label: "Skills",
  placeholder: "",
  options: [
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "Angular", value: "angular" }
  ],
  isRequired: false
}
```

### 8. File Upload 📎
**Use for**: File attachments
```typescript
{
  id: 8,
  type: "file",
  name: "resume",
  label: "Resume",
  placeholder: "",
  isRequired: true
}
```

## Naming Conventions

### Control Name (camelCase)
- First word lowercase, subsequent words capitalized
- No spaces or special characters
- Examples:
  - ✅ `userName`
  - ✅ `businessUnit`
  - ✅ `dateOfBirth`
  - ❌ `user_name`
  - ❌ `UserName`
  - ❌ `user name`

### Control Label (Title Case)
- Proper spacing and capitalization
- User-friendly display text
- Examples:
  - ✅ `User Name`
  - ✅ `Business Unit`
  - ✅ `Date of Birth`

### Placeholder (Action Guide)
- Clear instruction for user
- Examples:
  - ✅ `Write User Name`
  - ✅ `Select Business Unit`
  - ✅ `Enter Email Address`

## Common Form Patterns

### User Registration Form
```json
[
  {
    "id": 1,
    "type": "text",
    "name": "fullName",
    "label": "Full Name",
    "placeholder": "Write Full Name",
    "isRequired": true
  },
  {
    "id": 2,
    "type": "text",
    "name": "email",
    "label": "Email Address",
    "placeholder": "Write Email Address",
    "isRequired": true
  },
  {
    "id": 3,
    "type": "date",
    "name": "birthDate",
    "label": "Birth Date",
    "placeholder": "",
    "isRequired": true
  },
  {
    "id": 4,
    "type": "radio",
    "name": "gender",
    "label": "Gender",
    "placeholder": "",
    "options": [
      { "label": "Male", "value": "male" },
      { "label": "Female", "value": "female" }
    ],
    "isRequired": true
  }
]
```

### Feedback Form
```json
[
  {
    "id": 1,
    "type": "text",
    "name": "customerName",
    "label": "Customer Name",
    "placeholder": "Write Your Name",
    "isRequired": true
  },
  {
    "id": 2,
    "type": "dropdown",
    "name": "rating",
    "label": "Rating",
    "placeholder": "Select Rating",
    "options": [
      { "label": "Excellent", "value": "5" },
      { "label": "Good", "value": "4" },
      { "label": "Average", "value": "3" },
      { "label": "Poor", "value": "2" },
      { "label": "Very Poor", "value": "1" }
    ],
    "isRequired": true
  },
  {
    "id": 3,
    "type": "textarea",
    "name": "comments",
    "label": "Comments",
    "placeholder": "Write Your Comments",
    "isRequired": false
  }
]
```

### Job Application Form
```json
[
  {
    "id": 1,
    "type": "text",
    "name": "applicantName",
    "label": "Applicant Name",
    "placeholder": "Write Full Name",
    "isRequired": true
  },
  {
    "id": 2,
    "type": "text",
    "name": "email",
    "label": "Email",
    "placeholder": "Write Email Address",
    "isRequired": true
  },
  {
    "id": 3,
    "type": "dropdown",
    "name": "position",
    "label": "Position Applied For",
    "placeholder": "Select Position",
    "options": [
      { "label": "Software Developer", "value": "developer" },
      { "label": "UI/UX Designer", "value": "designer" },
      { "label": "Project Manager", "value": "manager" }
    ],
    "isRequired": true
  },
  {
    "id": 4,
    "type": "checkbox",
    "name": "skills",
    "label": "Technical Skills",
    "placeholder": "",
    "options": [
      { "label": "JavaScript", "value": "javascript" },
      { "label": "TypeScript", "value": "typescript" },
      { "label": "Angular", "value": "angular" },
      { "label": "React", "value": "react" }
    ],
    "isRequired": true
  },
  {
    "id": 5,
    "type": "file",
    "name": "resume",
    "label": "Resume",
    "placeholder": "",
    "isRequired": true
  },
  {
    "id": 6,
    "type": "textarea",
    "name": "coverLetter",
    "label": "Cover Letter",
    "placeholder": "Write Cover Letter",
    "isRequired": false
  }
]
```

## Keyboard Shortcuts

- **Drag Control**: Hold and drag from the drag handle (⋮⋮)
- **Dialog Navigation**: Use Tab to move between fields
- **Add Option**: Fill fields and click "Add Option"
- **Submit Dialog**: Press Enter in any field (if form is valid)

## Tips

1. **Control Names**: Use camelCase for better code integration
2. **Required Fields**: Mark essential fields as required
3. **Options**: Add at least 2 options for dropdown/radio/checkbox
4. **Testing**: Use the preview panel to test the form before export
5. **Backup**: Export your form regularly to save your work
6. **Organization**: Group related controls together using drag & drop

## Troubleshooting

**Dialog won't submit?**
- Check that all required fields are filled
- For dropdown/radio/checkbox, ensure at least one option is added

**Controls not appearing?**
- Make sure you clicked "Confirm" in the dialog
- Check the middle panel (canvas) for the added controls

**Can't drag controls?**
- Hold and drag from the drag handle (⋮⋮) icon
- Make sure you have at least 2 controls to reorder

**Preview not updating?**
- The preview updates automatically when you add/remove controls
- If stuck, try adding a new control to force refresh
