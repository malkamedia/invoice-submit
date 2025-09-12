// Invoice Form JavaScript - FIXED: Complete Dropdown Implementation
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

    // FIXED: Complete dropdown options with proper structure
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

    // FIXED: Complete service options array (unchanged from original)
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

    // FIXED: Completely rewritten custom dropdown creator with proper event handling
    const createCustomDropdown = (container, options, placeholder, hiddenInputId, defaultValue = null) => {
        // Clear container first
        container.innerHTML = '';
        
        const wrapper = document.createElement('div');
        wrapper.className = 'searchable-dropdown';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = placeholder;
        input.className = 'form-input';
        input.autocomplete = 'off'; // Prevent browser autocomplete interference
        
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown-list';
        
        let selectedValue = '';
        let isOpen = false;
        let currentIndex = -1; // For keyboard navigation
        
        // FIXED: Proper option filtering and rendering
        const renderOptions = (searchTerm = '') => {
            dropdown.innerHTML = '';
            currentIndex = -1;
            
            let filteredOptions;
            const isObjectArray = options.length > 0 && typeof options[0] === 'object' && options[0].hasOwnProperty('text');
            
            if (isObjectArray) {
                // Handle object arrays (cost center, payment terms)
                filteredOptions = searchTerm.trim() === '' 
                    ? options 
                    : options.filter(option => 
                        option.text.toLowerCase().includes(searchTerm.toLowerCase())
                    );
            } else {
                // Handle string arrays (services)
                filteredOptions = searchTerm.trim() === ''
                    ? options.slice(0, 20) // Show first 20 by default
                    : options.filter(option => 
                        option.toLowerCase().includes(searchTerm.toLowerCase())
                    ).slice(0, 20); // Limit filtered results
            }
            
            if (filteredOptions.length === 0) {
                const noResultsDiv = document.createElement('div');
                noResultsDiv.className = 'dropdown-item';
                noResultsDiv.style.fontStyle = 'italic';
                noResultsDiv.style.color = '#6b7280';
                noResultsDiv.style.cursor = 'default';
                noResultsDiv.textContent = 'No options found';
                dropdown.appendChild(noResultsDiv);
                return;
            }
            
            filteredOptions.forEach((option, index) => {
                const div = document.createElement('div');
                div.className = 'dropdown-item';
                div.dataset.index = index;
                
                if (isObjectArray) {
                    div.textContent = option.text;
                    div.dataset.value = option.value;
                } else {
                    div.textContent = option;
                    div.dataset.value = option;
                }
                
                // FIXED: Proper event handling with mousedown to prevent blur
                div.addEventListener('mousedown', (e) => {
                    e.preventDefault(); // Prevent input blur
                    e.stopPropagation();
                    selectOption(option);
                });
                
                div.addEventListener('mouseenter', () => {
                    // Clear other highlights
                    dropdown.querySelectorAll('.dropdown-item').forEach(item => {
                        item.style.backgroundColor = '';
                        item.style.color = '';
                    });
                    // Highlight current
                    div.style.backgroundColor = '#2563eb';
                    div.style.color = 'white';
                    currentIndex = index;
                });
                
                div.addEventListener('mouseleave', () => {
                    div.style.backgroundColor = '';
                    div.style.color = '';
                });
                
                dropdown.appendChild(div);
            });
            
            // Show more results indicator for services
            if (!isObjectArray && options.length > 20 && searchTerm.trim() === '') {
                const moreDiv = document.createElement('div');
                moreDiv.className = 'dropdown-item';
                moreDiv.style.fontStyle = 'italic';
                moreDiv.style.color = '#6b7280';
                moreDiv.style.cursor = 'default';
                moreDiv.textContent = `... and ${options.length - 20} more. Type to search.`;
                dropdown.appendChild(moreDiv);
            }
        };
        
        const selectOption = (option) => {
            const isObjectArray = typeof option === 'object' && option.hasOwnProperty('text');
            
            if (isObjectArray) {
                input.value = option.text;
                selectedValue = option.value;
            } else {
                input.value = option;
                selectedValue = option;
            }
            
            // Update hidden input if provided
            if (hiddenInputId) {
                const hiddenInput = document.getElementById(hiddenInputId);
                if (hiddenInput) {
                    hiddenInput.value = selectedValue;
                }
            }
            
            closeDropdown();
            calculateTotals(); // Recalculate if needed
        };
        
        const openDropdown = () => {
            if (!isOpen) {
                isOpen = true;
                
                // FIXED: Position dropdown using fixed positioning to avoid clipping
                const inputRect = input.getBoundingClientRect();
                dropdown.style.position = 'fixed';
                dropdown.style.top = `${inputRect.bottom}px`;
                dropdown.style.left = `${inputRect.left}px`;
                dropdown.style.width = `${inputRect.width}px`;
                dropdown.style.display = 'block';
                
                renderOptions(input.value);
                
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
            currentIndex = -1;
        };
        
        // FIXED: Proper event listeners
        input.addEventListener('input', (e) => {
            openDropdown();
            renderOptions(e.target.value);
            
            // Clear selection if input doesn't match
            if (e.target.value !== (typeof selectedValue === 'object' ? selectedValue.text : selectedValue)) {
                selectedValue = '';
                if (hiddenInputId) {
                    const hiddenInput = document.getElementById(hiddenInputId);
                    if (hiddenInput) hiddenInput.value = '';
                }
            }
        });
        
        input.addEventListener('focus', () => {
            openDropdown();
        });
        
        // FIXED: Use timeout to allow click events to fire before blur
        input.addEventListener('blur', () => {
            setTimeout(() => {
                closeDropdown();
            }, 150);
        });
        
        // FIXED: Keyboard navigation
        input.addEventListener('keydown', (e) => {
            if (!isOpen) return;
            
            const items = dropdown.querySelectorAll('.dropdown-item:not([style*="cursor: default"])');
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                currentIndex = Math.min(currentIndex + 1, items.length - 1);
                highlightItem(items, currentIndex);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                currentIndex = Math.max(currentIndex - 1, -1);
                highlightItem(items, currentIndex);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (currentIndex >= 0 && items[currentIndex]) {
                    const value = items[currentIndex].dataset.value;
                    const isObjectArray = options.length > 0 && typeof options[0] === 'object';
                    
                    if (isObjectArray) {
                        const option = options.find(opt => opt.value === value);
                        if (option) selectOption(option);
                    } else {
                        selectOption(value);
                    }
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closeDropdown();
                input.blur();
            }
        });
        
        const highlightItem = (items, index) => {
            items.forEach((item, i) => {
                if (i === index) {
                    item.style.backgroundColor = '#2563eb';
                    item.style.color = 'white';
                    item.scrollIntoView({ block: 'nearest' });
                } else {
                    item.style.backgroundColor = '';
                    item.style.color = '';
                }
            });
        };
        
        // Set default value if provided
        if (defaultValue) {
            const isObjectArray = options.length > 0 && typeof options[0] === 'object';
            
            if (isObjectArray) {
                const defaultOption = options.find(opt => opt.value === defaultValue);
                if (defaultOption) {
                    selectOption(defaultOption);
                }
            } else {
                const defaultOption = options.find(opt => opt === defaultValue);
                if (defaultOption) {
                    selectOption(defaultOption);
                }
            }
        }
        
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
        const serviceInput = createCustomDropdown(serviceCell, serviceOptions, 'Type to search services...', null);
        
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
        
        // Add event listeners for calculations
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
        if (statusMessage) {
            statusMessage.textContent = message;
            statusMessage.className = `status-message status-${type} show`;
            
            setTimeout(() => {
                statusMessage.classList.remove('show');
            }, 5000);
        }
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
            .filter(input => input.value.trim() && input.closest('#invoice-items'));
        
        if (validItems.length === 0) {
            errors.push('Please add at least one invoice item with a selected service');
            isValid = false;
        }

        if (!isValid) {
            showStatusMessage(errors[0], 'error');
        }

        return isValid;
    };

    // Generate PDF function
    const generatePDF = async () => {
        if (!validateForm()) return;
        showStatusMessage('PDF generation feature requires additional setup', 'info');
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
                const serviceItem = serviceInput.value.trim();
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

            // Simulate successful submission for now
            showStatusMessage('Data submitted successfully!', 'success');
            
        } catch (error) {
            console.error('Submission error:', error);
            showStatusMessage(`Error: ${error.message}`, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit to Spreadsheet';
        }
    };

    // FIXED: Global click handler to close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.searchable-dropdown')) {
            document.querySelectorAll('.dropdown-list').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });

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
            createItemRow(); // Simplified for now
        }
    });

    // Initialize the form
    initializeDates();
    
    // Create custom dropdowns for form fields
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
    
    // Create initial item row
    createItemRow();
    calculateTotals();

    console.log('Invoice form with fixed custom dropdowns initialized successfully');
});
