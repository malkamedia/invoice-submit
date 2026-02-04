# Business Invoice Generation Tool

A professional web-based invoice submission system for Malka Media Group businesses. This portal allows businesses to create, download, and submit invoices directly to the AP (Accounts Payable) team with automatic data logging to Google Sheets.

**Live Site:** https://invoice.malkamedia.com

## Overview

This invoice system streamlines the business payment process by:
- Providing a clean, professional interface for invoice creation
- Automatically validating all required fields and job codes
- Generating PDF invoices for download
- Submitting invoice data and PDFs directly to AP via email
- Logging all submissions to a Google Sheets database
- Supporting all Malka Media Group service categories and cost centers

## Features

### Invoice Creation
- **Pre-populated service catalog** with 200+ categorized services across:
  - Pre-Production & Shoot Labor
  - Location & Studio Costs
  - Equipment Rentals
  - Post-Production Services
  - Creative & Strategic Services
  - Account Management
- **Dynamic line items** with duplicate and delete functionality
- **Automatic calculations** for subtotals, tax, and grand totals
- **Job code validation** (required 6-digit format)
- **Cost center selection** from 7 predefined Malka departments

### Data Management
- **Real-time validation** of all required fields
- **Automatic timestamping** of submissions
- **Unique ID generation** for tracking
- **Silent background submission** to Google Sheets on PDF download
- **Email delivery** with PDF attachment when submitting to AP

### User Experience
- **Responsive design** that works on desktop, tablet, and mobile
- **Professional styling** with Malka Media branding
- **Helpful tooltips** on action buttons
- **Clear error messaging** with field highlighting
- **Auto-populated dates** for convenience

## Tech Stack

- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Styling:** Custom CSS variables with modern design system
- **PDF Generation:** jsPDF + html2canvas libraries
- **Backend:** Google Apps Script (serverless)
- **Database:** Google Sheets
- **Email:** Google MailApp API
- **Hosting:** GitHub Pages (via custom CNAME)

## Project Structure
```
/
├── index.html                      # Main invoice form
├── matt-b-attempt.html            # Earlier prototype version
├── google-script-withapsubmit.txt # Google Apps Script backend code
├── CNAME                          # Custom domain configuration
└── README.md                      # This file
```

## Setup & Deployment

### Prerequisites
- Google account with access to Google Sheets and Google Apps Script
- Domain configured to point to GitHub Pages (invoice.malkamedia.com)
- GitHub repository with Pages enabled

### Google Sheets Setup

1. **Create a new Google Sheet** for invoice data logging

2. **Create a sheet tab named `WorkflowTesting`**

3. **Set up column headers** (Row 1) in the `WorkflowTesting` tab:
   - A: Timestamp
   - B: ID
   - C: Cost Center Code
   - D: Cost Center Name
   - E: Business Name
   - F: Business LLC/Business Name
   - G: Business Address
   - H: Business City/State/ZIP
   - I: Business Email
   - J: Client Name
   - K: Hiring Manager
   - L: Hiring Manager Email
   - M: Number
   - N: Date
   - O: Payment Terms
   - P: PO Number
   - Q: Invoice Service Start Date
   - R: Invoice Service End Date
   - S: Invoice Subtotal
   - T: Invoice Tax Rate
   - U: Invoice Grand Total
   - V: Line Item Service
   - W: Line Item Job Code
   - X: Line Item Hours/Qty
   - Y: Line Item Rate
   - Z: Line Item Amount

4. **Format the sheet:**
   - Freeze the header row
   - Apply filters to columns
   - Set appropriate column widths
   - Format currency columns (S, U, and Z columns)

### Google Apps Script Setup

1. **Open Script Editor:**
   - In your Google Sheet, go to Extensions > Apps Script

2. **Paste the backend code:**
   - Copy contents from `google-script-withapsubmit.txt`
   - Paste into the script editor

3. **Deploy as Web App:**
   - Click Deploy > New deployment
   - Select type: Web app
   - Execute as: Me
   - Who has access: Anyone
   - Click Deploy
   - Copy the web app URL

4. **Update frontend with Script URL:**
```javascript
   // In index.html, around line 970
   const GOOGLE_SCRIPT_URL = 'YOUR_SCRIPT_URL_HERE';
```

### GitHub Pages Setup

1. **Push code to GitHub repository**

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Navigate to Pages section
   - Source: Deploy from a branch
   - Branch: main (or master)
   - Folder: / (root)
   - Save

3. **Configure custom domain:**
   - Add CNAME file with domain: `invoice.malkamedia.com`
   - In domain registrar, add CNAME record pointing to: `[username].github.io`
   - Wait for DNS propagation (can take up to 24 hours)
   - Enable "Enforce HTTPS" in GitHub Pages settings

## Configuration

### Cost Centers

The system includes 7 predefined cost centers. To modify:
```javascript
// In index.html, find the cost-center select element (around line 150)
<select id="cost-center" class="form-select" required>
  <option value="40677">40677 - ML Malka Post Production</option>
  <option value="40382">40382 - ML Malka Production</option>
  // Add or modify cost centers here
</select>
```

Also update in Google Apps Script:
```javascript
// In google-script-withapsubmit.txt, getCostCenterName function
function getCostCenterName(code) {
  const costCenters = {
    '40677': '40677 - ML Malka Post Production',
    // Update mapping here
  };
  return costCenters[code] || code;
}
```

### Service Items

To add or modify service categories:
```javascript
// In index.html, locate the createItemRow function (around line 680)
// Find the <optgroup> sections and add/modify options
<optgroup label="Your Category Name">
  <option>X. Your Service Name</option>
</optgroup>
```

### Email Recipients

To change who receives invoice submissions:
```javascript
// In Google Apps Script, handleAPSubmission function
MailApp.sendEmail({
  to: 'primary@malkamedia.com',
  cc: 'secondary@malkamedia.com, another@malkamedia.com',
  // ...
});
```

## Usage Guide

### For Businesses

1. **Access the form:** Navigate to https://invoice.malkamedia.com

2. **Fill in business information:**
   - Business name (required)
   - Business/LLC name (optional)
   - Address and city/state/ZIP
   - Email address (required)

3. **Confirm bill-to information:**
   - Pre-filled with Malka Media Group details
   - Update hiring manager name and email
   - Select appropriate cost center (required)

4. **Enter invoice details:**
   - Invoice number (required)
   - Invoice date (auto-filled with today's date)
   - Payment terms (default: Net 30)
   - PO number (optional)

5. **Set service period:**
   - Start and end dates (both required)

6. **Add line items:**
   - Select service from dropdown (required)
   - Enter 6-digit job code (required)
   - Enter hours/quantity and rate
   - Click "+ Add Item" for additional lines
   - Use duplicate button (⧉) to copy rows
   - Use delete button (×) to remove rows

7. **Review totals:**
   - Subtotal calculated automatically
   - Add tax percentage if applicable
   - Review grand total

8. **Download or submit:**
   - **Download Invoice PDF:** Creates a PDF for your records and silently logs data to Google Sheets
   - **Submit to AP:** Sends invoice PDF via email to AP team and CC's you

### For Administrators

**View submissions:**
- Open the connected Google Sheet
- All submissions appear with timestamp and ID
- Use filters to search/sort invoices
- Export data for accounting software if needed

**Check email delivery:**
- Verify emails are being received at configured AP address
- Check spam folder if emails aren't arriving
- Ensure Google Apps Script has email permissions

**Troubleshooting:**
- Check Script Editor for error logs (Executions tab)
- Verify web app deployment is active
- Confirm CORS settings if getting fetch errors

## Validation Rules

The form enforces these validation rules:

### Required Fields
- Business name
- Business email (must be valid format)
- Client name
- Hiring manager name and email
- Cost center selection
- Invoice number
- Invoice date
- Payment terms
- Service start and end dates
- At least one line item with service selected

### Field Constraints
- **Job Code:** Exactly 6 digits when service is selected
- **Email:** Must match standard email format
- **Numbers:** Hours/quantity and rate must be positive numbers
- **Dates:** Must be valid date selections

### Visual Feedback
- Invalid fields highlighted in red
- Error message lists all missing requirements
- Auto-scroll to first error field
- Real-time validation on job code length

## Browser Compatibility

- **Chrome:** 90+ ✓
- **Firefox:** 88+ ✓
- **Safari:** 14+ ✓
- **Edge:** 90+ ✓
- **Mobile Safari:** iOS 14+ ✓
- **Mobile Chrome:** 90+ ✓

**Required JavaScript libraries:**
- jsPDF 2.5.1+ (loaded via CDN)
- html2canvas 1.4.1+ (loaded via CDN)

## Security & Privacy

- **No sensitive data stored in frontend code**
- **Google Apps Script runs with user's permissions**
- **Emails sent via Google's secure infrastructure**
- **SSL/TLS encryption via GitHub Pages HTTPS**
- **Privacy policy linked in footer:** https://drive.google.com/file/d/1RUsTDWCOH7n8BliwVa57GV3fWPMuO-ut/view

## Troubleshooting

### PDF Download Issues

**Problem:** "PDF library not loaded" error
**Solution:** 
- Check browser console for CDN loading errors
- Verify internet connection
- Try refreshing the page
- Check if ad blocker is interfering with CDN

**Problem:** PDF is blank or incomplete
**Solution:**
- Ensure all required fields are filled
- Check browser console for JavaScript errors
- Try in an incognito/private window

### Submission Failures

**Problem:** "Error submitting to AP" message
**Solution:**
- Verify Google Apps Script web app is deployed
- Check Script URL in `GOOGLE_SCRIPT_URL` constant
- Review Apps Script execution logs for errors
- Confirm email permissions are granted

**Problem:** Data not appearing in Google Sheets
**Solution:**
- Check if sheet is the active sheet in the Apps Script
- Verify sheet has proper column headers
- Check Apps Script execution logs
- Ensure web app has "Execute as: Me" permission

### Validation Problems

**Problem:** Job code validation error won't clear
**Solution:**
- Ensure job code is exactly 6 digits
- No spaces or special characters allowed
- Delete and re-type if pasting from elsewhere

**Problem:** Form says fields are required but they're filled
**Solution:**
- Check for leading/trailing spaces
- Ensure dropdown selections are actually selected
- Try typing directly instead of pasting

## Development

### Local Development
```bash
# Clone the repository
git clone https://github.com/your-username/malka-invoice-portal.git

# Navigate to project
cd malka-invoice-portal

# Open in browser (or use a local server)
# macOS/Linux:
python -m http.server 8000
# Or:
npx serve .

# Navigate to http://localhost:8000
```

### Testing Changes

1. **Make changes to `index.html`**
2. **Test locally with browser dev tools open**
3. **Test validation by intentionally leaving fields empty**
4. **Test PDF generation with sample data**
5. **Test submission with a test Google Sheet**
6. **Verify mobile responsiveness**

### Updating the Backend

1. **Edit `google-script-withapsubmit.txt`**
2. **Copy code to Apps Script editor**
3. **Test in script editor:**
   - Use "Test as add-on" or debug logs
4. **Deploy new version:**
   - Create new deployment (don't overwrite)
   - Update frontend with new URL if needed
   - Disable old deployment after testing

## Future Enhancements

Potential features to consider:

- [ ] Save draft invoices locally
- [ ] Invoice templates/presets
- [ ] Multi-currency support
- [ ] Automatic job code lookup/suggestion
- [ ] Business portal for viewing submission history
- [ ] Integration with accounting software (QuickBooks, etc.)
- [ ] Bulk upload from CSV
- [ ] Digital signature capability
- [ ] Invoice approval workflow
- [ ] Automated payment term reminders

## Support

For issues or questions:
- **Technical issues:** Check troubleshooting section above
- **AP questions:** Contact mike@malkamedia.com
- **Access issues:** Contact Malka Media IT support

## License

Proprietary - © 2024 Malka Media Group LLC. All rights reserved.

This system is for internal use by Malka Media Group businesses only.

---

**Version:** 2.0  
**Last Updated:** December 2024  
**Maintained by:** Malka Media Group IT Team
