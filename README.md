# Form Builder Module

A comprehensive Angular form builder module with drag-and-drop functionality, live preview, and support for multiple control types.

## Features

### Control Types
- **Text Input** - Single line text input
- **Date Picker** - Select a single date
- **Date Range** - Select date range (start and end dates)
- **Text Area** - Multi-line text input
- **Dropdown List** - Select from dropdown options
- **Radio Button** - Single selection from multiple options
- **Checkbox** - Multiple selection from options
- **File Upload** - Upload files

### Control Configuration
Each control has the following properties:
- `id` - Auto-generated unique identifier (starts from 1)
- `type` - Control type (text, date, dateRange, textarea, dropdown, radio, checkbox, file)
- `name` - Control name in camelCase format (e.g., "userName", "businessUnit")
- `label` - Display label for the control (e.g., "User Name", "Business Unit")
- `placeholder` - Placeholder text guide (e.g., "Write User Name")
- `options` - Array of options for dropdown/radio/checkbox controls
  - Each option has: `{ label: string, value: string }`
- `isRequired` - Boolean flag indicating if the control is required

### User Interface

The form builder is divided into three main sections:

#### 1. Left Panel - Control Palette
- Displays all available control types
- Click on any control to add it to the form
- Each control shows an icon, label, and description

#### 2. Middle Panel - Form Canvas
- Shows all added controls
- Drag and drop to reorder controls
- Each control card displays:
  - Control type with icon
  - Name, label, and placeholder
  - Required status
  - Number of options (for dropdown/radio/checkbox)
- Delete button to remove controls

#### 3. Right Panel - Form Preview
- Live preview of the form
- Shows exactly how the form will look
- Fully functional inputs
- Submit and Reset buttons
- Form data logged to console on submit

### Additional Features

#### Top Header Actions
- **Import** - Import form configuration from JSON file
- **Export** - Export form configuration as JSON file
- **Clear All** - Remove all controls from the form
- **Control Count** - Display the number of controls in the form

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm start
```

3. Navigate to `http://localhost:4200/`

### Usage

1. **Add a Control**:
   - Click on any control type from the left panel
   - A dialog will open asking for configuration
   - Fill in the name, label, placeholder
   - Mark as required if needed
   - Add options (for dropdown/radio/checkbox)
   - Click "Confirm" to add the control

2. **Reorder Controls**:
   - Drag the control card using the handle (⋮⋮)
   - Drop it in the desired position

3. **Delete a Control**:
   - Click the delete button (🗑️) on any control card

4. **Preview the Form**:
   - The right panel shows a live preview
   - Test the form by filling in values
   - Click "Submit" to see the form data in the console

5. **Export/Import**:
   - Click "Export" to download the form configuration as JSON
   - Click "Import" to load a previously saved configuration

## Technology Stack

- **Angular 19** - Frontend framework
- **Angular CDK** - For drag and drop functionality
- **TypeScript** - Programming language
- **SCSS** - Styling
- **RxJS** - Reactive programming

## Project Structure

```
src/app/
├── components/
│   ├── control-config-dialog/     # Configuration dialog for controls
│   ├── control-palette/           # Left sidebar with control types
│   ├── form-canvas/               # Middle section with drag & drop
│   ├── form-preview/              # Right section with live preview
│   └── form-builder/              # Main container component
├── models/
│   └── form-control.model.ts      # Type definitions and interfaces
└── services/
    └── form-builder.service.ts    # State management service
```

## Control Object Structure

```typescript
{
  id: 1,
  type: "text",
  name: "userName",
  label: "User Name",
  placeholder: "Write User Name",
  isRequired: true
}
```

### Example with Options (Dropdown/Radio/Checkbox)

```typescript
{
  id: 2,
  type: "dropdown",
  name: "priority",
  label: "Priority",
  placeholder: "Select Priority",
  options: [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" }
  ],
  isRequired: true
}
```

## Export/Import Format

The form configuration is exported as a JSON array of control objects:

```json
[
  {
    "id": 1,
    "type": "text",
    "name": "userName",
    "label": "User Name",
    "placeholder": "Write User Name",
    "isRequired": true
  },
  {
    "id": 2,
    "type": "dropdown",
    "name": "department",
    "label": "Department",
    "placeholder": "Select Department",
    "options": [
      { "label": "IT", "value": "it" },
      { "label": "HR", "value": "hr" }
    ],
    "isRequired": false
  }
]
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

- Run `npm start` for a dev server
- Run `npm run build` for production build
- Run `npm test` to execute unit tests

## License

This project is part of a form builder demonstration.
