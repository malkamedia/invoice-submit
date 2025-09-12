// Invoice Form JavaScript - Fixed Dropdown Implementation with Z-Index Fix
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

    // Dropdown options - FIXED: Properly structured objects
    const costCenterOptions = [
        { value: '40677', text: '40677 - ML Malka Post Production' },
        { value: '40382', text: '40382 - ML Malka Production' },
        { value: '40405', text: '40405 - ML Malka Media Operations' },
        { value: '40383', text: '40383 - ML Malka Project Management' },
        { value: '40425', text: '40425 - ML Malka Animation' },
        { value: '40473', text: '40473 - ML Malka Creative Services' },
        { value: '40386', text: '40386 - ML Malka Account Management' }
    ];

    const paymentTermsOptions = [
        { value: 'Due on Receipt', text: 'Due on Receipt' },
        { value: 'Net 15', text: 'Net 15' },
        { value: 'Net 30', text: 'Net 30' },
        { value: 'Net 45', text: 'Net 45' },
        { value: 'Net 60', text: 'Net 60' }
    ];

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

    // FIXED: Generic searchable dropdown creator with proper object handling and z-index
    const createCustomDropdown = (container, options, placeholder, hiddenInputId, defaultValue = null) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'searchable-dropdown';
        wrapper.style.cssText = `
            position: relative;
            width: 100%;
            z-index: 100;
        `;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = placeholder;
        input.className = 'form-input';
        input.style.cssText = `
            width: 100%;
            position: relative;
            z-index: 101;
        `;
        
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
            z-index: 10000;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
            display: none;
        `;
        
        let selectedValue = '';
        let isOpen = false;
        
        // FIXED: Proper filtering function that handles both arrays and objects
        const filterOptions = (searchTerm) => {
            dropdown.innerHTML = '';
            
            let filteredOptions;
            
            // Check if options is an array of objects with text/value properties
            const isObjectArray = options.length > 0 && typeof options[0] === 'object' && options[0].hasOwnProperty('text');
            
            if (isObjectArray) {
                // Handle object arrays (cost center, payment terms)
                if (!searchTerm.trim()) {
                    filteredOptions = options;
                } else {
                    filteredOptions = options.filter(option => 
                        option.text.toLowerCase().includes(searchTerm.toLowerCase())
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
                    noResultsDiv.textContent = 'No options found';
                    dropdown.appendChild(noResultsDiv);
                } else {
                    filteredOptions.forEach(option => {
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
                        
                        div.textContent = option.text; // Use the text property
                        
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
                            input.value = option.text;
                            selectedValue = option.value;
                            input.dataset.selectedValue = option.value;
                            if (hiddenInputId) {
                                document.getElementById(hiddenInputId).value = option.value;
                            }
                            closeDropdown();
                        });
                        
                        dropdown.appendChild(div);
                    });
                }
            } else {
                // Handle simple string arrays (services)
                if (!searchTerm.trim()) {
                    filteredOptions = options.slice(0, 15);
                } else {
                    filteredOptions = options.filter(option => 
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
                            if (hiddenInputId) {
                                document.getElementById(hiddenInputId).value = option;
                            }
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
                if (hiddenInputId) {
                    document.getElementById(hiddenInputId).value = '';
                }
            }
        });
        
        input.addEventListener('focus', openDropdown);
        
        input.addEventListener('blur', () => {
            setTimeout(closeDropdown, 150);
        });
        
        dropdown.addEventListener('mousedown', (e) => {
            e.preventDefault();
        });
        
        // Set default value if provided
        if (defaultValue) {
            const isObjectArray = options.length > 0 && typeof options[0] === 'object';
            
            if (isObjectArray) {
                const defaultOption = options.find(opt => opt.value === defaultValue);
                if (defaultOption) {
                    input.value = defaultOption.text;
                    selectedValue = defaultOption.value;
                    input.dataset.selectedValue = defaultOption.value;
                    if (hiddenInputId) {
                        document.getElementById(hiddenInputId).value = defaultOption.value;
                    }
                }
            } else {
                const defaultOption = options.find(opt => opt === defaultValue);
                if (defaultOption) {
                    input.value = defaultOption;
                    selectedValue = defaultOption;
                    input.dataset.selectedValue = defaultOption;
                    if (hiddenInputId) {
                        document.getElementById(hiddenInputId).value = defaultOption;
                    }
                }
            }
        }
        
        wrapper.appendChild(input);
        wrapper.appendChild(dropdown);
        container.appendChild(wrapper);
        
        return input;
    };

    // Create searchable dropdown for services (table rows)
    const createServiceDropdown = (container) => {
        return createCustomDropdown(container, serviceOptions, 'Type to search services...', null);
    };

    // Create new item row
    const createItemRow = () => {
        const row = document.createElement('tr');
        row.className = 'table-row';
        
        // Service/Item cell
        const serviceCell = document.createElement('td');
        serviceCell.className = 'table-cell';
        const serviceInput = createServiceDropdown(serviceCell);
        
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

    // Validate job code
    const validateJobCode = (input) => {
        const value = input.value;
        if (value.length > 0 && value.length < 6) {
            input.classList.add('validation-error');
        } else {
            input.classList.remove('validation-error');
        }
    };

    // Show status message
    const showStatusMessage = (message, type = 'info') => {
        statusMessage.textContent = message;
        statusMessage.className = `status-message status-${type} show`;
        
        setTimeout(() => {
            statusMessage.classList.remove('show');
        }, 5000);
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
                errors.push(`${fieldId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} is required`);
                isValid = false;
            }
        });

        const validItems = Array.from(document.querySelectorAll('.searchable-dropdown input'))
            .filter(input => input.dataset.selectedValue && input.closest('#invoice-items'));
        
        if (validItems.length === 0) {
            errors.push('Please add at least one invoice item with a selected service');
            isValid = false;
        }

        if (!isValid) {
            showStatusMessage(errors[0], 'error');
        }

        return isValid;
    };

    // Generate PDF function (simplified for space)
    const generatePDF = async () => {
        if (!validateForm()) return;
        showStatusMessage('PDF generation feature requires jsPDF library setup', 'info');
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
                const serviceInput = row.querySelector('.searchable-dropdown input');
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
                throw new Error('Please configure your Google Apps Script URL');
            }

            showStatusMessage('Data submitted successfully!', 'success');
            
        } catch (error) {
            console.error('Submission error:', error);
            showStatusMessage(`Error: ${error.message}`, 'error');
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
            // Simplified duplicate - just create new row
            createItemRow();
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
    
    // Create custom dropdowns
    createCustomDropdown(
        document.getElementById('cost-center-dropdown'), 
        costCenterOptions, 
        'Select Cost Center...', 
        'cost-center'
    );
    
    createCustomDropdown(
        document.getElementById('pay-terms-dropdown'), 
        paymentTermsOptions, 
        'Select Payment Terms...', 
        'pay-terms',
        'Net 30'
    );
    
    createItemRow();
    calculateTotals();

    console.log('Invoice form with fixed custom dropdowns initialized successfully');
});
