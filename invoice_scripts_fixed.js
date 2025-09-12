// Invoice Form JavaScript - Fixed Dropdown Implementation
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const itemsContainer = document.getElementById('invoice-items');
    const addItemBtn = document.getElementById('add-item-btn');
    const subtotalEl = document.getElementById('subtotal');
    const taxRateEl = document.getElementById('tax-rate');
    const grandTotalEl = document.getElementById('grand-total');
    const invoiceForm = document.getElementById('invoice-form');
    const submitBtn = document.getElementById('submit-btn');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const statusMessage = document.getElementById('status-message');

    // Configuration
    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

    // Service options array - hardcoded for reliability
    const serviceOptions = [
        // Pre-Production Labor
        'A. Audio Mixer', 'A. Cam Operator', 'A. Director', 'A. Producer',
        'A. Producer - Associate Producer', 'A. Producer - Creative Producer', 
        'A. Producer - Executive Producer', 'A. Production Coordinator / PA',
        'A. Production Manager', 'A. Assistant Camera', 'A. Assistant Director',
        'A. Best Boy Electric', 'A. Gaffer', 'A. Best Boy Grip', 'A. Key Grip',
        'A. Director of Photography', 'A. Director of Photography - Commercial',
        'A. Director - Commercial', 'A. DIT', 'A. Hair & Makeup Artist', 'A. Jib',
        'A. Jib Assist', 'A. Live Audio Mixer', 'A. Livestream Graphic Tech',
        'A. Photographer', 'A. Photographer - Commercial', 'A. Producer - Field',
        'A. Production Designer', 'A. Production Sound Engineer', 'A. Script Supervisor',
        'A. Set Medic', 'A. Steadicam', 'A. Swing', 'A. Technical Director',
        'A. Teleprompter Operator', 'A. VTR Operator', 'A. 2nd Assistant Camera',
        'A. Electric', 'A. Grip', 'A. Hair and Makeup Assistant', 'A. Location Scout',
        'A. 2nd Assistant Director', 'A. Teamsters / Driver', 'A. Pre-Production Fringe',
        
        // Shoot Labor
        'B. Audio Mixer', 'B. Cam Operator', 'B. Director', 'B. Producer',
        'B. Producer - Associate Producer', 'B. Producer - Creative Producer',
        'B. Producer - Executive Producer', 'B. Production Coordinator / PA',
        'B. Production Manager', 'B. Assistant Camera', 'B. Assistant Director',
        'B. Best Boy Electric', 'B. Gaffer', 'B. Best Boy Grip', 'B. Key Grip',
        'B. Director of Photography', 'B. Director of Photography - Commercial',
        'B. Director - Commercial', 'B. DIT', 'B. Hair & Makeup Artist', 'B. Jib',
        'B. Jib Assist', 'B. Live Audio Mixer', 'B. Livestream Graphic Tech',
        'B. Photographer', 'B. Photographer - Commercial', 'B. Producer - Field',
        'B. Production Designer', 'B. Production Sound Engineer', 'B. Script Supervisor',
        'B. Set Medic', 'B. Steadicam', 'B. Swing', 'B. Technical Director',
        'B. Teleprompter Operator', 'B. VTR Operator', 'B. 2nd Assistant Camera',
        'B. Electric', 'B. Grip', 'B. Hair and Makeup Assistant', 'B. Location Scout',
        'B. 2nd Assistant Director', 'B. Teamsters / Driver', 'B. Shoot Fringe',
        
        // Prep & Wrap Expenses
        'C. Craft Services', 'C. Meals - Per Diem', 'C. Hotels', 'C. Taxi & Rideshare',
        'C. Car Rental', 'C. Casting Director',
        
        // Location Expenses
        'D. Location Rental', 'D. Drone Permit', 'D. Set Security',
        'D. Cargo Van / Production Trucking / Camera Truck', 'D. Car Rental',
        'D. Other Vehicles', 'D. Parking/Tolls/Gas', 'D. Baggage Fees', 'D. Airfare',
        'D. Hotel', 'D. Per Diems', 'D. Site Rep', 'D. Catering', 'D. Craft Services',
        'D. Taxi & Rideshare', 'D. Kit Rental',
        
        // Props and Wardrobe
        'E. Prop Rental', 'E. Prop Purchase', 'E. Prop Fabrication',
        'E. Wardrobe Rental', 'E. Wardrobe Purchase',
        
        // Studio Costs
        'F. Rental For Build Days', 'F. Build OT Hours', 'F. Rental for Pre-Light Days',
        'F. Pre-Light OT Hours', 'F. Rental for Shoot Days', 'F. Shoot OT Hours',
        'F. Rental For Strike Days', 'F. Strike OT Hours', 'F. Generator & Operator',
        'F. Stage Manager/Studio Security', 'F. Power Charges', 'F. Misc. Studio Charges',
        'F. Crew Parking', 'F. Condor/Scissor Lift', 'F. Steeldeck',
        
        // Art Department Labor
        'G. Production Designer', 'G. Art Department Coordinator', 'G. Prop Master',
        'G. Assistant Props', 'G. Swing', 'G. Leadperson', 'G. Set Designer',
        'G. Set Dresser', 'G. Wardrobe Stylist', 'G. Wardrobe Assistant',
        'G. Scenics', 'G. Grips / Riggers', 'G. Art Department Fringe',
        
        // Art Department Expenses
        'H. Set Dressing Rentals', 'H. Set Dressing Purchases', 'H. Art Department Prod Supplies',
        'H. Art Department Kit Rentals', 'H. Special Effects Rentals', 'H. Art Department Trucking',
        'H. Outside Construction', 'H. Car Prep', 'H. Art Department Meals',
        'H. Messengers/Deliveries',
        
        // Equipment Rentals
        'I. Camera Rental', 'I. Sound Rental', 'I. Lighting Rental', 'I. Grip Rental',
        'I. Generator Rental', 'I. Crane Rental', 'I. VTR Rental', 'I. Walkie Talkie Rental',
        'I. Dolly Rental', 'I. Helicopter', 'I. Production Supplies', 'I. Jib Arm',
        'I. Crane Head', 'I. Camera Accessories', 'I. Expendables', 'I. Lenses',
        'I. Cinedrives',
        
        // Media
        'J. Media / Drives', 'J. Film', 'J. Transcode / Transfer', 'J. Process', 'J. Dailies',
        
        // Miscellaneous Production Cost
        'K. Insurance', 'K. Misc Other Production Costs', 'K. Specialty Service',
        
        // Talent Expenses
        'L. Talent Fee', 'L. Talent Flights', 'L. Talent Hotels', 'L. Talent Meals',
        'L. Talent Manager', 'L. Other Talent Related Expenses', 'L. Agency Fees',
        
        // Post Production Labor
        'M. Editor', 'M. Editor - Assistant', 'M. Editor - Senior', 'M. CMS Manager',
        'M. Animator (2D)', 'M. Animator - Senior (3D)', 'M. Producer - Post',
        'M. VFX Supervisor', 'M. Post Audio Engineer', 'M. Colorist', 'M. VO Artist',
        'M. Graphic Designer', 'M. Graphic Designer - Senior', 'M. Animation Supervisor',
        'M. Post Production Supervisor', 'M. Post Production Fringe',
        
        // Post Production Expenses
        'N. Music Clearance', 'N. Music Library Fees', 'N. Stock Image Licensing',
        'N. Stock Video Licensing', 'N. Transcriptions and Translations',
        
        // Creative and Strategic Services
        'O. Art Director', 'O. Art Director - Senior', 'O. Copywriter', 'O. Copywriter - Senior',
        'O. Creative Director', 'O. Creative Director - Associate', 'O. Graphic Designer',
        'O. Graphic Designer - Senior', 'O. UI/UX Designer', 'O. Experiential Designer',
        'O. Experiential Producer', 'O. Illustrator', 'O. Strategy - Creative Strategist',
        'O. Strategy - Strategy Director', 'O. Storyboard Artist', 'O. Group Creative Director',
        'O. Creative and Strategic Services Fringe',
        
        // Creative and Strategic Services Expenses
        'P. Airfare', 'P. Hotel', 'P. Per Diems', 'P. Taxi & Rideshare', 'P. Car Rental',
        'P. Catering', 'P. Fabrication', 'P. Furniture and Decor', 'P. Signage and Print',
        'P. Shipping and Postage',
        
        // Account and Project Management
        'Q. Account Manager', 'Q. Account Director', 'Q. Project Manager',
        'Q. Project Manager - Senior', 'Q. Supervising Project Manager',
        
        // Account and Project Management Expenses
        'R. Airfare', 'R. Hotel', 'R. Per Diems', 'R. Taxi & Rideshare', 'R. Car Rental'
    ];

    // Initialize default dates
    const initializeDates = () => {
        const today = new Date();
        const isoDate = today.toISOString().split('T')[0];
        
        const invoiceDateEl = document.getElementById('invoice-date');
        const serviceStartEl = document.getElementById('service-start');
        const serviceEndEl = document.getElementById('service-end');
        
        if (invoiceDateEl) invoiceDateEl.value = isoDate;
        if (serviceStartEl) serviceStartEl.value = isoDate;
        if (serviceEndEl) serviceEndEl.value = isoDate;
    };

    // Create searchable dropdown - SIMPLIFIED VERSION
    const createSearchableDropdown = (container) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'searchable-dropdown';
        wrapper.style.position = 'relative';
        wrapper.style.width = '100%';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Type to search services...';
        input.className = 'table-input service-input';
        input.style.width = '100%';
        
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown-list';
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            max-height: 200px;
            overflow-y: auto;
            background: white;
            border: 1px solid #d1d5db;
            border-top: none;
            border-radius: 0 0 6px 6px;
            z-index: 1000;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
            display: none;
        `;
        
        let selectedValue = '';
        let isOpen = false;
        
        const filterOptions = (searchTerm) => {
            dropdown.innerHTML = '';
            
            let filteredOptions;
            if (!searchTerm.trim()) {
                filteredOptions = serviceOptions.slice(0, 15);
            } else {
                filteredOptions = serviceOptions.filter(option => 
                    option.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            
            if (filteredOptions.length === 0) {
                const noResultsDiv = document.createElement('div');
                noResultsDiv.style.cssText = `
                    padding: 8px;
                    font-style: italic;
                    color: #6b7280;
                    cursor: default;
                `;
                noResultsDiv.textContent = 'No services found';
                dropdown.appendChild(noResultsDiv);
            } else {
                filteredOptions.slice(0, 20).forEach(option => {
                    const div = document.createElement('div');
                    div.style.cssText = `
                        padding: 8px;
                        cursor: pointer;
                        font-size: 14px;
                        color: #1f2937;
                        transition: background-color 0.15s ease;
                        line-height: 1.2;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    `;
                    div.textContent = option;
                    
                    div.addEventListener('mouseenter', () => {
                        div.style.backgroundColor = '#2563eb';
                        div.style.color = 'white';
                    });
                    
                    div.addEventListener('mouseleave', () => {
                        div.style.backgroundColor = 'white';
                        div.style.color = '#1f2937';
                    });
                    
                    div.addEventListener('click', (e) => {
                        e.stopPropagation();
                        input.value = option;
                        selectedValue = option;
                        input.dataset.selectedValue = option;
                        closeDropdown();
                        calculateTotals();
                    });
                    
                    dropdown.appendChild(div);
                });
                
                if (filteredOptions.length > 20) {
                    const moreDiv = document.createElement('div');
                    moreDiv.style.cssText = `
                        padding: 8px;
                        font-style: italic;
                        color: #6b7280;
                        cursor: default;
                    `;
                    moreDiv.textContent = `... and ${filteredOptions.length - 20} more results`;
                    dropdown.appendChild(moreDiv);
                }
            }
        };
        
        const openDropdown = () => {
            if (!isOpen) {
                isOpen = true;
                dropdown.style.display = 'block';
                filterOptions(input.value);
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown-list').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.style.display = 'none';
                    }
                });
            }
        };

        const closeDropdown = () => {
            isOpen = false;
            dropdown.style.display = 'none';
        };
        
        // Event listeners
        input.addEventListener('input', (e) => {
            if (!isOpen) openDropdown();
            filterOptions(e.target.value);
            
            if (e.target.value !== selectedValue) {
                selectedValue = '';
                input.dataset.selectedValue = '';
            }
        });
        
        input.addEventListener('focus', openDropdown);
        
        input.addEventListener('blur', () => {
            setTimeout(closeDropdown, 150);
        });
        
        dropdown.addEventListener('mousedown', (e) => {
            e.preventDefault();
        });
        
        wrapper.appendChild(input);
        wrapper.appendChild(dropdown);
        container.appendChild(wrapper);
        
        return input;
    };

    // Create new item row
    const createItemRow = () => {
        const row = document.createElement('tr');
        row.className = 'table-row';
        
        // Service/Item cell
        const serviceCell = document.createElement('td');
        serviceCell.className = 'table-cell';
        const serviceInput = createSearchableDropdown(serviceCell);
        
        // Job Code cell
        const jobCodeCell = document.createElement('td');
        jobCodeCell.className = 'table-cell';
        jobCodeCell.innerHTML = '<input type="text" placeholder="######" maxlength="6" class="table-input job-code" pattern="[0-9]{6}">';
        
        // Quantity cell
        const quantityCell = document.createElement('td');
        quantityCell.className = 'table-cell';
        quantityCell.innerHTML = '<input type="number" placeholder="0" value="0" min="0" step="0.5" class="table-input quantity">';
        
        // Rate cell
        const rateCell = document.createElement('td');
        rateCell.className = 'table-cell';
        rateCell.innerHTML = '<input type="number" placeholder="0.00" min="0" step="0.01" class="table-input rate">';
        
        // Amount cell
        const amountCell = document.createElement('td');
        amountCell.className = 'table-cell amount-cell';
        amountCell.textContent = '$0.00';
        
        // Actions cell
        const actionsCell = document.createElement('td');
        actionsCell.className = 'table-cell no-print';
        actionsCell.innerHTML = `
            <div class="action-buttons">
                <button type="button" class="action-btn remove-btn remove-item-btn" title="Remove item">×</button>
                <button type="button" class="action-btn duplicate-btn duplicate-item-btn" title="Duplicate item">⧉</button>
            </div>
        `;
        
        row.appendChild(serviceCell);
        row.appendChild(jobCodeCell);
        row.appendChild(quantityCell);
        row.appendChild(rateCell);
        row.appendChild(amountCell);
        row.appendChild(actionsCell);
        
        // Add event listeners
        const jobCodeInput = row.querySelector('.job-code');
        jobCodeInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            validateJobCode(e.target);
        });

        const quantityInput = row.querySelector('.quantity');
        const rateInput = row.querySelector('.rate');
        
        quantityInput.addEventListener('input', calculateTotals);
        rateInput.addEventListener('input', calculateTotals);

        itemsContainer.appendChild(row);
        calculateTotals();
        
        return row;
    };

    // Duplicate item
    const duplicateItem = (originalRow) => {
        const newRow = createItemRow();
        
        const originalServiceInput = originalRow.querySelector('.service-input');
        const originalJobCode = originalRow.querySelector('.job-code');
        const originalRate = originalRow.querySelector('.rate');
        
        if (originalServiceInput && originalServiceInput.dataset.selectedValue) {
            const newServiceInput = newRow.querySelector('.service-input');
            newServiceInput.value = originalServiceInput.value;
            newServiceInput.dataset.selectedValue = originalServiceInput.dataset.selectedValue;
        }
        
        if (originalJobCode && originalJobCode.value) {
            newRow.querySelector('.job-code').value = originalJobCode.value;
        }
        
        if (originalRate && originalRate.value) {
            newRow.querySelector('.rate').value = originalRate.value;
        }
        
        newRow.querySelector('.quantity').value = '0';
        calculateTotals();
    };

    // Validate job code
    const validateJobCode = (input) => {
        const value = input.value;
        if (value.length > 0 && value.length < 6) {
            input.classList.add('validation-error');
        } else {
            input.classList.remove('validation-error');
        }
    };

    // Calculate totals
    const calculateTotals = () => {
        let subtotal = 0;
        
        document.querySelectorAll('.table-row').forEach(row => {
            const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
            const rate = parseFloat(row.querySelector('.rate').value) || 0;
            const amount = quantity * rate;
            
            row.querySelector('.amount-cell').textContent = `$${amount.toFixed(2)}`;
            subtotal += amount;
        });

        const taxRate = parseFloat(taxRateEl.value) || 0;
        const taxAmount = subtotal * (taxRate / 100);
        const grandTotal = subtotal + taxAmount;

        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        grandTotalEl.textContent = `$${grandTotal.toFixed(2)}`;
    };

    // Form validation
    const validateForm = () => {
        const requiredFields = [
            'cost-center', 'vendor-name', 'vendor-email', 'client-name', 
            'hiring-manager', 'hiring-manager-email', 'invoice-number', 
            'invoice-date', 'pay-terms', 'service-start', 'service-end'
        ];
        
        let isValid = true;
        const errors = [];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field || !field.value.trim()) {
                if (field) field.classList.add('validation-error');
                errors.push(`${fieldId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} is required`);
                isValid = false;
            } else {
                field.classList.remove('validation-error');
            }
        });

        const emailFields = ['vendor-email', 'hiring-manager-email'];
        emailFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && field.value && !isValidEmail(field.value)) {
                field.classList.add('validation-error');
                errors.push(`Please enter a valid email for ${fieldId.replace('-', ' ')}`);
                isValid = false;
            }
        });

        const validItems = Array.from(document.querySelectorAll('.service-input'))
            .filter(input => input.dataset.selectedValue);
        
        if (validItems.length === 0) {
            errors.push('Please add at least one invoice item with a selected service');
            isValid = false;
        }

        const jobCodes = document.querySelectorAll('.job-code');
        jobCodes.forEach(input => {
            if (input.value && input.value.length !== 6) {
                input.classList.add('validation-error');
                errors.push('Job codes must be exactly 6 digits');
                isValid = false;
            }
        });

        if (!isValid) {
            showStatusMessage(errors[0], 'error');
        }

        return isValid;
    };

    // Email validation
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Show status message
    const showStatusMessage = (message, type = 'info') => {
        statusMessage.textContent = message;
        statusMessage.className = `status-message status-${type} show`;
        
        setTimeout(() => {
            statusMessage.classList.remove('show');
        }, 5000);
    };

    // Generate PDF
    const generatePDF = async () => {
        if (!validateForm()) return;

        try {
            showStatusMessage('Generating PDF...', 'info');
            downloadPdfBtn.disabled = true;
            downloadPdfBtn.textContent = 'Generating...';

            if (typeof window.jspdf === 'undefined') {
                throw new Error('PDF library not loaded. Please refresh the page and try again.');
            }

            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            const pageWidth = 210;
            const pageHeight = 297;
            const margin = 20;
            let yPosition = margin;
            
            const addText = (text, x, y, fontSize = 10, style = 'normal') => {
                pdf.setFontSize(fontSize);
                pdf.setFont('helvetica', style);
                const lines = pdf.splitTextToSize(text, pageWidth - margin * 2);
                pdf.text(lines, x, y);
                return y + (lines.length * fontSize * 0.4);
            };
            
            const checkPageBreak = (neededHeight) => {
                if (yPosition + neededHeight > pageHeight - margin) {
                    pdf.addPage();
                    yPosition = margin;
                }
            };

            // Title
            pdf.setFontSize(24);
            pdf.setFont('helvetica', 'bold');
            pdf.text('INVOICE', margin, yPosition);
            yPosition += 10;
            
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.text('Professional Services Invoice', margin, yPosition);
            yPosition += 15;

            // Vendor Info
            const leftCol = margin;
            const rightCol = pageWidth / 2 + 10;
            
            let leftY = yPosition;
            pdf.setFont('helvetica', 'bold');
            pdf.text('Vendor Information:', leftCol, leftY);
            leftY += 6;
            pdf.setFont('helvetica', 'normal');
            
            const vendorName = document.getElementById('vendor-name').value || 'N/A';
            const vendorAddress = document.getElementById('vendor-address').value || 'N/A';
            const vendorCity = document.getElementById('vendor-city').value || 'N/A';
            const vendorEmail = document.getElementById('vendor-email').value || 'N/A';
            
            leftY = addText(vendorName, leftCol, leftY);
            leftY = addText(vendorAddress, leftCol, leftY);
            leftY = addText(vendorCity, leftCol, leftY);
            leftY = addText(vendorEmail, leftCol, leftY);

            // Invoice Details
            let rightY = yPosition;
            pdf.setFont('helvetica', 'bold');
            pdf.text('Invoice Details:', rightCol, rightY);
            rightY += 6;
            pdf.setFont('helvetica', 'normal');
            
            const invoiceNum = document.getElementById('invoice-number').value || 'N/A';
            const invoiceDate = document.getElementById('invoice-date').value || 'N/A';
            const payTerms = document.getElementById('pay-terms').value || 'N/A';
            const poNumber = document.getElementById('po-number').value || '';
            
            rightY = addText(`Invoice #: ${invoiceNum}`, rightCol, rightY);
            rightY = addText(`Date: ${invoiceDate}`, rightCol, rightY);
            rightY = addText(`Terms: ${payTerms}`, rightCol, rightY);
            if (poNumber) rightY = addText(`PO#: ${poNumber}`, rightCol, rightY);

            yPosition = Math.max(leftY, rightY) + 10;

            // Bill To and Cost Center
            checkPageBreak(30);
            
            pdf.setFont('helvetica', 'bold');
            pdf.text('Bill To:', leftCol, yPosition);
            pdf.text('Cost Center:', rightCol, yPosition);
            yPosition += 6;
            pdf.setFont('helvetica', 'normal');
            
            const clientName = document.getElementById('client-name').value || 'N/A';
            const hiringManager = document.getElementById('hiring-manager').value || 'N/A';
            const hiringEmail = document.getElementById('hiring-manager-email').value || 'N/A';
            const costCenter = document.getElementById('cost-center').value || 'N/A';
            
            leftY = yPosition;
            leftY = addText(clientName, leftCol, leftY);
            leftY = addText(hiringManager, leftCol, leftY);
            leftY = addText(hiringEmail, leftCol, leftY);
            
            rightY = yPosition;
            const costCenterText = document.getElementById('cost-center').selectedOptions[0]?.text || costCenter;
            rightY = addText(costCenterText, rightCol, rightY);
            
            yPosition = Math.max(leftY, rightY) + 10;

            // Service Period
            checkPageBreak(20);
            
            pdf.setFont('helvetica', 'bold');
            pdf.text('Service Period:', margin, yPosition);
            yPosition += 6;
            pdf.setFont('helvetica', 'normal');
            
            const serviceStart = document.getElementById('service-start').value || 'N/A';
            const serviceEnd = document.getElementById('service-end').value || 'N/A';
            yPosition = addText(`${serviceStart} to ${serviceEnd}`, margin, yPosition);
            yPosition += 10;

            // Invoice Items Table
            checkPageBreak(40);
            
            pdf.setFont('helvetica', 'bold');
            pdf.text('Invoice Items:', margin, yPosition);
            yPosition += 8;

            const colWidths = [60, 25, 20, 25, 25];
            const colPositions = [margin];
            for (let i = 1; i < colWidths.length; i++) {
                colPositions[i] = colPositions[i-1] + colWidths[i-1];
            }

            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(9);
            pdf.text('Service/Item', colPositions[0], yPosition);
            pdf.text('Job Code', colPositions[1], yPosition);
            pdf.text('Hours', colPositions[2], yPosition);
            pdf.text('Rate', colPositions[3], yPosition);
            pdf.text('Amount', colPositions[4], yPosition);
            yPosition += 6;

            pdf.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2);
            yPosition += 2;

            pdf.setFont('helvetica', 'normal');
            let subtotal = 0;
            
            document.querySelectorAll('.table-row').forEach(row => {
                checkPageBreak(15);
                
                const serviceInput = row.querySelector('.service-input');
                const service = serviceInput.dataset.selectedValue || serviceInput.value || 'N/A';
                const jobCode = row.querySelector('.job-code').value || '';
                const hours = row.querySelector('.quantity').value || '0';
                const rate = row.querySelector('.rate').value || '0';
                const amount = parseFloat(hours) * parseFloat(rate);
                subtotal += amount;

                const serviceName = service.length > 35 ? service.substring(0, 35) + '...' : service;
                
                pdf.text(serviceName, colPositions[0], yPosition);
                pdf.text(jobCode, colPositions[1], yPosition);
                pdf.text(hours, colPositions[2], yPosition);
                pdf.text(`$${parseFloat(rate).toFixed(2)}`, colPositions[3], yPosition);
                pdf.text(`$${amount.toFixed(2)}`, colPositions[4], yPosition);
                yPosition += 5;
            });

            yPosition += 10;

            // Totals
            checkPageBreak(25);
            
            const taxRate = parseFloat(document.getElementById('tax-rate').value) || 0;
            const taxAmount = subtotal * (taxRate / 100);
            const grandTotal = subtotal + taxAmount;

            const totalsX = pageWidth - margin - 60;
            pdf.setFont('helvetica', 'normal');
            pdf.text('Subtotal:', totalsX, yPosition);
            pdf.text(`$${subtotal.toFixed(2)}`, totalsX + 35, yPosition);
            yPosition += 6;

            if (taxRate > 0) {
                pdf.text(`Tax (${taxRate}%):`, totalsX, yPosition);
                pdf.text(`$${taxAmount.toFixed(2)}`, totalsX + 35, yPosition);
                yPosition += 6;
            }

            pdf.setFont('helvetica', 'bold');
            pdf.text('Total:', totalsX, yPosition);
            pdf.text(`$${grandTotal.toFixed(2)}`, totalsX + 35, yPosition);

            const vendorNameClean = vendorName
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .replace(/\s+/g, '_')
                .substring(0, 20) || 'Invoice';
            const invoiceNumberClean = invoiceNum.replace(/[^a-zA-Z0-9]/g, '_') || 'INV-001';
            const invoiceDateClean = invoiceDate || new Date().toISOString().split('T')[0];
            
            const filename = `${vendorNameClean}_${invoiceNumberClean}_${invoiceDateClean}.pdf`;

            pdf.save(filename);
            showStatusMessage('PDF downloaded successfully!', 'success');
            
        } catch (error) {
            console.error('PDF generation error:', error);
            showStatusMessage(`Error generating PDF: ${error.message}`, 'error');
        } finally {
            downloadPdfBtn.disabled = false;
            downloadPdfBtn.textContent = 'Download PDF';
        }
    };

    // Submit to Google Sheets
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            showStatusMessage('Submitting data to spreadsheet...', 'info');

            const invoiceData = {
                timestamp: new Date().toISOString(),
                costCenter: document.getElementById('cost-center').value,
                vendorName: document.getElementById('vendor-name').value,
                vendorAddress: document.getElementById('vendor-address').value,
                vendorCity: document.getElementById('vendor-city').value,
                vendorEmail: document.getElementById('vendor-email').value,
                clientName: document.getElementById('client-name').value,
                hiringManager: document.getElementById('hiring-manager').value,
                hiringManagerEmail: document.getElementById('hiring-manager-email').value,
                invoiceNumber: document.getElementById('invoice-number').value,
                invoiceDate: document.getElementById('invoice-date').value,
                payTerms: document.getElementById('pay-terms').value,
                poNumber: document.getElementById('po-number').value || '',
                serviceStart: document.getElementById('service-start').value,
                serviceEnd: document.getElementById('service-end').value,
                subtotal: subtotalEl.textContent,
                taxRate: taxRateEl.value,
                grandTotal: grandTotalEl.textContent,
                items: []
            };

            document.querySelectorAll('.table-row').forEach(row => {
                const serviceInput = row.querySelector('.service-input');
                const serviceItem = serviceInput.dataset.selectedValue || serviceInput.value;
                const jobCode = row.querySelector('.job-code').value;
                const hours = row.querySelector('.quantity').value;
                const rate = row.querySelector('.rate').value;
                const amount = row.querySelector('.amount-cell').textContent;
                
                if (serviceItem) {
                    invoiceData.items.push({
                        serviceItem,
                        jobCode: jobCode || '',
                        hours: hours || '0',
                        rate: rate || '0',
                        amount
                    });
                }
            });

            if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                throw new Error('Please configure your Google Apps Script URL in the JavaScript file');
            }

            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invoiceData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (result.success) {
                showStatusMessage('Data submitted successfully to spreadsheet!', 'success');
            } else {
                throw new Error(result.error || 'Unknown error occurred');
            }
            
        } catch (error) {
            console.error('Submission error:', error);
            showStatusMessage(`Error submitting data: ${error.message}`, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit to Spreadsheet';
        }
    };

    // Event Listeners
    addItemBtn.addEventListener('click', createItemRow);
    submitBtn.addEventListener('click', handleSubmit);
    downloadPdfBtn.addEventListener('click', generatePDF);
    taxRateEl.addEventListener('input', calculateTotals);
    
    // Handle remove and duplicate buttons
    itemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            e.target.closest('.table-row').remove();
            calculateTotals();
            
            if (itemsContainer.children.length === 0) {
                createItemRow();
            }
        } else if (e.target.classList.contains('duplicate-item-btn')) {
            const originalRow = e.target.closest('.table-row');
            duplicateItem(originalRow);
        }
    });
    
    // Clear validation errors on input
    invoiceForm.addEventListener('input', (e) => {
        if (e.target.classList.contains('validation-error')) {
            e.target.classList.remove('validation-error');
        }
        if (e.target.classList.contains('quantity') || e.target.classList.contains('rate') || e.target.id === 'tax-rate') {
            calculateTotals();
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.searchable-dropdown')) {
            document.querySelectorAll('.dropdown-list').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });

    // Initialize the form
    initializeDates();
    createItemRow();
    calculateTotals();

    console.log('Invoice form initialized successfully');
});
